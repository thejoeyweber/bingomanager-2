"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search, Import, Edit2 } from "lucide-react"
import { EmptyState } from "@/components/dashboard/list/empty-state"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { ListDialog } from "@/components/dashboard/list/list-dialog"
import { SearchDialog } from "@/components/dashboard/list/search-dialog"
import { useRouter } from "next/navigation"

interface ListsTabProps {
  gameId: string
}

interface SavedList {
  id: string
  name: string
  itemCount: number
  type: "custom" | "prebuilt" | "community"
}

export function ListsTab({ gameId }: ListsTabProps) {
  const router = useRouter()
  const [showListDialog, setShowListDialog] = useState(false)
  const [showSearchDialog, setShowSearchDialog] = useState(false)
  const [editingList, setEditingList] = useState<SavedList | null>(null)

  const savedLists: SavedList[] = [] // Empty for now to show empty state

  const handleEditList = (list: SavedList) => {
    setEditingList(list)
    setShowListDialog(true)
  }

  const handleCloseListDialog = () => {
    setShowListDialog(false)
    setEditingList(null)
  }

  const navigateToTab = (tab: string) => {
    router.push(`/dashboard/${gameId}?tab=${tab}`)
  }

  return (
    <>
      <div className="space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Lists</CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSearchDialog(true)}
              >
                <Search className="mr-2 size-4" />
                Search Lists
              </Button>
              <Button size="sm" onClick={() => setShowListDialog(true)}>
                <Plus className="mr-2 size-4" />
                Create List
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            {savedLists.length > 0 ? (
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {savedLists.map(list => (
                    <div
                      key={list.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div>
                        <div className="font-medium">{list.name}</div>
                        <div className="text-muted-foreground text-sm">
                          {list.itemCount} items
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge>{list.type}</Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditList(list)}
                        >
                          <Edit2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <EmptyState
                icon={<Import className="size-12" />}
                title="No Lists Available"
                description="Get started by searching for prebuilt lists or create your own."
                actions={
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowSearchDialog(true)}
                    >
                      <Search className="mr-2 size-4" />
                      Search Lists
                    </Button>
                    <Button onClick={() => setShowListDialog(true)}>
                      <Plus className="mr-2 size-4" />
                      Create List
                    </Button>
                  </div>
                }
              />
            )}
          </CardContent>
        </Card>
      </div>

      <ListDialog
        open={showListDialog}
        onOpenChange={handleCloseListDialog}
        initialData={editingList}
      />

      <SearchDialog
        open={showSearchDialog}
        onOpenChange={setShowSearchDialog}
      />
    </>
  )
}
