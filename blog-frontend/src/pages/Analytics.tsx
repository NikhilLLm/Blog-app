import { DashboardLayout } from '../components/Layout/DashboardLayout'

export function Analytics() {
  const storyViews = [
    { title: 'Getting Started with TypeScript', value: 482 },
    { title: 'Building Better UI Components', value: 314 },
    { title: 'Writing for Busy Developers', value: 229 },
    { title: 'How I Organize Ideas with Libraries', value: 196 },
  ]

  const weeklyViews = [42, 68, 55, 73, 49, 80, 64]
  const weeklyMax = Math.max(...weeklyViews)

  const topPosts = [
    { rank: 1, title: 'Getting Started with TypeScript', views: 482, readTime: '5m 32s', date: 'Apr 13, 2026' },
    { rank: 2, title: 'Building Better UI Components', views: 314, readTime: '4m 48s', date: 'Apr 10, 2026' },
    { rank: 3, title: 'How I Organize Ideas with Libraries', views: 196, readTime: '6m 10s', date: 'Apr 07, 2026' },
  ]

  return (
    <DashboardLayout>
      <div className="mb-7">
        <h1 className="page-title">Analytics</h1>
        <p className="mt-1 text-[13.5px] text-[#475569]">Track your content performance</p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-5">
          <div className="mb-3 h-0.75 w-full rounded-full bg-[#6366F1]" />
          <p className="text-[11px] uppercase tracking-[0.07em] text-[#94A3B8]">Total posts</p>
          <p className="mt-1 font-display text-[28px] leading-none text-[#1E293B]">24</p>
          <p className="mt-2 text-[12px] text-[#16A34A]">+4 this month</p>
        </div>

        <div className="rounded-xl border border-[#E2E8F0] bg-white p-5">
          <div className="mb-3 h-0.75 w-full rounded-full bg-[#3B82F6]" />
          <p className="text-[11px] uppercase tracking-[0.07em] text-[#94A3B8]">Total views</p>
          <p className="mt-1 font-display text-[28px] leading-none text-[#1E293B]">2,431</p>
          <p className="mt-2 text-[12px] text-[#16A34A]">+18% this month</p>
        </div>

        <div className="rounded-xl border border-[#E2E8F0] bg-white p-5">
          <div className="mb-3 h-0.75 w-full rounded-full bg-[#8B5CF6]" />
          <p className="text-[11px] uppercase tracking-[0.07em] text-[#94A3B8]">Followers</p>
          <p className="mt-1 font-display text-[28px] leading-none text-[#1E293B]">386</p>
          <p className="mt-2 text-[12px] text-[#16A34A]">+29 new followers</p>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <section className="rounded-xl border border-[#E2E8F0] bg-white p-5">
          <h2 className="mb-4 text-[16px] font-medium text-[#1E293B]">Views by post</h2>
          <div className="space-y-4">
            {storyViews.map((item) => (
              <div key={item.title}>
                <div className="mb-1 flex items-center justify-between gap-3">
                  <p className="truncate text-[13px] text-[#475569]">{item.title}</p>
                  <span className="text-[12px] text-[#334155]">{item.value}</span>
                </div>
                <div className="h-2 rounded-md bg-[#EEF2FF]">
                  <div
                    className="h-2 rounded-md bg-linear-to-r from-[#6366F1] to-[#60A5FA]"
                    style={{ width: `${(item.value / storyViews[0].value) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-[#E2E8F0] bg-white p-5">
          <h2 className="mb-4 text-[16px] font-medium text-[#1E293B]">Weekly views</h2>
          <div className="flex h-44 items-end gap-3">
            {weeklyViews.map((value, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-md bg-[#EEF2FF]" style={{ height: `${(value / weeklyMax) * 128}px` }}>
                  <div className="h-full w-full rounded-md bg-linear-to-r from-[#6366F1] to-[#60A5FA]" />
                </div>
                <span className="text-[11px] text-[#94A3B8]">D{index + 1}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-xl border border-[#E2E8F0] bg-white">
        <div className="border-b border-[#E2E8F0] px-5 py-4">
          <h2 className="text-[16px] font-medium text-[#1E293B]">Top posts performance</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead className="bg-[#F8FAFC]">
              <tr>
                <th className="w-[10%] px-5 py-3 text-left text-[11px] font-medium uppercase tracking-[0.07em] text-[#94A3B8]">Rank</th>
                <th className="w-[38%] px-5 py-3 text-left text-[11px] font-medium uppercase tracking-[0.07em] text-[#94A3B8]">Title</th>
                <th className="w-[16%] px-5 py-3 text-left text-[11px] font-medium uppercase tracking-[0.07em] text-[#94A3B8]">Views</th>
                <th className="w-[18%] px-5 py-3 text-left text-[11px] font-medium uppercase tracking-[0.07em] text-[#94A3B8]">Avg read time</th>
                <th className="w-[18%] px-5 py-3 text-left text-[11px] font-medium uppercase tracking-[0.07em] text-[#94A3B8]">Published date</th>
              </tr>
            </thead>
            <tbody>
              {topPosts.map((post) => (
                <tr key={post.title} className="border-t border-[#F1F5F9] hover:bg-[#FAFBFF]">
                  <td className="px-5 py-4 align-top">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#6366F1] text-[12px] text-white">
                      {post.rank}
                    </span>
                  </td>
                  <td className="px-5 py-4 align-top text-[14px] text-[#1E293B]">{post.title}</td>
                  <td className="px-5 py-4 align-top text-[13px] text-[#475569]">{post.views}</td>
                  <td className="px-5 py-4 align-top text-[13px] text-[#475569]">{post.readTime}</td>
                  <td className="px-5 py-4 align-top text-[12px] text-[#94A3B8]">{post.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </DashboardLayout>
  )
}
