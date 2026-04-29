// User types
export type UserRole = "client" | "therapist"

export interface User {
  id: string
  email: string
  role: UserRole
  name: string
  createdAt: Date
}

export interface ClientProfile extends User {
  role: "client"
  onboardingComplete: boolean
  onboardingMode: "choices" | "voice" | "text"
  insurance?: InsuranceInfo
  intakeResponses?: IntakeResponse
  matchedTherapists?: string[]
  currentTherapistId?: string
  sessions?: Session[]
}

export interface TherapistProfile extends User {
  role: "therapist"
  credentials: string
  photo: string
  voiceIntroUrl?: string
  voiceIntroDuration?: number
  specialties: string[]
  approach: string
  communicationStyle: string
  depthOrientation: string
  culturalBackground: string
  languages: string[]
  sessionFormat: string[]
  yearsExperience: number
  bio: string
  shortBio: string
  availability: string
  sessionRate: number
  acceptsInsurance: string[]
  offersFreeConsultation: boolean
  freeConsultationDuration?: number
  referralSource?: string
  licenseNumber: string
  licenseState: string
  npiNumber?: string
  onboardingComplete: boolean
  clients?: string[]
  sessions?: Session[]
}

// Insurance
export interface InsuranceInfo {
  provider: string
  memberId: string
  groupNumber?: string
}

export const insuranceProviders = [
  "Premera Blue Cross",
  "Regence Blue Shield",
  "Aetna",
  "United Healthcare",
  "Cigna",
  "Kaiser Permanente",
  "Molina Healthcare",
  "Community Health Plan",
  "Coordinated Care",
  "Medicare",
  "Medicaid",
  "Out of Pocket / Self Pay"
] as const

// Intake & Onboarding
export interface IntakeResponse {
  situation: string
  goals: string
  preferredStyle: string
  importantFactors: string[]
  previousTherapy: string
  culturalPreferences: string
  sessionPreference: string
}

export interface OnboardingChoice {
  question: string
  options: string[]
  allowMultiple: boolean
}

export const onboardingQuestions: OnboardingChoice[] = [
  {
    question: "What brings you to therapy?",
    options: [
      "Anxiety or worry",
      "Depression or low mood",
      "Relationship issues",
      "Work or career stress",
      "Life transitions",
      "Trauma or past experiences",
      "Self-esteem or identity",
      "Family concerns",
      "Grief or loss",
      "Other"
    ],
    allowMultiple: true
  },
  {
    question: "What are you hoping to get out of therapy?",
    options: [
      "Learn coping strategies",
      "Understand myself better",
      "Improve relationships",
      "Process past experiences",
      "Make a life decision",
      "Reduce specific symptoms",
      "Personal growth",
      "Just need someone to talk to"
    ],
    allowMultiple: true
  },
  {
    question: "What kind of therapist style works best for you?",
    options: [
      "Direct and practical",
      "Warm and nurturing",
      "Thought-provoking and challenging",
      "Structured with homework",
      "Flexible and conversational",
      "Not sure yet"
    ],
    allowMultiple: false
  },
  {
    question: "How would you prefer to meet?",
    options: [
      "Video sessions only",
      "In-person only",
      "Either works for me"
    ],
    allowMultiple: false
  },
  {
    question: "Any preferences about your therapist's background?",
    options: [
      "Shared cultural background",
      "LGBTQ+ affirming",
      "Faith-informed",
      "Specific language needed",
      "No specific preference"
    ],
    allowMultiple: true
  }
]

// Therapist types
export interface Therapist {
  id: string
  name: string
  credentials: string
  photo: string
  voiceIntroUrl: string
  voiceIntroDuration: number
  specialties: string[]
  approach: string
  communicationStyle: string
  depthOrientation: string
  culturalBackground: string
  languages: string[]
  sessionFormat: string[]
  yearsExperience: number
  bio: string
  shortBio: string
  matchScore: number
  matchReasons: string[]
  availability: string
  sessionRate: number
  acceptsInsurance: string[]
  offersFreeConsultation?: boolean
  freeConsultationDuration?: number
}

export interface MatchResult {
  therapist: Therapist
  fitExplanation: string
  keyStrengths: string[]
}

// Sessions
export type SessionStatus = "scheduled" | "in-progress" | "completed" | "cancelled" | "no-show"
export type SessionType = "consultation" | "regular" | "follow-up"

export interface Session {
  id: string
  clientId: string
  therapistId: string
  scheduledAt: Date
  duration: number // in minutes
  type: SessionType
  status: SessionStatus
  isFreeConsultation: boolean
  notes?: string
  clientFeedback?: ClientFeedback
  therapistFeedback?: TherapistFeedback
}

export interface TimeSlot {
  date: string
  time: string
  available: boolean
}

// Feedback & Assessments
export interface ClientFeedback {
  sessionId: string
  overallRating: number // 1-5
  therapeuticAlliance: number // 1-5
  wouldRecommend: boolean
  continueWithTherapist: boolean
  whatWorkedWell?: string
  whatCouldImprove?: string
  additionalComments?: string
  submittedAt: Date
}

export interface TherapistFeedback {
  sessionId: string
  clientId: string
  sessionNotes: string
  whatWorkedWell: string
  whatDidNotWork: string
  progressObservations: string
  recommendedNextSteps: string
  adjustMatchPreferences?: string
  phq9Score?: number
  gad7Score?: number
  submittedAt: Date
}

// Assessment Review Status
export type AssessmentReviewStatus = "pending" | "approved" | "flagged" | "hidden"

