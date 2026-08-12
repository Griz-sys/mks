'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { deletePost } from './actions'

export default function DeletePostButton({ id, title }: { id: number; title: string }) {
  const router = useRouter()
  const [pending, setPending] = useState(false)

  async function handleDelete() {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    setPending(true)
    await deletePost(id)
    router.refresh()
  }

  return (
    <button
      onClick={handleDelete}
      disabled={pending}
      className="font-body text-xs text-red-600 hover:underline disabled:opacity-50"
    >
      {pending ? 'Deleting…' : 'Delete'}
    </button>
  )
}
