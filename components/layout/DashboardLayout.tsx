import { Sidebar } from "./Sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1">
        <header className="bg-white shadow">
          <div className="flex justify-end p-4">
            <img src="/avatar.png" alt="User Avatar" className="w-10 h-10 rounded-full" />
          </div>
        </header>
        <div className="container mx-auto p-6">{children}</div>
      </main>
    </div>
  )
}