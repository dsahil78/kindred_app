"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TherapistCard } from "@/components/therapist-card"
import { generateMatchResults } from "@/lib/mock-data"
import type { MatchResult } from "@/lib/types"
import { ArrowLeft, RefreshCw, HelpCircle } from "lucide-react"
import { CheckmarkIcon, BrainIcon } from "@/components/icons"

export default function MatchesPage() {
  const [matches, setMatches] = useState<MatchResult[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = sessionStorage.getItem("kindred-intake")
    const intakeData = stored ? JSON.parse(stored) : {}

    const timer = setTimeout(() => {
      const results = generateMatchResults(intakeData)
      setMatches(results)
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
        <div className="max-w-md text-center">
          <div className="relative mx-auto mb-10 h-24 w-24">
            <div className="absolute inset-0 animate-ping rounded-full bg-primary/15" style={{ animationDuration: "1.5s" }} />
            <div className="relative flex h-full w-full items-center justify-center rounded-full border-2 border-primary/20 bg-card">
              <BrainIcon className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h2 className="font-serif text-2xl font-normal text-foreground">Finding your perfect matches</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Analyzing your responses across dozens of dimensions to find therapists who truly fit you.
          </p>
          <div className="mt-10 flex justify-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-2 w-2 animate-bounce rounded-full bg-primary"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full bg-background">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
          <Link href="/intake" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Edit responses</span>
          </Link>

          <Link href="/" className="flex items-center">
            <span className="font-serif text-2xl font-normal tracking-tight text-foreground">Kindred</span>
          </Link>

          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
            <HelpCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Help</span>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12 lg:py-16">
        {/* Results Header */}
        <div className="mb-16 text-center">
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full bg-secondary/15 px-5 py-2 text-sm font-medium text-secondary">
            <CheckmarkIcon className="h-4 w-4" />
            Matching Complete
          </div>

          <h1 className="font-serif text-[2rem] font-normal leading-tight tracking-tight sm:text-[2.5rem]">
            We found {matches.length} great matches for you
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Based on what you shared, these therapists are most likely to understand you
            and help you achieve your goals. Listen to their voice intros to get a feel
            for who they are.
          </p>
        </div>

        {/* How to Use */}
        <div className="mb-16 rounded-2xl border border-border bg-card p-8 lg:p-10">
          <h3 className="font-serif text-xl font-normal">How to use your matches</h3>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-serif text-lg text-primary">
                1
              </div>
              <div>
                <p className="font-medium text-foreground">Listen to voice intros</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  Hear how each therapist sounds before committing
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-serif text-lg text-primary">
                2
              </div>
              <div>
                <p className="font-medium text-foreground">Read why they match</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  Understand what makes each therapist right for you
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-serif text-lg text-primary">
                3
              </div>
              <div>
                <p className="font-medium text-foreground">Request a consultation</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  Book a free intro call with your top choice
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Match Cards */}
        <div className="space-y-8">
          {matches.map((match, index) => (
            <TherapistCard key={match.therapist.id} match={match} rank={index + 1} />
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="mt-20 flex flex-col items-center gap-6 rounded-2xl border border-border bg-card p-10 lg:p-12 text-center">
          <h3 className="font-serif text-xl font-normal">Not quite right?</h3>
          <p className="max-w-md leading-relaxed text-muted-foreground">
            If none of these feel like the right fit, you can refine your responses
            or tell us more about what you&apos;re looking for.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="outline" className="gap-2 rounded-full" asChild>
              <Link href="/intake">
                <RefreshCw className="h-4 w-4" />
                Refine My Responses
              </Link>
            </Button>
            <Button variant="ghost" className="gap-2 text-muted-foreground">
              <HelpCircle className="h-4 w-4" />
              Talk to a Human
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-10">
        <div className="mx-auto max-w-5xl px-6 text-center text-sm text-muted-foreground">
          <p>
            Your responses and matches are private and encrypted.
            <Link href="/privacy" className="ml-1 text-foreground underline underline-offset-4 transition-colors hover:text-primary">
              Learn about our privacy practices
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
