"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { mockSessions } from "@/lib/mock-data"
import { 
  Calendar, 
  Clock, 
  Video, 
  Users, 
  TrendingUp, 
  Bell,
  ChevronRight,
  Phone,
  FileText,
  Plus
} from "lucide-react"
import { UserMenu } from "@/components/user-menu"

export default function TherapistDashboardPage() {
  const router = useRouter()
  
  // Mock data
  const upcomingSessions = mockSessions.filter(s => s.status === "scheduled")
  const completedSessions = mockSessions.filter(s => s.status === "completed")
  const pendingFeedback = completedSessions.filter(s => !s.therapistFeedback)
  
  const stats = {
    totalClients: 12,
    sessionsThisWeek: 8,
    completionRate: 96,
    avgRating: 4.8
  }

  const formatDateTime = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    })
  }

  const mockClients = [
    { id: "1", name: "Alex M.", lastSession: "2 days ago", nextSession: "Tomorrow" },
    { id: "2", name: "Jordan P.", lastSession: "1 week ago", nextSession: "Friday" },
    { id: "3", name: "Sam K.", lastSession: "3 days ago", nextSession: null }
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="font-serif text-xl text-foreground">Kindred</Link>
          <nav className="flex items-center gap-6">
            <Link href="/therapist/schedule" className="text-sm text-muted-foreground hover:text-foreground">
              Schedule
            </Link>
            <Link href="/therapist/clients" className="text-sm text-muted-foreground hover:text-foreground">
              Clients
            </Link>
            <button className="relative" aria-label="Notifications">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                3
              </span>
            </button>
            <UserMenu settingsHref="/therapist/settings" />
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-medium text-foreground">Good morning</h1>
            <p className="mt-1 text-muted-foreground">Here is your practice overview</p>
          </div>
          <Button className="rounded-full">
            <Plus className="mr-2 h-4 w-4" />
            Add availability
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{stats.totalClients}</p>
                <p className="text-sm text-muted-foreground">Active clients</p>
              </div>
            </div>
          </div>
          
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10">
                <Calendar className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{stats.sessionsThisWeek}</p>
                <p className="text-sm text-muted-foreground">Sessions this week</p>
              </div>
            </div>
          </div>
          
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                <TrendingUp className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{stats.completionRate}%</p>
                <p className="text-sm text-muted-foreground">Completion rate</p>
              </div>
            </div>
          </div>
          
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10">
                <svg className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{stats.avgRating}</p>
                <p className="text-sm text-muted-foreground">Average rating</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Today's Schedule */}
            <section>
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl font-medium text-foreground">Today&apos;s schedule</h2>
                <Link href="/therapist/schedule" className="text-sm text-primary hover:underline">
                  View full schedule
                </Link>
              </div>

              <div className="mt-4 space-y-3">
                {upcomingSessions.length > 0 ? (
                  upcomingSessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between rounded-2xl border border-border bg-card p-5"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                          <span className="text-sm font-medium text-foreground">AM</span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {session.isFreeConsultation ? "New Client Consultation" : "Session with Alex M."}
                          </p>
                          <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {formatDateTime(session.scheduledAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Video className="h-3.5 w-3.5" />
                              {session.duration} min
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full"
                          onClick={() => router.push(`/therapist/client/${session.clientId}`)}
                        >
                          <FileText className="mr-1 h-4 w-4" />
                          Notes
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => router.push(`/session/${session.id}`)}
                          className="rounded-full"
                        >
                          <Video className="mr-1 h-4 w-4" />
                          Join
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-border p-8 text-center">
                    <Calendar className="mx-auto h-10 w-10 text-muted-foreground" />
                    <p className="mt-3 font-medium text-foreground">No sessions today</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Enjoy your free time
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Pending Feedback */}
            {pendingFeedback.length > 0 && (
              <section>
                <h2 className="font-serif text-xl font-medium text-foreground">Pending session notes</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Complete notes for recent sessions
                </p>
                <div className="mt-4 space-y-3">
                  {pendingFeedback.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
                    >
                      <div>
                        <p className="font-medium text-foreground">Session with Client</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDateTime(session.scheduledAt)}
                        </p>
                      </div>
                      <Button
                        onClick={() => router.push(`/therapist/feedback/${session.id}`)}
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                      >
                        Add notes
                      </Button>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Clients */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-muted-foreground">Recent clients</h3>
                <Link href="/therapist/clients" className="text-xs text-primary hover:underline">
                  View all
                </Link>
              </div>
              <div className="mt-4 space-y-4">
                {mockClients.map((client) => (
                  <div key={client.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                        <span className="text-xs font-medium text-foreground">
                          {client.name.split(" ")[0][0]}{client.name.split(" ")[1]?.[0] || ""}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{client.name}</p>
                        <p className="text-xs text-muted-foreground">Last: {client.lastSession}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-sm font-medium text-muted-foreground">Quick actions</h3>
              <div className="mt-4 space-y-2">
                <button
                  onClick={() => router.push("/therapist/profile")}
                  className="flex w-full items-center justify-between rounded-xl p-3 text-left transition-colors hover:bg-muted"
                >
                  <span className="text-sm text-foreground">Edit profile</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
                <button
                  className="flex w-full items-center justify-between rounded-xl p-3 text-left transition-colors hover:bg-muted"
                >
                  <span className="text-sm text-foreground">Manage availability</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
                <button
                  className="flex w-full items-center justify-between rounded-xl p-3 text-left transition-colors hover:bg-muted"
                >
                  <span className="text-sm text-foreground">View earnings</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
                <button
                  className="flex w-full items-center justify-between rounded-xl p-3 text-left transition-colors hover:bg-muted"
                >
                  <span className="text-sm text-foreground">Referral program</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
