"use server"

import Header from "@/components/header"
import { AppSidebar } from "@/components/sidebar/app-sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({
  children
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Sidebar on the left for medium+ screens */}
      <div className="hidden h-screen md:flex md:w-64 md:flex-none">
        <AppSidebar className="border-r" />
      </div>

      {/* For mobile, we can position the drawer version of the sidebar in <AppSidebar> if needed */}
      <div className="md:hidden">
        <Header />
      </div>

      <main className="flex-1 overflow-hidden p-4 md:p-6">{children}</main>
    </div>
  )
}
