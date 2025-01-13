import { Suspense } from "react"
import { notFound } from "next/navigation"
import { auth } from "@clerk/nextjs/server"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

import { GameHeader } from "@/components/dashboard/game-header"
import { GameTabs } from "@/components/dashboard/game-tabs"

export default async function GamePage({
  params,
  searchParams
}: {
  params: { gameId: string }
  searchParams: { tab?: string }
}) {
  const { userId } = await auth()
  if (!userId) return notFound()

  const gameId = await Promise.resolve(params.gameId)
  const defaultTab = searchParams.tab || "overview"

  return (
    <div className="container space-y-6 p-6">
      <GameHeader gameId={gameId} />

      <Alert>
        <AlertDescription>
          Configure your game by adding Lists and Card Types. Once ready, you
          can start a Live Session or generate cards.
        </AlertDescription>
      </Alert>

      <GameTabs gameId={gameId} defaultTab={defaultTab} />

      <Card>
        <CardHeader>
          <CardTitle>Live Session</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Ready to start calling numbers? Launch a live session to begin.
          </p>
          <Button>Start Live Session</Button>
        </CardContent>
      </Card>
    </div>
  )
}
