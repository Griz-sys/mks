import { z } from 'zod'

export const faqSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  answer: z.string().min(1, 'Answer is required'),
})

export const linkSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  href: z.string().min(1, 'Link is required'),
})

export const externalReferenceSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  url: z.string().url('Must be a valid URL'),
})

export const postInputSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  seoTitle: z.string().min(1, 'SEO title is required').max(70, 'Keep the SEO title under 70 characters'),
  metaDescription: z.string().min(1, 'Meta description is required').max(170, 'Keep the meta description under 170 characters'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase, letters/numbers/hyphens only'),
  excerpt: z.string().min(1, 'Excerpt is required'),

  targetKeyword: z.string().min(1, 'Target keyword is required'),
  relatedKeywords: z.array(z.string().min(1)).default([]),
  searchIntent: z.enum(['informational', 'commercial', 'navigational', 'transactional']),
  difficulty: z.enum(['easy', 'medium', 'hard']),

  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string().min(1)).min(1, 'At least one tag is required'),

  author: z.string().min(1, 'Author is required'),
  publishedDate: z.string().min(1, 'Published date is required'),
  modifiedDate: z.string().min(1, 'Modified date is required'),

  featuredImage: z.object({
    src: z.string().min(1, 'Featured image is required'),
    alt: z.string().min(1, 'Featured image alt text is required'),
    caption: z.string().optional().default(''),
    title: z.string().optional().default(''),
  }),
  ogImage: z.string().min(1, 'OG image is required'),
  ogImagePrompt: z.string().optional().default(''),

  faqs: z.array(faqSchema).default([]),
  internalLinks: z.array(linkSchema).default([]),
  externalReferences: z.array(externalReferenceSchema).default([]),

  robots: z.string().optional().default(''),
  body: z.string().min(1, 'Body content is required'),
  status: z.enum(['draft', 'published']),
})

export type PostInput = z.infer<typeof postInputSchema>
