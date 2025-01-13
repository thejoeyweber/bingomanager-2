"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Search, Grid } from "lucide-react"

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Browse Card Templates</DialogTitle>
          <DialogDescription>
            Search through prebuilt card templates to find the perfect layout
            for your game.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
              <Input placeholder="Search templates..." className="pl-9" />
            </div>
            <Button>Search</Button>
          </div>

          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {/* Example results - will be replaced with real data */}
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {i === 0
                          ? "Standard 5x5"
                          : i === 1
                            ? "Compact 4x4"
                            : i === 2
                              ? "Quick 3x3"
                              : i === 3
                                ? "Classic 5x5 with FREE"
                                : "Custom Template"}
                      </span>
                      <Badge variant="secondary">Prebuilt</Badge>
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                      <Grid className="size-3" />
                      {i === 1 ? "4x4 grid" : i === 2 ? "3x3 grid" : "5x5 grid"}
                      {[0, 3].includes(i) && " • Includes free space"}
                      {" • Used by "}
                      {["2.5k", "1.2k", "800", "1.8k", "500"][i]} games
                    </div>
                  </div>
                  <Button>Use Template</Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}
