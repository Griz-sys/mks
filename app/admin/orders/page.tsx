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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <OrdersBoard />
      </main>
    </>
  )
}
