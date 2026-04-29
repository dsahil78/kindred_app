"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

type FindMatchLinkProps = {
  children: React.ReactNode
  className?: string
}

export function FindMatchLink({ children, className }: FindMatchLinkProps) {
  const router = useRouter()
  const { isAuthenticated, user, clientProfile } = useAuth()

  const handleClick = () => {
    if (!isAuthenticated || !user) {
      router.push("/auth?intent=match")
      return
    }

    if (user.role === "client") {
      router.push(clientProfile?.onboardingComplete ? "/client/matches" : "/client/onboarding")
      return
    }

    router.push("/therapist/dashboard")
  }

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  )
}
