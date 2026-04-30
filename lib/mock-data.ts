import type { Therapist, MatchResult, Session, TimeSlot } from "./types"

export const mockTherapists: Therapist[] = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    credentials: "PhD, Licensed Clinical Psychologist",
    photo: "/therapists/sarah-chen.jpg",
    voiceIntroUrl: "/audio/sarah-intro.mp3",
    voiceIntroDuration: 45,
    specialties: ["Anxiety", "Work Stress", "Life Transitions", "Perfectionism"],
    approach: "Integrative CBT with mindfulness",
    communicationStyle: "Warm and direct",
    depthOrientation: "Balance of practical tools and deeper exploration",
    culturalBackground: "Chinese-American, fluent in Mandarin",
    languages: ["English", "Mandarin"],
    sessionFormat: ["Video", "In-Person"],
    yearsExperience: 8,
    bio: "I specialize in helping high-achieving professionals navigate anxiety, burnout, and the unique pressures of demanding careers. My approach combines evidence-based cognitive techniques with mindfulness practices, creating a space where you can both develop practical coping strategies and explore the deeper patterns driving your stress. I understand the tech industry culture firsthand, having worked with hundreds of engineers, PMs, and executives over my 8 years of practice. My goal is to help you not just manage symptoms, but truly understand yourself and build a life that feels sustainable and meaningful.",
    shortBio: "Helping high-achievers find balance without sacrificing ambition.",
    location: "Capitol Hill, Seattle, WA",
    matchScore: 94,
    matchReasons: [
      "Extensive experience with tech professionals",
      "Combines practical tools with deeper work",
      "Direct communication style matches your preference"
    ],
    availability: "Evenings and weekends available",
    sessionRate: 200,
    acceptsInsurance: ["Premera", "Regence", "Aetna"],
    offersFreeConsultation: true,
    freeConsultationDuration: 15
  },
  {
    id: "2",
    name: "Marcus Williams",
    credentials: "LMHC, Certified Trauma Specialist",
    photo: "/therapists/marcus-williams.jpg",
    voiceIntroUrl: "/audio/marcus-intro.mp3",
    voiceIntroDuration: 52,
    specialties: ["Trauma", "Anxiety", "Identity", "Relationship Patterns"],
    approach: "Somatic and relational therapy",
    communicationStyle: "Reflective and patient",
    depthOrientation: "Insight-oriented, focus on root causes",
    culturalBackground: "African-American",
    languages: ["English"],
    sessionFormat: ["Video", "In-Person"],
    yearsExperience: 12,
    bio: "I believe that healing happens in relationship. My practice centers on creating a safe, non-judgmental space where you can explore not just what you think, but what you feel in your body. I specialize in helping people understand how past experiences shape present patterns, particularly in relationships and work. Using somatic therapy techniques, we will work together to release stored tension and build a deeper connection with yourself. I work at a pace that feels right for you, and I am particularly drawn to helping people who feel like they have been going through the motions without really feeling alive.",
    shortBio: "Creating safety to explore what lies beneath the surface.",
    location: "Ballard, Seattle, WA",
    matchScore: 89,
    matchReasons: [
      "Specializes in the work-life disconnect you mentioned",
      "Patient, unhurried approach",
      "Strong focus on body-mind connection"
    ],
    availability: "Flexible daytime and evening slots",
    sessionRate: 180,
    acceptsInsurance: ["Premera", "United Healthcare"],
    offersFreeConsultation: false
  },
  {
    id: "3",
    name: "Dr. Elena Rodriguez",
    credentials: "PsyD, Licensed Psychologist",
    photo: "/therapists/elena-rodriguez.jpg",
    voiceIntroUrl: "/audio/elena-intro.mp3",
    voiceIntroDuration: 48,
    specialties: ["Career Transitions", "Anxiety", "Self-Esteem", "Cultural Identity"],
    approach: "ACT and narrative therapy",
    communicationStyle: "Collaborative and validating",
    depthOrientation: "Values-focused, practical with depth",
    culturalBackground: "Latina, bilingual Spanish-English",
    languages: ["English", "Spanish"],
    sessionFormat: ["Video"],
    yearsExperience: 6,
    bio: "I help people who are successful on paper but feel lost inside. Using Acceptance and Commitment Therapy, we will work together to clarify what truly matters to you and build a life aligned with those values, even when it is hard. I am particularly passionate about helping first-generation professionals and people navigating multiple cultural identities. Therapy with me is collaborative: I will share tools and perspectives, but you are the expert on your own life. My job is to help you hear your own wisdom more clearly.",
    shortBio: "Helping you build a life that matches your values.",
    location: "U District, Seattle, WA",
    matchScore: 86,
    matchReasons: [
      "ACT approach great for the uncertainty you described",
      "Experience with career and identity questions",
      "Collaborative style you prefer"
    ],
    availability: "Video sessions, flexible scheduling",
    sessionRate: 175,
    acceptsInsurance: ["Regence", "Cigna"],
    offersFreeConsultation: true,
    freeConsultationDuration: 15
  }
]

