import { ComingSoon } from "@/components/coming-soon"

export default function PrivacyPage() {
  return (
    <ComingSoon
      eyebrow="Privacy"
      heading="A privacy policy you can"
      italicTail="actually read."
      paragraphs={[
        "Mental health is the last place anyone should worry about where their data goes. We’re working with our compliance team to publish a privacy policy written in plain language — not legalese — so you know exactly what we collect, how we use it, and what we never do with it.",
        "The short version while we finalize the long one: we don’t sell your data, we don’t share your story without your say-so, and you can delete your account at any time. The full document will be here shortly.",
      ]}
    />
  )
}
