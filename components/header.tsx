"use client"

import { Button } from "@/components/ui/button"
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton
} from "@clerk/nextjs"
import { Menu, Rocket, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ThemeSwitcher } from "./utilities/theme-switcher"

interface HeaderProps {
  variant?: "marketing" | "dashboard"
}

const marketingNavItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Pricing", href: "/pricing" }
]

export default function Header({ variant = "marketing" }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (variant === "dashboard") {
    return (
      <header className="bg-background/90 sticky top-0 z-50 shadow-sm backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <Link href="/dashboard" className="text-xl font-bold">
              Bingo Manager
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeSwitcher />
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <Button variant="outline">Login</Button>
              </SignInButton>
              <SignUpButton>
                <Button>Sign Up</Button>
              </SignUpButton>
            </SignedOut>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        isScrolled
          ? "bg-background/80 shadow-sm backdrop-blur-sm"
          : "bg-background"
      }`}
    >
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <Rocket className="size-6" />
          <Link href="/" className="text-xl font-bold">
            Bingo Manager
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-8 md:flex">
          {marketingNavItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="text-foreground/60 hover:text-foreground/80"
            >
              {item.label}
            </Link>
          ))}
          <ThemeSwitcher />
          <SignedIn>
            <Link href="/dashboard">
              <Button>Dashboard</Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button variant="outline">Login</Button>
            </SignInButton>
            <SignUpButton>
              <Button>Sign Up</Button>
            </SignUpButton>
          </SignedOut>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="text-muted-foreground hover:text-foreground md:hidden"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="border-b md:hidden">
          <div className="space-y-4 p-4">
            {marketingNavItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground/60 hover:text-foreground/80 block"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center gap-4 pt-4">
              <ThemeSwitcher />
              <SignedIn>
                <Link href="/dashboard">
                  <Button>Dashboard</Button>
                </Link>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <SignInButton>
                  <Button variant="outline">Login</Button>
                </SignInButton>
                <SignUpButton>
                  <Button>Sign Up</Button>
                </SignUpButton>
              </SignedOut>
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
