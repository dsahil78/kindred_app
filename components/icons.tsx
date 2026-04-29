export function UserIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="16" r="8" fill="currentColor" opacity="0.9" />
      <path
        d="M8 42c0-8.837 7.163-16 16-16s16 7.163 16 16"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

export function TherapistIcon({ className, variant = "default" }: { className?: string; variant?: "default" | "highlighted" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="16" r="7" fill="currentColor" opacity={variant === "highlighted" ? "0.9" : "0.6"} />
      <path
        d="M10 40c0-7.732 6.268-14 14-14s14 6.268 14 14"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        opacity={variant === "highlighted" ? "0.9" : "0.6"}
      />
    </svg>
  )
}

export function ConnectionLine({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 2" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <line
        x1="0"
        y1="1"
        x2="200"
        y2="1"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="6 8"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z"
        fill="currentColor"
        opacity="0.15"
      />
      <path
        d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function BrainIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 4.5c-1.5 0-2.7.8-3.4 2-.3-.1-.6-.2-1-.2-1.7 0-3.1 1.4-3.1 3.1 0 .4.1.8.2 1.1C3.7 11.2 3 12.5 3 14c0 2.2 1.8 4 4 4h1c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2h1c2.2 0 4-1.8 4-4 0-1.5-.7-2.8-1.7-3.5.1-.3.2-.7.2-1.1 0-1.7-1.4-3.1-3.1-3.1-.4 0-.7.1-1 .2-.7-1.2-1.9-2-3.4-2z"
        fill="currentColor"
        opacity="0.15"
      />
      <path
        d="M12 4.5c-1.5 0-2.7.8-3.4 2-.3-.1-.6-.2-1-.2-1.7 0-3.1 1.4-3.1 3.1 0 .4.1.8.2 1.1C3.7 11.2 3 12.5 3 14c0 2.2 1.8 4 4 4h1c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2h1c2.2 0 4-1.8 4-4 0-1.5-.7-2.8-1.7-3.5.1-.3.2-.7.2-1.1 0-1.7-1.4-3.1-3.1-3.1-.4 0-.7.1-1 .2-.7-1.2-1.9-2-3.4-2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M12 4.5V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function HeartHandIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 7.5c-.7-1.2-2-2-3.5-2C6.5 5.5 5 7 5 8.9c0 2.4 2.2 4.3 5.5 7.3l1.5 1.3 1.5-1.3c3.3-3 5.5-4.9 5.5-7.3 0-1.9-1.5-3.4-3.5-3.4-1.5 0-2.8.8-3.5 2z"
        fill="currentColor"
        opacity="0.15"
      />
      <path
        d="M12 7.5c-.7-1.2-2-2-3.5-2C6.5 5.5 5 7 5 8.9c0 2.4 2.2 4.3 5.5 7.3l1.5 1.3 1.5-1.3c3.3-3 5.5-4.9 5.5-7.3 0-1.9-1.5-3.4-3.5-3.4-1.5 0-2.8.8-3.5 2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M2 20h4l1.5-1.5M22 20h-4l-1.5-1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function MessageCircleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 21c4.97 0 9-3.58 9-8s-4.03-8-9-8-9 3.58-9 8c0 1.5.42 2.9 1.14 4.1L3 21l4.9-1.14c1.2.72 2.6 1.14 4.1 1.14z"
        fill="currentColor"
        opacity="0.15"
      />
      <path
        d="M12 21c4.97 0 9-3.58 9-8s-4.03-8-9-8-9 3.58-9 8c0 1.5.42 2.9 1.14 4.1L3 21l4.9-1.14c1.2.72 2.6 1.14 4.1 1.14z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

export function TargetIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  )
}

export function SoundWaveIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 12h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 10v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function SparkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function CheckmarkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" />
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function LockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="10" width="14" height="11" rx="2" fill="currentColor" opacity="0.15" />
      <rect x="5" y="10" width="14" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M8 10V7a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="15" r="1.5" fill="currentColor" />
    </svg>
  )
}
