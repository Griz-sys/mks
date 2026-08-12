import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllTags, getPostsByTag, paginate } from '@/app/lib/blog/posts'
import { SITE_URL } from '@/app/lib/blog/config'
import BlogGrid from '@/app/components/blog/BlogGrid'
import Pagination from '@/app/components/blog/Pagination'
import Sidebar from '@/app/components/blog/Sidebar'
import Breadcrumbs from '@/app/components/blog/Breadcrumbs'

export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  return (await getAllTags()).map((tag) => ({ tag: tag.slug }))
}

export async function generateMetadata({ params }: { params: { tag: string } }): Promise<Metadata> {
  const tag = (await getAllTags()).find((t) => t.slug === params.tag)
  if (!tag) return {}
  const title = `#${tag.name} — MK's Tandoori Blog`
  const description = `Articles tagged "${tag.name}" from MK's Tandoori, Sector 75, Noida.`
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `${SITE_URL}/blog/tag/${tag.slug}` },
    openGraph: { title, description, type: 'website', url: `${SITE_URL}/blog/tag/${tag.slug}` },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function TagPage({
  params,
  searchParams,
}: {
  params: { tag: string }
  searchParams: { page?: string }
}) {
  const tag = (await getAllTags()).find((t) => t.slug === params.tag)
  if (!tag) notFound()

  const posts = await getPostsByTag(params.tag)
  const page = Number(searchParams.page) || 1
  const { items, totalPages } = paginate(posts, page)

  return (
    <div className="bg-paper pt-28 pb-20 px-5 md:px-10">
      <div className="max-w-6xl mx-auto">
        <Breadcrumbs
          items={[{ name: 'Home', href: '/' }, { name: 'Blog', href: '/blog' }, { name: `#${tag.name}` }]}
        />
        <header className="mt-6 mb-10">
          <span className="eyebrow">Tag</span>
          <h1 className="font-heading text-4xl md:text-5xl text-ink mt-3">#{tag.name}</h1>
          <p className="font-body text-ink/60 mt-3">{tag.count} article{tag.count === 1 ? '' : 's'}</p>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
          <div>
            <BlogGrid posts={items} />
            <Pagination page={page} totalPages={totalPages} basePath={`/blog/tag/${tag.slug}`} />
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  )
}
