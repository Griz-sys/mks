import Image from 'next/image'
import Link from 'next/link'
import type { AnchorHTMLAttributes, ImgHTMLAttributes } from 'react'
import CtaBlock from './CtaBlock'

function Figure({ src, alt = '', title }: ImgHTMLAttributes<HTMLImageElement>) {
  if (!src) return null
  return (
    <figure className="my-8">
      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl bg-tint/40">
        <Image
          src={src}
          alt={alt}
          title={title}
          fill
          sizes="(max-width: 768px) 100vw, 720px"
          className="object-cover"
          loading="lazy"
        />
      </div>
      {title && (
        <figcaption className="mt-2 text-center font-body text-sm text-ink/50">{title}</figcaption>
      )}
    </figure>
  )
}

function SmartLink({ href = '', children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isInternal = href.startsWith('/') || href.startsWith('#')
  if (isInternal) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  )
}

export const mdxComponents = {
  img: Figure,
  a: SmartLink,
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-ink/10">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-tint/40 text-ink" {...props} />
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-4 py-3 text-left font-heading font-medium" {...props} />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-3 border-t border-ink/10 align-top" {...props} />
  ),
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-terracotta bg-tint/20 px-5 py-3 my-6 italic text-ink/80 rounded-r-lg" {...props} />
  ),
  Cta: CtaBlock,
}
