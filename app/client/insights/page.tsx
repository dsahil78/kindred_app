"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { calculatePHQ9Severity, calculateGAD7Severity } from "@/lib/types"
import { 
  ArrowRight, 
  TrendingDown, 
  TrendingUp, 
  Minus,
  Brain,
  Heart,
  Calendar,
  Lock,
  CheckCircle
} from "lucide-react"

// Mock approved assessment data (only showing safe-to-share assessments)
const mockApprovedAssessments = [
  {
    id: "1",
    sessionDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    phq9: { score: 8, severity: "mild" as const, safeToShare: true },
    gad7: { score: 6, severity: "mild" as const, safeToShare: true }
  },
  {
    id: "2", 
    sessionDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    phq9: { score: 12, severity: "moderate" as const, safeToShare: true },
    gad7: { score: 10, severity: "moderate" as const, safeToShare: true }
  },
  {
    id: "3",
    sessionDate: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
    phq9: { score: 14, severity: "moderate" as const, safeToShare: true },
    gad7: { score: 12, severity: "moderate" as const, safeToShare: true }
  }
]

function getTrend(current: number, previous: number) {
  const diff = current - previous
  if (diff < -2) return { icon: TrendingDown, label: "Improving", color: "text-secondary" }
  if (diff > 2) return { icon: TrendingUp, label: "Needs attention", color: "text-primary" }
  return { icon: Minus, label: "Stable", color: "text-muted-foreground" }
}

function getSeverityColor(severity: string) {
  switch (severity) {
    case "none": return "bg-secondary/20 text-secondary"
    case "mild": return "bg-secondary/20 text-secondary"
    case "moderate": return "bg-yellow-500/20 text-yellow-700"
    case "moderately-severe": return "bg-orange-500/20 text-orange-700"
    case "severe": return "bg-red-500/20 text-red-700"
    default: return "bg-muted text-muted-foreground"
  }
}

