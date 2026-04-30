"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"
import type { UserRole } from "@/lib/types"

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <AuthPageInner />
    </Suspense>
  )
}

function AuthPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const intent = searchParams.get("intent")
  const matchIntent = intent === "match"
  const initialMode = searchParams.get("mode")
  const initialRole: UserRole = searchParams.get("role") === "therapist" ? "therapist" : "client"
  const { login, register } = useAuth()
  const [isLogin, setIsLogin] = useState(initialMode !== "signup")
  const [role, setRole] = useState<UserRole>(initialRole)
  const [email, setEmail] = useState(
    initialRole === "therapist" ? "demo@therapist.kindred.app" : "demo@client.kindred.app"
  )
  const [password, setPassword] = useState("demo123")
  const [name, setName] = useState(
    initialRole === "therapist" ? "Dr. Demo Therapist" : "Demo User"
  )
  const [isLoading, setIsLoading] = useState(false)
  
  // Update demo credentials when role changes
  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole)
    if (newRole === "client") {
      setEmail("demo@client.kindred.app")
      setName("Demo User")
    } else {
      setEmail("demo@therapist.kindred.app")
      setName("Dr. Demo Therapist")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      let success: boolean
      if (isLogin) {
        success = await login(email, password, role)
      } else {
        success = await register(email, password, name, role)
      }

      if (success) {
        if (role === "client") {
          router.push("/client/onboarding")
        } else {
          router.push("/therapist/onboarding")
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="w-full bg-background">
        <div className="mx-auto flex h-20 max-w-7xl items-center px-6 lg:px-8">
          <Link href="/" className="flex items-center">
            <span className="font-serif text-2xl font-normal tracking-tight text-foreground">Kindred</span>
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="text-center">
            {matchIntent && (
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-secondary">
                Find Your Match
              </p>
            )}
            <h1 className={`font-serif text-3xl font-medium text-foreground ${matchIntent ? "mt-3" : ""}`}>
              {matchIntent
                ? isLogin
                  ? "Sign in to find your match"
                  : "Create an account to find your match"
                : isLogin
                ? "Welcome back"
                : "Create your account"}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {matchIntent
                ? "We’ll take it from here — a few questions, then 2–3 therapists who actually fit."
                : isLogin
                ? "Sign in to continue your journey"
                : "Join Kindred to find your perfect therapeutic match"}
            </p>
          </div>

          {/* Role Selection */}
          <div className={`mt-8 flex gap-3 ${matchIntent ? "hidden" : ""}`}>
            <button
              type="button"
              onClick={() => handleRoleChange("client")}
              className={`flex-1 rounded-xl border-2 p-4 text-left transition-all ${
                role === "client" 
                  ? "border-primary bg-primary/5" 
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="text-sm font-medium text-foreground">I am seeking therapy</div>
              <div className="mt-1 text-xs text-muted-foreground">Find a therapist who gets you</div>
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange("therapist")}
              className={`flex-1 rounded-xl border-2 p-4 text-left transition-all ${
                role === "therapist" 
                  ? "border-primary bg-primary/5" 
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="text-sm font-medium text-foreground">I am a therapist</div>
              <div className="mt-1 text-xs text-muted-foreground">Grow your practice with Kindred</div>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required={!isLogin}
                  className="h-12 rounded-xl border-border bg-card"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="h-12 rounded-xl border-border bg-card"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="h-12 rounded-xl border-border bg-card"
              />
            </div>

            <Button 
              type="submit" 
              className="h-12 w-full rounded-full text-base"
              disabled={isLoading}
            >
              {isLoading 
                ? "Please wait..." 
                : isLogin 
                  ? "Sign in" 
                  : "Create account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"}
            </button>
          </div>
          
          {/* Demo Notice */}
          <div className="mt-8 rounded-xl border border-dashed border-primary/30 bg-primary/5 p-4 text-center">
            <p className="text-xs font-medium uppercase tracking-wider text-primary">Demo Mode</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Credentials are pre-filled. Toggle between client and therapist to see different demo accounts.
            </p>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground/80">
            Want to know more? Reach out at{" "}
            <a
              href="mailto:sahildua@uw.edu"
              className="text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
            >
              sahildua@uw.edu
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  )
}
