"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, FileDown, Eye, Link2 } from "lucide-react"
import { EmptyState } from "@/components/dashboard/list/empty-state"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { GenerateDialog } from "@/components/dashboard/generation/generate-dialog"
import { CardPreviewDialog } from "@/components/dashboard/generation/card-preview-dialog"
import { useRouter } from "next/navigation"

interface GenerationTabProps {
  gameId: string
}

interface GeneratedCard {
  id: string
  cardTypeId: string
  cardTypeName: string
  cardNumber: number
  generatedAt: Date
  downloadUrl?: string
  previewUrl?: string
  shareableLink?: string
}

export function GenerationTab({ gameId }: GenerationTabProps) {
  const router = useRouter()
  const [showGenerateDialog, setShowGenerateDialog] = useState(false)
  const [showPreviewDialog, setShowPreviewDialog] = useState(false)
  const [selectedCard, setSelectedCard] = useState<GeneratedCard | null>(null)

  // Placeholder data for demonstration
  const generatedCards: GeneratedCard[] = [
    {
      id: "1",
      cardTypeId: "type1",
      cardTypeName: "Standard 5x5",
      cardNumber: 1001,
      generatedAt: new Date("2024-02-20"),
      downloadUrl: "/card-1001.pdf",
      previewUrl: "/preview-1001.jpg",
      shareableLink: "https://example.com/card/1001"
    },
    {
      id: "2",
      cardTypeId: "type1",
      cardTypeName: "Standard 5x5",
      cardNumber: 1002,
      generatedAt: new Date("2024-02-20"),
      downloadUrl: "/card-1002.pdf",
      previewUrl: "/preview-1002.jpg",
      shareableLink: "https://example.com/card/1002"
    },
    {
      id: "3",
      cardTypeId: "type2",
      cardTypeName: "Quick 3x3",
      cardNumber: 1003,
      generatedAt: new Date("2024-02-21"),
      downloadUrl: "/card-1003.pdf",
      previewUrl: "/preview-1003.jpg",
      shareableLink: "https://example.com/card/1003"
    }
  ]

  // Toggle these to see different states
  const hasCardTypes = true // Set to false to see "No Card Types" state
  const hasValidCardTypes = true // Set to false to see "Card Types Need Lists" state

  const handlePreviewCard = (card: GeneratedCard) => {
    setSelectedCard(card)
    setShowPreviewDialog(true)
  }

  const navigateToTab = (tab: string) => {
    router.push(`/dashboard/${gameId}?tab=${tab}`)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Generated Cards</CardTitle>
          <Button
            onClick={() => setShowGenerateDialog(true)}
            disabled={!hasValidCardTypes}
          >
            <Plus className="mr-2 size-4" />
            Generate Cards
          </Button>
        </CardHeader>

        <CardContent>
          {!hasCardTypes ? (
            <EmptyState
              icon={<FileDown className="size-8" />}
              title="No Card Types Yet"
              description="Create a Card Type first to start generating bingo cards."
              actions={
                <Button
                  variant="secondary"
                  onClick={() => navigateToTab("card-types")}
                >
                  Create Card Type
                </Button>
              }
            />
          ) : !hasValidCardTypes ? (
            <EmptyState
              icon={<FileDown className="size-8" />}
              title="Card Types Need Lists"
              description="Assign a List to at least one Card Type to generate cards."
              actions={
                <Button
                  variant="secondary"
                  onClick={() => navigateToTab("lists")}
                >
                  Create List
                </Button>
              }
            />
          ) : generatedCards.length === 0 ? (
            <EmptyState
              icon={<FileDown className="size-8" />}
              title="No Cards Generated"
              description="Generate your first set of bingo cards."
              actions={
                <Button onClick={() => setShowGenerateDialog(true)}>
                  Generate Cards
                </Button>
              }
            />
          ) : (
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {generatedCards.map(card => (
                  <div
                    key={card.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          Card #{card.cardNumber}
                        </span>
                        <Badge>{card.cardTypeName}</Badge>
                      </div>
                      <div className="text-muted-foreground text-sm">
                        Generated {card.generatedAt.toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handlePreviewCard(card)}
                      >
                        <Eye className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          /* Copy sharable link */
                        }}
                      >
                        <Link2 className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          /* Download card */
                        }}
                      >
                        <FileDown className="size-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      <GenerateDialog
        open={showGenerateDialog}
        onOpenChange={setShowGenerateDialog}
        gameId={gameId}
      />

      <CardPreviewDialog
        open={showPreviewDialog}
        onOpenChange={setShowPreviewDialog}
        card={selectedCard}
      />
    </div>
  )
}
