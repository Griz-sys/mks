import { NextResponse } from 'next/server'
import { uploadImage } from '@/app/lib/blog/blob'

export async function POST(request: Request) {
  const formData = await request.formData().catch(() => null)
  const file = formData?.get('file')

  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: 'No file provided' }, { status: 400 })
  }
  if (!file.type.startsWith('image/')) {
    return NextResponse.json({ ok: false, error: 'File must be an image' }, { status: 400 })
  }

  try {
    const url = await uploadImage(file)
    return NextResponse.json({ ok: true, url })
  } catch (error) {
    console.error('[admin/upload]', error)
    return NextResponse.json({ ok: false, error: 'Upload failed' }, { status: 500 })
  }
}
