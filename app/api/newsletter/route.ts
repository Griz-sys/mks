import { NextResponse } from 'next/server'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const email = typeof body?.email === 'string' ? body.email.trim() : ''

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'Invalid email address' }, { status: 400 })
  }

  // TODO: wire this up to a real email service provider (Mailchimp, Brevo, etc.)
  // before relying on it — right now submissions are accepted but not stored anywhere.
  console.log('[newsletter] subscribe request:', email)

  return NextResponse.json({ ok: true })
}
