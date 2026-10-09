// Server-only client for the MKs ordering API (the NestJS server in MKs-App).
// ORDERS_API_KEY must never reach the browser — only import this from route handlers.

export type OrderStatus =
  | 'SCHEDULED'
  | 'PUSHED_TO_POS'
  | 'PREPARING'
  | 'READY'
  | 'COMPLETED'
  | 'CANCELLED'

export type AdminOrderItem = {
  id: string
  quantity: number
  unitPrice: string
  selectedVariations: { name: string }[] | null
  selectedAddons: { name: string }[] | null
  menuItem: { name: string }
}

export type AdminOrder = {
  id: string
  status: OrderStatus
  scheduledFor: string
  prepBufferMinutes: number
  totalAmount: string
  createdAt: string
  updatedAt: string
  user: { name: string | null; phone: string }
  items: AdminOrderItem[]
  payment: { status: string } | null
}

function config() {
  const url = process.env.ORDERS_API_URL
  const key = process.env.ORDERS_API_KEY
  if (!url || !key) throw new Error('ORDERS_API_URL and ORDERS_API_KEY must be set')
  return { url: url.replace(/\/+$/, ''), key }
}

/** Calls the ordering API and returns its status + JSON body unchanged. */
export async function ordersApi(path: string, init: RequestInit = {}) {
  const { url, key } = config()
  const res = await fetch(`${url}${path}`, {
    ...init,
    cache: 'no-store',
    headers: { 'content-type': 'application/json', 'x-admin-key': key, ...init.headers },
  })
  const body = await res.json().catch(() => ({ message: res.statusText }))
  return { status: res.status, body }
}
