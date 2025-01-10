"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

export default function GameWizardStep1Page() {
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [theme, setTheme] = useState("")
  const [language, setLanguage] = useState("en-US")

  const handleNext = () => {
    // Stub: store your data somewhere if needed
    router.push("/dashboard/game-wizard/step-2")
  }

  return (
    <div className="space-y-6">
      <h2 className="mb-2 text-xl font-semibold">Game Wizard - Step 1</h2>
      <p>Basic Info</p>

      <div className="flex max-w-md flex-col gap-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Game Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe your bingo game"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="theme">Theme</Label>
          <Input
            id="theme"
            placeholder="eg. Holidays"
            value={theme}
            onChange={e => setTheme(e.target.value)}
          />
        </div>

        <div>
          <Label>Language</Label>
          <Select value={language} onValueChange={val => setLanguage(val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en-US">English (US)</SelectItem>
              <SelectItem value="en-GB">English (UK)</SelectItem>
              <SelectItem value="es-ES">Spanish</SelectItem>
              <SelectItem value="fr-FR">French</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={() => router.push("/dashboard")}>
          Cancel
        </Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  )
}
