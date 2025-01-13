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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ImagePlus, Upload, X } from "lucide-react"
import { useState } from "react"

interface ListDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: any // Will type properly when we have the DB schema
}

export function ListDialog({
  open,
  onOpenChange,
  initialData
}: ListDialogProps) {
  const [activeTab, setActiveTab] = useState("manual")
  const isEditing = !!initialData

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit List" : "Create New List"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update your list items and settings."
              : "Create a new list by adding items manually or importing them."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">List Name</Label>
              <Input id="name" placeholder="e.g., Numbers 1-75" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Optional description of your list..."
              />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="manual">Manual Entry</TabsTrigger>
              <TabsTrigger value="import">Import</TabsTrigger>
            </TabsList>

            <TabsContent value="manual" className="space-y-4">
              <ScrollArea className="h-[300px] rounded-md border p-4">
                <div className="space-y-4">
                  {/* Example item input */}
                  <div className="flex items-start gap-4">
                    <div className="flex-1 space-y-2">
                      <Label>Item Text</Label>
                      <Input placeholder="Enter item text" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <Label>Image (Optional)</Label>
                      <div className="flex gap-2">
                        <Button variant="outline" className="w-full">
                          <ImagePlus className="mr-2 size-4" />
                          Add Image
                        </Button>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="mt-8">
                      <X className="size-4" />
                    </Button>
                  </div>
                </div>
              </ScrollArea>
              <Button className="w-full">Add Another Item</Button>
            </TabsContent>

            <TabsContent value="import" className="space-y-4">
              <div className="rounded-lg border border-dashed p-8">
                <div className="flex flex-col items-center justify-center gap-4">
                  <Upload className="text-muted-foreground size-8" />
                  <div className="space-y-1 text-center">
                    <p className="text-sm font-medium">
                      Drag and drop your file here
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Supports CSV, TXT, or Excel files
                    </p>
                  </div>
                  <Button variant="secondary" size="sm">
                    Browse Files
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button>{isEditing ? "Save Changes" : "Create List"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
