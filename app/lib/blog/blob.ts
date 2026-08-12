import { put } from '@vercel/blob'

export async function uploadImage(file: File): Promise<string> {
  const ext = file.name.split('.').pop() || 'jpg'
  const pathname = `blog/${crypto.randomUUID()}.${ext}`
  const blob = await put(pathname, file, { access: 'public', contentType: file.type })
  return blob.url
}
