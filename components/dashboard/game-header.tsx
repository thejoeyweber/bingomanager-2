"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Share2 } from "lucide-react"

interface GameHeaderProps {
  gameId: string
}

export function GameHeader({ gameId }: GameHeaderProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div>
          <h1 className="text-2xl font-bold">Game Settings</h1>
          <p className="text-muted-foreground text-sm">
            Configure your game settings, lists, and card types
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Share2 className="mr-2 size-4" />
          Share
        </Button>
      </CardContent>
    </Card>
  )
}
