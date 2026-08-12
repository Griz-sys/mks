export type SearchIntent = 'informational' | 'commercial' | 'navigational' | 'transactional'
export type Difficulty = 'easy' | 'medium' | 'hard'
export type PostStatus = 'draft' | 'published'

export type Faq = {
  question: string
  answer: string
}

export type ExternalReference = {
  label: string
  url: string
}

export type FeaturedImage = {
  src: string
  alt: string
  caption?: string
  title?: string
}

/** Post record, whether sourced from a DB row or (historically) an .mdx file's frontmatter. */
export type PostFrontmatter = {
  id?: number
  status?: PostStatus
  title: string
  seoTitle: string
  metaDescription: string
  slug: string
  excerpt: string

  targetKeyword: string
  relatedKeywords: string[]
  searchIntent: SearchIntent
  difficulty: Difficulty

  category: string
  tags: string[]

  author: string
  publishedDate: string
  modifiedDate: string

  featuredImage: FeaturedImage
  ogImage: string
  ogImagePrompt?: string

  faqs: Faq[]
  internalLinks?: { label: string; href: string }[]
  externalReferences?: ExternalReference[]

  robots?: string
}

/** Lightweight metadata used for listings/index pages — no MDX body compiled. */
export type PostMeta = PostFrontmatter & {
  readingTime: string
  readingMinutes: number
}

export type TocItem = {
  id: string
  text: string
  depth: number
}

export type PaginatedResult<T> = {
  items: T[]
  page: number
  totalPages: number
  totalItems: number
}
