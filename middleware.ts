import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_COOKIE, verifySessionToken } from '@/app/lib/admin/auth'

const PUBLIC_PATHS = ['/admin/login', '/api/admin/login']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value
  const valid = await verifySessionToken(token)

  if (!valid) {
    if (pathname.startsWith('/api/admin')) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }
    const loginUrl = new URL('/admin/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
