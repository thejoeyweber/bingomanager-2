"use client"

import React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CallHistoryListProps {
  calls: string[]
}

export function CallHistoryList({ calls }: CallHistoryListProps) {
  return (
    <div className="rounded-md border p-2">
      <h3 className="mb-2 text-sm font-semibold">Called Items</h3>
      <ScrollArea className="h-40 w-full rounded border bg-white p-2 dark:bg-neutral-900">
        <ul className="space-y-1">
          {calls.length === 0 && (
            <li className="text-muted-foreground">No calls yet</li>
          )}
          {calls.map((call, idx) => (
            <li key={idx} className={idx === 0 ? "font-bold" : ""}>
              {call}
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  )
}
