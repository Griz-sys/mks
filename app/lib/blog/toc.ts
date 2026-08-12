import GithubSlugger from 'github-slugger'
import type { TocItem } from './types'

const HEADING_RE = /^(#{1,6})\s+(.+?)\s*$/

function stripMarkdownInline(text: string): string {
  return text
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .trim()
}

/**
 * Extracts headings from raw markdown/MDX in document order and slugs them
 * with the same github-slugger algorithm rehype-slug uses, so TOC hrefs
 * match the ids actually rendered on the compiled heading elements.
 */
export function extractHeadings(raw: string): TocItem[] {
  const slugger = new GithubSlugger()
  const lines = raw.split('\n')
  const all: TocItem[] = []
  let inCodeFence = false

  for (const line of lines) {
    if (/^```/.test(line.trim())) {
      inCodeFence = !inCodeFence
      continue
    }
    if (inCodeFence) continue

    const match = HEADING_RE.exec(line)
    if (!match) continue

    const depth = match[1].length
    const text = stripMarkdownInline(match[2])
    const id = slugger.slug(text)
    all.push({ id, text, depth })
  }

  // TOC only surfaces h2/h3 — h1 is the page title, h4+ is too granular.
  return all.filter((h) => h.depth === 2 || h.depth === 3)
}
