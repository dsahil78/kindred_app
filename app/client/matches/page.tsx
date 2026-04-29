"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { mockTherapists, generateMatchResults } from "@/lib/mock-data"
import { ArrowRight, Play, Pause, Clock, Star, Video, MapPin } from "lucide-react"

export default function ClientMatchesPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [matches, setMatches] = useState<ReturnType<typeof generateMatchResults>>([])
  const [playingAudio, setPlayingAudio] = useState<string | null>(null)

  useEffect(() => {
    // Simulate AI matching
    const timer = setTimeout(() => {
      setMatches(generateMatchResults({}))
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
        <div className="text-center">
          <div className="mx-auto mb-6 h-16 w-16 animate-pulse rounded-full bg-primary/20" />
          <h1 className="font-serif text-2xl font-medium text-foreground">
            Finding your matches
          </h1>
          <p className="mt-2 text-muted-foreground">
            Analyzing your preferences and finding the best fit...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link href="/" className="font-serif text-xl text-foreground">Kindred</Link>
          <Link href="/client/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
            Dashboard
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-10">
          <h1 className="font-serif text-3xl font-medium text-foreground">
            Your matches
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Based on your preferences, here are the therapists we think would be a great fit.
          </p>
        </div>

        <div className="space-y-6">
          {matches.map((match, index) => (
            <div
              key={match.therapist.id}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="flex flex-col gap-6 p-6 md:flex-row">
                {/* Photo and Quick Info */}
                <div className="flex shrink-0 flex-col items-center gap-4 md:w-48">
                  <div className="relative">
                    <Image
                      src={match.therapist.photo}
                      alt={match.therapist.name}
                      width={120}
                      height={120}
                      className="rounded-full object-cover"
                    />
                    <div className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                      {match.therapist.matchScore}%
                    </div>
                  </div>
                  
                  {/* Voice Intro */}
                  <button
                    onClick={() => setPlayingAudio(playingAudio === match.therapist.id ? null : match.therapist.id)}
                    className="flex items-center gap-2 rounded-full bg-secondary/20 px-4 py-2 text-sm text-secondary transition-colors hover:bg-secondary/30"
                  >
                    {playingAudio === match.therapist.id ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                    Voice intro
                  </button>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-serif text-xl font-medium text-foreground">
                        {match.therapist.name}
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {match.therapist.credentials}
                      </p>
                    </div>
                    {index === 0 && (
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        Best Match
                      </span>
                    )}
                  </div>

                  <p className="mt-3 text-foreground">
                    {match.therapist.shortBio}
                  </p>

                  {/* Quick Stats */}
                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {match.therapist.yearsExperience} years
                    </span>
                    <span className="flex items-center gap-1">
                      <Video className="h-4 w-4" />
                      {match.therapist.sessionFormat.join(", ")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      ${match.therapist.sessionRate}/session
                    </span>
                  </div>

                  {/* Specialties */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {match.therapist.specialties.slice(0, 4).map((specialty) => (
                      <span
                        key={specialty}
                        className="rounded-full bg-muted px-3 py-1 text-xs text-foreground"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  {/* Why matched */}
                  <div className="mt-4 rounded-xl bg-secondary/5 p-4">
                    <p className="text-sm font-medium text-secondary">Why we matched you:</p>
                    <p className="mt-1 text-sm text-foreground">{match.fitExplanation}</p>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    {match.therapist.offersFreeConsultation && (
                      <Button
                        onClick={() => router.push(`/client/book/${match.therapist.id}?type=consultation`)}
                        className="rounded-full"
                      >
                        Book free {match.therapist.freeConsultationDuration}-min consultation
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant={match.therapist.offersFreeConsultation ? "outline" : "default"}
                      onClick={() => router.push(`/client/book/${match.therapist.id}?type=session`)}
                      className="rounded-full"
                    >
                      {match.therapist.offersFreeConsultation ? "Schedule session" : "Book session"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => router.push(`/client/therapist/${match.therapist.id}`)}
                      className="rounded-full"
                    >
                      View full profile
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
