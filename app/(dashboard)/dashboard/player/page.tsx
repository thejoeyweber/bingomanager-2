"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { BingoStore } from "../live/_components/bingo-store"
import BingoCardGrid from "./_components/bingo-card-grid"

export default function PlayerPage() {
  // For demonstration, let's assume we have a 5x5 card of items:
  const mockItems = [
    "B-1",
    "B-2",
    "B-3",
    "B-4",
    "B-5",
    "I-16",
    "I-18",
    "I-22",
    "I-27",
    "I-28",
    "N-31",
    "N-35",
    "N-37",
    "N-40",
    "N-41",
    "G-46",
    "G-49",
    "G-53",
    "G-58",
    "G-59",
    "O-61",
    "O-65",
    "O-67",
    "O-70",
    "O-72"
  ]

  const [calls, setCalls] = useState<string[]>([])
  const [markedSquares, setMarkedSquares] = useState<Record<number, boolean>>(
    {}
  )

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

  const handleToggleSquare = (index: number) => {
    setMarkedSquares(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  return (
    <div className="space-y-4">
      <h2 className="mb-2 text-xl font-semibold">Player Screen</h2>

      <p className="text-sm">
        This page shows an interactive Bingo card. Called items are highlighted
        in blue, and any squares you click are marked in green. You can refresh
        calls from the store or claim a Bingo at any time.
      </p>

      <div className="flex gap-2">
        <Button variant="outline" onClick={handleRefreshCalls}>
          Refresh Calls
        </Button>
        <Button onClick={handleClaimBingo}>Claim Bingo</Button>
      </div>

      <div className="mt-4">
        <BingoCardGrid
          items={mockItems}
          calledItems={calls}
          markedSquares={markedSquares}
          onToggleSquare={handleToggleSquare}
          readOnly={false}
          gridSize={5}
        />
      </div>
    </div>
  )
}
