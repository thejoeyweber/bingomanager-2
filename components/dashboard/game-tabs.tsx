"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Suspense } from "react"
import { LoadingTab } from "@/components/dashboard/loading-tab"
import { OverviewTab } from "@/components/dashboard/overview/overview-tab"
import { ListsTab } from "@/components/dashboard/list/lists-tab"
import { CardTypesTab } from "@/components/dashboard/card-type/card-types-tab"
import { GenerationTab } from "@/components/dashboard/generation/generation-tab"
import { SettingsTab } from "@/components/dashboard/settings/settings-tab"
import { useRouter } from "next/navigation"

interface GameTabsProps {
  gameId: string
  defaultTab: string
}

export function GameTabs({ gameId, defaultTab }: GameTabsProps) {
  const router = useRouter()

  return (
    <Tabs
      defaultValue={defaultTab}
      className="space-y-4"
      onValueChange={value => {
        const url = new URL(window.location.href)
        url.searchParams.set("tab", value)
        window.history.pushState({}, "", url)
      }}
    >
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="lists">Lists</TabsTrigger>
        <TabsTrigger value="card-types">Card Types</TabsTrigger>
        <TabsTrigger value="generation">Generation</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <Suspense fallback={<LoadingTab />}>
          <OverviewTab gameId={gameId} />
        </Suspense>
      </TabsContent>

      <TabsContent value="lists" className="space-y-4">
        <Suspense fallback={<LoadingTab />}>
          <ListsTab gameId={gameId} />
        </Suspense>
      </TabsContent>

      <TabsContent value="card-types" className="space-y-4">
        <Suspense fallback={<LoadingTab />}>
          <CardTypesTab gameId={gameId} />
        </Suspense>
      </TabsContent>

      <TabsContent value="generation" className="space-y-4">
        <Suspense fallback={<LoadingTab />}>
          <GenerationTab gameId={gameId} />
        </Suspense>
      </TabsContent>

      <TabsContent value="settings" className="space-y-4">
        <Suspense fallback={<LoadingTab />}>
          <SettingsTab gameId={gameId} />
        </Suspense>
      </TabsContent>
    </Tabs>
  )
}
