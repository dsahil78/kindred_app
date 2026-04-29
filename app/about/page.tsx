import { ComingSoon } from "@/components/coming-soon"

export default function AboutPage() {
  return (
    <ComingSoon
      eyebrow="About Kindred"
      heading="Our story is still"
      italicTail="being written."
      paragraphs={[
        "Kindred started with a simple frustration: finding the right therapist shouldn’t feel like searching for a needle in 300 identical haystacks. We’re a small team building toward something better — one where the first call usually becomes the first session.",
        "The longer version of why we started, who’s behind it, and what we believe will live on this page soon. Until then, we’re heads-down making the product itself live up to the idea.",
      ]}
    />
  )
}
