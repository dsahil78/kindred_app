"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/lib/auth-context"
import { 
  therapistSpecialties, 
  therapistApproaches, 
  communicationStyles,
  insuranceProviders,
  referralSources 
} from "@/lib/types"
import { ArrowRight, ArrowLeft, Check, Upload } from "lucide-react"

type Step = "personal" | "credentials" | "practice" | "availability" | "consultation" | "referral"

const steps: Step[] = ["personal", "credentials", "practice", "availability", "consultation", "referral"]

export default function TherapistOnboardingPage() {
  const router = useRouter()
  const { updateTherapistProfile } = useAuth()
  const [currentStep, setCurrentStep] = useState(0)
  
  // Personal Info
  const [firstName, setFirstName] = useState("Maya")
  const [lastName, setLastName] = useState("Chen")
  const [phone, setPhone] = useState("(206) 555-0188")
  const [photo, setPhoto] = useState<string | null>(null)

  // Credentials
  const [credentials, setCredentials] = useState("LCSW, Licensed Clinical Social Worker")
  const [licenseNumber, setLicenseNumber] = useState("LW-60543981")
  const [licenseState, setLicenseState] = useState("WA")
  const [npiNumber, setNpiNumber] = useState("1234567890")
  const [yearsExperience, setYearsExperience] = useState("4")

  // Practice Details
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([
    "Anxiety",
    "Work & Career Stress",
    "Life Transitions",
    "Self-Esteem",
  ])
  const [selectedApproach, setSelectedApproach] = useState("Acceptance and Commitment Therapy (ACT)")
  const [selectedStyle, setSelectedStyle] = useState("Collaborative and validating")
  const [bio, setBio] = useState(
    "I work primarily with adults navigating high-pressure careers, big life transitions, and the kind of chronic anxiety that doesn’t always look like anxiety. My approach blends Acceptance and Commitment Therapy with practical, values-based goal-setting — so we’re not just talking about what’s hard, we’re building the muscles to move through it. I aim to be warm, honest, and a little challenging when it serves you."
  )
  const [shortBio, setShortBio] = useState(
    "ACT-informed therapist for ambitious adults working through anxiety, burnout, and big transitions."
  )
  const [languages, setLanguages] = useState<string[]>(["English"])

  // Availability
  const [sessionFormats, setSessionFormats] = useState<string[]>(["Video", "In-Person"])
  const [availability, setAvailability] = useState("Weekday evenings, Saturday mornings")
  const [sessionRate, setSessionRate] = useState("175")
  const [acceptedInsurance, setAcceptedInsurance] = useState<string[]>([
    "Premera Blue Cross",
    "Regence Blue Shield",
    "Aetna",
  ])

  // Free Consultation
  const [offersFreeConsultation, setOffersFreeConsultation] = useState(true)
  const [consultationDuration, setConsultationDuration] = useState("15")

  // Referral
  const [referralSource, setReferralSource] = useState("Another therapist")
  const [referralCode, setReferralCode] = useState("")

  const progress = ((currentStep + 1) / steps.length) * 100

  const handleSpecialtyToggle = (specialty: string) => {
    if (selectedSpecialties.includes(specialty)) {
      setSelectedSpecialties(selectedSpecialties.filter(s => s !== specialty))
    } else if (selectedSpecialties.length < 6) {
      setSelectedSpecialties([...selectedSpecialties, specialty])
    }
  }

  const handleInsuranceToggle = (insurance: string) => {
    if (acceptedInsurance.includes(insurance)) {
      setAcceptedInsurance(acceptedInsurance.filter(i => i !== insurance))
    } else {
      setAcceptedInsurance([...acceptedInsurance, insurance])
    }
  }

  const handleFormatToggle = (format: string) => {
    if (sessionFormats.includes(format)) {
      setSessionFormats(sessionFormats.filter(f => f !== format))
    } else {
      setSessionFormats([...sessionFormats, format])
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    updateTherapistProfile({
      name: `${firstName} ${lastName}`,
      credentials,
      licenseNumber,
      licenseState,
      npiNumber: npiNumber || undefined,
      yearsExperience: parseInt(yearsExperience) || 0,
      specialties: selectedSpecialties,
      approach: selectedApproach,
      communicationStyle: selectedStyle,
      bio,
      shortBio,
      languages,
      sessionFormat: sessionFormats,
      availability,
      sessionRate: parseInt(sessionRate) || 0,
      acceptsInsurance: acceptedInsurance,
      offersFreeConsultation,
      freeConsultationDuration: offersFreeConsultation ? parseInt(consultationDuration) : undefined,
      referralSource: referralSource || undefined,
      onboardingComplete: true
    })
    router.push("/therapist/dashboard")
  }

  const canProceed = () => {
    switch (steps[currentStep]) {
      case "personal":
        return firstName && lastName && phone
      case "credentials":
        return credentials && licenseNumber && licenseState && yearsExperience
      case "practice":
        return selectedSpecialties.length > 0 && selectedApproach && selectedStyle && bio && shortBio
      case "availability":
        return sessionFormats.length > 0 && sessionRate
      case "consultation":
        return true
      case "referral":
        return true
      default:
        return true
    }
  }

  const stepTitles: Record<Step, string> = {
    personal: "Personal Information",
    credentials: "Professional Credentials",
    practice: "Your Practice",
    availability: "Availability & Rates",
    consultation: "Free Consultation",
    referral: "How did you hear about us?"
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="w-full border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
          <Link href="/" className="font-serif text-xl text-foreground">Kindred</Link>
          <span className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
        <div className="mx-auto max-w-3xl px-6 pb-4">
          <Progress value={progress} className="h-1" />
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center px-6 py-12">
        <div className="w-full max-w-2xl">
          <h1 className="font-serif text-2xl font-medium text-foreground">
            {stepTitles[steps[currentStep]]}
          </h1>

          {/* Personal Info Step */}
          {steps[currentStep] === "personal" && (
            <div className="mt-8 space-y-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-border bg-muted">
                    {photo ? (
                      <img src={photo} alt="Profile" className="h-full w-full object-cover" />
                    ) : (
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) setPhoto(URL.createObjectURL(file))
                    }}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  Upload a professional photo<br />
                  Clients will see this on your profile
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="h-12 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="h-12 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  className="h-12 rounded-xl"
                />
              </div>
            </div>
          )}

          {/* Credentials Step */}
          {steps[currentStep] === "credentials" && (
            <div className="mt-8 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="credentials">Credentials / Title</Label>
                <Input
                  id="credentials"
                  value={credentials}
                  onChange={(e) => setCredentials(e.target.value)}
                  placeholder="e.g., PhD, Licensed Clinical Psychologist"
                  className="h-12 rounded-xl"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="licenseNumber">License number</Label>
                  <Input
                    id="licenseNumber"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    className="h-12 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licenseState">License state</Label>
                  <Input
                    id="licenseState"
                    value={licenseState}
                    onChange={(e) => setLicenseState(e.target.value)}
                    placeholder="e.g., WA"
                    className="h-12 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="npi">NPI number (optional)</Label>
                  <Input
                    id="npi"
                    value={npiNumber}
                    onChange={(e) => setNpiNumber(e.target.value)}
                    className="h-12 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Years of experience</Label>
                  <Input
                    id="experience"
                    type="number"
                    value={yearsExperience}
                    onChange={(e) => setYearsExperience(e.target.value)}
                    min="0"
                    className="h-12 rounded-xl"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Practice Step */}
          {steps[currentStep] === "practice" && (
            <div className="mt-8 space-y-8">
              <div className="space-y-3">
                <Label>Specialties (select up to 6)</Label>
                <div className="flex flex-wrap gap-2">
                  {therapistSpecialties.map((specialty) => {
                    const isSelected = selectedSpecialties.includes(specialty)
                    return (
                      <button
                        key={specialty}
                        onClick={() => handleSpecialtyToggle(specialty)}
                        className={`rounded-full px-4 py-2 text-sm transition-all ${
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground hover:bg-muted/80"
                        }`}
                      >
                        {specialty}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Therapeutic approach</Label>
                <div className="grid gap-2 sm:grid-cols-2">
                  {therapistApproaches.map((approach) => {
                    const isSelected = selectedApproach === approach
                    return (
                      <button
                        key={approach}
                        onClick={() => setSelectedApproach(approach)}
                        className={`flex items-center justify-between rounded-xl border-2 px-4 py-3 text-left text-sm transition-all ${
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <span>{approach}</span>
                        {isSelected && <Check className="h-4 w-4 text-primary" />}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Communication style</Label>
                <div className="grid gap-2 sm:grid-cols-2">
                  {communicationStyles.map((style) => {
                    const isSelected = selectedStyle === style
                    return (
                      <button
                        key={style}
                        onClick={() => setSelectedStyle(style)}
                        className={`flex items-center justify-between rounded-xl border-2 px-4 py-3 text-left text-sm transition-all ${
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <span>{style}</span>
                        {isSelected && <Check className="h-4 w-4 text-primary" />}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Full bio</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell clients about yourself, your approach, and what they can expect..."
                  className="min-h-[150px] rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shortBio">Short bio (one sentence)</Label>
                <Input
                  id="shortBio"
                  value={shortBio}
                  onChange={(e) => setShortBio(e.target.value)}
                  placeholder="A brief tagline for your profile"
                  className="h-12 rounded-xl"
                />
              </div>
            </div>
          )}

          {/* Availability Step */}
          {steps[currentStep] === "availability" && (
            <div className="mt-8 space-y-8">
              <div className="space-y-3">
                <Label>Session formats</Label>
                <div className="flex gap-3">
                  {["Video", "In-Person", "Phone"].map((format) => {
                    const isSelected = sessionFormats.includes(format)
                    return (
                      <button
                        key={format}
                        onClick={() => handleFormatToggle(format)}
                        className={`flex-1 rounded-xl border-2 py-4 text-center transition-all ${
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        {format}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability">Typical availability</Label>
                <Input
                  id="availability"
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  placeholder="e.g., Weekday evenings, Saturday mornings"
                  className="h-12 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rate">Session rate (USD)</Label>
                <Input
                  id="rate"
                  type="number"
                  value={sessionRate}
                  onChange={(e) => setSessionRate(e.target.value)}
                  placeholder="e.g., 175"
                  min="0"
                  className="h-12 rounded-xl"
                />
              </div>

              <div className="space-y-3">
                <Label>Insurance accepted</Label>
                <div className="grid gap-2 sm:grid-cols-2">
                  {insuranceProviders.filter(i => i !== "Out of Pocket / Self Pay").map((insurance) => {
                    const isSelected = acceptedInsurance.includes(insurance)
                    return (
                      <button
                        key={insurance}
                        onClick={() => handleInsuranceToggle(insurance)}
                        className={`flex items-center justify-between rounded-xl border-2 px-4 py-3 text-left text-sm transition-all ${
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <span>{insurance}</span>
                        {isSelected && <Check className="h-4 w-4 text-primary" />}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Free Consultation Step */}
          {steps[currentStep] === "consultation" && (
            <div className="mt-8 space-y-8">
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-medium text-foreground">Offer free consultations</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Allow potential clients to book a brief free session to check fit before committing. 
                      This can help build trust and increase bookings.
                    </p>
                  </div>
                  <Switch
                    checked={offersFreeConsultation}
                    onCheckedChange={setOffersFreeConsultation}
                  />
                </div>

                {offersFreeConsultation && (
                  <div className="mt-6 space-y-3">
                    <Label>Consultation duration</Label>
                    <div className="flex gap-3">
                      {["10", "15", "20"].map((duration) => (
                        <button
                          key={duration}
                          onClick={() => setConsultationDuration(duration)}
                          className={`flex-1 rounded-xl border-2 py-3 text-center transition-all ${
                            consultationDuration === duration
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          {duration} min
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-xl bg-secondary/10 p-4">
                <p className="text-sm text-secondary">
                  Therapists who offer free consultations see 40% higher booking rates on average.
                </p>
              </div>
            </div>
          )}

          {/* Referral Step */}
          {steps[currentStep] === "referral" && (
            <div className="mt-8 space-y-6">
              <div className="space-y-3">
                <Label>How did you hear about Kindred?</Label>
                <div className="grid gap-2">
                  {referralSources.map((source) => {
                    const isSelected = referralSource === source
                    return (
                      <button
                        key={source}
                        onClick={() => setReferralSource(source)}
                        className={`flex items-center justify-between rounded-xl border-2 px-4 py-3 text-left transition-all ${
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <span>{source}</span>
                        {isSelected && <Check className="h-4 w-4 text-primary" />}
                      </button>
                    )
                  })}
                </div>
              </div>

              {referralSource === "Another therapist" && (
                <div className="space-y-2">
                  <Label htmlFor="referralCode">Referral code (optional)</Label>
                  <Input
                    id="referralCode"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value)}
                    placeholder="Enter code if you have one"
                    className="h-12 rounded-xl"
                  />
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="mt-10 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 0}
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
              {currentStep === steps.length - 1 ? "Complete setup" : "Continue"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
