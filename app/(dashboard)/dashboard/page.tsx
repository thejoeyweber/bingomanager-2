"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const mockGames = [
    {
      id: "1",
      title: "Holiday Bingo",
      status: "Draft"
    },
    {
      id: "2",
      title: "Office Party Bingo",
      status: "Live"
    }
  ]

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">My Games</h1>

      <div className="mb-6 space-y-2">
        {mockGames.map(game => (
          <div
            key={game.id}
            className="flex items-center justify-between rounded-md border p-4"
          >
            <div>
              <p className="font-medium">{game.title}</p>
              <p className="text-muted-foreground text-sm">{game.status}</p>
            </div>

            <div className="flex gap-2">
              {/* For now, just link to the new game overview as an example */}
              <Link href="/dashboard/game-overview">
                <Button variant="outline">Overview</Button>
              </Link>
              <Button variant="ghost">Start Live</Button>
            </div>
          </div>
        ))}
      </div>

      <Link href="/dashboard/game-wizard/step-1">
        <Button>Create New Game</Button>
      </Link>
    </div>
  )
}
