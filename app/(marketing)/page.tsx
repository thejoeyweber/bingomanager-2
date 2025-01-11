"use server"

import { FeaturesSection } from "@/components/landing/features"
import { HeroSection } from "@/components/landing/hero"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function HomePage() {
  return (
    <div className="pb-20">
      <HeroSection />
      <div className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Welcome to Bingo Manager
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Create, manage, and run professional bingo games from anywhere,
              with real-time calling and claims.
            </p>
          </CardContent>
        </Card>
      </div>
      <FeaturesSection />
    </div>
  )
}
