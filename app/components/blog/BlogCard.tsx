import Link from 'next/link'
import Image from 'next/image'
import type { PostMeta } from '@/app/lib/blog/types'
import { slugify } from '@/app/lib/blog/slugify'

export default function BlogCard({ post }: { post: PostMeta }) {
  return (
    <article className="group bg-white rounded-3xl border border-ink/10 overflow-hidden hover:border-terracotta/40 hover:shadow-xl hover:shadow-ink/5 transition-all">
      <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-tint/40">
        <Image
          src={post.featuredImage.src}
          alt={post.featuredImage.alt}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </Link>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3 font-body text-xs uppercase tracking-widest text-terracotta">
          <Link href={`/blog/category/${slugify(post.category)}`} className="hover:underline">
            {post.category}
          </Link>
          <span className="text-ink/30">·</span>
          <span className="text-ink/40">{post.readingTime}</span>
        </div>
        <h3 className="font-heading text-xl text-ink mb-2 leading-snug">
          <Link href={`/blog/${post.slug}`} className="hover:text-terracotta transition-colors">
            {post.title}
          </Link>
        </h3>
        <p className="font-body text-sm text-ink/60 line-clamp-3">{post.excerpt}</p>
      </div>
    </article>
  )
}
