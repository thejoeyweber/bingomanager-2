"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface GenerateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  gameId: string
}

export function GenerateDialog({
  open,
  onOpenChange,
  gameId
}: GenerateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Generate Cards</DialogTitle>
          <DialogDescription>
            Choose how many cards to generate and your output preferences.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="cardType">Card Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a card type" />
                </SelectTrigger>
                <SelectContent>
                  {/* Will populate from DB */}
                  <SelectItem value="type1">5x5 Standard</SelectItem>
                  <SelectItem value="type2">3x3 Quick Play</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="count">Number of Cards</Label>
              <Input
                id="count"
                type="number"
                min="1"
                max="1000"
                placeholder="Enter number of cards"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Combine into PDF</Label>
                <div className="text-muted-foreground text-sm">
                  Generate a single PDF file
                </div>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Include QR Codes</Label>
                <div className="text-muted-foreground text-sm">
                  Add scannable links to cards
                </div>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button>Generate</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
