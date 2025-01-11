"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { CallHistoryList } from "./_components/call-history-list"
import { BingoStore } from "./_components/bingo-store"

// Mock list of items (could come from a Card Type)
const MOCK_ITEMS = [
  "B-1",
  "B-7",
  "I-16",
  "I-18",
  "N-31",
  "N-35",
  "G-46",
  "G-58",
  "O-61",
  "O-71"
]

export default function LiveSessionPage() {
  const [isPaused, setIsPaused] = useState(false)
  const [queue, setQueue] = useState<string[]>([])
  const [winnerCount, setWinnerCount] = useState(0)

  // Local mirror of calls from store
  const [calls, setCalls] = useState<string[]>([])
  // For claim popup
  const [showClaimDialog, setShowClaimDialog] = useState(false)

  useEffect(() => {
    // Populate the queue with mock items (shuffle them if you want)
    setQueue(MOCK_ITEMS)
    // Initialize store calls
    BingoStore.setCalls([])
  }, [])

  // Keep local calls in sync with store
  useEffect(() => {
    setCalls([...BingoStore.calls])
  }, [])

  const handleRandomCall = () => {
    if (isPaused || queue.length === 0) return

    // Randomly pick from queue
    const randomIndex = Math.floor(Math.random() * queue.length)
    const chosenItem = queue[randomIndex]
    // Remove from queue
    const newQueue = [...queue]
    newQueue.splice(randomIndex, 1)
    setQueue(newQueue)

    // Push to store
    BingoStore.addCall(chosenItem)
    // Sync local
    setCalls([...BingoStore.calls])
  }

  const handlePauseResume = () => {
    setIsPaused(prev => !prev)
  }

  const handleManualRefresh = () => {
    // Check if a claim is pending
    if (BingoStore.pendingClaim) {
      setShowClaimDialog(true)
      // Reset pending
      BingoStore.setPendingClaim(false)
    }
    // Also update calls
    setCalls([...BingoStore.calls])
  }

  const handleConfirmClaim = () => {
    setWinnerCount(prev => prev + 1)
    setShowClaimDialog(false)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Live Session (Caller)</h2>

      <div className="flex gap-2">
        <Button
          onClick={handleRandomCall}
          disabled={isPaused || queue.length === 0}
        >
          Call Random
        </Button>
        <Button variant="outline" onClick={handlePauseResume}>
          {isPaused ? "Resume" : "Pause"}
        </Button>
        <Button variant="outline" onClick={handleManualRefresh}>
          Manual Refresh
        </Button>
      </div>

      <div className="flex flex-col space-y-1 text-sm">
        <span>Items Left in Queue: {queue.length}</span>
        <span>Total Calls: {calls.length}</span>
        <span>Winners: {winnerCount}</span>
      </div>

      <CallHistoryList calls={calls} />

      {/* Bingo Claim Dialog */}
      <Dialog open={showClaimDialog} onOpenChange={setShowClaimDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bingo Claim Detected</DialogTitle>
          </DialogHeader>
          <div className="mt-2 space-y-2">
            <p className="text-sm">Organizer can verify this claim. (Stub)</p>
            <p className="text-muted-foreground text-xs">
              This simulates a claim from the player side.
            </p>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowClaimDialog(false)}>
              Close
            </Button>
            <Button onClick={handleConfirmClaim}>Confirm</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