export default function ClientInsightsPage() {
  const [selectedTab, setSelectedTab] = useState<"overview" | "depression" | "anxiety">("overview")
  
  const latestAssessment = mockApprovedAssessments[0]
  const previousAssessment = mockApprovedAssessments[1]
  
  const phq9Trend = previousAssessment 
    ? getTrend(latestAssessment.phq9.score, previousAssessment.phq9.score)
    : null
  const gad7Trend = previousAssessment
    ? getTrend(latestAssessment.gad7.score, previousAssessment.gad7.score)
    : null

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <Link href="/" className="font-serif text-xl text-foreground">Kindred</Link>
          <nav className="flex items-center gap-6">
            <Link href="/client/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-serif text-3xl font-medium text-foreground">Your Progress</h1>
            <p className="mt-2 text-muted-foreground">
              Track your mental health journey over time
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-secondary/10 px-3 py-1.5 text-sm text-secondary">
            <CheckCircle className="h-4 w-4" />
            <span>Verified by your therapist</span>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-border bg-card p-4">
          <Lock className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
          <div className="text-sm text-muted-foreground">
            <p>
              These insights are based on clinical assessments completed during your therapy sessions. 
              Only assessments that have been reviewed and approved for sharing are displayed here.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex gap-2 border-b border-border">
          {[
            { key: "overview", label: "Overview" },
            { key: "depression", label: "Depression (PHQ-9)" },
            { key: "anxiety", label: "Anxiety (GAD-7)" }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedTab(tab.key as typeof selectedTab)}
              className={`px-4 py-3 text-sm font-medium transition-colors ${
                selectedTab === tab.key
                  ? "border-b-2 border-foreground text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {selectedTab === "overview" && (
          <div className="mt-8 space-y-8">
            {/* Current Status Cards */}
            <div className="grid gap-6 sm:grid-cols-2">
              {/* PHQ-9 Card */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <Brain className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Depression</p>
                      <p className="font-medium text-foreground">PHQ-9 Assessment</p>
                    </div>
                  </div>
                  {phq9Trend && (
                    <div className={`flex items-center gap-1 text-sm ${phq9Trend.color}`}>
                      <phq9Trend.icon className="h-4 w-4" />
                      <span>{phq9Trend.label}</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-4xl font-medium text-foreground">
                        {latestAssessment.phq9.score}
                      </span>
                      <span className="text-lg text-muted-foreground">/27</span>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-sm font-medium ${getSeverityColor(latestAssessment.phq9.severity)}`}>
                      {latestAssessment.phq9.severity.charAt(0).toUpperCase() + latestAssessment.phq9.severity.slice(1)}
                    </span>
                  </div>
                  <Progress value={(latestAssessment.phq9.score / 27) * 100} className="mt-4 h-2" />
                  <p className="mt-2 text-xs text-muted-foreground">
                    Last assessed: {formatDate(latestAssessment.sessionDate)}
                  </p>
                </div>
              </div>

              {/* GAD-7 Card */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10">
                      <Heart className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Anxiety</p>
                      <p className="font-medium text-foreground">GAD-7 Assessment</p>
                    </div>
                  </div>
                  {gad7Trend && (
                    <div className={`flex items-center gap-1 text-sm ${gad7Trend.color}`}>
                      <gad7Trend.icon className="h-4 w-4" />
                      <span>{gad7Trend.label}</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-4xl font-medium text-foreground">
                        {latestAssessment.gad7.score}
                      </span>
                      <span className="text-lg text-muted-foreground">/21</span>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-sm font-medium ${getSeverityColor(latestAssessment.gad7.severity)}`}>
                      {latestAssessment.gad7.severity.charAt(0).toUpperCase() + latestAssessment.gad7.severity.slice(1)}
                    </span>
                  </div>
                  <Progress value={(latestAssessment.gad7.score / 21) * 100} className="mt-4 h-2" />
                  <p className="mt-2 text-xs text-muted-foreground">
                    Last assessed: {formatDate(latestAssessment.sessionDate)}
                  </p>
                </div>
              </div>
            </div>

            {/* History */}
            <div>
              <h2 className="font-serif text-xl font-medium text-foreground">Assessment History</h2>
              <div className="mt-4 space-y-3">
                {mockApprovedAssessments.map((assessment) => (
                  <div
                    key={assessment.id}
                    className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {assessment.sessionDate.toLocaleDateString("en-US", { 
                            weekday: "long",
                            month: "long", 
                            day: "numeric" 
                          })}
                        </p>
                        <p className="text-sm text-muted-foreground">Session assessment</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">PHQ-9</p>
                        <p className="font-medium text-foreground">{assessment.phq9.score}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">GAD-7</p>
                        <p className="font-medium text-foreground">{assessment.gad7.score}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedTab === "depression" && (
          <div className="mt-8 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-serif text-xl font-medium text-foreground">About PHQ-9</h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                The PHQ-9 (Patient Health Questionnaire-9) is a validated tool used to screen for and 
                measure the severity of depression. Scores range from 0-27, with higher scores indicating 
                more severe symptoms.
              </p>
              <div className="mt-4 grid grid-cols-5 gap-2 text-center text-xs">
                <div className="rounded-lg bg-secondary/10 p-2">
                  <p className="font-medium text-secondary">0-4</p>
                  <p className="text-muted-foreground">None</p>
                </div>
                <div className="rounded-lg bg-secondary/20 p-2">
                  <p className="font-medium text-secondary">5-9</p>
                  <p className="text-muted-foreground">Mild</p>
                </div>
                <div className="rounded-lg bg-yellow-500/10 p-2">
                  <p className="font-medium text-yellow-700">10-14</p>
                  <p className="text-muted-foreground">Moderate</p>
                </div>
                <div className="rounded-lg bg-orange-500/10 p-2">
                  <p className="font-medium text-orange-700">15-19</p>
                  <p className="text-muted-foreground">Mod-Severe</p>
                </div>
                <div className="rounded-lg bg-red-500/10 p-2">
                  <p className="font-medium text-red-700">20-27</p>
                  <p className="text-muted-foreground">Severe</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-medium text-foreground">Your PHQ-9 Trend</h3>
              <div className="mt-6 space-y-4">
                {mockApprovedAssessments.map((assessment, index) => (
                  <div key={assessment.id} className="flex items-center gap-4">
                    <span className="w-20 text-sm text-muted-foreground">
                      {formatDate(assessment.sessionDate)}
                    </span>
                    <div className="flex-1">
                      <div className="h-4 overflow-hidden rounded-full bg-muted">
                        <div 
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${(assessment.phq9.score / 27) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className="w-10 text-right font-medium text-foreground">
                      {assessment.phq9.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedTab === "anxiety" && (
          <div className="mt-8 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-serif text-xl font-medium text-foreground">About GAD-7</h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                The GAD-7 (Generalized Anxiety Disorder-7) is a validated screening tool for anxiety. 
                Scores range from 0-21, with higher scores indicating more severe anxiety symptoms.
              </p>
              <div className="mt-4 grid grid-cols-4 gap-2 text-center text-xs">
                <div className="rounded-lg bg-secondary/10 p-2">
                  <p className="font-medium text-secondary">0-4</p>
                  <p className="text-muted-foreground">Minimal</p>
                </div>
                <div className="rounded-lg bg-secondary/20 p-2">
                  <p className="font-medium text-secondary">5-9</p>
                  <p className="text-muted-foreground">Mild</p>
                </div>
                <div className="rounded-lg bg-yellow-500/10 p-2">
                  <p className="font-medium text-yellow-700">10-14</p>
                  <p className="text-muted-foreground">Moderate</p>
                </div>
                <div className="rounded-lg bg-red-500/10 p-2">
                  <p className="font-medium text-red-700">15-21</p>
                  <p className="text-muted-foreground">Severe</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-medium text-foreground">Your GAD-7 Trend</h3>
              <div className="mt-6 space-y-4">
                {mockApprovedAssessments.map((assessment) => (
                  <div key={assessment.id} className="flex items-center gap-4">
                    <span className="w-20 text-sm text-muted-foreground">
                      {formatDate(assessment.sessionDate)}
                    </span>
                    <div className="flex-1">
                      <div className="h-4 overflow-hidden rounded-full bg-muted">
                        <div 
                          className="h-full rounded-full bg-secondary transition-all"
                          style={{ width: `${(assessment.gad7.score / 21) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className="w-10 text-right font-medium text-foreground">
                      {assessment.gad7.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 rounded-2xl border border-border bg-card p-6 text-center">
          <p className="text-muted-foreground">
            Have questions about your assessments?
          </p>
          <Button
            onClick={() => {}}
            variant="outline"
            className="mt-4 rounded-full"
          >
            Message your therapist
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  )
}
