import Link from 'next/link'

export default function TagList({ tags }: { tags: { name: string; slug: string; count: number }[] }) {
  if (!tags.length) return null

  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-5">
      <p className="font-heading text-sm uppercase tracking-widest text-ink/40 mb-4">Tags</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            key={tag.slug}
            href={`/blog/tag/${tag.slug}`}
            className="px-3 py-1.5 rounded-full border border-ink/15 font-body text-xs text-ink/60 hover:border-terracotta hover:text-terracotta transition-colors"
          >
            #{tag.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
