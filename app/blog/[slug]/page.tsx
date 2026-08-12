import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getAllPublishedSlugs,
  getPostMetaBySlug,
  getRawPost,
  getRelatedPosts,
} from '@/app/lib/blog/posts'
import { renderPost } from '@/app/lib/blog/mdx'
import { extractHeadings } from '@/app/lib/blog/toc'
import { SITE_URL } from '@/app/lib/blog/config'
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildRestaurantSchema,
  buildLocalBusinessSchema,
} from '@/app/lib/blog/schema'
import Breadcrumbs from '@/app/components/blog/Breadcrumbs'
import TableOfContents from '@/app/components/blog/TableOfContents'
import ReadingTime from '@/app/components/blog/ReadingTime'
import SocialShare from '@/app/components/blog/SocialShare'
import FaqAccordion from '@/app/components/blog/FaqAccordion'
import CtaBlock from '@/app/components/blog/CtaBlock'
import AuthorBio from '@/app/components/blog/AuthorBio'
import RelatedPosts from '@/app/components/blog/RelatedPosts'

export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  return (await getAllPublishedSlugs()).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostMetaBySlug(params.slug)
  if (!post) return {}

  const url = `${SITE_URL}/blog/${post.slug}`
  const ogImageUrl = post.ogImage.startsWith('http') ? post.ogImage : `${SITE_URL}${post.ogImage}`
  const noindex = post.robots?.toLowerCase().includes('noindex')

  return {
    title: { absolute: post.seoTitle || post.title },
    description: post.metaDescription,
    keywords: [post.targetKeyword, ...post.relatedKeywords],
    authors: [{ name: post.author }],
    alternates: { canonical: url },
    robots: { index: !noindex, follow: !noindex },
    openGraph: {
      type: 'article',
      title: post.seoTitle || post.title,
      description: post.metaDescription,
      url,
      publishedTime: post.publishedDate,
      modifiedTime: post.modifiedDate,
      authors: [post.author],
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: post.featuredImage.alt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle || post.title,
      description: post.metaDescription,
      images: [ogImageUrl],
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostMetaBySlug(params.slug)
  if (!post) notFound()

  const raw = await getRawPost(params.slug)
  const rendered = await renderPost(params.slug)
  if (!raw || !rendered) notFound()
  const { content } = rendered
  const toc = extractHeadings(raw.content)
  const related = await getRelatedPosts(post)
  const url = `${SITE_URL}/blog/${post.slug}`

  const breadcrumbItems = [
    { name: 'Home', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}/blog` },
    { name: post.title, url },
  ]

  return (
    <div className="bg-paper pt-28 pb-20 px-5 md:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildArticleSchema(post)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(breadcrumbItems)) }}
      />
      {post.faqs?.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(post.faqs)) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildRestaurantSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildLocalBusinessSchema()) }}
      />

      <div className="max-w-6xl mx-auto">
        <Breadcrumbs
          items={[{ name: 'Home', href: '/' }, { name: 'Blog', href: '/blog' }, { name: post.title }]}
        />

        <header className="mt-6 mb-8 max-w-3xl">
          <span className="eyebrow">{post.category}</span>
          <h1 className="font-heading text-4xl md:text-5xl text-ink mt-3 mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="font-body text-lg text-ink/60 mb-4">{post.excerpt}</p>
          <div className="flex flex-wrap items-center gap-4">
            <ReadingTime text={post.readingTime} />
            <span className="font-body text-xs text-ink/40">
              Updated {new Date(post.modifiedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
          <article className="max-w-3xl">
            <div className="lg:hidden mb-8">
              <TableOfContents items={toc} />
            </div>

            <div className="prose prose-mk max-w-none font-body text-ink/80">{content}</div>

            {post.faqs?.length > 0 && (
              <section className="mt-14">
                <h2 className="font-heading text-2xl md:text-3xl text-ink mb-6">
                  Frequently Asked Questions
                </h2>
                <FaqAccordion faqs={post.faqs} />
              </section>
            )}

            <section className="mt-14">
              <h2 className="font-heading text-2xl md:text-3xl text-ink mb-4">Summary</h2>
              <p className="font-body text-ink/70">
                {post.excerpt} Visit MK&apos;s Tandoori in Sector 75, Noida to try it fresh off the tandoor.
              </p>
            </section>

            {post.externalReferences && post.externalReferences.length > 0 && (
              <section className="mt-10">
                <h2 className="font-heading text-xl text-ink mb-3">Further Reading</h2>
                <ul className="space-y-1.5">
                  {post.externalReferences.map((ref) => (
                    <li key={ref.url}>
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-sm text-terracotta hover:underline"
                      >
                        {ref.label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <CtaBlock />

            <div className="border-t border-ink/10 pt-6 mt-4">
              <SocialShare url={url} title={post.title} />
            </div>

            <div className="mt-8">
              <AuthorBio name={post.author} />
            </div>

            <RelatedPosts posts={related} />
          </article>

          <aside className="hidden lg:block space-y-6 lg:sticky lg:top-28 self-start">
            <TableOfContents items={toc} />
          </aside>
        </div>
      </div>
    </div>
  )
}
