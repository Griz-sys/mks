'use client'

import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('done')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="rounded-2xl bg-ink text-paper p-5">
      <p className="font-heading text-base mb-1.5">Get new recipes &amp; offers</p>
      <p className="font-body text-xs text-paper/50 mb-4">
        One email a month. No spam, ever.
      </p>
      {status === 'done' ? (
        <p className="font-body text-sm text-terracotta">Thanks — you&apos;re on the list!</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="rounded-full px-4 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-terracotta"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="rounded-full bg-terracotta text-white font-body font-semibold text-sm px-4 py-2.5 hover:brightness-95 transition disabled:opacity-60"
          >
            {status === 'loading' ? 'Submitting…' : 'Subscribe'}
          </button>
          {status === 'error' && (
            <p className="font-body text-xs text-red-400">Something went wrong — try again.</p>
          )}
        </form>
      )}
    </div>
  )
}
