import Link from 'next/link'

export default function Pagination({
  page,
  totalPages,
  basePath,
}: {
  page: number
  totalPages: number
  basePath: string
}) {
  if (totalPages <= 1) return null

  const hrefFor = (p: number) => (p === 1 ? basePath : `${basePath}?page=${p}`)

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2 mt-12">
      <Link
        href={hrefFor(Math.max(1, page - 1))}
        aria-disabled={page === 1}
        className={`px-4 py-2 rounded-full font-body text-sm border border-ink/15 transition-colors ${
          page === 1 ? 'pointer-events-none opacity-30' : 'hover:border-terracotta hover:text-terracotta'
        }`}
      >
        Previous
      </Link>
      <span className="font-body text-sm text-ink/50 px-2">
        Page {page} of {totalPages}
      </span>
      <Link
        href={hrefFor(Math.min(totalPages, page + 1))}
        aria-disabled={page === totalPages}
        className={`px-4 py-2 rounded-full font-body text-sm border border-ink/15 transition-colors ${
          page === totalPages ? 'pointer-events-none opacity-30' : 'hover:border-terracotta hover:text-terracotta'
        }`}
      >
        Next
      </Link>
    </nav>
  )
}
