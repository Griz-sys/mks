import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { getRawPost } from './posts'
import { mdxComponents } from '@/app/components/blog/mdx-components'
import type { PostFrontmatter } from './types'

export async function renderPost(slug: string) {
  const post = await getRawPost(slug)
  if (!post) return undefined
  const { frontmatter, content } = post

  const { content: rendered } = await compileMDX<PostFrontmatter>({
    source: content,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap', properties: { className: ['heading-anchor'] } }],
        ],
      },
    },
  })

  return { content: rendered, frontmatter }
}
