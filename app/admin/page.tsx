import Link from 'next/link'
import { getAllPostsForAdmin } from '@/app/lib/blog/posts'
import AdminNav from './AdminNav'
import DeletePostButton from './posts/DeletePostButton'

export const dynamic = 'force-dynamic'

function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

export default async function AdminPostsPage() {
  const posts = await getAllPostsForAdmin()

  return (
    <>
      <AdminNav />
      <main className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="font-heading text-3xl text-ink mb-6">Posts</h1>

        {posts.length === 0 ? (
          <p className="font-body text-ink/50">
            No posts yet. <Link href="/admin/posts/new" className="text-terracotta hover:underline">Create your first one</Link>.
          </p>
        ) : (
          <div className="rounded-2xl border border-ink/10 bg-white overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-tint/30 text-left">
                <tr>
                  <th className="px-5 py-3 font-heading font-medium text-ink">Title</th>
                  <th className="px-5 py-3 font-heading font-medium text-ink">Category</th>
                  <th className="px-5 py-3 font-heading font-medium text-ink">Status</th>
                  <th className="px-5 py-3 font-heading font-medium text-ink">Updated</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => {
                  const isScheduled = post.status === 'published' && post.publishedDate > todayISO()
                  return (
                    <tr key={post.id} className="border-t border-ink/5">
                      <td className="px-5 py-3 font-body text-ink">{post.title}</td>
                      <td className="px-5 py-3 font-body text-ink/60">{post.category}</td>
                      <td className="px-5 py-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-body font-semibold ${
                            isScheduled
                              ? 'bg-amber-100 text-amber-700'
                              : post.status === 'published'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-tint/50 text-ink/60'
                          }`}
                        >
                          {isScheduled ? `scheduled for ${post.publishedDate}` : post.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 font-body text-ink/40 text-xs">{post.modifiedDate}</td>
                      <td className="px-5 py-3 text-right whitespace-nowrap">
                        <Link href={`/admin/posts/${post.id}/edit`} className="font-body text-xs text-terracotta hover:underline mr-4">
                          Edit
                        </Link>
                        <DeletePostButton id={post.id!} title={post.title} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  )
}
