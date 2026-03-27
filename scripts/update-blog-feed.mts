#!/usr/bin/env tsx
/**
 * Fetches the latest RSS feed from Medium's Dexie.js publication
 * and writes it to public/blog-feed.xml as a cached fallback.
 *
 * Usage: npx tsx scripts/update-blog-feed.mts
 *    or: npm run update-blog-feed
 */

import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// Keep in sync with src/config/feeds.ts FEEDS.BLOG
const MEDIUM_FEED_URL = "https://medium.com/feed/dexie-js";
const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = resolve(__dirname, "../public/blog-feed.xml");

async function main() {
  console.log(`Fetching RSS feed from ${MEDIUM_FEED_URL}...`);

  const response = await fetch(MEDIUM_FEED_URL, {
    headers: { "User-Agent": "Dexie-Web/1.0" },
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    console.error(
      `Failed to fetch feed: ${response.status} ${response.statusText}`,
    );
    process.exit(1);
  }

  const xml = await response.text();

  // Basic sanity check
  if (!xml.includes("<rss") || !xml.includes("<item>")) {
    console.error("Response doesn't look like a valid RSS feed");
    process.exit(1);
  }

  writeFileSync(OUTPUT_PATH, xml, "utf-8");
  console.log(`✅ Updated ${OUTPUT_PATH}`);

  // Show latest post title
  const titleMatch = xml.match(
    /<item>[\s\S]*?<title><!\[CDATA\[(.*?)\]\]><\/title>/,
  );
  if (titleMatch) {
    console.log(`   Latest post: "${titleMatch[1]}"`);
  }
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