// Generate available time slots for booking
export function generateTimeSlots(therapistId: string): TimeSlot[] {
  const slots: TimeSlot[] = []
  const today = new Date()
  
  for (let dayOffset = 1; dayOffset <= 14; dayOffset++) {
    const date = new Date(today)
    date.setDate(today.getDate() + dayOffset)
    
    // Skip weekends for some variety
    if (date.getDay() === 0) continue
    
    const dateStr = date.toISOString().split('T')[0]
    
    // Different availability patterns per therapist
    const hours = therapistId === "1" 
      ? [17, 18, 19, 10, 11] 
      : therapistId === "2" 
        ? [9, 10, 11, 14, 15, 16, 17] 
        : [10, 11, 13, 14, 15]
    
    hours.forEach(hour => {
      // Randomly mark some as unavailable
      const available = Math.random() > 0.3
      slots.push({
        date: dateStr,
        time: `${hour.toString().padStart(2, '0')}:00`,
        available
      })
    })
  }
  
  return slots.filter(s => s.available).slice(0, 20)
}

// Mock sessions data
export const mockSessions: Session[] = [
  {
    id: "session-1",
    clientId: "client-1",
    therapistId: "1",
    scheduledAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    duration: 50,
    type: "consultation",
    status: "scheduled",
    isFreeConsultation: true
  },
  {
    id: "session-2",
    clientId: "client-1",
    therapistId: "1",
    scheduledAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    duration: 50,
    type: "regular",
    status: "completed",
    isFreeConsultation: false
  }
]

export function generateMatchResults(intakeData: Record<string, string>): MatchResult[] {
  // Simulate AI matching logic based on intake responses
  const results: MatchResult[] = mockTherapists.map((therapist, index) => {
    let fitExplanation = ""
    let keyStrengths: string[] = []

    if (index === 0) {
      fitExplanation = `Based on what you shared about ${intakeData.situation || "your current situation"}, Dr. Chen's integrative approach combining practical CBT techniques with mindfulness could be particularly effective. Her extensive experience with tech professionals means she understands the unique pressures you face, and her direct communication style aligns with your preference for clear, actionable guidance.`
      keyStrengths = [
        "Deep understanding of tech industry culture",
        "Balances practical tools with meaningful exploration",
        "Evening and weekend availability fits your schedule"
      ]
    } else if (index === 1) {
      fitExplanation = `Marcus's relational and somatic approach could help you reconnect with feelings you mentioned being disconnected from. His patient, unhurried style creates space for deeper exploration, and his focus on understanding patterns from the past could illuminate why certain situations trigger you now.`
      keyStrengths = [
        "Specializes in mind-body connection",
        "Creates exceptionally safe therapeutic space",
        "Helps uncover root causes, not just symptoms"
      ]
    } else {
      fitExplanation = `Dr. Rodriguez's values-focused approach through ACT could be transformative for the identity questions you're navigating. Her experience with high-achievers who feel misaligned with their success, combined with her collaborative style, makes her an excellent fit for exploring what you truly want.`
      keyStrengths = [
        "Expert in values clarification and life alignment",
        "Understands multicultural identity navigation",
        "Highly collaborative therapeutic relationship"
      ]
    }

    return {
      therapist,
      fitExplanation,
      keyStrengths
    }
  })

  return results
}
