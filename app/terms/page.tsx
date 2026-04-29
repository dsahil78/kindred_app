import { ComingSoon } from "@/components/coming-soon"

export default function TermsPage() {
  return (
    <ComingSoon
      eyebrow="Terms of Service"
      heading="Terms in progress —"
      italicTail="written for humans."
      paragraphs={[
        "Most Terms of Service feel designed to be skipped. We’re drafting ours with the opposite goal: short, specific, and genuinely readable, so you know what you’re agreeing to without a law degree.",
        "Until the formal version is published, the spirit is simple: be kind to the therapists on Kindred, be kind to the people coming to them for help, and we’ll do our best to be kind back. Full text coming soon.",
      ]}
    />
  )
}
