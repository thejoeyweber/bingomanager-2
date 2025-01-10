"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function GameWizardStep4Page() {
  const router = useRouter()

  const handleSave = () => {
    // Stub: finalize creation
    alert("Game saved (stub). Returning to Dashboard.")
    router.push("/dashboard")
  }

  return (
    <div className="space-y-6">
      <h2 className="mb-2 text-xl font-semibold">Game Wizard - Step 4</h2>
      <p>Review &amp; Save (Placeholder)</p>

      <div className="max-w-md space-y-2 rounded-md border p-4">
        <p>Your chosen data from steps 1-3 would appear here.</p>
        <p className="text-muted-foreground text-sm">
          (In a real scenario, you’d see a summary of Title, Description, Items,
          Layout, etc.)
        </p>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard/game-wizard/step-3")}
        >
          Previous
        </Button>
        <Button onClick={handleSave}>Save &amp; Finish</Button>
      </div>
    </div>
  )
}
