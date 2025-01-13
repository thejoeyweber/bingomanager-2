"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { BingoStore } from "@/components/bingo-store"
import BingoCardGrid from "@/components/bingo-card-grid"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function PlayerPage() {
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
    <Card className="space-y-4">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Player Screen</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm">
          Here is your interactive Bingo card. Called items are highlighted in
          blue, and squares you click are marked in green. Refresh calls to stay
          updated, and click “Claim Bingo” when ready.
        </p>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefreshCalls}>
            Refresh Calls
          </Button>
          <Button onClick={handleClaimBingo}>Claim Bingo</Button>
        </div>

        <BingoCardGrid
          items={mockItems}
          calledItems={calls}
          markedSquares={markedSquares}
          onToggleSquare={handleToggleSquare}
          readOnly={false}
          gridSize={5}
        />
      </CardContent>
    </Card>
  )
}
