import { notFound } from 'next/navigation'
import AdminNav from '@/app/admin/AdminNav'
import { getPostForEdit } from '@/app/lib/blog/posts'
import PostForm from '../../PostForm'

export const dynamic = 'force-dynamic'

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const post = await getPostForEdit(Number(params.id))
  if (!post) notFound()

  return (
    <>
      <AdminNav />
      <main className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="font-heading text-3xl text-ink mb-6">Edit Post</h1>
        <PostForm initial={post} postId={post.id} />
      </main>
    </>
  )
}
