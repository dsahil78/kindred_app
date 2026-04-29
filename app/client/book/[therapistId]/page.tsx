"use client"

import { useState, useEffect, use } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { mockTherapists, generateTimeSlots } from "@/lib/mock-data"
import { ArrowLeft, ArrowRight, Check, Calendar, Clock, Video } from "lucide-react"

export default function BookingPage({ params }: { params: Promise<{ therapistId: string }> }) {
  const { therapistId } = use(params)
  const router = useRouter()
  const searchParams = useSearchParams()
  const bookingType = searchParams.get("type") || "session"
  
  const therapist = mockTherapists.find(t => t.id === therapistId)
  const [step, setStep] = useState<"date" | "time" | "confirm">("date")
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [timeSlots, setTimeSlots] = useState<ReturnType<typeof generateTimeSlots>>([])
  const [isBooking, setIsBooking] = useState(false)

  useEffect(() => {
    if (therapistId) {
      setTimeSlots(generateTimeSlots(therapistId))
    }
  }, [therapistId])

  if (!therapist) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Therapist not found</p>
      </div>
    )
  }

  const isConsultation = bookingType === "consultation" && therapist.offersFreeConsultation
  const duration = isConsultation ? therapist.freeConsultationDuration || 15 : 50

  const availableDates = [...new Set(timeSlots.map(s => s.date))].slice(0, 10)
  const availableTimesForDate = timeSlots.filter(s => s.date === selectedDate)

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { 
      weekday: "short", 
      month: "short", 
      day: "numeric" 
    })
  }

  const formatTime = (timeStr: string) => {
    const [hours] = timeStr.split(":")
    const hour = parseInt(hours)
    return hour >= 12 
      ? `${hour === 12 ? 12 : hour - 12}:00 PM` 
      : `${hour}:00 AM`
  }

  const handleConfirm = async () => {
    setIsBooking(true)
    // Simulate booking API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    router.push("/client/dashboard?booked=true")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-3xl items-center px-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        {/* Therapist Info Header */}
        <div className="mb-8 flex items-center gap-4">
          <Image
            src={therapist.photo}
            alt={therapist.name}
            width={64}
            height={64}
            className="rounded-full object-cover"
          />
          <div>
            <h1 className="font-serif text-xl font-medium text-foreground">
              {isConsultation ? "Free consultation with" : "Book a session with"} {therapist.name}
            </h1>
            <p className="text-sm text-muted-foreground">
              {duration} minutes {isConsultation ? "- Free" : `- $${therapist.sessionRate}`}
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 flex items-center gap-4">
          {["date", "time", "confirm"].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                  step === s
                    ? "bg-primary text-primary-foreground"
                    : (step === "time" && s === "date") || (step === "confirm" && (s === "date" || s === "time"))
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {(step === "time" && s === "date") || (step === "confirm" && (s === "date" || s === "time")) ? (
                  <Check className="h-4 w-4" />
                ) : (
                  i + 1
                )}
              </div>
              <span className={`text-sm ${step === s ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                {s === "date" ? "Select date" : s === "time" ? "Select time" : "Confirm"}
              </span>
              {i < 2 && <div className="mx-2 h-px w-8 bg-border" />}
            </div>
          ))}
        </div>

        {/* Date Selection */}
        {step === "date" && (
          <div className="space-y-6">
            <div>
              <h2 className="font-medium text-foreground">Choose a date</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Select an available date for your {isConsultation ? "consultation" : "session"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
              {availableDates.map((date) => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`rounded-xl border-2 p-4 text-center transition-all ${
                    selectedDate === date
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <Calendar className="mx-auto mb-2 h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">
                    {formatDate(date)}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex justify-end">
              <Button
                onClick={() => setStep("time")}
                disabled={!selectedDate}
                className="rounded-full"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Time Selection */}
        {step === "time" && (
          <div className="space-y-6">
            <div>
              <h2 className="font-medium text-foreground">Choose a time</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Available times for {selectedDate && formatDate(selectedDate)}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {availableTimesForDate.map((slot) => (
                <button
                  key={`${slot.date}-${slot.time}`}
                  onClick={() => setSelectedTime(slot.time)}
                  className={`rounded-xl border-2 p-4 text-center transition-all ${
                    selectedTime === slot.time
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <Clock className="mx-auto mb-2 h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">
                    {formatTime(slot.time)}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <Button variant="ghost" onClick={() => setStep("date")} className="rounded-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={() => setStep("confirm")}
                disabled={!selectedTime}
                className="rounded-full"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Confirmation */}
        {step === "confirm" && (
          <div className="space-y-6">
            <div>
              <h2 className="font-medium text-foreground">Confirm your booking</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Review the details below and confirm
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <Image
                  src={therapist.photo}
                  alt={therapist.name}
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-serif text-lg font-medium text-foreground">
                    {therapist.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{therapist.credentials}</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <span className="text-foreground">Date</span>
                  </div>
                  <span className="font-medium text-foreground">
                    {selectedDate && formatDate(selectedDate)}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span className="text-foreground">Time</span>
                  </div>
                  <span className="font-medium text-foreground">
                    {selectedTime && formatTime(selectedTime)}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div className="flex items-center gap-3">
                    <Video className="h-5 w-5 text-muted-foreground" />
                    <span className="text-foreground">Session type</span>
                  </div>
                  <span className="font-medium text-foreground">
                    {isConsultation ? "Free consultation" : "Regular session"} ({duration} min)
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-foreground">Total</span>
                  <span className="text-lg font-semibold text-foreground">
                    {isConsultation ? "Free" : `$${therapist.sessionRate}`}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="ghost" onClick={() => setStep("time")} className="rounded-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={isBooking}
                className="rounded-full px-8"
              >
                {isBooking ? "Booking..." : "Confirm booking"}
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
