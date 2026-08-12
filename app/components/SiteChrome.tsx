'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'

/**
 * The public Navbar is `fixed` + `z-50`, so it visually overlaps and
 * intercepts clicks on any UI rendered right at the top of the page below
 * it — including the admin panel's own nav bar. Admin routes get their own
 * chrome (app/admin/AdminNav.tsx), so skip the public Navbar/Footer there.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  if (isAdmin) return <main>{children}</main>

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
