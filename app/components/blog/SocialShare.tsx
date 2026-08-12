'use client'

import { useState } from 'react'

export default function SocialShare({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false)
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  async function handleCopy() {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function handleNativeShare() {
    if (navigator.share) {
      await navigator.share({ title, url })
    }
  }

  const links = [
    { label: 'WhatsApp', href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}` },
    { label: 'X', href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}` },
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
  ]

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="font-body text-xs uppercase tracking-widest text-ink/40 mr-1">Share</span>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 rounded-full border border-ink/15 font-body text-xs hover:border-terracotta hover:text-terracotta transition-colors"
        >
          {link.label}
        </a>
      ))}
      <button
        onClick={handleCopy}
        className="px-3 py-1.5 rounded-full border border-ink/15 font-body text-xs hover:border-terracotta hover:text-terracotta transition-colors"
      >
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
      <button
        onClick={handleNativeShare}
        className="sm:hidden px-3 py-1.5 rounded-full border border-ink/15 font-body text-xs hover:border-terracotta hover:text-terracotta transition-colors"
      >
        Share
      </button>
    </div>
  )
}
