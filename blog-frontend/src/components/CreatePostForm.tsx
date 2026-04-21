import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPost, publishPost } from '../services/api'

interface CreatePostFormProps {
  isOpen: boolean
  onClose: () => void
}

export function CreatePostForm({ isOpen, onClose }: CreatePostFormProps) {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Reset form when modal closes
  const handleClose = () => {
    setTitle('')
    setContent('')
    setDescription('')
    setError(null)
    onClose()
  }

  // Save as Draft
  const handleSaveDraft = async () => {
    // Validation
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required')
      return
    }

    if (title.trim().length < 3) {
      setError('Title must be at least 3 characters')
      return
    }

    if (content.trim().length < 20) {
      setError('Content must be at least 20 characters')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await createPost({
        title: title.trim(),
        content: content.trim(),
        description: description.trim() || undefined,
      })

      // Success - clear form and redirect
      handleClose()
      navigate('/home/posts')
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.errors?.title?.[0] ||
        'Failed to save post'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  // Publish Post
  const handlePublish = async () => {
    // Validation
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required')
      return
    }

    if (title.trim().length < 3) {
      setError('Title must be at least 3 characters')
      return
    }

    if (content.trim().length < 20) {
      setError('Content must be at least 20 characters')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Step 1: Create the post
      const response = await createPost({
        title: title.trim(),
        content: content.trim(),
        description: description.trim() || undefined,
      })

      const postId = response.post.id

      // Step 2: Publish it
      await publishPost(postId)

      // Success - clear form and redirect
      handleClose()
      navigate('/home/posts')
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.errors?.title?.[0] ||
        'Failed to publish post'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Modal */}
      <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-lg">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between border-b border-[#E2E8F0] pb-4">
          <h2 className="text-[20px] font-semibold text-[#1E293B]">Create New Post</h2>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="text-[#94A3B8] hover:text-[#1E293B] disabled:opacity-50"
          >
            ✕
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 rounded-lg bg-[#FEE2E2] p-3 text-[13px] text-[#DC2626]">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="space-y-4">
          {/* Title Input */}
          <div>
            <label className="mb-2 block text-[12px] font-medium uppercase tracking-[0.05em] text-[#475569]">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title..."
              disabled={isLoading}
              className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2.5 text-[14px] focus:border-[#6366F1] focus:outline-none focus:ring-1 focus:ring-[#6366F1] disabled:opacity-50"
            />
            <p className="mt-1 text-[11px] text-[#94A3B8]">
              {title.length}/150 • Min 3 characters
            </p>
          </div>

          {/* Description Input */}
          <div>
            <label className="mb-2 block text-[12px] font-medium uppercase tracking-[0.05em] text-[#475569]">
              Description (Optional)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of your post..."
              disabled={isLoading}
              className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2.5 text-[14px] focus:border-[#6366F1] focus:outline-none focus:ring-1 focus:ring-[#6366F1] disabled:opacity-50"
            />
            <p className="mt-1 text-[11px] text-[#94A3B8]">
              {description.length}/300
            </p>
          </div>

          {/* Content Input */}
          <div>
            <label className="mb-2 block text-[12px] font-medium uppercase tracking-[0.05em] text-[#475569]">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content here..."
              disabled={isLoading}
              rows={8}
              className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2.5 text-[14px] font-mono focus:border-[#6366F1] focus:outline-none focus:ring-1 focus:ring-[#6366F1] disabled:opacity-50"
            />
            <p className="mt-1 text-[11px] text-[#94A3B8]">
              {content.length}/Unlimited • Min 20 characters
            </p>
          </div>
        </div>

        {/* Footer - Buttons */}
        <div className="mt-6 flex gap-3 border-t border-[#E2E8F0] pt-4">
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="flex-1 rounded-lg border border-[#E2E8F0] px-4 py-2.5 text-[14px] font-medium text-[#475569] transition-colors hover:bg-[#F8FAFC] disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleSaveDraft}
            disabled={isLoading}
            className="flex-1 rounded-lg bg-[#F3F4F6] px-4 py-2.5 text-[14px] font-medium text-[#475569] transition-colors hover:bg-[#E5E7EB] disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save Draft'}
          </button>

          <button
            onClick={handlePublish}
            disabled={isLoading}
            className="flex-1 rounded-lg bg-[#6366F1] px-4 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#4F46E5] active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </div>
    </div>
  )
}