export interface AssessmentReview {
  status: AssessmentReviewStatus
  reviewedAt?: Date
  reviewedBy?: string // "automation" or admin id
  notes?: string
  safeToShare: boolean // Determines if client can see results
}

// PHQ-9 Depression Assessment
export interface PHQ9Assessment {
  id: string
  clientId: string
  therapistId: string
  sessionId?: string
  responses: number[] // 9 questions, each 0-3
  totalScore: number // 0-27
  severity: "none" | "mild" | "moderate" | "moderately-severe" | "severe"
  completedAt: Date
  review?: AssessmentReview
}

export const phq9Questions = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself - or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed. Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual",
  "Thoughts that you would be better off dead, or of hurting yourself in some way"
] as const

export const phq9ResponseOptions = [
  { value: 0, label: "Not at all" },
  { value: 1, label: "Several days" },
  { value: 2, label: "More than half the days" },
  { value: 3, label: "Nearly every day" }
] as const

export function calculatePHQ9Severity(score: number): PHQ9Assessment["severity"] {
  if (score <= 4) return "none"
  if (score <= 9) return "mild"
  if (score <= 14) return "moderate"
  if (score <= 19) return "moderately-severe"
  return "severe"
}

// GAD-7 Anxiety Assessment
export interface GAD7Assessment {
  id: string
  clientId: string
  therapistId: string
  sessionId?: string
  responses: number[] // 7 questions, each 0-3
  totalScore: number // 0-21
  severity: "none" | "mild" | "moderate" | "severe"
  completedAt: Date
  review?: AssessmentReview
}

// Function to auto-review assessment and determine if safe to share
export function autoReviewAssessment(
  type: "phq9" | "gad7",
  score: number,
  responses: number[]
): AssessmentReview {
  // Check for concerning responses (e.g., PHQ-9 Q9 about self-harm)
  const hasCriticalResponse = type === "phq9" && responses[8] >= 1
  
  // High severity scores need manual review
  const isHighSeverity = type === "phq9" 
    ? score >= 20 // severe depression
    : score >= 15 // severe anxiety
  
  if (hasCriticalResponse) {
    return {
      status: "flagged",
      reviewedAt: new Date(),
      reviewedBy: "automation",
      notes: "Critical response detected (Q9 self-harm). Requires therapist attention.",
      safeToShare: false
    }
  }
  
  if (isHighSeverity) {
    return {
      status: "pending",
      reviewedBy: "automation",
      notes: "High severity score detected. Awaiting therapist review before sharing.",
      safeToShare: false
    }
  }
  
  // Safe to share automatically
  return {
    status: "approved",
    reviewedAt: new Date(),
    reviewedBy: "automation",
    notes: "Auto-approved: Within safe parameters.",
    safeToShare: true
  }
}

export const gad7Questions = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it is hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid, as if something awful might happen"
] as const

export const gad7ResponseOptions = [
  { value: 0, label: "Not at all" },
  { value: 1, label: "Several days" },
  { value: 2, label: "More than half the days" },
  { value: 3, label: "Nearly every day" }
] as const

export function calculateGAD7Severity(score: number): GAD7Assessment["severity"] {
  if (score <= 4) return "none"
  if (score <= 9) return "mild"
  if (score <= 14) return "moderate"
  return "severe"
}

// Therapist Onboarding
export interface TherapistOnboardingData {
  // Personal Info
  firstName: string
  lastName: string
  email: string
  phone: string
  
  // Professional Info
  credentials: string
  licenseNumber: string
  licenseState: string
  npiNumber?: string
  yearsExperience: number
  
  // Practice Details
  specialties: string[]
  approach: string
  communicationStyle: string
  bio: string
  shortBio: string
  languages: string[]
  
  // Availability & Logistics
  sessionFormat: string[]
  availability: string
  sessionRate: number
  acceptsInsurance: string[]
  
  // Free Consultation
  offersFreeConsultation: boolean
  freeConsultationDuration?: number
  
  // Referral
  referralSource?: string
  referralCode?: string
}

export const therapistSpecialties = [
  "Anxiety",
  "Depression",
  "Trauma & PTSD",
  "Relationship Issues",
  "Work & Career Stress",
  "Life Transitions",
  "Grief & Loss",
  "Self-Esteem",
  "Identity Exploration",
  "Family Therapy",
  "Couples Therapy",
  "LGBTQ+ Issues",
  "Substance Use",
  "Eating Disorders",
  "OCD",
  "ADHD",
  "Anger Management",
  "Chronic Illness",
  "Parenting",
  "Perfectionism"
] as const

export const therapistApproaches = [
  "Cognitive Behavioral Therapy (CBT)",
  "Psychodynamic Therapy",
  "Acceptance and Commitment Therapy (ACT)",
  "EMDR",
  "Somatic Therapy",
  "Mindfulness-Based Therapy",
  "Solution-Focused Therapy",
  "Narrative Therapy",
  "Internal Family Systems (IFS)",
  "Dialectical Behavior Therapy (DBT)",
  "Integrative/Eclectic"
] as const

export const communicationStyles = [
  "Warm and nurturing",
  "Direct and practical",
  "Reflective and patient",
  "Collaborative and validating",
  "Thought-provoking and challenging",
  "Structured and goal-oriented"
] as const

export const referralSources = [
  "Another therapist",
  "Professional network",
  "Conference or event",
  "Social media",
  "Search engine",
  "Friend or colleague",
  "Other"
] as const
