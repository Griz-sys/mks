'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    const data = await res.json()
    if (data.ok) {
      router.push('/admin')
      router.refresh()
    } else {
      setError(data.error || 'Login failed')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper px-5">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white rounded-3xl border border-ink/10 p-8">
        <p className="font-heading text-2xl text-ink mb-1">MK&apos;s Admin</p>
        <p className="font-body text-sm text-ink/50 mb-6">Sign in to manage blog posts.</p>
        <input
          type="password"
          required
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full rounded-full border border-ink/15 px-5 py-3 font-body text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-terracotta"
        />
        {error && <p className="font-body text-sm text-red-600 mb-4">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-ink text-paper font-body font-semibold text-sm px-5 py-3 hover:bg-terracotta transition disabled:opacity-60"
        >
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}
