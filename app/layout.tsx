import type { Metadata } from 'next'
import {
  Bagel_Fat_One,
  Belanosima,
  Nunito,
  Bebas_Neue,
  Noto_Sans_Devanagari,
} from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const bagelFatOne = Bagel_Fat_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bagel',
  display: 'swap',
})
const belanosima = Belanosima({
  weight: ['400', '600'],
  subsets: ['latin'],
  variable: '--font-belanosima',
  display: 'swap',
})
const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
})
const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})
const devanagari = Noto_Sans_Devanagari({
  weight: ['400', '700'],
  subsets: ['devanagari'],
  variable: '--font-devanagari',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mkstandoori.in'),
  title: {
    template: "%s | MK's — Tandoori Chicken Noida Sector 75",
    default: "MK's — Best Tandoori Chicken in Noida Sector 75 | It's Roasted, Not Fried",
  },
  description:
    "MK's serves authentic tandoori chicken in Noida Sector 75. Roasted in a clay tandoor at 450°C — not fried. Spectrum Mall, Sector 50, Noida. Call +91 77973 39211.",
  keywords: [
    'tandoori chicken noida', 'chicken restaurant sector 75 noida',
    'best restaurant noida sector 75', "MK's restaurant noida",
    'chicken biryani noida', 'family restaurant sector 75',
  ],
  openGraph: {
    type: 'website', locale: 'en_IN', siteName: "MK's",
    title: "MK's — Best Tandoori Chicken in Noida Sector 75",
    description: "Authentic tandoori chicken. Roasted, not fried. Noida Sector 75.",
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bagelFatOne.variable} ${belanosima.variable} ${nunito.variable} ${bebasNeue.variable} ${devanagari.variable}`}
    >
      <body className="font-body bg-mk-black text-white antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
