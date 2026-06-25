import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'mk-orange': '#FF9A00',
        'mk-black': '#000000',
        'mk-charcoal': '#282521',
        'mk-white': '#FFFFFF',
        'mk-cream': '#F5EDD8',
      },
      fontFamily: {
        poster:  ['var(--font-bebas)', 'Impact', 'sans-serif'],
        hindi:   ['var(--font-devanagari)', 'sans-serif'],
        display: ['var(--font-bagel)', 'serif'],
        tagline: ['var(--font-belanosima)', 'sans-serif'],
        body:    ['var(--font-nunito)', 'sans-serif'],
      },
      letterSpacing: {
        'ultra': '0.25em',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(36px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        'slide-up': 'slideUp 0.6s ease forwards',
      },
    },
  },
  plugins: [],
}

export default config
