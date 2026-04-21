import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

interface HeaderProps {
  onMenuClick?: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-20 border-b border-[#E2E8F0] bg-white">
      <div className="mx-auto flex h-14 max-w-7xl items-center px-4 md:px-6">
        <div className="flex items-center gap-3">
          <button
            className="flex h-8.5 w-8.5 items-center justify-center rounded-lg bg-[#F0F4FF] text-[#475569]"
            onClick={onMenuClick}
            aria-label="Toggle sidebar"
          >
            ☰
          </button>

          <button onClick={() => navigate('/home')} className="flex items-center gap-1">
            <span className="font-display text-xl text-[#1E293B]">Blog</span>
            <span className="font-display text-xl text-[#6366F1]">Hub</span>
          </button>
        </div>

        <div className="mx-6 hidden flex-1 justify-center md:flex">
          <div className="relative w-full max-w-[320px]">
            <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3-3" />
            </svg>
            <input
              type="text"
              placeholder="Search posts..."
              className="focus-ring h-9.5 w-full rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-10 text-[13px] text-[#1E293B] placeholder:text-[#94A3B8]"
            />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3 relative">
          <button
            onClick={() => navigate('/home/posts')}
            className="hidden rounded-lg bg-[#6366F1] px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-[#4F46E5] active:scale-[0.98] md:block"
          >
            Create
          </button>

          <button className="relative flex h-8 w-8 items-center justify-center rounded-lg text-[#475569] hover:bg-[#F8FAFC]">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.3 20h3.4" />
              <path d="M4 18h16l-1.4-1.4a2 2 0 0 1-.6-1.4V10a6 6 0 1 0-12 0v5.2a2 2 0 0 1-.6 1.4z" />
            </svg>
          </button>

          <span className="hidden text-[12px] text-[#475569] sm:inline">{user?.name}</span>

          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-[#6366F1] to-[#3B82F6] text-[13px] font-medium text-white"
          >
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-[#E2E8F0] bg-white py-2">
              <div className="border-b border-[#E2E8F0] px-4 py-3">
                <p className="text-[13px] font-medium text-[#1E293B]">{user?.name}</p>
                <p className="mt-1 text-[12px] text-[#94A3B8]">{user?.email}</p>
              </div>
              <button onClick={() => { setShowUserMenu(false); navigate('/home') }} className="w-full px-4 py-2 text-left text-[13px] text-[#475569] hover:bg-[#F8FAFC]">Profile</button>
              <button onClick={() => { setShowUserMenu(false); navigate('/home') }} className="w-full px-4 py-2 text-left text-[13px] text-[#475569] hover:bg-[#F8FAFC]">Settings</button>
              <button onClick={() => { setShowUserMenu(false); handleLogout() }} className="w-full px-4 py-2 text-left text-[13px] text-[#EF4444] hover:bg-[#F8FAFC]">Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
