import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Dynamic imports so DATABASE_URL is loaded (above) before app/lib/db.ts reads
// it at module scope — static imports are hoisted before this file's own
// top-level code under ESM semantics, which would run too early otherwise.
async function main() {
  const { savePostRecord } = await import('../app/lib/blog/posts')
  const { postInputSchema } = await import('../app/lib/blog/validation')

  const filePath = path.join(process.cwd(), 'content/blog/best-tandoori-chicken-noida.mdx')
  const file = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(file)

  const input = postInputSchema.parse({ ...data, body: content, status: 'published' })
  const post = await savePostRecord(input)
  console.log(`Seeded post "${post.title}" as /blog/${post.slug} (id ${post.id})`)
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
