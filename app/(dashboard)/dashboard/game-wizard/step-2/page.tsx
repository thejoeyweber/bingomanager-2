"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function GameWizardStep2Page() {
  const router = useRouter()
  const [items, setItems] = useState<string[]>([])

  const [currentItem, setCurrentItem] = useState("")

  const handleAddItem = () => {
    if (!currentItem) return
    setItems(prev => [...prev, currentItem])
    setCurrentItem("")
  }

  const handleNext = () => {
    // Stub: store your items somewhere if needed
    router.push("/dashboard/game-wizard/step-3")
  }

  return (
    <div className="space-y-6">
      <h2 className="mb-2 text-xl font-semibold">Game Wizard - Step 2</h2>
      <p>Items Setup (Text or Image placeholders)</p>

      <div className="max-w-md space-y-4">
        <Label>Add Item (text stub)</Label>
        <div className="flex gap-2">
          <Input
            value={currentItem}
            onChange={e => setCurrentItem(e.target.value)}
          />
          <Button onClick={handleAddItem}>Add</Button>
        </div>

        <div className="mt-4">
          <Label>Current Items:</Label>
          <div className="mt-2 space-y-1">
            {items.map((item, idx) => (
              <div key={idx} className="rounded-md border p-2">
                {item}
              </div>
            ))}
            {!items.length && (
              <p className="text-muted-foreground text-sm">No items yet.</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard/game-wizard/step-1")}
        >
          Previous
        </Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  )
}
