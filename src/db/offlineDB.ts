import { Dexie, Table } from "dexie";
import { extractFullTextTokens } from "./extractFullTextTokens";
import { OfflineManifest } from "@/types/OfflineManifest";

export interface OfflineStatus {
  id: string;
  isWarming: boolean;
  isReady: boolean;
  cached?: number;
  failed?: number;
  total?: number;
  progress?: number;
  startedAt?: string;
  completedAt?: string;
  failedAt?: string;
  error?: string;
  updatedAt: string;
}

export interface CacheMetadata {
  id: string; // URL
  ftsHash?: string | null;
  hash?: string | null;
  lastUpdated: string;
}

type CachingState = 'idle' | 'check' | 'updating-fts' | 'updating-cache';

export interface SearchResult {
  url: string;
  title: string;
  score: number;
  parentTitle: string | undefined;
}

// Dedicated database for offline status (shared between SW and GUI)
export class OfflineDB extends Dexie {
  status!: Table<OfflineStatus>; // DEPRECATED. TODO: Remove in future versions
  manifest!: Table<OfflineManifest, 'manifest'>; // Single entry outbound key "manifest"
  state!: Table<CachingState, 'state'>; // Single entry outbound key "state"
  cacheMetadata!: Table<CacheMetadata>;
  fullTextIndex!: Table<
    { contentId: number; score: number }, // Value (contentId, score)
    [string, number] // Primary Key: [token, contentId]
  >;
  fullTextContent!: Table<
    {
      title: string;
      lowerTitle: string;
      body: string;
      url: string;
      parentTitle: string | undefined;
    },
    number
  >;

  constructor() {
    super("OfflineDB");
    this.version(4).stores({
      status: "id",
      manifest: '', // Single entry outbound key "manifest"
      state: '',    // Single entry outbound key "state"
      cacheMetadata: "id",
      fullTextIndex: ",contentId", // outbound [token+contentId] -> {contentId, score}
      fullTextContent: "++,url,lowerTitle",
    });
  }

  putFullTextDoc(
    routeAndSlug: string,
    title: string,
    body: string,
    parentTitle?: string
  ) {
    // Let all blocks of text be single lines
    const lowerTitle = title.toLowerCase();
    body = body.toLowerCase();
    const content = lowerTitle + " " + body;
    return this.transaction(
      "rw",
      this.fullTextIndex,
      this.fullTextContent,
      async () => {
        // TODO:
        // * lunr-index content and generate tokens + scores
        const contentTokens = extractFullTextTokens(content);
        // * query the content id given the URL (primaryKeys() query on url)
        let contentIds = await this.fullTextContent
          .where({ url: routeAndSlug })
          .primaryKeys();
        if (contentIds.length > 1) {
          console.warn(
            `Multiple fullTextContent entries found for URL ${routeAndSlug}. Cleaning up duplicates.`
          );
          // Should not happen, but if it does, delete all and start fresh
          await this.fullTextContent.where({ url: routeAndSlug }).delete();
          contentIds = [];
        }
        if (contentIds.length === 0) {
          // Add new content entry
          const contentId = await this.fullTextContent.add({
            title,
            lowerTitle,
            body,
            url: routeAndSlug,
            parentTitle,
          });
          await this.fullTextIndex.bulkAdd(
            Array.from(contentTokens.values()).map((score) => ({
              contentId,
              score,
            })),
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore  // typings bug in dexie
            Array.from(contentTokens.keys()).map((token) => [token, contentId])
          );
        } else {
          const contentId = contentIds[0];
          // Update entry
          // * query all fullTextIndex entries for this content id
          const existingEntries = new Map<string, number>(
            await this.fullTextIndex.where({ contentId }).primaryKeys()
          );
          // * compare with our lunr-index. Delete missing ones, update changed ones and add new ones
          for (const [token, score] of contentTokens.entries()) {
            if (existingEntries.get(token) !== score) {
              // New or changed token
              await this.fullTextIndex.put({ contentId, score }, [
                token,
                contentId,
              ]);
            }
          }
          for (const token of existingEntries.keys()) {
            if (!contentTokens.has(token)) {
              // Deleted token
              await this.fullTextIndex.delete([token, contentId]);
            }
          }
          // * update fullTextContent entry
          await this.fullTextContent.put(
            { title, lowerTitle, body, url: routeAndSlug, parentTitle },
            contentId
          );
        }
      }
    );
  }

  deleteFullTextDoc(route: string) {
    // Steps:
    // * query the content id given the URL (primaryKeys() query on url)
    // * delete all fullTextIndex entries for this content id
    // * delete fullTextContent entry
    return this.transaction(
      "rw",
      this.fullTextIndex,
      this.fullTextContent,
      async () => {
        const contentIds = await this.fullTextContent
          .where("url")
          .startsWith(route) // Remove both main doc and all sections
          .primaryKeys();
        for (const contentId of contentIds) {
          // * delete all fullTextIndex entries for this content id
          await this.fullTextIndex.where({ contentId }).delete();
          // * delete fullTextContent entry
          await this.fullTextContent.delete(contentId);
        }
      }
    );
  }

