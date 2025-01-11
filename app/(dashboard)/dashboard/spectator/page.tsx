"use client"

import React, { useEffect, useState } from "react"
import BingoCardGrid from "../../player/_components/bingo-card-grid"
import { BingoStore } from "../live/_components/bingo-store"

export default function SpectatorPage() {
  const [calls, setCalls] = useState<string[]>([])

  // Example items same as the player, for demonstration:
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
    // Load initial calls
    setCalls([...BingoStore.calls])

    // Optional: You could set up a simple interval or an event to refresh calls automatically
    const intervalId = setInterval(() => {
      setCalls([...BingoStore.calls])
    }, 3000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Spectator Screen</h2>
      <p>
        This view allows spectators to follow along in real time. The squares
        corresponding to called items are highlighted, but are read-only.
      </p>

      <BingoCardGrid
        items={mockItems}
        calledItems={calls}
        markedSquares={{}}
        readOnly={true}
        gridSize={5}
      />
    </div>
  )
}
