"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export default function GamePage() {
  // We can fetch game data using the [gameId] param from the route in a future step
  // For now, this is a stubbed single-page approach
  const [numCards, setNumCards] = useState<string>("10")

  const handleGenerateCards = () => {
    alert(`Generating ${numCards} cards... (stub)`)
  }

  return (
    <div className="space-y-6">
      <h2 className="mb-2 text-2xl font-semibold">Game Configuration</h2>

      <div className="space-y-2">
        <p className="text-xl">Title &amp; Description (stub data)</p>
        <p className="text-muted-foreground">
          This single page will handle lists, card types, and card generation
          for this game.
        </p>
      </div>

      <div className="max-w-md space-y-4 rounded-md border p-4">
        <Label>Card Generation</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            min="1"
            value={numCards}
            onChange={e => setNumCards(e.target.value)}
          />
          <Button onClick={handleGenerateCards}>Generate</Button>
        </div>
      </div>

      <Button
        variant="outline"
        onClick={() => alert("Invite players flow... (stub)")}
      >
        Invite Players
      </Button>
    </div>
  )
}
