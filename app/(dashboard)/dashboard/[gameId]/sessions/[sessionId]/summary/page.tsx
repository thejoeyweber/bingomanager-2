"use client"

import React from "react"

export default function SessionSummaryPage({
  params
}: {
  params: { gameId: string; sessionId: string }
}) {
  const { gameId, sessionId } = params

  // Stub data for now
  const calledItems = ["B-7", "I-16", "N-35"]
  const winners = ["John Doe"]
  const timestamps = ["2025-01-10 09:01"]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">
        Session Summary for {gameId} / {sessionId}
      </h2>

      <div className="flex flex-col space-y-2">
        <p>
          <strong>Called Items:</strong> {calledItems.join(", ")}
        </p>
        <p>
          <strong>Winners:</strong> {winners.join(", ")}
        </p>
        <p>
          <strong>Call Times:</strong> {timestamps.join(", ")}
        </p>
      </div>

      <button
        className="underline"
        onClick={() => alert("Export PDF... (stub)")}
      >
        Export PDF
      </button>
      <button
        className="underline"
        onClick={() => alert("Export CSV... (stub)")}
      >
        Export CSV
      </button>
    </div>
  )
}
