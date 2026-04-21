import { DashboardLayout } from '../components/Layout/DashboardLayout'

export function Library() {
  const collections = [
    { name: 'Reading list', posts: 12, description: 'Long-form posts to read this week.' },
    { name: 'Design references', posts: 8, description: 'UI examples, layout ideas, and writing inspiration.' },
    { name: 'Backend notes', posts: 6, description: 'Architecture posts and API implementation notes.' },
  ]

  const savedPosts = [
    { title: 'The Single Most Prevalent AI Writing Tell', collection: 'Reading list', date: 'Saved Apr 17, 2026' },
    { title: 'Palantir CEO Says Only Two Types Will Survive AI', collection: 'Design references', date: 'Saved Apr 15, 2026' },
    { title: 'AI Killed My Writing Career. Long Live AI.', collection: 'Backend notes', date: 'Saved Apr 13, 2026' },
  ]

  const hasCollections = collections.length > 0

  return (
    <DashboardLayout>
      <div className="mb-7">
        <h1 className="page-title">Library</h1>
        <p className="mt-1 text-[13.5px] text-[#475569]">Your saved posts and collections</p>
      </div>

      {!hasCollections && (
        <section className="mb-8 rounded-xl bg-[#EEF2FF] p-6">
          <div className="flex items-center justify-between gap-6">
            <div>
              <h2 className="text-[16px] font-medium text-[#1E293B]">Create a list to easily organize and save stories</h2>
              <button className="mt-4 rounded-full bg-[#0F172A] px-4 py-2 text-[13px] font-medium text-white">Start a list</button>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[18px] text-[#6366F1]">
              🔖
            </div>
          </div>
        </section>
      )}

      <section className="mb-8">
        <h2 className="mb-4 text-[16px] font-medium text-[#1E293B]">Collections</h2>
        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 xl:grid-cols-3">
          {collections.map((collection) => (
            <article key={collection.name} className="rounded-xl border border-[#E2E8F0] bg-white p-4.5 transition-colors hover:border-[#6366F1]">
              <div className="mb-3 flex h-9.5 w-9.5 items-center justify-center rounded-lg bg-[#F8FAFC] text-[16px]">
                📚
              </div>
              <h3 className="text-[14px] font-medium text-[#1E293B]">{collection.name}</h3>
              <p className="mt-2 text-[13.5px] leading-[1.65] text-[#475569]">{collection.description}</p>
              <p className="mt-3 text-[12px] text-[#94A3B8]">{collection.posts} posts</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-[16px] font-medium text-[#1E293B]">Saved posts</h2>
        <div className="overflow-hidden rounded-xl border border-[#E2E8F0] bg-white">
          <table className="w-full table-fixed">
            <thead className="bg-[#F8FAFC]">
              <tr>
                <th className="w-[46%] px-5 py-3 text-left text-[11px] font-medium uppercase tracking-[0.07em] text-[#94A3B8]">Title</th>
                <th className="w-[22%] px-5 py-3 text-left text-[11px] font-medium uppercase tracking-[0.07em] text-[#94A3B8]">Collection</th>
                <th className="w-[20%] px-5 py-3 text-left text-[11px] font-medium uppercase tracking-[0.07em] text-[#94A3B8]">Saved date</th>
                <th className="w-[12%] px-5 py-3 text-left text-[11px] font-medium uppercase tracking-[0.07em] text-[#94A3B8]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {savedPosts.map((post) => (
                <tr key={post.title} className="border-t border-[#F1F5F9] hover:bg-[#FAFBFF]">
                  <td className="px-5 py-4 text-[14px] text-[#1E293B]">{post.title}</td>
                  <td className="px-5 py-4 text-[13px] text-[#475569]">{post.collection}</td>
                  <td className="px-5 py-4 text-[12px] text-[#94A3B8]">{post.date}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-4 text-[13px]">
                      <button className="text-[#6366F1] hover:text-[#4F46E5]">View</button>
                      <button className="text-[#EF4444] hover:text-[#EF4444]">Remove</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </DashboardLayout>
  )
}
