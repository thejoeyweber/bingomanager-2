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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
  const [calls, setCalls] = useState<string[]>([])
  const [showClaimDialog, setShowClaimDialog] = useState(false)

  useEffect(() => {
    setQueue(MOCK_ITEMS)
    BingoStore.setCalls([])
  }, [])

  useEffect(() => {
    setCalls([...BingoStore.calls])
  }, [])

  const handleRandomCall = () => {
    if (isPaused || queue.length === 0) return
    const randomIndex = Math.floor(Math.random() * queue.length)
    const chosenItem = queue[randomIndex]
    const newQueue = [...queue]
    newQueue.splice(randomIndex, 1)
    setQueue(newQueue)
    BingoStore.addCall(chosenItem)
    setCalls([...BingoStore.calls])
  }

  const handlePauseResume = () => {
    setIsPaused(prev => !prev)
  }

  const handleManualRefresh = () => {
    if (BingoStore.pendingClaim) {
      setShowClaimDialog(true)
      BingoStore.setPendingClaim(false)
    }
    setCalls([...BingoStore.calls])
  }

  const handleConfirmClaim = () => {
    setWinnerCount(prev => prev + 1)
    setShowClaimDialog(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Live Session (Caller)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
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
            <span>Items Left: {queue.length}</span>
            <span>Total Calls: {calls.length}</span>
            <span>Winners: {winnerCount}</span>
          </div>

          <CallHistoryList calls={calls} />
        </CardContent>
      </Card>

      <Dialog open={showClaimDialog} onOpenChange={setShowClaimDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bingo Claim Detected</DialogTitle>
          </DialogHeader>
          <p className="mt-2 text-sm">
            Organizer can verify this claim. (Stub) This simulates a claim from
            the player side.
          </p>
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
