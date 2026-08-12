'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { PostMeta } from '@/app/lib/blog/types'

export default function SearchBox({ posts }: { posts: PostMeta[] }) {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return posts
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q)
      )
      .slice(0, 8)
  }, [query, posts])

  return (
    <div className="relative">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search articles — e.g. tandoori chicken, soya chaap…"
        aria-label="Search blog articles"
        className="w-full rounded-full border border-ink/15 px-5 py-3.5 font-body text-sm focus:outline-none focus:ring-2 focus:ring-terracotta"
      />
      {query.trim() && (
        <div className="absolute z-20 top-full left-0 right-0 mt-2 rounded-2xl border border-ink/10 bg-white shadow-xl overflow-hidden">
          {results.length === 0 ? (
            <p className="font-body text-sm text-ink/50 px-5 py-4">No articles match &ldquo;{query}&rdquo;.</p>
          ) : (
            <ul>
              {results.map((post) => (
                <li key={post.slug} className="border-b border-ink/5 last:border-0">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block px-5 py-3 hover:bg-tint/20 transition-colors"
                    onClick={() => setQuery('')}
                  >
                    <p className="font-body text-sm font-semibold text-ink">{post.title}</p>
                    <p className="font-body text-xs text-ink/40">{post.category}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
