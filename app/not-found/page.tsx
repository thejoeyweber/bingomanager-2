"use client"

import Link from "next/link"

export default function DashboardNotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-8">
      <h1 className="mb-4 text-4xl font-bold">404 – Page Not Found</h1>
      <p className="mb-4 text-sm">
        We couldn't find the page you were looking for.
      </p>
      <Link href="/dashboard">
        <span className="underline">Go back to Dashboard</span>
      </Link>
    </div>
  )
}
