import AdminNav from '@/app/admin/AdminNav'
import PostForm from '../PostForm'

export default function NewPostPage() {
  return (
    <>
      <AdminNav />
      <main className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="font-heading text-3xl text-ink mb-6">New Post</h1>
        <PostForm />
      </main>
    </>
  )
}
