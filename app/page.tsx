import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { MatchingDiagram } from "@/components/matching-diagram"
import { ArrowRight, ArrowLeftRight } from "lucide-react"
import {
  BrainIcon,
  HeartHandIcon,
  MessageCircleIcon,
  TargetIcon,
  SoundWaveIcon,
  SparkIcon,
  CheckmarkIcon,
  LockIcon,
} from "@/components/icons"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-6 pb-24 pt-16 lg:px-8 lg:pt-28">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:justify-between">
              {/* Left content */}
              <div className="max-w-xl lg:max-w-lg">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-secondary">
                  {/* For Patients */}
                </p>
                
                <h1 className="mt-8 font-serif text-[2.75rem] font-normal leading-[1.15] tracking-tight sm:text-5xl lg:text-[3.25rem]">
                  <span className="text-foreground">The right therapist</span>
                  <br />
                  <span className="italic text-primary">changes everything.</span>
                </h1>
                
                <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
                  Finding them shouldn&apos;t require scrolling through hundreds
                  of identical listings and hoping for the best. Kindred uses AI
                  to match you based on what actually matters — personality,
                  approach, and genuine human fit.
                </p>
                
                <div className="mt-10">
                  <Button asChild size="lg" className="h-14 rounded-full px-8 text-base font-medium">
                    <Link href="/auth?mode=signup&role=client">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                
                <p className="mt-6 text-sm text-muted-foreground">
                  Free for patients, always.{" "}
                  <Link href="/therapists" className="text-foreground underline underline-offset-4 transition-colors hover:text-primary">
                    Are you a therapist?
                  </Link>
                </p>
              </div>
              
              {/* Right illustration */}
              <div className="flex w-full flex-1 justify-center lg:justify-end">
                <MatchingDiagram />
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="border-t border-border bg-card px-6 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-secondary">
                The Problem
              </p>
              <h2 className="mt-6 font-serif text-[2rem] font-normal leading-tight tracking-tight sm:text-[2.5rem]">
                Finding help is broken.
              </h2>
            </div>
            
            <div className="mt-20 grid gap-x-12 gap-y-16 sm:grid-cols-3">
              <div>
                <div className="font-serif text-[3.5rem] font-normal leading-none text-primary">340+</div>
                <div className="mt-4 text-lg font-medium text-foreground">identical profiles, no real signal</div>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Directories show you credentials and a stock headshot. They tell you nothing 
                  about whether this person will actually click with you.
                </p>
              </div>
              
              <div>
                <div className="font-serif text-[3.5rem] font-normal leading-none text-primary">1 in 3</div>
                <div className="mt-4 text-lg font-medium text-foreground">patients drop out due to poor fit</div>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  A bad match doesn&apos;t just waste your time. It compounds the weight you&apos;re 
                  already carrying. That barrier shouldn&apos;t exist.
                </p>
              </div>
              
              <div>
                <div className="font-serif text-[3.5rem] font-normal leading-none text-primary">57%</div>
                <div className="mt-4 text-lg font-medium text-foreground">of adults never get help</div>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  When matching fails, people don&apos;t just switch therapists. They stop trying 
                  altogether. A wrong first experience closes the door.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="px-6 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-secondary">
                How It Works
              </p>
              <h2 className="mt-6 font-serif text-[2rem] font-normal leading-tight tracking-tight sm:text-[2.5rem]">
                From conversation to the right match.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                No overwhelming search forms. No guessing. Just four steps that lead
                to therapists who are genuinely right for you.
              </p>
            </div>

            <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: "01",
                  icon: MessageCircleIcon,
                  title: "Share your story",
                  description: "Tell us what brought you here, in your own words. No clinical jargon, no wrong answers."
                },
                {
                  step: "02",
                  icon: BrainIcon,
                  title: "AI finds your fit",
                  description: "Our engine evaluates dozens of dimensions to surface 2–3 real matches."
                },
                {
                  step: "03",
                  icon: SoundWaveIcon,
                  title: "Hear their voice",
                  description: "Listen to therapist voice intros before booking. Know who you’re meeting."
                },
                {
                  step: "04",
                  icon: HeartHandIcon,
                  title: "Book with confidence",
                  description: "Walk into your first session already feeling this could be the one."
                }
              ].map((item) => (
                <div key={item.step} className="group rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                      Step {item.step}
                    </span>
                    <item.icon className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="mt-6 font-serif text-xl font-normal text-foreground">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Kindred Fit Engine Section */}
        <section id="fit-engine" className="border-t border-border bg-card px-6 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            {/* Eyebrow + heading */}
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 shadow-sm">
                <SparkIcon className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-medium tracking-[0.15em] text-foreground">
                  THE KINDRED FIT ENGINE — POWERED BY AI
                </span>
              </div>
              <h2 className="mt-8 font-serif text-[2rem] font-normal leading-[1.1] tracking-tight sm:text-[2.75rem]">
                <span className="text-foreground">Matching what matters,</span>
                <br />
                <span className="italic text-primary">on both sides.</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Most platforms match on insurance and zip code. We pair what you need
                with what each therapist actually does best — across four dimensions
                that predict whether therapy works.
              </p>
            </div>

            {/* Four dimensions */}
            <div className="mt-20 divide-y divide-border border-y border-border">
              {[
                {
                  icon: TargetIcon,
                  title: "Primary Focus",
                  description: "What you need help with — matched to what each therapist is strongest at.",
                  you: "What you need help with",
                  them: "What they’re strongest at"
                },
                {
                  icon: MessageCircleIcon,
                  title: "Therapeutic Style",
                  description: "Direct tools and structure, or space to explore — your preference paired with their practice.",
                  you: "How you like to work",
                  them: "How they actually work with clients"
                },
                {
                  icon: BrainIcon,
                  title: "Depth Orientation",
                  description: "Focus on what’s happening now, or understand the root causes underneath.",
                  you: "What you want to focus on",
                  them: "Short-term relief or deeper understanding"
                },
                {
                  icon: HeartHandIcon,
                  title: "Identity & Cultural Fit",
                  description: "Language, background, and lived experience that create real understanding.",
                  you: "Who you are and what matters to you",
                  them: "Their background and lived experience"
                }
              ].map((d, i) => (
                <div
                  key={d.title}
                  className="grid gap-8 py-10 lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-12"
                >
                  {/* Title group */}
                  <div className="lg:col-span-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20">
                        <d.icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-serif text-base text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-5 font-serif text-2xl font-normal leading-tight text-foreground">
                      {d.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">
                      {d.description}
                    </p>
                  </div>

                  {/* YOU ↔ THERAPIST pairing */}
                  <div className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-3 sm:gap-4 lg:col-span-7">
                    <div className="rounded-2xl bg-secondary/10 px-4 py-4 ring-1 ring-secondary/25 sm:px-5 sm:py-5">
                      <div className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-secondary">
                        You
                      </div>
                      <p className="mt-2 text-sm leading-snug text-foreground sm:text-base">
                        {d.you}
                      </p>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-background text-muted-foreground ring-1 ring-border">
                        <ArrowLeftRight className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="rounded-2xl bg-primary/10 px-4 py-4 ring-1 ring-primary/30 sm:px-5 sm:py-5">
                      <div className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-primary">
                        Therapist
                      </div>
                      <p className="mt-2 text-sm leading-snug text-foreground sm:text-base">
                        {d.them}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Moat strip */}
            <div className="mt-20">
              <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-secondary">
                Why this gets better over time
              </p>
              <div className="mt-8 grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:gap-4">
                {[
                  { icon: CheckmarkIcon, text: "Every match generates outcome data." },
                  { icon: SparkIcon, text: "The engine gets smarter with every booking." },
                  { icon: LockIcon, text: "A proprietary dataset no directory can retrofit." }
                ].flatMap((m, i, arr) => {
                  const card = (
                    <div
                      key={m.text}
                      className="rounded-2xl border border-border bg-background p-6 text-center lg:p-7"
                    >
                      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20">
                        <m.icon className="h-5 w-5 text-primary" />
                      </div>
                      <p className="mt-4 font-serif text-lg leading-snug text-foreground">
                        {m.text}
                      </p>
                    </div>
                  )
                  if (i === arr.length - 1) return [card]
                  const arrow = (
                    <div
                      key={`arrow-${i}`}
                      className="hidden justify-center text-muted-foreground lg:flex"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  )
                  return [card, arrow]
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="px-6 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <blockquote>
              <p className="font-serif text-2xl font-normal leading-relaxed text-foreground sm:text-[1.75rem]">
                &ldquo;There&apos;s a gap in the market for personality fit. You can find therapist 
                credentials, but not personality fit.&rdquo;
              </p>
              <footer className="mt-10">
                <div className="text-base font-medium text-foreground">Nick Norman</div>
                <div className="mt-1 text-muted-foreground">
                  Clinical Program Manager, Mindful Therapy Group
                </div>
              </footer>
            </blockquote>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-border bg-card px-6 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-[2rem] font-normal leading-tight tracking-tight sm:text-[2.5rem]">
              Your match is out there.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Stop scrolling through hundreds of profiles. Let us find the therapist 
              who truly fits you.
            </p>
            <div className="mt-10">
              <Button asChild size="lg" className="h-14 rounded-full px-8 text-base font-medium">
                <Link href="/auth?mode=signup&role=client">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
