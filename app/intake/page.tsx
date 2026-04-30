"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { LockIcon } from "@/components/icons"

interface IntakeStep {
  id: string
  title: string
  description: string
  placeholder: string
  helpText?: string
}

const steps: IntakeStep[] = [
  {
    id: "situation",
    title: "What brings you to therapy?",
    description: "Share whatever feels important. There are no wrong answers here.",
    placeholder: "I've been feeling overwhelmed at work lately. The stress is starting to affect my sleep and relationships. I find myself snapping at people I care about, and I don't feel like myself anymore...",
    helpText: "Write as much or as little as you'd like. Our AI understands natural language."
  },
  {
    id: "goals",
    title: "What would you like to get out of therapy?",
    description: "What would feeling better look like for you?",
    placeholder: "I want to learn how to manage stress without it taking over my life. I'd love to feel more present with my family instead of constantly thinking about work. Ultimately, I want to understand why I push myself so hard...",
    helpText: "It's okay if you're not sure. Many people figure this out together with their therapist."
  },
  {
    id: "style",
    title: "What kind of therapeutic relationship works for you?",
    description: "Think about what helps you open up and feel supported.",
    placeholder: "I think I'd do well with someone who's direct and gives me concrete things to work on. I don't want someone who just nods along. But I also need them to be warm and not judgy...",
    helpText: "Consider past experiences with mentors, coaches, or even friends who've helped you through hard times."
  },
  {
    id: "important",
    title: "Is there anything else that's important to you?",
    description: "Cultural background, identity, specific experiences — anything that matters.",
    placeholder: "As a first-generation professional, I sometimes feel like I'm navigating two worlds. It would help to work with someone who understands that pressure. I'd also prefer someone who does evening video sessions...",
    helpText: "This helps us match you with someone who truly understands your lived experience."
  }
]

export default function IntakePage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const step = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100
  const canProceed = (responses[step.id]?.trim().length ?? 0) > 20

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    sessionStorage.setItem("kindred-intake", JSON.stringify(responses))
    await new Promise(resolve => setTimeout(resolve, 2000))
    router.push("/matches?from=intake")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full bg-background">
        <div className="mx-auto flex h-20 max-w-4xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back</span>
          </Link>
          
          <Link href="/" className="flex items-center">
            <span className="font-serif text-2xl font-normal tracking-tight text-foreground">Kindred</span>
          </Link>
          
          <div className="w-16" />
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-8 lg:py-12">
        {/* Progress */}
        <div className="mb-16">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="mt-3 h-1" />
        </div>

        {/* Step Content */}
        <div className="space-y-10">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-secondary">
              Step {String(currentStep + 1).padStart(2, "0")}
            </p>
            <h1 className="mt-6 font-serif text-[2rem] font-normal leading-tight tracking-tight sm:text-[2.5rem]">
              {step.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {step.description}
            </p>
          </div>
          
          <Textarea
            value={responses[step.id] || ""}
            onChange={(e) => setResponses({ ...responses, [step.id]: e.target.value })}
            placeholder={step.placeholder}
            className="min-h-[220px] resize-none rounded-xl border-border bg-card p-6 text-base leading-relaxed placeholder:text-muted-foreground/50 focus-visible:ring-1 focus-visible:ring-primary"
          />
          
          {step.helpText && (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {step.helpText}
            </p>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-14 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!canProceed || isSubmitting}
            className="h-12 gap-2 rounded-full px-8"
          >
            {isSubmitting ? (
              <>
                <span className="inline-flex gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" />
                </span>
                Finding matches
              </>
            ) : currentStep === steps.length - 1 ? (
              <>
                Find My Matches
                <ArrowRight className="h-4 w-4" />
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>

        {/* Privacy Note */}
        <div className="mt-20 rounded-2xl border border-border bg-card p-8">
          <div className="flex items-start gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary/15">
              <LockIcon className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Your privacy is protected</p>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                Everything you share is encrypted and HIPAA-compliant. Your responses are only used 
                to find your matches and are never shared with anyone.
              </p>
            </div>
          </div>
        </div>

        {/* Step Indicators */}
        <div className="mt-14 flex justify-center gap-2">
          {steps.map((s, index) => (
            <button
              key={s.id}
              onClick={() => index < currentStep && setCurrentStep(index)}
              disabled={index > currentStep}
              className={`h-1.5 rounded-full transition-all ${
                index === currentStep 
                  ? "w-8 bg-primary" 
                  : index < currentStep 
                    ? "w-1.5 bg-primary/40 hover:bg-primary/60" 
                    : "w-1.5 bg-border"
              }`}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
