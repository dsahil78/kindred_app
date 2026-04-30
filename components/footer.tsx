import Link from "next/link"
import { FindMatchLink } from "@/components/find-match-link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-12 sm:px-16 py-16 lg:px-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl font-normal tracking-tight text-foreground">Kindred</span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Find a therapist who gets you. AI-powered matching based on what actually matters.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">For Clients</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <FindMatchLink className="cursor-pointer text-left transition-colors hover:text-foreground">
                  Find Your Match
                </FindMatchLink>
              </li>
              <li>
                <Link href="/#how-it-works" className="transition-colors hover:text-foreground">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#fit-engine" className="transition-colors hover:text-foreground">
                  What We Analyze
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">For Therapists</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/therapists" className="transition-colors hover:text-foreground">
                  Join Kindred
                </Link>
              </li>
              <li>
                <Link href="/therapists#pricing" className="transition-colors hover:text-foreground">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/therapists#faq" className="transition-colors hover:text-foreground">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="transition-colors hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="transition-colors hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition-colors hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            2026 Kindred. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with care at the University of Washington, Seattle.
          </p>
        </div>
      </div>
    </footer>
  )
}
