import { NextResponse } from 'next/server'
import { createSessionToken, verifyPassword, SESSION_COOKIE } from '@/app/lib/admin/auth'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const password = typeof body?.password === 'string' ? body.password : ''

  if (!password || !verifyPassword(password)) {
    return NextResponse.json({ ok: false, error: 'Incorrect password' }, { status: 401 })
  }

  const token = await createSessionToken()
  const res = NextResponse.json({ ok: true })
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
  return res
}
