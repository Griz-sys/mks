import Link from 'next/link'

export default function CategoryList({
  categories,
}: {
  categories: { name: string; slug: string; count: number }[]
}) {
  if (!categories.length) return null

  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-5">
      <p className="font-heading text-sm uppercase tracking-widest text-ink/40 mb-4">Categories</p>
      <ul className="space-y-2.5">
        {categories.map((cat) => (
          <li key={cat.slug} className="flex items-center justify-between">
            <Link
              href={`/blog/category/${cat.slug}`}
              className="font-body text-sm text-ink/70 hover:text-terracotta transition-colors"
            >
              {cat.name}
            </Link>
            <span className="font-body text-xs text-ink/30">{cat.count}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
