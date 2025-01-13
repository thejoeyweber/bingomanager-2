"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface BingoCardGridProps {
  items: string[]
  calledItems: string[]
  markedSquares: Record<number, boolean> // which squares the user has marked
  onToggleSquare?: (index: number) => void // optional callback for toggling a mark
  readOnly?: boolean
  gridSize?: number // default to 5 if not provided
}

export default function BingoCardGrid({
  items,
  calledItems,
  markedSquares,
  onToggleSquare,
  readOnly = false,
  gridSize = 5
}: BingoCardGridProps) {
  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
    >
      {items.map((item, index) => {
        const isCalled = calledItems.includes(item)
        const isMarked = Boolean(markedSquares[index])
        return (
          <div
            key={item + index}
            className={cn(
              "flex aspect-square cursor-pointer items-center justify-center rounded border p-2 text-sm transition-colors",
              isCalled && "bg-blue-100 dark:bg-blue-900",
              isMarked && "bg-green-300 dark:bg-green-700",
              readOnly && "cursor-not-allowed opacity-80"
            )}
            onClick={() => {
              if (!readOnly && onToggleSquare) {
                onToggleSquare(index)
              }
            }}
          >
            {item}
          </div>
        )
      })}
    </div>
  )
}
