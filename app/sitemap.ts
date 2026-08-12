import { MetadataRoute } from 'next'
import { getAllPostsMeta, getAllCategories, getAllTags, getAllAuthors } from './lib/blog/posts'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://mkstandoori.com'
  const now = new Date()

  const [posts, categories, tags, authors] = await Promise.all([
    getAllPostsMeta(),
    getAllCategories(),
    getAllTags(),
    getAllAuthors(),
  ])

  const blogRoutes: MetadataRoute.Sitemap = [
    {
      url: `${base}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: new Date(post.modifiedDate),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...categories.map((cat) => ({
      url: `${base}/blog/category/${cat.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    })),
    ...tags.map((tag) => ({
      url: `${base}/blog/tag/${tag.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.4,
    })),
    ...authors.map((author) => ({
      url: `${base}/blog/author/${author.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.4,
    })),
  ]

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${base}/tandoori-chicken-noida-sector-75`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/family-restaurant-sector-75-noida`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/soya-chaap-noida`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/chicken-roll-noida`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/kati-roll-noida`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/chicken-tikka-noida`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/malai-chaap-noida`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/north-indian-restaurant-noida`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...blogRoutes,
  ]
}
