"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { User, ClientProfile, TherapistProfile, UserRole } from "./types"

interface AuthContextType {
  user: User | null
  clientProfile: ClientProfile | null
  therapistProfile: TherapistProfile | null
  isAuthenticated: boolean
  login: (email: string, password: string, role: UserRole) => Promise<boolean>
  register: (email: string, password: string, name: string, role: UserRole) => Promise<boolean>
  logout: () => void
  updateClientProfile: (updates: Partial<ClientProfile>) => void
  updateTherapistProfile: (updates: Partial<TherapistProfile>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [clientProfile, setClientProfile] = useState<ClientProfile | null>(null)
  const [therapistProfile, setTherapistProfile] = useState<TherapistProfile | null>(null)

  const login = useCallback(async (email: string, _password: string, role: UserRole): Promise<boolean> => {
    // Simulated login - in production this would call an API
    const mockUser: User = {
      id: `user-${Date.now()}`,
      email,
      role,
      name: email.split("@")[0],
      createdAt: new Date()
    }
    
    setUser(mockUser)
    
    if (role === "client") {
      setClientProfile({
        ...mockUser,
        role: "client",
        onboardingComplete: false,
        onboardingMode: "choices"
      })
      setTherapistProfile(null)
    } else {
      setTherapistProfile({
        ...mockUser,
        role: "therapist",
        credentials: "",
        photo: "",
        specialties: [],
        approach: "",
        communicationStyle: "",
        depthOrientation: "",
        culturalBackground: "",
        languages: ["English"],
        sessionFormat: [],
        yearsExperience: 0,
        bio: "",
        shortBio: "",
        availability: "",
        sessionRate: 0,
        acceptsInsurance: [],
        offersFreeConsultation: false,
        licenseNumber: "",
        licenseState: "",
        onboardingComplete: false
      })
      setClientProfile(null)
    }
    
    return true
  }, [])

  const register = useCallback(async (email: string, _password: string, name: string, role: UserRole): Promise<boolean> => {
    const mockUser: User = {
      id: `user-${Date.now()}`,
      email,
      role,
      name,
      createdAt: new Date()
    }
    
    setUser(mockUser)
    
    if (role === "client") {
      setClientProfile({
        ...mockUser,
        role: "client",
        onboardingComplete: false,
        onboardingMode: "choices"
      })
      setTherapistProfile(null)
    } else {
      setTherapistProfile({
        ...mockUser,
        role: "therapist",
        credentials: "",
        photo: "",
        specialties: [],
        approach: "",
        communicationStyle: "",
        depthOrientation: "",
        culturalBackground: "",
        languages: ["English"],
        sessionFormat: [],
        yearsExperience: 0,
        bio: "",
        shortBio: "",
        availability: "",
        sessionRate: 0,
        acceptsInsurance: [],
        offersFreeConsultation: false,
        licenseNumber: "",
        licenseState: "",
        onboardingComplete: false
      })
      setClientProfile(null)
    }
    
    return true
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setClientProfile(null)
    setTherapistProfile(null)
  }, [])

  const updateClientProfile = useCallback((updates: Partial<ClientProfile>) => {
    setClientProfile(prev => prev ? { ...prev, ...updates } : null)
  }, [])

  const updateTherapistProfile = useCallback((updates: Partial<TherapistProfile>) => {
    setTherapistProfile(prev => prev ? { ...prev, ...updates } : null)
  }, [])

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        clientProfile, 
        therapistProfile,
        isAuthenticated: !!user,
        login, 
        register, 
        logout,
        updateClientProfile,
        updateTherapistProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
