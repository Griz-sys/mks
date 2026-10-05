import Link from 'next/link'

type Variant = 'primary' | 'swiggy' | 'zomato' | 'outline' | 'dark'

const variantClasses: Record<Variant, string> = {
  primary: 'bg-ink text-paper hover:bg-terracotta shadow-lg shadow-ink/20',
  swiggy: 'bg-swiggy text-white hover:brightness-95 shadow-lg shadow-swiggy/30',
  zomato: 'bg-zomato text-white hover:brightness-95 shadow-lg shadow-zomato/30',
  outline: 'bg-transparent text-ink border-2 border-ink/70 hover:bg-ink hover:text-paper',
  dark: 'bg-ink text-paper hover:bg-ink/90 shadow-lg shadow-ink/20',
}

export default function PillButton({
  href,
  variant = 'primary',
  children,
  className = '',
  onClick,
  size = 'md',
}: {
  href?: string
  variant?: Variant
  children: React.ReactNode
  className?: string
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg'
}) {
  const sizeClasses = {
    sm: 'text-xs px-4 py-2',
    md: 'text-sm md:text-base px-6 py-3 md:px-7 md:py-3.5',
    lg: 'text-base md:text-lg px-8 py-4',
  }[size]

  const classes = `pill-press inline-flex items-center justify-center gap-2 rounded-full font-heading tracking-wide ${sizeClasses} ${variantClasses[variant]} ${className}`

  if (!href) {
    return (
      <button onClick={onClick} className={classes}>
        {children}
      </button>
    )
  }

  const isExternal = href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')

  if (isExternal) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={classes}
        onClick={onClick}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  )
}
