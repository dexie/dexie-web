/**
 * RSS Feed Configuration
 * Centralized configuration for external feed URLs
 *
 * BLOG: Primary source is Medium's live RSS feed.
 * BLOG_FALLBACK: Static copy in public/ used when Medium is unreachable.
 */

export const FEEDS = {
  BLOG: "https://medium.com/feed/dexie-js",
  BLOG_FALLBACK: "/blog-feed.xml",
} as const;

export type FeedKey = keyof typeof FEEDS;
