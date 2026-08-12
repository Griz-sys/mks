import type { PostMeta } from '@/app/lib/blog/types'
import BlogCard from './BlogCard'

export default function RelatedPosts({ posts }: { posts: PostMeta[] }) {
  if (!posts.length) return null

  return (
    <section className="mt-16">
      <h2 className="font-heading text-2xl md:text-3xl text-ink mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  )
}
