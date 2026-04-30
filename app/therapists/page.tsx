import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { CheckmarkIcon } from "@/components/icons"

export default function TherapistsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="px-12 sm:px-16 pb-16 pt-16 lg:px-20 lg:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-secondary">
              For Therapists
            </p>
            <h1 className="mt-6 font-serif text-[2.5rem] font-normal leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.25rem]">
              <span className="text-foreground">Fewer wrong-fit calls.</span>
              <br />
              <span className="italic text-primary">Better-matched clients.</span>
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
              Kindred sends you clients who are actually a fit for how you practice — so the
              first call usually becomes the first session.
            </p>
          </div>
        </section>

        {/* Who this is for + Pricing */}
        <section
          id="pricing"
          className="border-t border-border bg-card px-12 sm:px-16 py-24 lg:px-20 lg:py-32"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-secondary">
                Pricing
              </p>
              <h2 className="mt-6 font-serif text-[2rem] font-normal leading-tight tracking-tight sm:text-[2.5rem]">
                Free for clients. <span className="italic text-primary">$49/mo for therapists.</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Here&apos;s who you&apos;ll be matched with — and what it costs.
              </p>
            </div>

            <div className="mt-16 grid gap-6 lg:grid-cols-2 lg:gap-8">
              {/* Clients card */}
              <div className="flex flex-col rounded-3xl border border-border bg-background p-8 ring-1 ring-secondary/15 lg:p-10">
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                      Clients
                    </div>
                    <h3 className="mt-2 font-serif text-3xl font-normal text-foreground">
                      Free, always
                    </h3>
                  </div>
                  <div className="rounded-full bg-secondary/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-secondary">
                    No fee
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Who&apos;s coming to Kindred:
                </p>
                <ul className="mt-6 space-y-4">
                  {[
                    "Adults 22–35 in high-pressure fields — tech, healthcare, financial services.",
                    "No personal therapy network to lean on.",
                    "Today’s barrier: lost in 300 search results, or burned by a wrong fit. Either way, they give up.",
                  ].map((point) => (
                    <li key={point} className="flex gap-3">
                      <CheckmarkIcon className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                      <span className="leading-relaxed text-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Therapists card */}
              <div className="relative flex flex-col overflow-hidden rounded-3xl border-2 border-primary/40 bg-background p-8 shadow-sm ring-1 ring-primary/10 lg:p-10">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
                <div className="relative flex items-baseline justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      Therapists
                    </div>
                    <h3 className="mt-2 font-serif text-3xl font-normal text-foreground">
                      <span className="text-4xl">$49</span>
                      <span className="text-base text-muted-foreground"> / month</span>
                    </h3>
                  </div>
                  <div className="rounded-full bg-primary px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-primary-foreground">
                    Best fit
                  </div>
                </div>
                <p className="relative mt-3 text-sm text-muted-foreground">
                  Built for therapists like you:
                </p>
                <ul className="relative mt-6 space-y-4">
                  {[
                    "Independent practice — solo or small group (3–5). LCSW, LMHC, or LMFT.",
                    "2–5 years in practice, currently listed on Psychology Today.",
                    "Losing 3–4 wrong-fit calls a month = $150–$200 in unbilled time.",
                  ].map((point) => (
                    <li key={point} className="flex gap-3">
                      <CheckmarkIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="leading-relaxed text-foreground">{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="relative mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-5">
                  <p className="text-sm leading-relaxed text-foreground">
                    <span className="font-medium">The math:</span> $49/mo to avoid up to{" "}
                    <span className="font-medium text-primary">$200/mo</span> in wasted intake calls
                    — and to fill open slots with clients who are actually right for how you work.
                  </p>
                </div>

                <div className="relative mt-8">
                  <Button
                    asChild
                    size="lg"
                    className="h-12 w-full rounded-full text-base font-medium"
                  >
                    <Link href="/auth?mode=signup&role=therapist">
                      Join Kindred
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    Cancel anytime. No setup fees.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ — placeholder while content is being drafted */}
        <section id="faq" className="px-12 sm:px-16 py-24 lg:px-20 lg:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-secondary">
              Frequently Asked
            </p>
            <h2 className="mt-6 font-serif text-[2rem] font-normal leading-tight tracking-tight sm:text-[2.5rem]">
              <span className="text-foreground">Real questions deserve</span>{" "}
              <span className="italic text-primary">real answers.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              We’re collecting the questions therapists are actually asking us — about
              client volume, billing, fit guarantees, and how the matching works under
              the hood — and answering them honestly here. This section is being drafted
              with input from the first therapists on the platform.
            </p>
            <p className="mt-12 text-xs text-muted-foreground/80">
              Have a question you want answered? Reach out at{" "}
              <a
                href="mailto:sahildua@uw.edu"
                className="text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
              >
                sahildua@uw.edu
              </a>
              .
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
