"use client"

import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/nextjs"
import React from "react"

export default function AccountSettingsPage() {
  const { user } = useUser()

  const subscriptionPortalLink =
    process.env.NEXT_PUBLIC_STRIPE_PORTAL_LINK || "#"

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Account Settings</h2>

      <div className="space-y-2">
        <p>
          <strong>User ID:</strong> {user?.id}
        </p>
        <p>
          <strong>Email:</strong> {user?.primaryEmailAddress?.emailAddress}
        </p>
        <p>
          <strong>Membership:</strong> (Show membership from DB here)
        </p>
        <p>
          <strong>Subscription Status:</strong> (Show subscription status here)
        </p>
      </div>

      <Button asChild>
        <a
          href={subscriptionPortalLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Manage Subscription
        </a>
      </Button>
    </div>
  )
}
