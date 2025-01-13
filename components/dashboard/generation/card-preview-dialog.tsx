"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { FileDown, Link2 } from "lucide-react"

interface CardPreviewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  card: {
    id: string
    cardNumber: number
    cardTypeName: string
    downloadUrl?: string
    shareableLink?: string
  } | null
}

export function CardPreviewDialog({
  open,
  onOpenChange,
  card
}: CardPreviewDialogProps) {
  if (!card) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Card #{card.cardNumber} - {card.cardTypeName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Card preview will go here - initially just a placeholder */}
          <div className="bg-muted aspect-square w-full rounded-lg border" />

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                /* Copy link */
              }}
            >
              <Link2 className="mr-2 size-4" />
              Copy Link
            </Button>
            <Button
              onClick={() => {
                /* Download card */
              }}
            >
              <FileDown className="mr-2 size-4" />
              Download
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
