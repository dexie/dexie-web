import { MetadataRoute } from "next"
import { getAllDocs } from "@/utils/mdx"
import { BlogPost } from "@/utils/rssFeedParser"
import { FEEDS } from "@/config/feeds"

export const dynamic = "force-static"

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch(FEEDS.BLOG, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) return []

    const xmlText = await response.text()
    const { parseStringPromise } = await import("xml2js")
    const result = await parseStringPromise(xmlText, {
      trim: true,
      explicitArray: false,
    })

    const items = result.rss?.channel?.item || []
    const itemsArray = Array.isArray(items) ? items : [items]

    const createSlug = (title: string): string => {
      return title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/--+/g, "-")
        .trim()
    }

    interface RSSItem {
      title?: string
      link?: string
      pubDate?: string
      "dc:creator"?: string
      creator?: string
      category?: string | string[]
    }

    const posts: BlogPost[] = itemsArray.map((item: RSSItem) => {
      let categories: string[] = []
      if (item.category) {
        categories = Array.isArray(item.category)
          ? item.category
          : [item.category]
      }

      return {
        title: item.title || "",
        link: item.link || "",
        pubDate: item.pubDate || "",
        author: item["dc:creator"] || item.creator || "Dexie Team",
        description: "",
        categories,
        slug: createSlug(item.title || ""),
        content: "",
      }
    })

    return posts
  } catch (error) {
    console.error("Error fetching blog posts for sitemap:", error)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://dexie.org"

  // Statiska sidor
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/llms.txt`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/product`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cloud/docs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ]

  // Hämta alla docs
  try {
    const docs = getAllDocs()
    const docRoutes: MetadataRoute.Sitemap = docs.map((doc) => ({
      url: `${baseUrl}/docs/${doc.metadata.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))

    // Hämta blogginlägg
    const blogPosts = await getBlogPosts()
    const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.pubDate),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))

    return [...staticRoutes, ...docRoutes, ...blogRoutes]
  } catch (error) {
    console.error("Error generating sitemap:", error)
    return staticRoutes
  }
}
