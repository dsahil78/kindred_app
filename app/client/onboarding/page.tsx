"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/lib/auth-context"
import { onboardingQuestions, insuranceProviders } from "@/lib/types"
import { MessageSquare, Mic, Type, ArrowRight, ArrowLeft, Check } from "lucide-react"

type OnboardingMode = "choices" | "voice" | "text"

const VALID_MODES: OnboardingMode[] = ["choices", "voice", "text"]

export default function ClientOnboardingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ClientOnboardingPageInner />
    </Suspense>
  )
}

function ClientOnboardingPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialMode = (() => {
    const m = searchParams.get("mode")
    return m && (VALID_MODES as string[]).includes(m) ? (m as OnboardingMode) : null
  })()
  const { updateClientProfile } = useAuth()
  const [step, setStep] = useState(initialMode ? 1 : 0)
  const [mode, setMode] = useState<OnboardingMode | null>(initialMode)
  const [answers, setAnswers] = useState<Record<number, string[]>>({})
  const [textAnswers, setTextAnswers] = useState<Record<number, string>>({})
  const [voiceTranscript, setVoiceTranscript] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [selectedInsurance, setSelectedInsurance] = useState<string>("")
  const [insuranceId, setInsuranceId] = useState("")

  // Total steps: mode selection (0) + 5 questions (1-5) + insurance (6) = 7 for choices/text
  // For voice: mode selection (0) + voice recording (1) + insurance (2) = 3
  const totalSteps = mode === "voice" ? 3 : 7
  const progress = step === 0 ? 0 : (step / (totalSteps - 1)) * 100
  
  // Insurance step number depends on mode
  const insuranceStep = mode === "voice" ? 2 : 6

  const handleModeSelect = (selectedMode: OnboardingMode) => {
    setMode(selectedMode)
    updateClientProfile({ onboardingMode: selectedMode })
    setStep(1)
  }

  const handleChoiceSelect = (questionIndex: number, option: string) => {
    const question = onboardingQuestions[questionIndex]
    if (question.allowMultiple) {
      const current = answers[questionIndex] || []
      if (current.includes(option)) {
        setAnswers({ ...answers, [questionIndex]: current.filter(o => o !== option) })
      } else {
        setAnswers({ ...answers, [questionIndex]: [...current, option] })
      }
    } else {
      setAnswers({ ...answers, [questionIndex]: [option] })
    }
  }

  const handleTextChange = (questionIndex: number, text: string) => {
    setTextAnswers({ ...textAnswers, [questionIndex]: text })
  }

  const simulateVoiceRecording = () => {
    setIsRecording(true)
    setTimeout(() => {
      setIsRecording(false)
      setVoiceTranscript(
        "I have been feeling overwhelmed with work lately. The pressure is constant and I find myself anxious most days. I want to find better ways to cope and understand why I react the way I do to stress. I have tried therapy before briefly but it did not feel like the right fit. I think I would prefer someone who is direct and can give me practical tools, but also understands the deeper stuff."
      )
    }, 3000)
  }

  const handleNext = () => {
    if (step === insuranceStep) {
      // Final step - complete onboarding
      handleComplete()
    } else if (mode === "voice" && step === 1) {
      // Voice mode: go directly to insurance after recording
      setStep(insuranceStep)
    } else {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else if (step === 1) {
      setMode(null)
      setStep(0)
    }
  }

  const handleComplete = () => {
    updateClientProfile({ 
      onboardingComplete: true,
      insurance: selectedInsurance ? {
        provider: selectedInsurance,
        memberId: insuranceId
      } : undefined
    })
    router.push(`/matches?from=onboarding${mode ? `&mode=${mode}` : ""}`)
  }

  const canProceed = () => {
    if (mode === "choices" && step >= 1 && step <= 5) {
      return (answers[step - 1] || []).length > 0
    }
    if (mode === "text" && step >= 1 && step <= 5) {
      return (textAnswers[step - 1] || "").length > 10
    }
    if (mode === "voice" && step === 1) {
      return voiceTranscript.length > 0
    }
    return true
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="w-full border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
          <Link href="/" className="font-serif text-xl text-foreground">Kindred</Link>
          {step > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                Step {step} of {totalSteps - 1}
              </span>
            </div>
          )}
          {step === 0 && (
            <div className="h-5" /> 
          )}
        </div>
        {step > 0 && (
          <div className="mx-auto max-w-3xl px-6 pb-4">
            <Progress value={progress} className="h-1" />
          </div>
        )}
      </header>

      <main className="flex flex-1 flex-col items-center px-6 py-12">
        <div className="w-full max-w-2xl">
          
          {/* Step 0: Mode Selection */}
          {step === 0 && (
            <div className="space-y-8">
              <div className="text-center">
                <h1 className="font-serif text-3xl font-medium text-foreground">
                  How would you like to share?
                </h1>
                <p className="mt-3 text-lg text-muted-foreground">
                  Choose the way that feels most comfortable for you
                </p>
              </div>

              <div className="grid gap-4">
                <button
                  onClick={() => handleModeSelect("choices")}
                  className="group flex items-start gap-4 rounded-2xl border-2 border-border bg-card p-6 text-left transition-all hover:border-primary"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/20">
                    <MessageSquare className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Answer with choices</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Select from curated options. Quick and structured.
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => handleModeSelect("voice")}
                  className="group flex items-start gap-4 rounded-2xl border-2 border-border bg-card p-6 text-left transition-all hover:border-primary"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/20">
                    <Mic className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Talk it through</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Speak naturally about your situation. We will listen and understand.
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => handleModeSelect("text")}
                  className="group flex items-start gap-4 rounded-2xl border-2 border-border bg-card p-6 text-left transition-all hover:border-primary"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/20">
                    <Type className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Write freely</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Type in your own words. Express yourself however feels right.
                    </p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Choices Mode */}
          {mode === "choices" && step >= 1 && step <= 5 && (
            <div className="space-y-8">
              <div>
                <h1 className="font-serif text-2xl font-medium text-foreground">
                  {onboardingQuestions[step - 1].question}
                </h1>
                {onboardingQuestions[step - 1].allowMultiple && (
                  <p className="mt-2 text-sm text-muted-foreground">Select all that apply</p>
                )}
              </div>

              <div className="grid gap-3">
                {onboardingQuestions[step - 1].options.map((option) => {
                  const isSelected = (answers[step - 1] || []).includes(option)
                  return (
                    <button
                      key={option}
                      onClick={() => handleChoiceSelect(step - 1, option)}
                      className={`flex items-center justify-between rounded-xl border-2 px-5 py-4 text-left transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-border bg-card hover:border-primary/50"
                      }`}
                    >
                      <span className="text-foreground">{option}</span>
                      {isSelected && (
                        <Check className="h-5 w-5 text-primary" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Voice Mode */}
          {mode === "voice" && step === 1 && (
            <div className="space-y-8">
              <div className="text-center">
                <h1 className="font-serif text-2xl font-medium text-foreground">
                  Tell us about yourself
                </h1>
                <p className="mt-3 text-muted-foreground">
                  Share what brings you to therapy, what you are hoping to get out of it, 
                  and any preferences you have for your therapist.
                </p>
              </div>

              <div className="flex flex-col items-center gap-6">
                <button
                  onClick={simulateVoiceRecording}
                  disabled={isRecording}
                  className={`flex h-24 w-24 items-center justify-center rounded-full transition-all ${
                    isRecording 
                      ? "animate-pulse bg-red-500" 
                      : voiceTranscript 
                        ? "bg-secondary" 
                        : "bg-primary hover:bg-primary/90"
                  }`}
                >
                  <Mic className="h-10 w-10 text-white" />
                </button>
                <p className="text-sm text-muted-foreground">
                  {isRecording 
                    ? "Listening..." 
                    : voiceTranscript 
                      ? "Recording complete. Tap to re-record." 
                      : "Tap to start recording"}
                </p>
              </div>

              {voiceTranscript && (
                <div className="rounded-xl border border-border bg-card p-5">
                  <p className="text-sm font-medium text-muted-foreground">What we heard:</p>
                  <p className="mt-2 text-foreground">{voiceTranscript}</p>
                </div>
              )}
            </div>
          )}

          {/* Text Mode */}
          {mode === "text" && step >= 1 && step <= 5 && (
            <div className="space-y-6">
              <div>
                <h1 className="font-serif text-2xl font-medium text-foreground">
                  {onboardingQuestions[step - 1].question}
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Write as much or as little as you would like
                </p>
              </div>

              <Textarea
                value={textAnswers[step - 1] || ""}
                onChange={(e) => handleTextChange(step - 1, e.target.value)}
                placeholder="Type your response here..."
                className="min-h-[200px] resize-none rounded-xl border-border bg-card text-base"
              />
            </div>
          )}

          {/* Insurance Step */}
          {step === insuranceStep && (
            <div className="space-y-8">
              <div>
                <h1 className="font-serif text-2xl font-medium text-foreground">
                  Do you have insurance you would like to use?
                </h1>
                <p className="mt-2 text-muted-foreground">
                  We will show you therapists in your network. This is optional.
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid gap-3">
                  {insuranceProviders.map((provider) => {
                    const isSelected = selectedInsurance === provider
                    return (
                      <button
                        key={provider}
                        onClick={() => setSelectedInsurance(isSelected ? "" : provider)}
                        className={`flex items-center justify-between rounded-xl border-2 px-5 py-4 text-left transition-all ${
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border bg-card hover:border-primary/50"
                        }`}
                      >
                        <span className="text-foreground">{provider}</span>
                        {isSelected && <Check className="h-5 w-5 text-primary" />}
                      </button>
                    )
                  })}
                </div>

                {selectedInsurance && selectedInsurance !== "Out of Pocket / Self Pay" && (
                  <div className="mt-6 space-y-3">
                    <label className="text-sm font-medium text-foreground">
                      Member ID (optional)
                    </label>
                    <input
                      type="text"
                      value={insuranceId}
                      onChange={(e) => setInsuranceId(e.target.value)}
                      placeholder="Enter your member ID"
                      className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation */}
          {step > 0 && (
            <div className="mt-10 flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={handleBack}
                className="rounded-full"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>

              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="rounded-full px-8"
              >
                {step === insuranceStep ? "Find my matches" : "Continue"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
