"use client"

import { useState, use } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { mockSessions, mockTherapists } from "@/lib/mock-data"
import { phq9Questions, phq9ResponseOptions, gad7Questions, gad7ResponseOptions, calculatePHQ9Severity, calculateGAD7Severity, autoReviewAssessment } from "@/lib/types"
import { ArrowRight, ArrowLeft, Check, ClipboardList, Brain, AlertTriangle } from "lucide-react"

type Step = "notes" | "phq9" | "gad7" | "complete"

export default function TherapistFeedbackPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = use(params)
  const router = useRouter()
  
  const session = mockSessions.find(s => s.id === sessionId)
  
  const [step, setStep] = useState<Step>("notes")
  
  // Session Notes
  const [sessionNotes, setSessionNotes] = useState("")
  const [whatWorkedWell, setWhatWorkedWell] = useState("")
  const [whatDidNotWork, setWhatDidNotWork] = useState("")
  const [progressObservations, setProgressObservations] = useState("")
  const [recommendedNextSteps, setRecommendedNextSteps] = useState("")
  const [adjustMatchPreferences, setAdjustMatchPreferences] = useState("")
  
  // Assessments
  const [phq9Responses, setPhq9Responses] = useState<number[]>(new Array(9).fill(-1))
  const [gad7Responses, setGad7Responses] = useState<number[]>(new Array(7).fill(-1))
  const [skipAssessments, setSkipAssessments] = useState(false)
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [phq9Review, setPhq9Review] = useState<ReturnType<typeof autoReviewAssessment> | null>(null)
  const [gad7Review, setGad7Review] = useState<ReturnType<typeof autoReviewAssessment> | null>(null)

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Session not found</p>
      </div>
    )
  }

  const phq9Score = phq9Responses.filter(r => r >= 0).reduce((a, b) => a + b, 0)
  const gad7Score = gad7Responses.filter(r => r >= 0).reduce((a, b) => a + b, 0)
  const phq9Complete = phq9Responses.every(r => r >= 0)
  const gad7Complete = gad7Responses.every(r => r >= 0)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Auto-review assessments if completed
    if (!skipAssessments && phq9Complete && gad7Complete) {
      const phq9ReviewResult = autoReviewAssessment("phq9", phq9Score, phq9Responses)
      const gad7ReviewResult = autoReviewAssessment("gad7", gad7Score, gad7Responses)
      setPhq9Review(phq9ReviewResult)
      setGad7Review(gad7ReviewResult)
    }
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    setStep("complete")
    setIsSubmitting(false)
  }

  const steps: Step[] = skipAssessments ? ["notes", "complete"] : ["notes", "phq9", "gad7", "complete"]
  const currentStepIndex = steps.indexOf(step)
  const progress = ((currentStepIndex + 1) / steps.length) * 100

  if (step === "complete") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/20">
            <Check className="h-8 w-8 text-secondary" />
          </div>
          <h1 className="font-serif text-2xl font-medium text-foreground">
            Session notes saved
          </h1>
          <p className="mt-2 text-muted-foreground">
            Your documentation has been recorded
          </p>
          
          {!skipAssessments && (
            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-border bg-card p-4 text-left">
                <p className="text-sm font-medium text-foreground">Assessment Summary</p>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">PHQ-9 Score:</span>
                    <span className="font-medium text-foreground">{phq9Score}/27 ({calculatePHQ9Severity(phq9Score)})</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">GAD-7 Score:</span>
                    <span className="font-medium text-foreground">{gad7Score}/21 ({calculateGAD7Severity(gad7Score)})</span>
                  </div>
                </div>
              </div>
              
              {/* Auto-Review Status */}
              <div className="rounded-xl border border-border bg-card p-4 text-left">
                <p className="text-sm font-medium text-foreground">Client Visibility Status</p>
                <div className="mt-3 space-y-3">
                  {phq9Review && (
                    <div className="flex items-start justify-between gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">PHQ-9:</span>
                        <span className={`ml-2 inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          phq9Review.safeToShare 
                            ? "bg-secondary/20 text-secondary" 
                            : phq9Review.status === "flagged"
                              ? "bg-red-500/20 text-red-600"
                              : "bg-yellow-500/20 text-yellow-700"
                        }`}>
                          {phq9Review.safeToShare ? "Shared with client" : phq9Review.status === "flagged" ? "Flagged - Hidden" : "Pending review"}
                        </span>
                      </div>
                    </div>
                  )}
                  {gad7Review && (
                    <div className="flex items-start justify-between gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">GAD-7:</span>
                        <span className={`ml-2 inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          gad7Review.safeToShare 
                            ? "bg-secondary/20 text-secondary" 
                            : gad7Review.status === "flagged"
                              ? "bg-red-500/20 text-red-600"
                              : "bg-yellow-500/20 text-yellow-700"
                        }`}>
                          {gad7Review.safeToShare ? "Shared with client" : gad7Review.status === "flagged" ? "Flagged - Hidden" : "Pending review"}
                        </span>
                      </div>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Assessments are automatically reviewed. Results are only shared with clients after safety verification.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <Button
            onClick={() => router.push("/therapist/dashboard")}
            className="mt-8 rounded-full"
          >
            Return to dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
          <Link href="/" className="font-serif text-xl text-foreground">Kindred</Link>
          <span className="text-sm text-muted-foreground">
            Step {currentStepIndex + 1} of {steps.length - 1}
          </span>
        </div>
        <div className="mx-auto max-w-3xl px-6 pb-4">
          <Progress value={progress} className="h-1" />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        {/* Session Notes Step */}
        {step === "notes" && (
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <ClipboardList className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h1 className="font-serif text-2xl font-medium text-foreground">
                    Session Notes
                  </h1>
                  <p className="text-sm text-muted-foreground">Document this session</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Session summary</label>
                <Textarea
                  value={sessionNotes}
                  onChange={(e) => setSessionNotes(e.target.value)}
                  placeholder="Key topics discussed, client presentation, interventions used..."
                  className="min-h-[120px] rounded-xl"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">What worked well</label>
                  <Textarea
                    value={whatWorkedWell}
                    onChange={(e) => setWhatWorkedWell(e.target.value)}
                    placeholder="Effective techniques, breakthroughs..."
                    className="min-h-[100px] rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">What did not work</label>
                  <Textarea
                    value={whatDidNotWork}
                    onChange={(e) => setWhatDidNotWork(e.target.value)}
                    placeholder="Challenges, resistance points..."
                    className="min-h-[100px] rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Progress observations</label>
                <Textarea
                  value={progressObservations}
                  onChange={(e) => setProgressObservations(e.target.value)}
                  placeholder="Changes since last session, progress toward goals..."
                  className="min-h-[100px] rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Recommended next steps</label>
                <Textarea
                  value={recommendedNextSteps}
                  onChange={(e) => setRecommendedNextSteps(e.target.value)}
                  placeholder="Focus areas for next session, homework..."
                  className="min-h-[100px] rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Adjust match preferences? (optional)
                </label>
                <Textarea
                  value={adjustMatchPreferences}
                  onChange={(e) => setAdjustMatchPreferences(e.target.value)}
                  placeholder="Any suggestions to improve future matches for this client..."
                  className="min-h-[80px] rounded-xl"
                />
              </div>
            </div>

            {/* Assessment Option */}
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10">
                  <Brain className="h-5 w-5 text-secondary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">Complete PHQ-9 & GAD-7 Assessments</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Standard depression and anxiety screening tools. Results will be tracked over time.
                  </p>
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                <Button
                  variant={skipAssessments ? "outline" : "default"}
                  size="sm"
                  onClick={() => setSkipAssessments(false)}
                  className="rounded-full"
                >
                  Complete assessments
                </Button>
                <Button
                  variant={skipAssessments ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSkipAssessments(true)}
                  className="rounded-full"
                >
                  Skip for now
                </Button>
              </div>
            </div>

            <Button
              onClick={() => skipAssessments ? handleSubmit() : setStep("phq9")}
              disabled={!sessionNotes}
              className="w-full rounded-full"
            >
              {skipAssessments ? "Save notes" : "Continue to assessments"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {/* PHQ-9 Assessment */}
        {step === "phq9" && (
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h1 className="font-serif text-2xl font-medium text-foreground">
                    PHQ-9 Assessment
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Patient Health Questionnaire - Depression screening
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-muted/50 p-4">
              <p className="text-sm text-foreground">
                Over the last 2 weeks, how often has your client been bothered by the following problems?
              </p>
            </div>

            <div className="space-y-6">
              {phq9Questions.map((question, qIndex) => (
                <div key={qIndex} className="space-y-3">
                  <p className="text-sm font-medium text-foreground">
                    {qIndex + 1}. {question}
                  </p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {phq9ResponseOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          const newResponses = [...phq9Responses]
                          newResponses[qIndex] = option.value
                          setPhq9Responses(newResponses)
                        }}
                        className={`rounded-xl border-2 px-3 py-3 text-center text-sm transition-all ${
                          phq9Responses[qIndex] === option.value
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {phq9Complete && (
              <div className={`rounded-xl p-4 ${
                phq9Score >= 15 ? "bg-red-500/10" : phq9Score >= 10 ? "bg-yellow-500/10" : "bg-secondary/10"
              }`}>
                <div className="flex items-center gap-2">
                  {phq9Score >= 15 && <AlertTriangle className="h-5 w-5 text-red-500" />}
                  <p className="font-medium text-foreground">
                    PHQ-9 Score: {phq9Score}/27 - {calculatePHQ9Severity(phq9Score).charAt(0).toUpperCase() + calculatePHQ9Severity(phq9Score).slice(1)} depression
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep("notes")} className="flex-1 rounded-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={() => setStep("gad7")}
                disabled={!phq9Complete}
                className="flex-1 rounded-full"
              >
                Continue to GAD-7
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* GAD-7 Assessment */}
        {step === "gad7" && (
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10">
                  <Brain className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h1 className="font-serif text-2xl font-medium text-foreground">
                    GAD-7 Assessment
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Generalized Anxiety Disorder screening
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-muted/50 p-4">
              <p className="text-sm text-foreground">
                Over the last 2 weeks, how often has your client been bothered by the following problems?
              </p>
            </div>

            <div className="space-y-6">
              {gad7Questions.map((question, qIndex) => (
                <div key={qIndex} className="space-y-3">
                  <p className="text-sm font-medium text-foreground">
                    {qIndex + 1}. {question}
                  </p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {gad7ResponseOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          const newResponses = [...gad7Responses]
                          newResponses[qIndex] = option.value
                          setGad7Responses(newResponses)
                        }}
                        className={`rounded-xl border-2 px-3 py-3 text-center text-sm transition-all ${
                          gad7Responses[qIndex] === option.value
                            ? "border-secondary bg-secondary/5"
                            : "border-border hover:border-secondary/50"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {gad7Complete && (
              <div className={`rounded-xl p-4 ${
                gad7Score >= 15 ? "bg-red-500/10" : gad7Score >= 10 ? "bg-yellow-500/10" : "bg-secondary/10"
              }`}>
                <div className="flex items-center gap-2">
                  {gad7Score >= 15 && <AlertTriangle className="h-5 w-5 text-red-500" />}
                  <p className="font-medium text-foreground">
                    GAD-7 Score: {gad7Score}/21 - {calculateGAD7Severity(gad7Score).charAt(0).toUpperCase() + calculateGAD7Severity(gad7Score).slice(1)} anxiety
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep("phq9")} className="flex-1 rounded-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!gad7Complete || isSubmitting}
                className="flex-1 rounded-full"
              >
                {isSubmitting ? "Saving..." : "Save all notes"}
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
