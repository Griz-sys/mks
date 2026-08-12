import { sql, ensureSchema } from '@/app/lib/db'
import { getReadingTime } from './reading-time'
import { POSTS_PER_PAGE } from './config'
import { slugify } from './slugify'
import type { PaginatedResult, PostFrontmatter, PostMeta } from './types'
import type { PostInput } from './validation'

type PostRow = {
  id: number
  slug: string
  title: string
  seo_title: string
  meta_description: string
  excerpt: string
  target_keyword: string
  related_keywords: string[]
  search_intent: PostFrontmatter['searchIntent']
  difficulty: PostFrontmatter['difficulty']
  category: string
  tags: string[]
  author: string
  published_date: string
  modified_date: string
  featured_image_src: string
  featured_image_alt: string
  featured_image_caption: string
  featured_image_title: string
  og_image: string
  og_image_prompt: string
  robots: string
  faqs: { question: string; answer: string }[]
  internal_links: { label: string; href: string }[]
  external_references: { label: string; url: string }[]
  body: string
  status: 'draft' | 'published'
}

function rowToFrontmatter(row: PostRow): PostFrontmatter {
  return {
    id: row.id,
    status: row.status,
    title: row.title,
    seoTitle: row.seo_title,
    metaDescription: row.meta_description,
    slug: row.slug,
    excerpt: row.excerpt,
    targetKeyword: row.target_keyword,
    relatedKeywords: row.related_keywords ?? [],
    searchIntent: row.search_intent,
    difficulty: row.difficulty,
    category: row.category,
    tags: row.tags ?? [],
    author: row.author,
    publishedDate: row.published_date,
    modifiedDate: row.modified_date,
    featuredImage: {
      src: row.featured_image_src,
      alt: row.featured_image_alt,
      caption: row.featured_image_caption,
      title: row.featured_image_title,
    },
    ogImage: row.og_image,
    ogImagePrompt: row.og_image_prompt,
    faqs: row.faqs ?? [],
    internalLinks: row.internal_links ?? [],
    externalReferences: row.external_references ?? [],
    robots: row.robots,
  }
}

/** All published posts, sorted newest first. */
export async function getAllPostsMeta(): Promise<PostMeta[]> {
  await ensureSchema()
  const rows = (await sql`
    SELECT * FROM posts WHERE status = 'published' ORDER BY published_date DESC
  `) as unknown as PostRow[]
  return rows.map((row) => {
    const frontmatter = rowToFrontmatter(row)
    const { text, minutes } = getReadingTime(row.body)
    return { ...frontmatter, readingTime: text, readingMinutes: minutes }
  })
}

/** All posts regardless of status, for the admin list. */
export async function getAllPostsForAdmin(): Promise<PostFrontmatter[]> {
  await ensureSchema()
  const rows = (await sql`
    SELECT * FROM posts ORDER BY updated_at DESC
  `) as unknown as PostRow[]
  return rows.map(rowToFrontmatter)
}

export async function getAllPublishedSlugs(): Promise<string[]> {
  return (await getAllPostsMeta()).map((p) => p.slug)
}

export async function getPostMetaBySlug(slug: string): Promise<PostMeta | undefined> {
  return (await getAllPostsMeta()).find((p) => p.slug === slug)
}

export async function getPostById(id: number): Promise<PostFrontmatter | undefined> {
  await ensureSchema()
  const rows = (await sql`SELECT * FROM posts WHERE id = ${id} LIMIT 1`) as unknown as PostRow[]
  return rows[0] ? rowToFrontmatter(rows[0]) : undefined
}

/** For the admin edit form — includes the raw body, regardless of status. */
export async function getPostForEdit(id: number): Promise<(PostFrontmatter & { body: string }) | undefined> {
  await ensureSchema()
  const rows = (await sql`SELECT * FROM posts WHERE id = ${id} LIMIT 1`) as unknown as PostRow[]
  if (!rows[0]) return undefined
  return { ...rowToFrontmatter(rows[0]), body: rows[0].body }
}

export async function getRawPost(slug: string): Promise<{ frontmatter: PostFrontmatter; content: string } | undefined> {
  await ensureSchema()
  const rows = (await sql`
    SELECT * FROM posts WHERE slug = ${slug} AND status = 'published' LIMIT 1
  `) as unknown as PostRow[]
  if (!rows[0]) return undefined
  return { frontmatter: rowToFrontmatter(rows[0]), content: rows[0].body }
}

export function paginate<T>(items: T[], page: number, perPage = POSTS_PER_PAGE): PaginatedResult<T> {
  const totalItems = items.length
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const start = (safePage - 1) * perPage
  return {
    items: items.slice(start, start + perPage),
    page: safePage,
    totalPages,
    totalItems,
  }
}

export async function getPostsByCategory(categorySlug: string): Promise<PostMeta[]> {
  return (await getAllPostsMeta()).filter((p) => slugify(p.category) === categorySlug)
}

export async function getPostsByTag(tagSlug: string): Promise<PostMeta[]> {
  return (await getAllPostsMeta()).filter((p) => p.tags.some((t) => slugify(t) === tagSlug))
}

export async function getPostsByAuthor(authorSlug: string): Promise<PostMeta[]> {
  return (await getAllPostsMeta()).filter((p) => slugify(p.author) === authorSlug)
}

