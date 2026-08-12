import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "MK's Admin",
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="bg-paper min-h-screen">{children}</div>
}
