import type { Metadata } from 'next'
import AdminNav from '../AdminNav'
import OrdersBoard from './OrdersBoard'

export const metadata: Metadata = {
  title: "Orders · MK's Admin",
}

export default function AdminOrdersPage() {
  return (
    <>
      <AdminNav />
      {/* Orders page uses a neutral system font (not the brand fonts) for a tool-like feel. */}
      <main className="admin-plain max-w-7xl mx-auto px-4 sm:px-6 py-8 font-sans antialiased tabular-nums">
        <OrdersBoard />
      </main>
    </>
  )
}
