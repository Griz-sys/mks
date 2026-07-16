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
        terracotta: '#B84700',
        'terracotta-dark': '#8F3600',
        ink: '#2A2521',
        paper: '#FAF6F0',
        tint: '#E8C9A8',
        swiggy: '#FC8019',
        zomato: '#E23744',

        // legacy tokens kept so existing SEO subpages don't break
        'mk-orange': '#B84700',
        'mk-black': '#2A2521',
        'mk-charcoal': '#282521',
        'mk-white': '#FFFFFF',
        'mk-cream': '#FAF6F0',
      },
      fontFamily: {
        heading: ['var(--font-bebas)', 'sans-serif'],
        body: ['var(--font-nunito)', 'sans-serif'],
        hindi: ['var(--font-devanagari)', 'sans-serif'],
        // legacy aliases — old SEO subpages reference these font-* utilities
        poster: ['var(--font-bebas)', 'sans-serif'],
        display: ['var(--font-bebas)', 'sans-serif'],
        tagline: ['var(--font-nunito)', 'sans-serif'],
      },
      borderRadius: {
        xl: '1.5rem',
        '2xl': '2rem',
        '3xl': '2.5rem',
        '4xl': '3rem',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(36px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      animation: {
        marquee: 'marquee 26s linear infinite',
        'slide-up': 'slideUp 0.6s ease forwards',
        float: 'float 4.5s ease-in-out infinite',
        wiggle: 'wiggle 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
