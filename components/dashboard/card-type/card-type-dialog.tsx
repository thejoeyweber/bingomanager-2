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
import { useState } from "react"

interface CardTypeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: any // Will type properly when we have the DB schema
}

export function CardTypeDialog({
  open,
  onOpenChange,
  initialData
}: CardTypeDialogProps) {
  const [hasFreeSpace, setHasFreeSpace] = useState(false)
  const isEditing = !!initialData

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Card Type" : "Create New Card Type"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update your card type settings and layout."
              : "Configure a new card type by setting its grid size and options."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Card Type Name</Label>
              <Input id="name" placeholder="e.g., Standard 5x5" />
            </div>

            <div className="grid gap-2">
              <Label>Grid Size</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3x3</SelectItem>
                  <SelectItem value="4">4x4</SelectItem>
                  <SelectItem value="5">5x5</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={hasFreeSpace}
                onCheckedChange={setHasFreeSpace}
              />
              <Label>Include Free Space</Label>
            </div>

            {hasFreeSpace && (
              <div className="grid gap-2">
                <Label>Free Space Text</Label>
                <Input placeholder="FREE" />
              </div>
            )}

            <div className="grid gap-2">
              <Label>Associated List</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a list" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No List Selected</SelectItem>
                  {/* We'll populate this with actual lists later */}
                </SelectContent>
              </Select>
              <p className="text-muted-foreground text-sm">
                Without a list, you can only generate blank cards
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button>{isEditing ? "Save Changes" : "Create Card Type"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
