import { useState, type ReactNode } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const handleMenuClick = () => {
    if (window.innerWidth >= 768) {
      setSidebarCollapsed((prev) => !prev)
      return
    }
    setSidebarOpen(true)
  }

  return (
    <div className="flex h-screen flex-col bg-[#F8FAFC]">
      <Header onMenuClick={handleMenuClick} />

      <div className="flex min-h-0 flex-1">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          isCollapsed={sidebarCollapsed}
        />

        <main className="min-h-0 w-full flex-1 overflow-y-auto px-5 py-8 md:px-10">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
