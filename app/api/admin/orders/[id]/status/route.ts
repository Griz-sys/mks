import { NextResponse } from 'next/server'
import { ordersApi } from '@/app/lib/admin/orders-api'

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json().catch(() => null)
  const status = typeof body?.status === 'string' ? body.status : ''

  try {
    const res = await ordersApi(`/admin/orders/${encodeURIComponent(params.id)}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    })
    return NextResponse.json(res.body, { status: res.status })
  } catch (err) {
    return NextResponse.json({ message: (err as Error).message }, { status: 502 })
  }
}
