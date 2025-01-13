"use client"

import React, { useEffect, useState } from "react"
import BingoCardGrid from "@/components/bingo-card-grid"
import { BingoStore } from "@/components/bingo-store"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function SpectatorPage() {
  const [calls, setCalls] = useState<string[]>([])
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

  useEffect(() => {
    setCalls([...BingoStore.calls])
    const intervalId = setInterval(() => {
      setCalls([...BingoStore.calls])
    }, 3000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <Card className="space-y-4">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Spectator Screen
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-muted-foreground text-sm">
          This is a read-only view of the Bingo session. Squares corresponding
          to called items are highlighted.
        </p>
        <BingoCardGrid
          items={mockItems}
          calledItems={calls}
          markedSquares={{}}
          readOnly={true}
          gridSize={5}
        />
      </CardContent>
    </Card>
  )
}
