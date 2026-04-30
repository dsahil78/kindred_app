"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Calendar, Clock, MapPin, Video, ArrowRight } from "lucide-react"
import { CheckmarkIcon, SoundWaveIcon } from "@/components/icons"
import type { MatchResult } from "@/lib/types"

interface TherapistCardProps {
  match: MatchResult
  rank: number
  offersFreeConsultation?: boolean
}

export function TherapistCard({ match, rank, offersFreeConsultation = false }: TherapistCardProps) {
  const { therapist, fitExplanation, keyStrengths } = match
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const togglePlay = () => {
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card className="overflow-hidden border border-border py-0">
      <CardContent className="p-0">
        <div className="flex flex-col lg:flex-row">
          {/* Left Column - Photo and Basic Info */}
          <div className="bg-muted/30 p-6 lg:w-80 lg:shrink-0">
            <div className="flex flex-col items-center text-center">
              {/* Match Badge */}
              <Badge
                variant="default"
                className="mb-4 rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground"
              >
                #{rank} Match · {therapist.matchScore}% fit
              </Badge>
              
              {/* Photo */}
              <div className="relative">
                <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-background shadow-sm lg:h-40 lg:w-40">
                  <Image
                    src={therapist.photo}
                    alt={therapist.name}
                    width={160}
                    height={160}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              
              {/* Name and Credentials */}
              <div className="mt-4">
                <h3 className="font-serif text-xl font-normal">{therapist.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{therapist.credentials}</p>
                <p className="text-sm text-muted-foreground">{therapist.yearsExperience} years experience</p>
                {therapist.location && (
                  <p className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {therapist.location}
                  </p>
                )}
              </div>
            </div>

            {/* Voice Intro Player */}
            <div className="mt-5 rounded-xl bg-background p-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all hover:scale-105 active:scale-95"
                  aria-label={isPlaying ? "Pause voice intro" : "Play voice intro"}
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="ml-0.5 h-5 w-5" />
                  )}
                </button>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <SoundWaveIcon className="h-4 w-4 text-secondary" />
                    Voice Intro
                  </div>
                  <div className="mt-2.5">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div 
                        className="h-full bg-primary transition-all duration-100"
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
            <div className="mt-5 space-y-2 text-sm">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Clock className="h-4 w-4" />
                {therapist.availability}
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Video className="h-4 w-4" />
                {therapist.sessionFormat.join(" & ")}
              </div>
              <div className="flex items-center gap-3">
                <span className="font-medium text-foreground">${therapist.sessionRate}</span>
                <span className="text-muted-foreground">per session</span>
              </div>
            </div>
          </div>

          {/* Right Column - Match Details */}
          <div className="flex-1 p-6 lg:p-8">
            {/* Short Bio */}
            <p className="font-serif text-xl font-normal italic leading-relaxed text-muted-foreground">
              &ldquo;{therapist.shortBio}&rdquo;
            </p>

            {/* Why This Match */}
            <div className="mt-6">
              <h4 className="text-sm font-medium uppercase tracking-[0.15em] text-secondary">Why Kindred matched you</h4>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {fitExplanation}
              </p>
            </div>

            {/* Key Strengths */}
            <div className="mt-6">
              <h4 className="font-medium text-foreground">Key strengths for your needs</h4>
              <ul className="mt-3 space-y-2.5">
                {keyStrengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-3 text-muted-foreground">
                    <CheckmarkIcon className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                    <span className="leading-relaxed">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specialties */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-muted-foreground">Specialties</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {therapist.specialties.map((specialty) => (
                  <Badge key={specialty} variant="secondary" className="rounded-full bg-muted px-3.5 py-1 text-muted-foreground">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Free intro highlight */}
            {offersFreeConsultation && (
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-secondary/30 bg-secondary/10 p-3 text-sm leading-relaxed text-foreground">
                <CheckmarkIcon className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                <span>
                  <span className="font-medium">Offering a free 15-min intro session</span> — see if
                  the fit feels right before committing.
                </span>
              </div>
            )}

            {/* Actions */}
            <div className={`flex flex-col gap-3 sm:flex-row ${offersFreeConsultation ? "mt-4" : "mt-7"}`}>
              {offersFreeConsultation ? (
                <>
                  <Button asChild className="flex-1 gap-2 rounded-full">
                    <Link href={`/client/book/${therapist.id}?type=consultation`}>
                      <Calendar className="h-4 w-4" />
                      Book a 15-min Free Session
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="flex-1 gap-2 rounded-full">
                    <Link href={`/therapist/${therapist.id}`}>
                      View Full Profile
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild className="flex-1 gap-2 rounded-full">
                    <Link href={`/therapist/${therapist.id}`}>
                      View Full Profile
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="flex-1 gap-2 rounded-full">
                    <Link href={`/client/book/${therapist.id}?type=session`}>
                      <Calendar className="h-4 w-4" />
                      Book a Session
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
