"use client"

import { useState, useRef, useEffect, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { mockTherapists } from "@/lib/mock-data"
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Calendar,
  Clock,
  Video,
  MessageSquare,
  ArrowRight
} from "lucide-react"
import { 
  SoundWaveIcon, 
  CheckmarkIcon, 
  HeartHandIcon, 
  BrainIcon, 
  TargetIcon, 
  ShieldIcon 
} from "@/components/icons"

export default function TherapistProfilePage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = use(params)
  const therapist = mockTherapists.find(t => t.id === id)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const togglePlay = () => {
    if (!therapist) return
    
    if (isPlaying) {
      setIsPlaying(false)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    } else {
      setIsPlaying(true)
      const duration = therapist.voiceIntroDuration * 1000
      const increment = 100 / (duration / 100)
      
      intervalRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false)
            if (intervalRef.current) clearInterval(intervalRef.current)
            return 0
          }
          return prev + increment
        })
      }, 100)
    }
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  if (!therapist) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="font-serif text-2xl font-normal">Therapist not found</h1>
          <Button asChild className="mt-6 rounded-full">
            <Link href="/matches">Back to matches</Link>
          </Button>
        </div>
      </div>
    )
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full bg-background">
        <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-6">
          <Link href="/matches" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to matches</span>
          </Link>
          
          <Link href="/" className="flex items-center">
            <span className="font-serif text-2xl font-normal tracking-tight text-foreground">Kindred</span>
          </Link>
          
          <div className="w-28" />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Left Column - Photo and Quick Actions */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border border-border">
              <CardContent className="p-8">
                {/* Photo */}
                <div className="overflow-hidden rounded-2xl">
                  <Image
                    src={therapist.photo}
                    alt={therapist.name}
                    width={400}
                    height={400}
                    className="aspect-square w-full object-cover"
                  />
                </div>

                {/* Match Score */}
                <div className="mt-5 flex items-center justify-center">
                  <Badge variant="default" className="rounded-full bg-primary px-5 py-2 text-sm font-medium">
                    {therapist.matchScore}% match for you
                  </Badge>
                </div>

                {/* Voice Intro */}
                <div className="mt-8 rounded-xl bg-muted/50 p-5">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={togglePlay}
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all hover:scale-105 active:scale-95"
                    >
                      {isPlaying ? (
                        <Pause className="h-6 w-6" />
                      ) : (
                        <Play className="ml-0.5 h-6 w-6" />
                      )}
                    </button>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <SoundWaveIcon className="h-4 w-4 text-secondary" />
                        Hear my voice
                      </div>
                      <div className="mt-2.5">
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-background">
                          <div 
                            className="h-full bg-primary transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <div className="mt-1.5 flex justify-between text-xs text-muted-foreground">
                          <span>{formatTime(Math.floor((progress / 100) * therapist.voiceIntroDuration))}</span>
                          <span>{formatTime(therapist.voiceIntroDuration)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="mt-8 space-y-3.5 text-sm">
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{therapist.availability}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Video className="h-4 w-4 text-muted-foreground" />
                    <span>{therapist.sessionFormat.join(" & ")}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2a7 7 0 0 1 7 7" />
                    </svg>
                    <span>{therapist.languages.join(", ")}</span>
                  </div>
                </div>

                <Separator className="my-8" />

                {/* Pricing */}
                <div className="text-center">
                  <div className="font-serif text-4xl font-normal">${therapist.sessionRate}</div>
                  <div className="mt-1 text-muted-foreground">per session</div>
                  {therapist.acceptsInsurance.length > 0 && (
                    <div className="mt-3 text-sm text-muted-foreground">
                      Accepts: {therapist.acceptsInsurance.join(", ")}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-8 space-y-3">
                  <Button asChild className="w-full gap-2 rounded-full">
                    <Link href={`/client/book/${therapist.id}?type=session`}>
                      <Calendar className="h-4 w-4" />
                      Book a Session
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full gap-2 rounded-full">
                    <MessageSquare className="h-4 w-4" />
                    Send a Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Full Profile */}
          <div className="space-y-8 lg:col-span-2">
            {/* Header */}
            <div>
              <h1 className="font-serif text-[2rem] font-normal tracking-tight">{therapist.name}</h1>
              <p className="mt-2 text-lg text-muted-foreground">{therapist.credentials}</p>
              <p className="mt-1 text-muted-foreground">{therapist.yearsExperience} years of experience</p>
            </div>

            {/* Bio */}
            <Card className="border border-border">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 font-serif text-lg font-normal">
                  <HeartHandIcon className="h-5 w-5 text-primary" />
                  About Me
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-muted-foreground">
                  {therapist.bio}
                </p>
              </CardContent>
            </Card>

            {/* Approach */}
            <Card className="border border-border">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 font-serif text-lg font-normal">
                  <BrainIcon className="h-5 w-5 text-primary" />
                  My Approach
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h4 className="text-sm font-medium uppercase tracking-[0.15em] text-secondary">Therapeutic Approach</h4>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{therapist.approach}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium uppercase tracking-[0.15em] text-secondary">Communication Style</h4>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{therapist.communicationStyle}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium uppercase tracking-[0.15em] text-secondary">Depth Orientation</h4>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{therapist.depthOrientation}</p>
                </div>
              </CardContent>
            </Card>

            {/* Specialties */}
            <Card className="border border-border">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 font-serif text-lg font-normal">
                  <TargetIcon className="h-5 w-5 text-primary" />
                  Specialties
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2.5">
                  {therapist.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="rounded-full bg-muted px-4 py-1.5 text-muted-foreground">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cultural Background */}
            <Card className="border border-border">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 font-serif text-lg font-normal">
                  <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  Background & Identity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-muted-foreground">{therapist.culturalBackground}</p>
              </CardContent>
            </Card>

            {/* Why This Match */}
            <Card className="border-2 border-primary/20 bg-primary/5">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 font-serif text-lg font-normal text-primary">
                  <ShieldIcon className="h-5 w-5" />
                  Why Kindred Matched You
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {therapist.matchReasons.map((reason, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckmarkIcon className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                      <span className="leading-relaxed text-muted-foreground">{reason}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* CTA */}
            <div className="flex flex-col items-center gap-5 rounded-2xl border border-border bg-card p-10 text-center">
              <h3 className="font-serif text-xl font-normal">Ready to connect?</h3>
              <p className="leading-relaxed text-muted-foreground">
                Book a session with {therapist.name.split(" ")[0]} and walk in already knowing it could be the one.
              </p>
              <Button asChild size="lg" className="gap-2 rounded-full px-8">
                <Link href={`/client/book/${therapist.id}?type=session`}>
                  Book a Session
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-10">
        <div className="mx-auto max-w-5xl px-6 text-center text-sm text-muted-foreground">
          <p>
            All therapist profiles are verified. 
            <Link href="/privacy" className="ml-1 text-foreground underline underline-offset-4 transition-colors hover:text-primary">
              Learn about our verification process
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
