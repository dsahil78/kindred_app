"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { mockTherapists, mockSessions } from "@/lib/mock-data"
import { Calendar, Clock, Video, MessageSquare, ArrowRight, Plus } from "lucide-react"
import { UserMenu } from "@/components/user-menu"

function DashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const justBooked = searchParams.get("booked") === "true"
  const [showBookedMessage, setShowBookedMessage] = useState(justBooked)

  useEffect(() => {
    if (justBooked) {
      const timer = setTimeout(() => setShowBookedMessage(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [justBooked])

  // Mock current therapist and upcoming sessions
  const currentTherapist = mockTherapists[0]
  const upcomingSessions = mockSessions.filter(s => s.status === "scheduled")
  const pastSessions = mockSessions.filter(s => s.status === "completed")

  const formatDateTime = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="font-serif text-xl text-foreground">Kindred</Link>
          <nav className="flex items-center gap-6">
            <Link href="/matches" className="text-sm text-muted-foreground hover:text-foreground">
              Find Therapists
            </Link>
            <Link href="/client/messages" className="text-sm text-muted-foreground hover:text-foreground">
              Messages
            </Link>
            <UserMenu settingsHref="/client/settings" />
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* Success Message */}
        {showBookedMessage && (
          <div className="mb-8 rounded-xl bg-secondary/10 p-4 text-secondary">
            <p className="font-medium">Session booked successfully.</p>
            <p className="text-sm">You will receive a confirmation email shortly.</p>
          </div>
        )}

        <h1 className="font-serif text-3xl font-medium text-foreground">Welcome back</h1>
        <p className="mt-2 text-muted-foreground">Manage your therapy journey</p>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Sessions */}
            <section>
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl font-medium text-foreground">Upcoming sessions</h2>
                <Button variant="ghost" size="sm" className="rounded-full">
                  <Plus className="mr-1 h-4 w-4" />
                  Book new
                </Button>
              </div>

              {upcomingSessions.length > 0 ? (
                <div className="mt-4 space-y-4">
                  {upcomingSessions.map((session) => {
                    const therapist = mockTherapists.find(t => t.id === session.therapistId)
                    return (
                      <div
                        key={session.id}
                        className="flex items-center justify-between rounded-2xl border border-border bg-card p-5"
                      >
                        <div className="flex items-center gap-4">
                          {therapist && (
                            <Image
                              src={therapist.photo}
                              alt={therapist.name}
                              width={48}
                              height={48}
                              className="rounded-full object-cover"
                            />
                          )}
                          <div>
                            <p className="font-medium text-foreground">
                              {session.isFreeConsultation ? "Free Consultation" : "Therapy Session"}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              with {therapist?.name}
                            </p>
                            <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5" />
                                {formatDateTime(session.scheduledAt)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {session.duration} min
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={() => router.push(`/session/${session.id}`)}
                          className="rounded-full"
                        >
                          <Video className="mr-2 h-4 w-4" />
                          Join
                        </Button>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="mt-4 rounded-2xl border border-dashed border-border p-8 text-center">
                  <Calendar className="mx-auto h-10 w-10 text-muted-foreground" />
                  <p className="mt-3 font-medium text-foreground">No upcoming sessions</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Book a session with your therapist
                  </p>
                  <Button
                    onClick={() => router.push("/client/matches")}
                    variant="outline"
                    className="mt-4 rounded-full"
                  >
                    Find a therapist
                  </Button>
                </div>
              )}
            </section>

            {/* Past Sessions */}
            {pastSessions.length > 0 && (
              <section>
                <h2 className="font-serif text-xl font-medium text-foreground">Past sessions</h2>
                <div className="mt-4 space-y-3">
                  {pastSessions.map((session) => {
                    const therapist = mockTherapists.find(t => t.id === session.therapistId)
                    const needsFeedback = !session.clientFeedback
                    return (
                      <div
                        key={session.id}
                        className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
                      >
                        <div className="flex items-center gap-3">
                          {therapist && (
                            <Image
                              src={therapist.photo}
                              alt={therapist.name}
                              width={40}
                              height={40}
                              className="rounded-full object-cover"
                            />
                          )}
                          <div>
                            <p className="font-medium text-foreground">{therapist?.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {formatDateTime(session.scheduledAt)}
                            </p>
                          </div>
                        </div>
                        {needsFeedback && (
                          <Button
                            onClick={() => router.push(`/client/feedback/${session.id}`)}
                            variant="outline"
                            size="sm"
                            className="rounded-full"
                          >
                            Leave feedback
                          </Button>
                        )}
                      </div>
                    )
                  })}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Therapist Card */}
            {currentTherapist && (
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-sm font-medium text-muted-foreground">Your therapist</h3>
                <div className="mt-4 flex items-center gap-4">
                  <Image
                    src={currentTherapist.photo}
                    alt={currentTherapist.name}
                    width={56}
                    height={56}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-foreground">{currentTherapist.name}</p>
                    <p className="text-sm text-muted-foreground">{currentTherapist.credentials}</p>
                  </div>
                </div>
                <div className="mt-5 flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 rounded-full"
                    onClick={() => router.push(`/client/book/${currentTherapist.id}?type=session`)}
                  >
                    Book session
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 rounded-full"
                  >
                    <MessageSquare className="mr-1 h-4 w-4" />
                    Message
                  </Button>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-sm font-medium text-muted-foreground">Quick actions</h3>
              <div className="mt-4 space-y-2">
                <button
                  onClick={() => router.push("/client/insights")}
                  className="flex w-full items-center justify-between rounded-xl p-3 text-left transition-colors hover:bg-muted"
                >
                  <span className="text-sm text-foreground">View your progress</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </button>
                <button
                  onClick={() => router.push("/matches")}
                  className="flex w-full items-center justify-between rounded-xl p-3 text-left transition-colors hover:bg-muted"
                >
                  <span className="text-sm text-foreground">Find a new therapist</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </button>
                <button
                  className="flex w-full items-center justify-between rounded-xl p-3 text-left transition-colors hover:bg-muted"
                >
                  <span className="text-sm text-foreground">Update preferences</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </button>
                <button
                  className="flex w-full items-center justify-between rounded-xl p-3 text-left transition-colors hover:bg-muted"
                >
                  <span className="text-sm text-foreground">Manage insurance</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function ClientDashboardPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="mt-4 text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  )
}
