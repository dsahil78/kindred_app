import { ComingSoon } from "@/components/coming-soon"

export default function ClientSettingsPage() {
  return (
    <ComingSoon
      eyebrow="Settings"
      heading="Account settings —"
      italicTail="coming soon."
      paragraphs={[
        "Soon you’ll be able to update your matching preferences, manage notifications, swap insurance details, and review the data Kindred has on file — all in one place.",
        "While we finish building this out, reach out and we’ll make any change you need by hand.",
      ]}
    />
  )
}
