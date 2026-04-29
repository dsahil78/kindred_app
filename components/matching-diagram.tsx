"use client"

import { useEffect, useState } from "react"
import { UserIcon, TherapistIcon } from "./icons"

export function MatchingDiagram() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative mx-auto aspect-[600/500] w-full min-w-[320px] max-w-[560px]">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 600 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Dashed line: user → top therapist (edge to edge) */}
        <line
          x1="207"
          y1="216"
          x2="402"
          y2="99"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="2 9"
          strokeLinecap="round"
          className="text-primary/45"
          style={{
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.6s ease-out 0.3s",
          }}
        />

        {/* Dashed line: user → bottom therapist */}
        <line
          x1="207"
          y1="284"
          x2="402"
          y2="401"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="2 9"
          strokeLinecap="round"
          className="text-primary/45"
          style={{
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.6s ease-out 0.4s",
          }}
        />

        {/* Solid dotted line: user → best match (between circle edges) */}
        <g
          className="text-primary"
          style={{
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.6s ease-out 0.5s",
          }}
        >
          {[222, 259, 296, 333, 370].map((x) => (
            <circle key={x} cx={x} cy="250" r="5" fill="currentColor" opacity="0.85" />
          ))}
        </g>
      </svg>

      {/* User node — left (22% width = 132 viewBox units, r=66) */}
      <div
        className="absolute aspect-square w-[22%]"
        style={{
          left: "25%",
          top: "50%",
          transform: `translate(-50%, -50%) ${mounted ? "translateX(0)" : "translateX(-12px)"}`,
          opacity: mounted ? 1 : 0,
          transition: "all 0.5s ease-out 0.1s",
        }}
      >
        <div className="flex h-full w-full items-center justify-center rounded-full bg-secondary/20 ring-1 ring-secondary/30">
          <UserIcon className="h-1/2 w-1/2 text-secondary/70" />
        </div>
      </div>

      {/* Top therapist (14% width = 84 viewBox units, r=42) */}
      <div
        className="absolute aspect-square w-[14%]"
        style={{
          left: "73.3%",
          top: "15%",
          transform: `translate(-50%, -50%) ${mounted ? "translateY(0)" : "translateY(10px)"}`,
          opacity: mounted ? 1 : 0,
          transition: "all 0.5s ease-out 0.4s",
        }}
      >
        <div className="flex h-full w-full items-center justify-center rounded-full bg-card ring-2 ring-border">
          <TherapistIcon className="h-1/2 w-1/2 text-muted-foreground/50" />
        </div>
      </div>

      {/* Best match — center right (22% width) */}
      <div
        className="absolute aspect-square w-[22%]"
        style={{
          left: "73.3%",
          top: "50%",
          transform: `translate(-50%, -50%) ${mounted ? "translateX(0)" : "translateX(12px)"}`,
          opacity: mounted ? 1 : 0,
          transition: "all 0.5s ease-out 0.6s",
        }}
      >
        <div className="relative h-full w-full">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-primary/15 ring-[2.5px] ring-primary/70">
            <TherapistIcon className="h-1/2 w-1/2 text-primary" variant="highlighted" />
          </div>

          {/* Checkmark badge */}
          <div className="absolute right-0 top-0 flex h-7 w-7 -translate-y-1 translate-x-1 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md sm:h-8 sm:w-8">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M5 12.5l4.5 4.5L19 7.5"
                stroke="currentColor"
                strokeWidth="2.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Best match pill */}
          <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary sm:mt-3 sm:px-4 sm:py-1.5 sm:text-sm">
            Best match
          </div>
        </div>
      </div>

      {/* Bottom therapist (14% width) */}
      <div
        className="absolute aspect-square w-[14%]"
        style={{
          left: "73.3%",
          top: "85%",
          transform: `translate(-50%, -50%) ${mounted ? "translateY(0)" : "translateY(-10px)"}`,
          opacity: mounted ? 1 : 0,
          transition: "all 0.5s ease-out 0.5s",
        }}
      >
        <div className="flex h-full w-full items-center justify-center rounded-full bg-card ring-2 ring-border">
          <TherapistIcon className="h-1/2 w-1/2 text-muted-foreground/50" />
        </div>
      </div>
    </div>
  )
}
