"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full px-12 sm:px-16 backdrop-blur transition-colors duration-300 lg:px-20",
        scrolled
          ? "border-b border-border/60 bg-background/85 supports-[backdrop-filter]:bg-background/70"
          : "border-b border-transparent bg-background"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between transition-all duration-300",
          scrolled ? "h-14" : "h-20"
        )}
      >
        <Link href="/" className="flex items-center">
          <span
            className={cn(
              "font-serif font-normal tracking-tight text-foreground transition-all duration-300",
              scrolled ? "text-xl" : "text-2xl"
            )}
          >
            Kindred
          </span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-5 lg:gap-6">
          <Link
            href="/auth"
            className="hidden text-sm font-medium text-foreground/80 transition-colors hover:text-foreground sm:inline-flex"
          >
            Sign In
          </Link>
          <Link
            href="/therapists"
            className="hidden text-sm font-medium text-foreground/80 transition-colors hover:text-foreground md:inline-flex"
          >
            For Therapists
          </Link>
          <Button
            asChild
            className={cn(
              "rounded-full transition-all duration-300",
              scrolled ? "h-9 px-4 text-sm" : "h-10 px-5 text-sm"
            )}
          >
            <Link href="/auth?mode=signup&role=client">
              Get Started
              <ArrowRight
                className={cn(
                  "ml-2 transition-all duration-300",
                  scrolled ? "h-3.5 w-3.5" : "h-4 w-4"
                )}
              />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
