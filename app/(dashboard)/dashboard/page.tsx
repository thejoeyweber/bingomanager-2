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
import { DataTable } from "@/components/ui/data-table" // Example path
import { ColumnDef } from "@tanstack/react-table"

interface Game {
  id: string
  title: string
  status: string
}

export default function DashboardPage() {
  const [showNewGameDialog, setShowNewGameDialog] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  // Sample mock data for now:
  const [games, setGames] = useState<Game[]>([
    { id: "holiday-bingo", title: "Holiday Bingo", status: "Draft" },
    { id: "office-party", title: "Office Party Bingo", status: "Live" }
  ])

  const columns: ColumnDef<Game>[] = [
    {
      accessorKey: "title",
      header: () => <span>Title</span>,
      cell: ({ row }) => (
        <Link href={`/dashboard/${row.original.id}`} className="font-medium">
          {row.original.title}
        </Link>
      )
    },
    {
      accessorKey: "status",
      header: () => <span>Status</span>,
      cell: ({ row }) => <span>{row.original.status}</span>
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const game = row.original
        return (
          <div className="flex gap-2">
            <Link href={`/dashboard/${game.id}`}>
              <Button variant="outline" size="sm">
                Open
              </Button>
            </Link>
            <Button variant="ghost" size="sm">
              Start Live
            </Button>
          </div>
        )
      }
    }
  ]

  const handleCreateGame = () => {
    const newId = title.toLowerCase().replace(/\s+/g, "-") || "untitled"
    const newGame: Game = {
      id: newId,
      title,
      status: "Draft"
    }
    setGames(prev => [newGame, ...prev])
    setShowNewGameDialog(false)
    setTitle("")
    setDescription("")
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

      {/* Data Table displaying the games */}
      <DataTable columns={columns} data={games} />
    </div>
  )
}
