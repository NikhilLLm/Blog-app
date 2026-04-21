import { useAuth } from '../hooks/useAuth'
import { DashboardLayout } from '../components/Layout/DashboardLayout'

export function Dashboard() {
  const { user } = useAuth()
  const feedPosts = [
    {
      id: 1,
      author: 'Aarav',
      publication: 'In Product Writing',
      title: 'Designing Better React Dashboards',
      excerpt: '5 practical UI choices that instantly make your dashboard feel clean and premium.',
      date: 'Apr 18',
      readTime: '6 min read',
      claps: '1.1K',
      comments: 74,
    },
    {
      id: 2,
      author: 'Meera',
      publication: 'In Build Notes',
      title: 'How I Write Faster with Draft Workflows',
      excerpt: 'A simple draft-first publishing routine that helped me post consistently every week.',
      date: 'Apr 17',
      readTime: '4 min read',
      claps: '820',
      comments: 39,
    },
    {
      id: 3,
      author: 'Kabir',
      publication: 'In Engineering Log',
      title: 'Best Libraries for Blog Search in 2026',
      excerpt: 'Comparing lightweight search options for personal and team blogging platforms.',
      date: 'Apr 16',
      readTime: '8 min read',
      claps: '2.3K',
      comments: 108,
    },
  ]

  return (
    <DashboardLayout>
      <div>
        <h1 className="page-title">Welcome back, {user?.name || 'Writer'} 👋</h1>
        <p className="mt-1 text-[13.5px] text-[#475569]">Here&apos;s what&apos;s happening today</p>
      </div>

      <div className="mt-6 grid gap-4 rounded-xl bg-[#F8FAFC] p-4 md:grid-cols-3 md:p-5">
        <div>
          <div className="mb-3 h-0.75 w-14 rounded-full bg-[#6366F1]" />
          <p className="text-[11px] uppercase tracking-[0.07em] text-[#94A3B8]">Posts this month</p>
          <p className="font-display text-[28px] leading-none text-[#1E293B]">12</p>
          <p className="mt-1 text-[12px] text-[#16A34A]">+3 vs last month</p>
        </div>
        <div>
          <div className="mb-3 h-0.75 w-14 rounded-full bg-[#3B82F6]" />
          <p className="text-[11px] uppercase tracking-[0.07em] text-[#94A3B8]">Reads today</p>
          <p className="font-display text-[28px] leading-none text-[#1E293B]">286</p>
          <p className="mt-1 text-[12px] text-[#16A34A]">+12.8%</p>
        </div>
        <div>
          <div className="mb-3 h-0.75 w-14 rounded-full bg-[#8B5CF6]" />
          <p className="text-[11px] uppercase tracking-[0.07em] text-[#94A3B8]">New followers</p>
          <p className="font-display text-[28px] leading-none text-[#1E293B]">19</p>
          <p className="mt-1 text-[12px] text-[#16A34A]">+5 this week</p>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-[16px] font-medium text-[#1E293B]">Recent posts</h2>
        <button className="rounded-lg bg-[#6366F1] px-4.5 py-2.25 text-[13px] font-medium text-white transition-colors hover:bg-[#4F46E5] active:scale-[0.98]">
          New Post
        </button>
      </div>

      <section className="mt-4 rounded-xl border border-[#E2E8F0] bg-white">
        {feedPosts.map((post) => (
          <article key={post.id} className="group grid grid-cols-1 gap-4 p-5 transition-colors hover:bg-[#FAFBFF] md:grid-cols-[1fr_80px] md:items-start">
            <div>
              <div className="mb-3 flex items-center gap-2 text-[12px] text-[#94A3B8]">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EEF2FF] text-[11px] text-[#6366F1]">
                  {post.author.charAt(0)}
                </span>
                <span className="text-[13px] text-[#475569]">{post.author}</span>
                <span>·</span>
                <span>{post.publication}</span>
              </div>

              <h3 className="font-display text-[19px] leading-[1.35] text-[#0F172A]">{post.title}</h3>
              <p className="mt-2 max-w-3xl text-[13.5px] leading-[1.7] text-[#475569]">{post.excerpt}</p>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-[#94A3B8]">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
                <span>👏 {post.claps}</span>
                <span>💬 {post.comments}</span>
                <button className="text-[#475569] hover:text-[#6366F1]">Save</button>
                <button className="text-[#475569] hover:text-[#6366F1]">•••</button>
              </div>
            </div>

            <div className="h-20 w-20 rounded-md border border-[#E2E8F0] bg-[#F8FAFC]" aria-hidden />

            {post.id !== feedPosts.length && <div className="md:col-span-2 mt-5 border-b border-[#E2E8F0]" />}
          </article>
        ))}
      </section>
    </DashboardLayout>
  )
}
