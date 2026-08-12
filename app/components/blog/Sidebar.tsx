import { getAllPostsMeta, getAllCategories, getAllTags } from '@/app/lib/blog/posts'
import RecentPosts from './RecentPosts'
import CategoryList from './CategoryList'
import TagList from './TagList'
import Newsletter from './Newsletter'

export default async function Sidebar({ excludeSlug }: { excludeSlug?: string }) {
  const recent = (await getAllPostsMeta())
    .filter((p) => p.slug !== excludeSlug)
    .slice(0, 5)
  const categories = await getAllCategories()
  const tags = await getAllTags()

  return (
    <aside className="space-y-6 lg:sticky lg:top-28">
      <RecentPosts posts={recent} />
      <CategoryList categories={categories} />
      <TagList tags={tags} />
      <Newsletter />
    </aside>
  )
}
