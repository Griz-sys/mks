import type { PostMeta } from '@/app/lib/blog/types'
import BlogCard from './BlogCard'

export default function BlogGrid({ posts }: { posts: PostMeta[] }) {
  if (!posts.length) {
    return (
      <p className="font-body text-ink/50 py-16 text-center">
        No articles found. Try a different search or category.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  )
}