export async function getAllCategories(): Promise<{ name: string; slug: string; count: number }[]> {
  const map = new Map<string, number>()
  for (const p of await getAllPostsMeta()) {
    map.set(p.category, (map.get(p.category) ?? 0) + 1)
  }
  return Array.from(map.entries()).map(([name, count]) => ({ name, slug: slugify(name), count }))
}

export async function getAllTags(): Promise<{ name: string; slug: string; count: number }[]> {
  const map = new Map<string, number>()
  for (const p of await getAllPostsMeta()) {
    for (const tag of p.tags) map.set(tag, (map.get(tag) ?? 0) + 1)
  }
  return Array.from(map.entries()).map(([name, count]) => ({ name, slug: slugify(name), count }))
}

export async function getAllAuthors(): Promise<{ name: string; slug: string; count: number }[]> {
  const map = new Map<string, number>()
  for (const p of await getAllPostsMeta()) {
    map.set(p.author, (map.get(p.author) ?? 0) + 1)
  }
  return Array.from(map.entries()).map(([name, count]) => ({ name, slug: slugify(name), count }))
}

export async function getRelatedPosts(current: PostMeta, limit = 3): Promise<PostMeta[]> {
  const others = (await getAllPostsMeta()).filter((p) => p.slug !== current.slug)
  const scored = others.map((p) => {
    const sameCategory = p.category === current.category ? 2 : 0
    const sharedTags = p.tags.filter((t) => current.tags.includes(t)).length
    return { post: p, score: sameCategory + sharedTags }
  })
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.post)
}

export async function getAdjacentPosts(slug: string): Promise<{ prev?: PostMeta; next?: PostMeta }> {
  const posts = await getAllPostsMeta()
  const index = posts.findIndex((p) => p.slug === slug)
  if (index === -1) return {}
  return { prev: posts[index + 1], next: posts[index - 1] }
}

export { slugify } from './slugify'

/**
 * Creates a new post (no existingId) or updates one in place by id.
 * Update is by id — not by slug — so editing a post's slug renames the row
 * instead of leaving a stale duplicate behind.
 */
export async function savePostRecord(input: PostInput, existingId?: number): Promise<PostFrontmatter> {
  await ensureSchema()

  const relatedKeywords = JSON.stringify(input.relatedKeywords)
  const tags = JSON.stringify(input.tags)
  const faqs = JSON.stringify(input.faqs)
  const internalLinks = JSON.stringify(input.internalLinks)
  const externalReferences = JSON.stringify(input.externalReferences)

  if (existingId) {
    const rows = (await sql`
      UPDATE posts SET
        slug = ${input.slug},
        title = ${input.title},
        seo_title = ${input.seoTitle},
        meta_description = ${input.metaDescription},
        excerpt = ${input.excerpt},
        target_keyword = ${input.targetKeyword},
        related_keywords = ${relatedKeywords},
        search_intent = ${input.searchIntent},
        difficulty = ${input.difficulty},
        category = ${input.category},
        tags = ${tags},
        author = ${input.author},
        published_date = ${input.publishedDate},
        modified_date = ${input.modifiedDate},
        featured_image_src = ${input.featuredImage.src},
        featured_image_alt = ${input.featuredImage.alt},
        featured_image_caption = ${input.featuredImage.caption ?? ''},
        featured_image_title = ${input.featuredImage.title ?? ''},
        og_image = ${input.ogImage},
        og_image_prompt = ${input.ogImagePrompt ?? ''},
        robots = ${input.robots ?? ''},
        faqs = ${faqs},
        internal_links = ${internalLinks},
        external_references = ${externalReferences},
        body = ${input.body},
        status = ${input.status},
        updated_at = now()
      WHERE id = ${existingId}
      RETURNING *
    `) as unknown as PostRow[]
    return rowToFrontmatter(rows[0])
  }

  const rows = (await sql`
    INSERT INTO posts (
      slug, title, seo_title, meta_description, excerpt,
      target_keyword, related_keywords, search_intent, difficulty,
      category, tags, author, published_date, modified_date,
      featured_image_src, featured_image_alt, featured_image_caption, featured_image_title,
      og_image, og_image_prompt, robots, faqs, internal_links, external_references,
      body, status, updated_at
    ) VALUES (
      ${input.slug}, ${input.title}, ${input.seoTitle}, ${input.metaDescription}, ${input.excerpt},
      ${input.targetKeyword}, ${relatedKeywords}, ${input.searchIntent}, ${input.difficulty},
      ${input.category}, ${tags}, ${input.author}, ${input.publishedDate}, ${input.modifiedDate},
      ${input.featuredImage.src}, ${input.featuredImage.alt}, ${input.featuredImage.caption ?? ''}, ${input.featuredImage.title ?? ''},
      ${input.ogImage}, ${input.ogImagePrompt ?? ''}, ${input.robots ?? ''}, ${faqs}, ${internalLinks}, ${externalReferences},
      ${input.body}, ${input.status}, now()
    )
    RETURNING *
  `) as unknown as PostRow[]

  return rowToFrontmatter(rows[0])
}

export async function deletePostRecord(id: number): Promise<void> {
  await ensureSchema()
  await sql`DELETE FROM posts WHERE id = ${id}`
}
