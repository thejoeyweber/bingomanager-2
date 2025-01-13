"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search, Grid } from "lucide-react"
import { EmptyState } from "@/components/dashboard/list/empty-state"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { CardTypeDialog } from "@/components/dashboard/card-type/card-type-dialog"
import { SearchDialog } from "@/components/dashboard/card-type/search-dialog"
import { useRouter } from "next/navigation"

interface CardTypesTabProps {
  gameId: string
}

interface SavedCardType {
  id: string
  name: string
  gridSize: number
  hasFreeSpace: boolean
  freeSpaceText?: string
  listId?: string // Optional until associated with a list
  type: "custom" | "prebuilt"
}

export function CardTypesTab({ gameId }: CardTypesTabProps) {
  const router = useRouter()
  const [showCardTypeDialog, setShowCardTypeDialog] = useState(false)
  const [showSearchDialog, setShowSearchDialog] = useState(false)
  const [editingCardType, setEditingCardType] = useState<SavedCardType | null>(
    null
  )

  const savedCardTypes: SavedCardType[] = [] // Empty for now to show empty state

  const navigateToTab = (tab: string) => {
    router.push(`/dashboard/${gameId}?tab=${tab}`)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Card Types</CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSearchDialog(true)}
            >
              <Search className="mr-2 size-4" />
              Browse Templates
            </Button>
            <Button size="sm" onClick={() => setShowCardTypeDialog(true)}>
              <Plus className="mr-2 size-4" />
              Create New
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {savedCardTypes.length > 0 ? (
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {savedCardTypes.map(cardType => (
                  <div
                    key={cardType.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{cardType.name}</span>
                        <Badge>{cardType.type}</Badge>
                        {!cardType.listId && (
                          <Badge variant="destructive">No List</Badge>
                        )}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        {cardType.gridSize}x{cardType.gridSize} grid
                        {cardType.hasFreeSpace && " • Has free space"}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setEditingCardType(cardType)
                        setShowCardTypeDialog(true)
                      }}
                    >
                      <Grid className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <EmptyState
              icon={<Grid className="size-8" />}
              title="No card types yet"
              description="Create a new card type or browse templates to get started."
              actions={
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowSearchDialog(true)}
                  >
                    Browse Templates
                  </Button>
                  <Button onClick={() => setShowCardTypeDialog(true)}>
                    Create New
                  </Button>
                </div>
              }
            />
          )}
        </CardContent>
      </Card>
      <CardTypeDialog
        open={showCardTypeDialog}
        onOpenChange={setShowCardTypeDialog}
        initialData={editingCardType}
      />
      <SearchDialog
        open={showSearchDialog}
        onOpenChange={setShowSearchDialog}
      />
    </div>
  )
}
