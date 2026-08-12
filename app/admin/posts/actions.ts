'use server'

import { revalidatePath } from 'next/cache'
import { postInputSchema } from '@/app/lib/blog/validation'
import { savePostRecord, deletePostRecord, getPostById, slugify } from '@/app/lib/blog/posts'

type ActionResult =
  | { ok: true; slug: string }
  | { ok: false; errors: Record<string, string[] | undefined> }

function revalidateForPost(post: { slug: string; category: string; tags: string[]; author: string }) {
  revalidatePath('/blog')
  revalidatePath(`/blog/${post.slug}`)
  revalidatePath(`/blog/category/${slugify(post.category)}`)
  for (const tag of post.tags) revalidatePath(`/blog/tag/${slugify(tag)}`)
  revalidatePath(`/blog/author/${slugify(post.author)}`)
  revalidatePath('/sitemap.xml')
}

export async function savePost(input: unknown, existingId?: number): Promise<ActionResult> {
  const parsed = postInputSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors }
  }

  try {
    const post = await savePostRecord(parsed.data, existingId)
    revalidateForPost(post)
    return { ok: true, slug: post.slug }
  } catch (error: unknown) {
    const code = (error as { code?: string })?.code
    if (code === '23505') {
      return { ok: false, errors: { slug: ['That slug is already in use — choose another.'] } }
    }
    console.error('[savePost]', error)
    return { ok: false, errors: { _form: ['Something went wrong saving the post. Please try again.'] } }
  }
}

export async function deletePost(id: number): Promise<{ ok: true }> {
  const post = await getPostById(id)
  await deletePostRecord(id)
  if (post) revalidateForPost(post as { slug: string; category: string; tags: string[]; author: string })
  return { ok: true }
}
