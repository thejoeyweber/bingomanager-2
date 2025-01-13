"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Edit2, Grid, List, PlayCircle, Settings } from "lucide-react"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface OverviewTabProps {
  gameId: string
}

// Temporary mock data types
interface GameOverview {
  id: string
  title: string
  description: string
  status: "draft" | "active" | "live" | "archived"
  cardTypes: {
    id: string
    name: string
    gridSize: number
    hasFreeSpace: boolean
    cardsGenerated: number
    list?: {
      id: string
      name: string
      itemCount: number
    }
  }[]
}

export function OverviewTab({ gameId }: OverviewTabProps) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)

  // Mock data - will be replaced with real data
  const game: GameOverview = {
    id: gameId,
    title: "Example Bingo Game",
    description: "A fun bingo game for everyone",
    status: "draft",
    cardTypes: [
      {
        id: "1",
        name: "Standard 5x5",
        gridSize: 5,
        hasFreeSpace: true,
        cardsGenerated: 50,
        list: {
          id: "1",
          name: "Holiday Words",
          itemCount: 75
        }
      },
      {
        id: "2",
        name: "Quick 3x3",
        gridSize: 3,
        hasFreeSpace: false,
        cardsGenerated: 0
      }
    ]
  }

  const navigateToTab = (tab: string) => {
    router.push(`/dashboard/${gameId}?tab=${tab}`)
  }

  return (
    <div className="space-y-6">
      {/* Game Details Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <CardTitle>
                {isEditing ? (
                  <Input defaultValue={game.title} className="max-w-sm" />
                ) : (
                  game.title
                )}
              </CardTitle>
              <Badge
                variant={
                  game.status === "live"
                    ? "destructive"
                    : game.status === "active"
                      ? "default"
                      : "secondary"
                }
              >
                {game.status.charAt(0).toUpperCase() + game.status.slice(1)}
              </Badge>
            </div>
            {isEditing ? (
              <Textarea
                defaultValue={game.description}
                className="max-w-xl"
                rows={3}
              />
            ) : (
              <p className="text-muted-foreground text-sm">
                {game.description}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit2 className="size-4" />
            </Button>
            {game.status === "active" && (
              <Button>
                <PlayCircle className="mr-2 size-4" />
                Start Live Game
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Game Content Summary */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Card Types Summary */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Grid className="size-5" />
              Card Types
            </CardTitle>
            <Button variant="ghost" onClick={() => navigateToTab("card-types")}>
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <div className="space-y-4">
                {game.cardTypes.map(cardType => (
                  <div
                    key={cardType.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="space-y-1">
                      <div className="font-medium">{cardType.name}</div>
                      <div className="text-muted-foreground flex items-center gap-2 text-sm">
                        <Grid className="size-3" />
                        {cardType.gridSize}x{cardType.gridSize} grid
                        {cardType.hasFreeSpace && " • Has free space"}
                        {cardType.cardsGenerated > 0 &&
                          ` • ${cardType.cardsGenerated} cards generated`}
                      </div>
                      {cardType.list && (
                        <div className="text-muted-foreground text-sm">
                          Using list: {cardType.list.name} (
                          {cardType.list.itemCount} items)
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Lists Summary */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <List className="size-5" />
              Lists
            </CardTitle>
            <Button variant="ghost" onClick={() => navigateToTab("lists")}>
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <div className="space-y-4">
                {game.cardTypes
                  .filter(ct => ct.list)
                  .map(ct => ct.list!)
                  .map(list => (
                    <div
                      key={list.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="space-y-1">
                        <div className="font-medium">{list.name}</div>
                        <div className="text-muted-foreground text-sm">
                          {list.itemCount} items
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