  async findDocuments(
    searchText: string
  ): Promise<{
    searchResults: SearchResult[];
    totalResultCount: number;
  }> {
    searchText = searchText.trim().toLowerCase();
    if (searchText.length === 0) {
      return { searchResults: [], totalResultCount: 0 };
    }
    const quote = searchText.startsWith('"');
    if (quote) {
      // Exact phrase search
      searchText = searchText
        .slice(1, searchText.endsWith('"') ? -1 : undefined)
        .trim();
    }
    // * lunr-index the query to get tokens
    const queryTokens = extractFullTextTokens(searchText, 1).keys();
    // * For every token, query fullTextIndex for matching tokens to get contentIds and scores (toArray())
    const tokenResultPromise = Promise.all(
      Array.from(queryTokens).map((token) => {
        const lowerBound = [token, Dexie.minKey];
        const upperBound = quote
          ? [token, Dexie.maxKey] // Quoted search => Exact match on token
          : [token + "\uffff", Dexie.maxKey]; // Fuzzy => startsWith match on token
        return this.fullTextIndex
          .where(":id") // ":id" is placeholder for primary key (outbound [token+contentId])
          .between(lowerBound, upperBound)
          .toArray();
      })
    );
    const titlePromise = this.fullTextContent
      .where("lowerTitle")
      .startsWith(searchText)
      .limit(5)
      .primaryKeys();

    // Wait for all the parallel queries to complete:
    const [tokenResults, titleMatches] = await Promise.all([
      tokenResultPromise,
      titlePromise,
    ]);
    // * Aggregate scores per search token and contentId
    const intermediateScoreMap = new Map<
      number,
      { [resultId: number]: number }
    >();
    for (let resultId = 0; resultId < tokenResults.length; resultId++) {
      const results = tokenResults[resultId];
      for (const { contentId, score } of results) {
        let existingScore = intermediateScoreMap.get(contentId)!;
        if (!existingScore) {
          existingScore = {};
          intermediateScoreMap.set(contentId, existingScore);
        }
        existingScore[resultId] = (existingScore[resultId] || 0) + score;
      }
    }
    // * Combine scores: If a document matches multiple tokens, multiply their scores
    const scoreMap = new Map<number, number>();
    for (const [contentId, innerScoreMap] of intermediateScoreMap.entries()) {
      let totalScore = 0;
      for (const score of Object.values(innerScoreMap)) {
        if (totalScore === 0) {
          totalScore = score;
        } else {
          totalScore = score + totalScore + score * totalScore;
        }
      }
      scoreMap.set(contentId, totalScore);
    }
    for (const id of titleMatches) {
      // Let titleMatches always win by giving a huge score boost
      scoreMap.set(id, (scoreMap.get(id) || 0) + 1000_000_000);
    }
    // Sort by score descending
    const allResultEntries = Array.from(scoreMap.entries());
    const topResults = allResultEntries
      .sort((a, b) => b[1] - a[1])
      .slice(0, 100); // Limit to top 100 results

    // * Fetch URLs from fullTextContent
    let resultContents = (
      await this.fullTextContent.bulkGet(
        topResults.map(([contentId]) => contentId)
      )
    ).map((c, i) => ({ ...c, id: topResults[i][0], score: topResults[i][1] }));

    const contentsToRemove = new Set<number>();

    for (const content of resultContents) {
      if (quote) {
        // Remove from results if exact phrase not found
        if (
          !content.lowerTitle?.includes(searchText) &&
          !content.body?.includes(searchText)
        ) {
          contentsToRemove.add(content.id);
        }
      } else {
        // Give further score if searchText appears as a whole in title or body
        if (content.lowerTitle === searchText) {
          // Exact title match
          content.score *= 200;
          content.score += 10000;
        } else if (content.lowerTitle?.includes(searchText)) {
          // Boost score for title match
          content.score *= 100;
          content.score += 5000;
        }
        if (content.body?.includes(searchText)) {
          // Boost score for body match
          content.score *= 50;
          content.score += 2000;
        }
      }
    }
    if (quote) {
      resultContents = resultContents.filter(
        (c) => !contentsToRemove.has(c.id)
      );
    }

    // Filter and sort again (as scores may have changed)
    const searchResults = resultContents
        .filter((c) => c.url && c.title)
        .sort((a, b) => b.score - a.score)
        .slice(0, 50) // Limit to top 50 results
        .map((c) => ({
          url: c.url!,
          title: c.title!,
          score: c.score,
          parentTitle: c.parentTitle,
        }));
    return {
      searchResults,
      totalResultCount: quote
        ? resultContents.length 
        : allResultEntries.length
    }
  }
}

export const offlineDB = new OfflineDB();
