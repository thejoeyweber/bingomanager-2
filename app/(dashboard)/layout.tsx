"use server"

import Header from "@/components/header"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({
  children
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 p-4">{children}</main>
      <footer className="text-muted-foreground p-4 text-center text-sm">
        <p>© Bingo Manager</p>
      </footer>
    </div>
  )
}
