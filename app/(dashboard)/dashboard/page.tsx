"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

export default function DashboardPage() {
  const [showNewGameDialog, setShowNewGameDialog] = useState(false)

  // Minimal form fields
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  // Sample mock
  const mockGames = [
    { id: "holiday-bingo", title: "Holiday Bingo", status: "Draft" },
    { id: "office-party", title: "Office Party Bingo", status: "Live" }
  ]

  const handleCreateGame = () => {
    // In a future step, we'd call an action to create the game in the DB
    // For now, stub an ID or navigate to a placeholder
    const newGameId = "my-new-game"
    setShowNewGameDialog(false)
    window.location.href = `/dashboard/${newGameId}`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Games</h1>
        <Dialog open={showNewGameDialog} onOpenChange={setShowNewGameDialog}>
          <DialogTrigger asChild>
            <Button onClick={() => setShowNewGameDialog(true)}>
              + New Game
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Game</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="My Bingo Game"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Optional description..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowNewGameDialog(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleCreateGame}>Create</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {mockGames.map(game => (
          <Card key={game.id}>
            <CardHeader>
              <CardTitle>{game.title}</CardTitle>
              <CardDescription>{game.status} game</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                {game.title} is currently in {game.status} status.
              </p>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Link href={`/dashboard/${game.id}`}>
                <Button variant="outline">Open Game</Button>
              </Link>
              <Button variant="ghost">Start Live</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
