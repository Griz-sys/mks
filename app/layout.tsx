import type { Metadata, Viewport } from 'next'
import { Bebas_Neue, Nunito, Noto_Sans_Devanagari } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const bebas = Bebas_Neue({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})
const nunito = Nunito({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
})
const devanagari = Noto_Sans_Devanagari({
  weight: ['400', '700'],
  subsets: ['devanagari'],
  variable: '--font-devanagari',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mkstandoori.com'),
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  title: {
    template: "%s | MK's Tandoori Chicken — Sector 75, Noida",
    default: "MK's Tandoori Chicken — Real Roasted | Sector 75, Noida",
  },
  description:
    "MK's Tandoori Chicken — roasted, not fried. Rolls, tikka, soya chaap & more from Spectrum Metro Mall, Sector 75, Noida. Order on Swiggy or Zomato.",
  keywords: [
    'tandoori chicken noida', 'mk\'s tandoori chicken', 'chicken roll sector 75',
    'best restaurant noida sector 75', 'soya chaap noida', 'spectrum metro mall food',
  ],
  openGraph: {
    type: 'website', locale: 'en_IN', siteName: "MK's Tandoori Chicken",
    title: "MK's Tandoori Chicken — Real Roasted",
    description: "It's roasted, not fried. Bite it, love it. Sector 75, Noida.",
    images: [
      {
        url: 'https://mkstandoori.com/mascot-badge.png',
        alt: "MK's mascot badge — MK's Tandoori Chicken",
        width: 1200,
        height: 630,
      },
    ],
  },
  robots: { index: true, follow: true },
  authors: [{ name: "MK's Tandoori Chicken" }],
  twitter: {
    card: 'summary_large_image',
    title: "MK's Tandoori Chicken — Real Roasted",
    description: "It's roasted, not fried. Bite it, love it. Sector 75, Noida.",
    images: ['https://mkstandoori.com/mascot-badge.png'],
  },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bebas.variable} ${nunito.variable} ${devanagari.variable}`}
    >
      <body className="font-body bg-paper text-ink antialiased overflow-x-hidden">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
