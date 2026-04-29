import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

type ComingSoonProps = {
  eyebrow: string
  heading: string
  italicTail?: string
  paragraphs: string[]
}

export function ComingSoon({ eyebrow, heading, italicTail, paragraphs }: ComingSoonProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex flex-1 items-center justify-center px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-secondary">
            {eyebrow}
          </p>

          <h1 className="mt-6 font-serif text-[2.25rem] font-normal leading-[1.1] tracking-tight sm:text-[2.75rem]">
            <span className="text-foreground">{heading}</span>
            {italicTail ? (
              <>
                {" "}
                <span className="italic text-primary">{italicTail}</span>
              </>
            ) : null}
          </h1>

          <div className="mx-auto mt-10 max-w-xl space-y-5 text-left text-lg leading-relaxed text-muted-foreground sm:text-center">
            {paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
          </div>

          <p className="mt-20 text-xs text-muted-foreground/80">
            Have a question or thought to share? Reach out at{" "}
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

      <Footer />
    </div>
  )
}
