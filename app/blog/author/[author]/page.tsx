import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllAuthors, getPostsByAuthor, paginate } from '@/app/lib/blog/posts'
import { SITE_URL } from '@/app/lib/blog/config'
import BlogGrid from '@/app/components/blog/BlogGrid'
import Pagination from '@/app/components/blog/Pagination'
import Sidebar from '@/app/components/blog/Sidebar'
import Breadcrumbs from '@/app/components/blog/Breadcrumbs'
import AuthorBio from '@/app/components/blog/AuthorBio'

export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  return (await getAllAuthors()).map((author) => ({ author: author.slug }))
}

export async function generateMetadata({ params }: { params: { author: string } }): Promise<Metadata> {
  const author = (await getAllAuthors()).find((a) => a.slug === params.author)
  if (!author) return {}
  const title = `Articles by ${author.name} — MK's Tandoori Blog`
  const description = `Browse all articles written by ${author.name} for MK's Tandoori, Sector 75, Noida.`
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `${SITE_URL}/blog/author/${author.slug}` },
    openGraph: { title, description, type: 'website', url: `${SITE_URL}/blog/author/${author.slug}` },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function AuthorPage({
  params,
  searchParams,
}: {
  params: { author: string }
  searchParams: { page?: string }
}) {
  const author = (await getAllAuthors()).find((a) => a.slug === params.author)
  if (!author) notFound()

  const posts = await getPostsByAuthor(params.author)
  const page = Number(searchParams.page) || 1
  const { items, totalPages } = paginate(posts, page)

  return (
    <div className="bg-paper pt-28 pb-20 px-5 md:px-10">
      <div className="max-w-6xl mx-auto">
        <Breadcrumbs
          items={[{ name: 'Home', href: '/' }, { name: 'Blog', href: '/blog' }, { name: author.name }]}
        />
        <header className="mt-6 mb-10 max-w-xl">
          <span className="eyebrow">Author</span>
          <h1 className="font-heading text-4xl md:text-5xl text-ink mt-3 mb-5">{author.name}</h1>
          <AuthorBio name={author.name} />
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
          <div>
            <BlogGrid posts={items} />
            <Pagination page={page} totalPages={totalPages} basePath={`/blog/author/${author.slug}`} />
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  )
}
