"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@/components/ui/popover"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

const initialLists = [
  {
    id: "list-1",
    name: "Holiday Words",
    items: [
      { id: "item-1", text: "Santa", isMandatory: false },
      { id: "item-2", text: "Reindeer", isMandatory: false }
    ]
  },
  {
    id: "list-2",
    name: "Office Terms",
    items: [
      { id: "item-3", text: "Meeting", isMandatory: true },
      { id: "item-4", text: "Deadline", isMandatory: false }
    ]
  }
]

const initialCardTypes = [
  {
    id: "type-1",
    name: "Classic 5x5",
    listId: "list-1",
    gridSize: 5,
    hasFreeSpace: true,
    freeSpaceText: "FREE",
    colorScheme: "blue"
  },
  {
    id: "type-2",
    name: "4x4 Quick Play",
    listId: "list-2",
    gridSize: 4,
    hasFreeSpace: false,
    freeSpaceText: "",
    colorScheme: "green"
  }
]

export default function GamePage() {
  const [tabValue, setTabValue] = useState("lists")
  const [lists, setLists] = useState(initialLists)
  const [cardTypes, setCardTypes] = useState(initialCardTypes)

  const [selectedCardTypeId, setSelectedCardTypeId] = useState<string>(
    initialCardTypes[0].id
  )
  const [cardCount, setCardCount] = useState("10")

  const [tourOpen, setTourOpen] = useState(false)

  const handleAddList = () => {
    const newId = `list-${lists.length + 1}`
    setLists([...lists, { id: newId, name: "New List", items: [] }])
  }

  const handleAddListItem = (listId: string) => {
    const newItemId = `item-${Math.random().toString(36).substr(2, 9)}`
    setLists(prev =>
      prev.map(l => {
        if (l.id === listId) {
          return {
            ...l,
            items: [
              ...l.items,
              { id: newItemId, text: "New Item", isMandatory: false }
            ]
          }
        }
        return l
      })
    )
  }

  const handleAddCardType = () => {
    const newId = `type-${cardTypes.length + 1}`
    setCardTypes([
      ...cardTypes,
      {
        id: newId,
        name: "New Card Type",
        listId: lists[0]?.id || "",
        gridSize: 5,
        hasFreeSpace: false,
        freeSpaceText: "",
        colorScheme: "blue"
      }
    ])
  }

  const handleGenerateCards = () => {
    alert(
      `Generating ${cardCount} cards from Card Type: ${selectedCardTypeId}... (stub)`
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Game Page (Single Page Flow)</h1>

        <Popover open={tourOpen} onOpenChange={setTourOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost">Help/Tour</Button>
          </PopoverTrigger>
          <PopoverContent className="max-w-sm space-y-2 text-sm">
            <p>
              <strong>Lists:</strong> Create or attach a list, add items, mark
              mandatory if needed.
            </p>
            <p>
              <strong>Card Types:</strong> Set grid size, free space text, color
              scheme, etc.
            </p>
            <p>
              <strong>Card Generation:</strong> Pick a card type and quantity,
              then generate PDF or links.
            </p>
            <p>
              Once you’re done, click “Start Live Session” to begin calling
              items.
            </p>
          </PopoverContent>
        </Popover>
      </div>

      <Tabs value={tabValue} onValueChange={setTabValue}>
        <TabsList>
          <TabsTrigger value="lists">Lists</TabsTrigger>
          <TabsTrigger value="card-types">Card Types</TabsTrigger>
          <TabsTrigger value="generation">Card Generation</TabsTrigger>
        </TabsList>

        <TabsContent value="lists" className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Manage Lists</h2>
            <Button onClick={handleAddList}>+ Add List</Button>
          </div>
          <div className="space-y-4">
            {lists.map(list => (
              <Card key={list.id}>
                <CardHeader>
                  <CardTitle>{list.name}</CardTitle>
                  <CardDescription>A group of items for Bingo.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="outline"
                    onClick={() => handleAddListItem(list.id)}
                  >
                    + Add Item
                  </Button>
                  <div className="space-y-2">
                    {list.items.map(item => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-md border p-2"
                      >
                        <p className="text-sm">{item.text}</p>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={item.isMandatory}
                            onCheckedChange={checked => {
                              const value =
                                typeof checked === "boolean" ? checked : false
                              setLists(prev =>
                                prev.map(l =>
                                  l.id === list.id
                                    ? {
                                        ...l,
                                        items: l.items.map(it =>
                                          it.id === item.id
                                            ? { ...it, isMandatory: value }
                                            : it
                                        )
                                      }
                                    : l
                                )
                              )
                            }}
                          />
                          <span className="text-muted-foreground text-xs">
                            Mandatory
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="card-types" className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Card Types</h2>
            <Button onClick={handleAddCardType}>+ Add Card Type</Button>
          </div>
          <div className="space-y-4">
            {cardTypes.map(type => (
              <Card key={type.id}>
                <CardHeader>
                  <CardTitle>{type.name}</CardTitle>
                  <CardDescription>
                    References list: {type.listId}
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-2 text-sm">
                  <Label>
                    Grid Size: {type.gridSize}x{type.gridSize}
                  </Label>
                  {type.hasFreeSpace && (
                    <Label>Free Space: {type.freeSpaceText || "(none)"}</Label>
                  )}
                  <Label>Color Scheme: {type.colorScheme}</Label>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="generation" className="mt-4 space-y-4">
          <h2 className="text-xl font-semibold">Generate Cards</h2>
          <div className="max-w-md space-y-2">
            <Label>Choose Card Type</Label>
            <select
              className={cn("w-full rounded-md border p-2")}
              value={selectedCardTypeId}
              onChange={e => setSelectedCardTypeId(e.target.value)}
            >
              {cardTypes.map(ct => (
                <option key={ct.id} value={ct.id}>
                  {ct.name}
                </option>
              ))}
            </select>

            <Label>Quantity</Label>
            <Input
              type="number"
              min="1"
              value={cardCount}
              onChange={e => setCardCount(e.target.value)}
            />

            <Button onClick={handleGenerateCards}>Generate</Button>
          </div>
        </TabsContent>
      </Tabs>

      <Button
        variant="ghost"
        onClick={() => alert("Starting live session... (stub)")}
      >
        Start Live Session
      </Button>
    </div>
  )
}
