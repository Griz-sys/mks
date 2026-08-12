import Link from 'next/link'
import type { PostMeta } from '@/app/lib/blog/types'

export default function RecentPosts({ posts }: { posts: PostMeta[] }) {
  if (!posts.length) return null

  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-5">
      <p className="font-heading text-sm uppercase tracking-widest text-ink/40 mb-4">Recent Posts</p>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="font-body text-sm text-ink/80 hover:text-terracotta transition-colors leading-snug">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
