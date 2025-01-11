"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { BingoStore } from "../live/_components/bingo-store"

export default function PlayerPage() {
  const [calls, setCalls] = useState<string[]>([])

  // On mount, load calls from the store
  useEffect(() => {
    setCalls([...BingoStore.calls])
  }, [])

  const handleRefreshCalls = () => {
    setCalls([...BingoStore.calls])
  }

  const handleClaimBingo = () => {
    BingoStore.setPendingClaim(true)
    alert("You claimed Bingo! Switch to the Caller to see your claim.")
  }

  return (
    <div className="space-y-4">
      <h2 className="mb-2 text-xl font-semibold">Player Screen (Test)</h2>
      <p className="text-sm">
        This simulates a player’s perspective. Calls are shown below.
      </p>

      <div className="flex gap-2">
        <Button variant="outline" onClick={handleRefreshCalls}>
          Refresh Calls
        </Button>
        <Button onClick={handleClaimBingo}>Claim Bingo</Button>
      </div>

      <div className="mt-4 space-y-2 rounded border p-4">
        <p className="text-sm font-medium">Recent Calls:</p>
        {calls.length === 0 ? (
          <p className="text-muted-foreground text-sm">No calls yet</p>
        ) : (
          <ul className="space-y-1 text-sm">
            {calls.map((call, idx) => (
              <li key={idx}>{call}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
