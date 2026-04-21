import { useState, useEffect } from 'react'
import { DashboardLayout } from '../components/Layout/DashboardLayout'
import { CreatePostForm } from '../components/CreatePostForm'
import { getMyPosts, type Post } from '../services/api'

type TabType = 'drafts' | 'published' | 'scheduled'

export function Posts() {
  const [activeTab, setActiveTab] = useState<TabType>('drafts')
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch user's posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await getMyPosts()
        setPosts(data.posts)
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || 'Failed to load posts'
        setError(errorMessage)
        console.error('Error fetching posts:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  // Filter posts by status
  const draftPosts = posts.filter(p => p.status === 'DRAFT')
  const publishedPosts = posts.filter(p => p.status === 'PUBLISHED')

  // Format date helper
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  // Get active posts based on tab
  const getActivePosts = () => {
    if (activeTab === 'drafts') return draftPosts
    if (activeTab === 'published') return publishedPosts
    return [] // scheduled not implemented
  }

  const activePosts = getActivePosts()

  const tabs: Array<{ key: TabType; label: string }> = [
    { key: 'drafts', label: 'Drafts' },
    { key: 'published', label: 'Published' },
    { key: 'scheduled', label: 'Scheduled' },
  ]

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="page-title">Posts</h1>
        <p className="mt-1 text-[13.5px] text-[#475569]">Write, edit, and publish</p>
      </div>

      <div className="mb-4 flex items-end justify-between border-b border-[#E2E8F0]">
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-3 text-[14px] ${
                activeTab === tab.key
                  ? 'border-b-2 border-[#6366F1] text-[#1E293B]'
                  : 'text-[#94A3B8]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button 
          onClick={() => setIsCreateFormOpen(true)}
          className="mb-2 rounded-lg bg-[#6366F1] px-4.5 py-2.25 text-[13px] font-medium text-white transition-colors hover:bg-[#4F46E5] active:scale-[0.98]">
          Create Post
        </button>
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-4 rounded-lg bg-[#FEE2E2] p-4 text-[13px] text-[#DC2626]">
          Error: {error}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-8 text-center text-[#94A3B8]">
          Loading posts...
        </div>
      )}

      {/* Empty State */}
      {!isLoading && activePosts.length === 0 && (
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-12 text-center">
          <p className="text-[16px] font-medium text-[#1E293B]">
            {activeTab === 'drafts' ? '📝 No drafts yet' : '✨ No published posts yet'}
          </p>
          <p className="mt-2 text-[14px] text-[#475569]">
            {activeTab === 'drafts' 
              ? 'Create your first post and save it as a draft to get started.'
              : 'Publish your first post to share your thoughts with the world.'}
          </p>
          <button 
            onClick={() => setIsCreateFormOpen(true)}
            className="mt-4 rounded-lg bg-[#6366F1] px-6 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#4F46E5]">
            Create Your First Post
          </button>
        </div>
      )}

      {/* Posts Table */}
      {!isLoading && activePosts.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-[#E2E8F0] bg-white">
          <table className="w-full table-fixed">
            <thead className="bg-[#F8FAFC]">
              <tr>
                <th className="w-[45%] px-5 py-3 text-left text-[11px] font-medium uppercase tracking-[0.07em] text-[#94A3B8]">Title</th>
                <th className="w-[20%] px-5 py-3 text-left text-[11px] font-medium uppercase tracking-[0.07em] text-[#94A3B8]">Status</th>
                <th className="w-[20%] px-5 py-3 text-left text-[11px] font-medium uppercase tracking-[0.07em] text-[#94A3B8]">Date</th>
                <th className="w-[15%] px-5 py-3 text-left text-[11px] font-medium uppercase tracking-[0.07em] text-[#94A3B8]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activePosts.map((post) => (
                <tr key={post.id} className="border-t border-[#F1F5F9] hover:bg-[#FAFBFF]">
                  <td className="px-5 py-4 align-top">
                    <p className="text-[14px] font-normal text-[#1E293B]">{post.title}</p>
                    <p className="mt-1 text-[13.5px] leading-[1.65] text-[#475569]">
                      {post.description || 'No description'}
                    </p>
                  </td>
                  <td className="px-5 py-4 align-top">
                    <span className={`inline-flex rounded-full px-2.5 py-0.75 text-[11.5px] font-medium ${
                      post.status === 'PUBLISHED' 
                        ? 'bg-[#F0FDF4] text-[#16A34A]'
                        : 'bg-[#FFFBEB] text-[#D97706]'
                    }`}>
                      {post.status === 'DRAFT' ? 'Draft' : 'Published'}
                    </span>
                  </td>
                  <td className="px-5 py-4 align-top text-[12px] text-[#94A3B8]">
                    {formatDate(post.createdAt)}
                  </td>
                  <td className="px-5 py-4 align-top">
                    <div className="flex gap-4 text-[13px]">
                      <button className="text-[#6366F1] hover:text-[#4F46E5]">Edit</button>
                      <button className="text-[#EF4444] hover:text-[#EF4444]">Delete</button>
                      <button className="text-[#475569] hover:text-[#6366F1]">View</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create Post Form Modal */}
      <CreatePostForm 
        isOpen={isCreateFormOpen} 
        onClose={() => setIsCreateFormOpen(false)} 
      />
    </DashboardLayout>
  )
}
