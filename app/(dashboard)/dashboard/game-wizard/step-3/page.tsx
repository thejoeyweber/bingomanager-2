"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select"

export default function GameWizardStep3Page() {
  const router = useRouter()

  const [gridSize, setGridSize] = useState("5")
  const [winningPatterns, setWinningPatterns] = useState<string[]>([
    "single_line"
  ])

  const handleTogglePattern = (pattern: string) => {
    setWinningPatterns(prev =>
      prev.includes(pattern)
        ? prev.filter(p => p !== pattern)
        : [...prev, pattern]
    )
  }

  const handleNext = () => {
    // Stub: store your data somewhere if needed
    router.push("/dashboard/game-wizard/step-4")
  }

  return (
    <div className="space-y-6">
      <h2 className="mb-2 text-xl font-semibold">Game Wizard - Step 3</h2>
      <p>Layout &amp; Rules</p>

      <div className="max-w-md space-y-4">
        <div>
          <Label>Grid Size</Label>
          <Select value={gridSize} onValueChange={val => setGridSize(val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select grid size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">3 x 3</SelectItem>
              <SelectItem value="4">4 x 4</SelectItem>
              <SelectItem value="5">5 x 5</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Winning Patterns</Label>
          <div className="mt-2 flex flex-col gap-1">
            {["single_line", "multiple_lines", "blackout"].map(pattern => (
              <div key={pattern} className="flex items-center space-x-2">
                <Checkbox
                  checked={winningPatterns.includes(pattern)}
                  onCheckedChange={() => handleTogglePattern(pattern)}
                />
                <span className="text-sm capitalize">
                  {pattern.replace("_", " ")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard/game-wizard/step-2")}
        >
          Previous
        </Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  )
}
