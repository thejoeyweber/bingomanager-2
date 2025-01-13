/*
<ai_context>
This client component provides the sidebar for the app.
</ai_context>
*/

"use client"

import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"
import { GalleryVerticalEnd, AudioWaveform, Command } from "lucide-react"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Updated navMain items for “My Games,” “Lists,” “Reports,” “Billing,” “Settings”
  const navMain = [
    {
      title: "My Games",
      url: "/dashboard",
      icon: GalleryVerticalEnd,
      items: []
    },
    {
      title: "Lists",
      url: "/dashboard/lists",
      icon: AudioWaveform,
      items: []
    },
    {
      title: "Reports",
      url: "/dashboard/reports",
      icon: Command,
      items: []
    },
    {
      title: "Billing",
      url: "/dashboard/settings/account#billing",
      icon: Command,
      items: []
    },
    {
      title: "Settings",
      url: "/dashboard/settings/account",
      icon: Command,
      items: []
    }
  ]

  return (
    <Sidebar collapsible="icon" className="border-r" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={[]} />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
