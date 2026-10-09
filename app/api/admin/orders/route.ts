import { NextResponse } from 'next/server'
import { ordersApi } from '@/app/lib/admin/orders-api'

export const dynamic = 'force-dynamic'

// Protected by middleware (/api/admin/*). Proxies to the ordering API so the API key stays server-side.
export async function GET(request: Request) {
  const view = new URL(request.url).searchParams.get('view') === 'history' ? 'history' : 'active'
  try {
    const { status, body } = await ordersApi(`/admin/orders?view=${view}`)
    return NextResponse.json(body, { status })
  } catch (err) {
    return NextResponse.json({ message: (err as Error).message }, { status: 502 })
  }
}
