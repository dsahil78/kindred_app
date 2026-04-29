"use client"

import { useState, use } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { mockTherapists, mockSessions } from "@/lib/mock-data"
import { Star, ArrowRight, Check } from "lucide-react"

export default function ClientFeedbackPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = use(params)
  const router = useRouter()
  
  const session = mockSessions.find(s => s.id === sessionId)
  const therapist = session ? mockTherapists.find(t => t.id === session.therapistId) : null
  
  const [step, setStep] = useState(1)
  const [overallRating, setOverallRating] = useState(0)
  const [therapeuticAlliance, setTherapeuticAlliance] = useState(0)
  const [continueWithTherapist, setContinueWithTherapist] = useState<boolean | null>(null)
  const [whatWorkedWell, setWhatWorkedWell] = useState("")
  const [whatCouldImprove, setWhatCouldImprove] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  if (!session || !therapist) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Session not found</p>
      </div>
    )
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsComplete(true)
  }

  if (isComplete) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/20">
            <Check className="h-8 w-8 text-secondary" />
          </div>
          <h1 className="font-serif text-2xl font-medium text-foreground">
            Thank you for your feedback
          </h1>
          <p className="mt-2 text-muted-foreground">
            Your input helps us improve the Kindred experience
          </p>
          <Button
            onClick={() => router.push("/client/dashboard")}
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
        <div className="mx-auto flex h-16 max-w-2xl items-center px-6">
          <Link href="/" className="font-serif text-xl text-foreground">Kindred</Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-10">
        {/* Therapist Info */}
        <div className="mb-8 flex items-center gap-4">
          <Image
            src={therapist.photo}
            alt={therapist.name}
            width={56}
            height={56}
            className="rounded-full object-cover"
          />
          <div>
            <p className="text-sm text-muted-foreground">Session feedback for</p>
            <p className="font-medium text-foreground">{therapist.name}</p>
          </div>
        </div>

        {/* Step 1: Ratings */}
        {step === 1 && (
          <div className="space-y-8">
            <div>
              <h1 className="font-serif text-2xl font-medium text-foreground">
                How was your session?
              </h1>
              <p className="mt-2 text-muted-foreground">
                Your feedback is confidential and helps us improve
              </p>
            </div>

            {/* Overall Rating */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Overall experience</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setOverallRating(rating)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-10 w-10 ${
                        rating <= overallRating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Therapeutic Alliance */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">
                How connected did you feel with your therapist?
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setTherapeuticAlliance(rating)}
                    className={`flex-1 rounded-xl border-2 py-4 text-center transition-all ${
                      rating === therapeuticAlliance
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <span className="text-lg">{rating}</span>
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Not connected</span>
                <span>Very connected</span>
              </div>
            </div>

            <Button
              onClick={() => setStep(2)}
              disabled={!overallRating || !therapeuticAlliance}
              className="w-full rounded-full"
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Step 2: Continue Decision & Comments */}
        {step === 2 && (
          <div className="space-y-8">
            <div>
              <h1 className="font-serif text-2xl font-medium text-foreground">
                Would you like to continue?
              </h1>
              <p className="mt-2 text-muted-foreground">
                Help us understand your experience better
              </p>
            </div>

            {/* Continue Decision */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">
                Do you want to continue seeing {therapist.name}?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setContinueWithTherapist(true)}
                  className={`rounded-xl border-2 p-5 text-center transition-all ${
                    continueWithTherapist === true
                      ? "border-secondary bg-secondary/5"
                      : "border-border hover:border-secondary/50"
                  }`}
                >
                  <span className="font-medium text-foreground">Yes, continue</span>
                  <p className="mt-1 text-sm text-muted-foreground">
                    I want to keep working with them
                  </p>
                </button>
                <button
                  onClick={() => setContinueWithTherapist(false)}
                  className={`rounded-xl border-2 p-5 text-center transition-all ${
                    continueWithTherapist === false
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <span className="font-medium text-foreground">Find new match</span>
                  <p className="mt-1 text-sm text-muted-foreground">
                    I would like to try someone else
                  </p>
                </button>
              </div>
            </div>

            {/* What Worked */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                What worked well? (optional)
              </label>
              <Textarea
                value={whatWorkedWell}
                onChange={(e) => setWhatWorkedWell(e.target.value)}
                placeholder="Share what you found helpful..."
                className="min-h-[100px] rounded-xl"
              />
            </div>

            {/* What Could Improve */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                What could be improved? (optional)
              </label>
              <Textarea
                value={whatCouldImprove}
                onChange={(e) => setWhatCouldImprove(e.target.value)}
                placeholder="Share any suggestions..."
                className="min-h-[100px] rounded-xl"
              />
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1 rounded-full"
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={continueWithTherapist === null || isSubmitting}
                className="flex-1 rounded-full"
              >
                {isSubmitting ? "Submitting..." : "Submit feedback"}
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
