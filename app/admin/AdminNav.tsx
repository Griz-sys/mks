'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AdminNav() {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <header className="border-b border-ink/10 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/admin" className="font-heading text-xl text-ink">
          MK&apos;s Admin
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/admin" className="font-body text-sm text-ink/60 hover:text-terracotta transition-colors">
            Posts
          </Link>
          <Link
            href="/admin/posts/new"
            className="rounded-full bg-ink text-paper font-body text-sm font-semibold px-4 py-2 hover:bg-terracotta transition"
          >
            New Post
          </Link>
          <button
            onClick={handleLogout}
            className="font-body text-sm text-ink/40 hover:text-terracotta transition-colors"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  )
}
