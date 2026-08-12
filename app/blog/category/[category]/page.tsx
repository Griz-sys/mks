import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllCategories, getPostsByCategory, paginate } from '@/app/lib/blog/posts'
import { SITE_URL } from '@/app/lib/blog/config'
import BlogGrid from '@/app/components/blog/BlogGrid'
import Pagination from '@/app/components/blog/Pagination'
import Sidebar from '@/app/components/blog/Sidebar'
import Breadcrumbs from '@/app/components/blog/Breadcrumbs'

export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  return (await getAllCategories()).map((cat) => ({ category: cat.slug }))
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const cat = (await getAllCategories()).find((c) => c.slug === params.category)
  if (!cat) return {}
  const title = `${cat.name} Articles — MK's Tandoori Blog`
  const description = `Browse all ${cat.name} articles and guides from MK's Tandoori, Sector 75, Noida.`
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `${SITE_URL}/blog/category/${cat.slug}` },
    openGraph: { title, description, type: 'website', url: `${SITE_URL}/blog/category/${cat.slug}` },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { category: string }
  searchParams: { page?: string }
}) {
  const cat = (await getAllCategories()).find((c) => c.slug === params.category)
  if (!cat) notFound()

  const posts = await getPostsByCategory(params.category)
  const page = Number(searchParams.page) || 1
  const { items, totalPages } = paginate(posts, page)

  return (
    <div className="bg-paper pt-28 pb-20 px-5 md:px-10">
      <div className="max-w-6xl mx-auto">
        <Breadcrumbs
          items={[{ name: 'Home', href: '/' }, { name: 'Blog', href: '/blog' }, { name: cat.name }]}
        />
        <header className="mt-6 mb-10">
          <span className="eyebrow">Category</span>
          <h1 className="font-heading text-4xl md:text-5xl text-ink mt-3">{cat.name}</h1>
          <p className="font-body text-ink/60 mt-3">{cat.count} article{cat.count === 1 ? '' : 's'}</p>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
          <div>
            <BlogGrid posts={items} />
            <Pagination page={page} totalPages={totalPages} basePath={`/blog/category/${cat.slug}`} />
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  )
}
