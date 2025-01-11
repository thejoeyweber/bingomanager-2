"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DataTable } from "@/components/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
    <Card className="p-6">
      <CardHeader className="px-0 pt-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">My Games</CardTitle>
          <Dialog open={showNewGameDialog} onOpenChange={setShowNewGameDialog}>
            <DialogTrigger asChild>
              <Button>+ New Game</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Game</DialogTitle>
                <DialogDescription>
                  Create a new bingo game by filling out the details below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="My Bingo Game"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Optional description..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowNewGameDialog(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateGame}>Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <DataTable columns={columns} data={games} />
      </CardContent>
    </Card>
  )
}
