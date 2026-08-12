import type { Metadata } from 'next'
import { getAllPostsMeta, paginate } from '@/app/lib/blog/posts'
import { SITE_URL } from '@/app/lib/blog/config'
import BlogGrid from '@/app/components/blog/BlogGrid'
import Pagination from '@/app/components/blog/Pagination'
import SearchBox from '@/app/components/blog/SearchBox'
import Sidebar from '@/app/components/blog/Sidebar'
import Breadcrumbs from '@/app/components/blog/Breadcrumbs'

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Blog — Tandoori Chicken, North Indian Food & Noida Guides",
  description:
    "Guides, recipes, and local food picks from MK's Tandoori in Sector 75, Noida — tandoori chicken, soya chaap, rolls, and the best of North Indian food near you.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "MK's Tandoori Blog — Noida Food Guides",
    description:
      "Guides, recipes, and local food picks from MK's Tandoori in Sector 75, Noida.",
    type: 'website',
    url: `${SITE_URL}/blog`,
    images: [{ url: `${SITE_URL}/thumbnail.png`, width: 1096, height: 606, alt: "MK's Tandoori Blog" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "MK's Tandoori Blog — Noida Food Guides",
    description: "Guides, recipes, and local food picks from MK's Tandoori in Sector 75, Noida.",
    images: [`${SITE_URL}/thumbnail.png`],
  },
}

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const allPosts = await getAllPostsMeta()
  const page = Number(searchParams.page) || 1
  const { items, totalPages } = paginate(allPosts, page)

  return (
    <div className="bg-paper pt-28 pb-20 px-5 md:px-10">
      <div className="max-w-6xl mx-auto">
        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Blog' }]} />

        <header className="mt-6 mb-10 max-w-2xl">
          <span className="eyebrow">MK&apos;s Journal</span>
          <h1 className="font-heading text-4xl md:text-5xl text-ink mt-3 mb-4">
            The MK&apos;s Blog
          </h1>
          <p className="font-body text-ink/60">
            Tandoori guides, dish deep-dives, and honest recommendations from our kitchen in
            Sector 75, Noida.
          </p>
        </header>

        <div className="mb-10 max-w-xl">
          <SearchBox posts={allPosts} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
          <div>
            <BlogGrid posts={items} />
            <Pagination page={page} totalPages={totalPages} basePath="/blog" />
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  )
}
