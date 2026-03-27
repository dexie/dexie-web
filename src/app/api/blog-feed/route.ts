import { NextResponse } from "next/server";
import { parseStringPromise } from "xml2js";
import { FEEDS } from "@/config/feeds";

export interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  author: string;
  description: string;
  thumbnail?: string;
  categories: string[];
  slug: string;
  content?: string;
}

// In-memory cache
let cachedPosts: BlogPost[] | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

/**
 * Creates a URL-friendly slug from a title
 */
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special chars
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/--+/g, "-") // Replace multiple hyphens
    .trim();
}

/**
 * Strips HTML tags from a string and truncates to a specified length
 */
function stripHtml(html: string, maxLength: number = 200): string {
  const tmp = html.replace(/<[^>]*>/g, "");
  const decoded = tmp
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .trim();
  return decoded.length > maxLength
    ? decoded.substring(0, maxLength) + "..."
    : decoded;
}

/**
 * Extracts thumbnail image URL from HTML content
 * Filters out tracking pixels and invalid images
 */
function extractThumbnail(html: string): string | undefined {
  const imgMatch = html.match(/<img[^>]+src="([^">]+)"/);
  if (!imgMatch) return undefined;

  const url = imgMatch[1];

  // Filter out tracking pixels and stat URLs
  if (
    url.includes("/_/stat?") ||
    url.includes("/stat?event=") ||
    url.includes("tracking") ||
    url.includes("pixel") ||
    (url.endsWith(".gif") && url.includes("stat"))
  ) {
    return undefined;
  }

  // Check if it's a valid image URL
  if (
    url.startsWith("http") &&
    (url.includes("cdn-images") ||
      url.includes("miro.medium.com") ||
      url.includes("medium.com/max") ||
      url.match(/\.(jpg|jpeg|png|webp)/))
  ) {
    return url;
  }

  return undefined;
}

/**
 * Parses RSS feed XML to BlogPost array
 */
async function parseRssFeed(
  xmlData: string,
  limit: number,
): Promise<BlogPost[]> {
  try {
    const result = await parseStringPromise(xmlData, {
      trim: true,
      explicitArray: false,
    });

    const items = result.rss?.channel?.item || [];
    const itemsArray = Array.isArray(items) ? items : [items];

    const posts: BlogPost[] = itemsArray
      .slice(0, limit)
      .map(
        (item: {
          title?: string;
          link?: string;
          pubDate?: string;
          "dc:creator"?: string;
          creator?: string;
          category?: string | string[];
          "content:encoded"?: string;
          description?: string;
        }) => {
          // Extract categories
          let categories: string[] = [];
          if (item.category) {
            categories = Array.isArray(item.category)
              ? item.category
              : [item.category];
          }

          // Get content for thumbnail extraction
          const content = item["content:encoded"] || item.description || "";
          const thumbnail = extractThumbnail(content);

          return {
            title: item.title || "",
            link: item.link || "",
            pubDate: item.pubDate || "",
            author: item["dc:creator"] || item.creator || "Dexie Team",
            description: stripHtml(content),
            thumbnail,
            categories,
            slug: createSlug(item.title || ""),
            content, // Store full HTML content
          };
        },
      );

    return posts;
  } catch (error) {
    console.error("Error parsing RSS feed:", error);
    throw new Error("Failed to parse RSS feed");
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "6", 10);
    // Always use the configured feed URL (user-supplied feedUrl is ignored to prevent SSRF)
    const feedUrl = FEEDS.BLOG;

    // Check if we have valid cached data
    const now = Date.now();
    if (
      cachedPosts &&
      cacheTimestamp &&
      now - cacheTimestamp < CACHE_DURATION
    ) {
      console.log("Returning cached blog posts");
      return NextResponse.json({
        posts: cachedPosts.slice(0, limit),
        cached: true,
        cacheAge: Math.floor((now - cacheTimestamp) / 1000),
      });
    }

    console.log("Fetching fresh blog posts from:", feedUrl);

    // Fetch the RSS feed — try Medium first, fall back to static copy
    let xmlData: string;
    try {
      const response = await fetch(feedUrl, {
        headers: {
          "User-Agent": "Dexie-Web/1.0",
        },
        next: { revalidate: 600 }, // Next.js cache for 10 minutes
        signal: AbortSignal.timeout(5000), // 5s timeout for Medium
      });

      if (!response.ok) {
        throw new Error(`Medium RSS returned ${response.status}`);
      }

      xmlData = await response.text();
    } catch (primaryError) {
      console.warn(
        "Medium feed unavailable, falling back to static copy:",
        primaryError instanceof Error ? primaryError.message : primaryError,
      );

      // Fall back to static blog-feed.xml using trusted base URL
      const baseUrl = process.env.BLOG_BASE_URL || "https://dexie.org";
      const fallbackUrl = `${baseUrl}${FEEDS.BLOG_FALLBACK}`;

      const fallbackResponse = await fetch(fallbackUrl, {
        headers: { "User-Agent": "Dexie-Web/1.0" },
        next: { revalidate: 600 },
        signal: AbortSignal.timeout(5000),
      });

      if (!fallbackResponse.ok) {
        throw new Error(
          `Fallback feed also failed: ${fallbackResponse.status}`,
        );
      }

      xmlData = await fallbackResponse.text();
    }

    const posts = await parseRssFeed(xmlData, 20); // Parse more than needed for cache

    // Update cache
    cachedPosts = posts;
    cacheTimestamp = now;

    return NextResponse.json({
      posts: posts.slice(0, limit),
      cached: false,
      totalInFeed: posts.length,
    });
  } catch (error) {
    console.error("Error in blog feed API:", error);

    // If we have cached data, return it even if expired
    if (cachedPosts && cachedPosts.length > 0) {
      console.log("Returning stale cached data due to error");
      return NextResponse.json({
        posts: cachedPosts,
        cached: true,
        stale: true,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }

    return NextResponse.json(
      {
        error: "Failed to fetch blog posts",
        message: error instanceof Error ? error.message : "Unknown error",
        posts: [],
      },
      { status: 500 },
    );
  }
}
