import { useNavigate, useLocation } from 'react-router-dom'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  isCollapsed: boolean
}

export function Sidebar({ isOpen, onClose, isCollapsed }: SidebarProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const iconClassName = 'h-4 w-4 shrink-0'

  const mainNavItems = [
    { label: 'Home', path: '/home', icon: '🏠' },
    { label: 'Posts', path: '/home/posts', icon: '📝' },
    { label: 'Library', path: '/home/libraries', icon: '📚' },
  ]

  const insightNavItems = [
    { label: 'Analytics', path: '/home/analytics', icon: '📈' },
  ]

  const isActive = (path: string) => {
    if (path === '/home') return location.pathname === '/home'
    return location.pathname.startsWith(path)
  }

  const handleNavigation = (path: string) => {
    navigate(path)
    onClose()
  }

  const renderIcon = (label: string) => {
    if (label === 'Home') {
      return (
        <svg className={iconClassName} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9.5V21h14V9.5" />
        </svg>
      )
    }
    if (label === 'Posts') {
      return (
        <svg className={iconClassName} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 20h16" />
          <path d="M7 17V6.5A1.5 1.5 0 0 1 8.5 5H17" />
          <path d="m13 5 4 4" />
        </svg>
      )
    }
    if (label === 'Library') {
      return (
        <svg className={iconClassName} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19V5h5v14" />
          <path d="M10 19V5h5v14" />
          <path d="M16 19V8h4v11" />
        </svg>
      )
    }
    return (
      <svg className={iconClassName} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 19V9" />
        <path d="M12 19V5" />
        <path d="M19 19v-7" />
      </svg>
    )
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`sidebar-width fixed left-0 top-14 z-40 h-[calc(100vh-56px)] border-r border-[#E2E8F0] bg-white text-[#475569] md:sticky md:translate-x-0 ${
          isCollapsed ? 'w-15' : 'w-55'
        } ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
      >
        <div className="px-2.5 pb-2 pt-4">
          <p className={`label-fade h-4 text-[10px] uppercase tracking-[0.08em] text-[#94A3B8] ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
            Main
          </p>
        </div>

        <nav className="space-y-1 px-2.5 pt-2">
          {mainNavItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              title={isCollapsed ? item.label : undefined}
              className={`focus-ring flex w-full items-center rounded-lg px-2.5 py-2.25 text-left text-[13.5px] transition-colors ${
                isActive(item.path)
                  ? 'bg-[#EEF2FF] text-[#6366F1] font-medium'
                  : 'text-[#475569] hover:bg-[#F8FAFC]'
              } ${isCollapsed ? 'justify-center' : 'gap-2'}`}
            >
              {renderIcon(item.label)}
              <span className={`label-fade whitespace-nowrap ${isCollapsed ? 'w-0 overflow-hidden opacity-0' : 'w-auto opacity-100'}`}>
                {item.label}
              </span>
            </button>
          ))}

          <p className={`label-fade h-4 px-1 pt-4 text-[10px] uppercase tracking-[0.08em] text-[#94A3B8] ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
            Insights
          </p>

          {insightNavItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              title={isCollapsed ? item.label : undefined}
              className={`focus-ring flex w-full items-center rounded-lg px-2.5 py-2.25 text-left text-[13.5px] transition-colors ${
                isActive(item.path)
                  ? 'bg-[#EEF2FF] text-[#6366F1] font-medium'
                  : 'text-[#475569] hover:bg-[#F8FAFC]'
              } ${isCollapsed ? 'justify-center' : 'gap-2'}`}
            >
              {renderIcon(item.label)}
              <span className={`label-fade whitespace-nowrap ${isCollapsed ? 'w-0 overflow-hidden opacity-0' : 'w-auto opacity-100'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-[#E2E8F0] px-2.5 py-3">
          <button
            className={`focus-ring flex w-full items-center rounded-lg border border-[#E2E8F0] bg-white px-2.5 py-2.25 text-[13px] text-[#475569] hover:bg-[#F8FAFC] ${
              isCollapsed ? 'justify-center' : 'gap-2'
            }`}
            title="Preferences"
          >
            <span className="text-sm">⚙️</span>
            <span className={`label-fade whitespace-nowrap ${isCollapsed ? 'w-0 overflow-hidden opacity-0' : 'w-auto opacity-100'}`}>
              Preferences
            </span>
          </button>
        </div>
      </aside>
    </>
  )
}
