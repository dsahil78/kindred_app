"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { mockTherapists, mockSessions } from "@/lib/mock-data"
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  MessageSquare, 
  Settings, 
  Users,
  Maximize,
  Clock
} from "lucide-react"

export default function SessionRoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { user } = useAuth()
  const session = mockSessions.find(s => s.id === id)
  const therapist = session ? mockTherapists.find(t => t.id === session.therapistId) : null
  
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isMicOn, setIsMicOn] = useState(true)
  const [isConnecting, setIsConnecting] = useState(true)
  const [isConnected, setIsConnected] = useState(false)
  const [sessionTime, setSessionTime] = useState(0)
  const [showChat, setShowChat] = useState(false)
  
  // Determine user role from auth context
  const isTherapist = user?.role === "therapist"

  useEffect(() => {
    // Simulate connection delay
    const connectTimer = setTimeout(() => {
      setIsConnecting(false)
      setIsConnected(true)
    }, 3000)
    
    return () => clearTimeout(connectTimer)
  }, [])

  useEffect(() => {
    if (isConnected) {
      const interval = setInterval(() => {
        setSessionTime(prev => prev + 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isConnected])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleEndSession = () => {
    // Route to the correct feedback page based on user role from auth context
    if (isTherapist) {
      router.push(`/therapist/feedback/${id}`)
    } else {
      router.push(`/client/feedback/${id}`)
    }
  }

  if (!session || !therapist) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#1a1a1a]">
        <p className="text-white">Session not found</p>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col bg-[#1a1a1a]">
      {/* Header */}
      <header className="flex h-14 items-center justify-between border-b border-white/10 px-6">
        <div className="flex items-center gap-3">
          <span className="font-serif text-lg text-white">Kindred</span>
          <span className="text-sm text-white/50">|</span>
          <span className="text-sm text-white/70">
            {session.isFreeConsultation ? "Free Consultation" : "Therapy Session"}
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          {isConnected && (
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
              <div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
              <Clock className="h-4 w-4 text-white/70" />
              <span className="text-sm font-medium text-white">{formatTime(sessionTime)}</span>
            </div>
          )}
          <button className="rounded-lg p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Main Video Area */}
      <main className="relative flex flex-1 items-center justify-center p-6">
        {isConnecting ? (
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/10">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white" />
            </div>
            <h2 className="text-xl font-medium text-white">Connecting to session...</h2>
            <p className="mt-2 text-sm text-white/50">
              Waiting for {therapist.name} to join
            </p>
          </div>
        ) : (
          <>
            {/* Remote Video (Therapist) */}
            <div className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-2xl bg-[#2a2a2a]">
              <Image
                src={therapist.photo}
                alt={therapist.name}
                fill
                className="object-cover opacity-90"
              />
              <div className="absolute bottom-4 left-4 rounded-lg bg-black/50 px-3 py-1.5 backdrop-blur">
                <span className="text-sm font-medium text-white">{therapist.name}</span>
              </div>
            </div>

            {/* Self View */}
            <div className="absolute bottom-24 right-8 aspect-video w-48 overflow-hidden rounded-xl border-2 border-white/20 bg-[#2a2a2a] shadow-lg">
              {isVideoOn ? (
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/30 to-secondary/30">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                    <span className="text-2xl font-medium text-white">You</span>
                  </div>
                </div>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <VideoOff className="h-8 w-8 text-white/50" />
                </div>
              )}
            </div>
          </>
        )}

        {/* Chat Sidebar */}
        {showChat && (
          <div className="absolute bottom-24 right-64 top-6 w-80 rounded-xl border border-white/10 bg-[#2a2a2a] p-4">
            <h3 className="font-medium text-white">Chat</h3>
            <div className="mt-4 flex-1">
              <p className="text-center text-sm text-white/50">No messages yet</p>
            </div>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none"
              />
            </div>
          </div>
        )}
      </main>

      {/* Controls */}
      <footer className="flex h-20 items-center justify-center gap-4 border-t border-white/10 px-6">
        <button
          onClick={() => setIsMicOn(!isMicOn)}
          className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
            isMicOn 
              ? "bg-white/10 text-white hover:bg-white/20" 
              : "bg-red-500/20 text-red-500 hover:bg-red-500/30"
          }`}
        >
          {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
        </button>

        <button
          onClick={() => setIsVideoOn(!isVideoOn)}
          className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
            isVideoOn 
              ? "bg-white/10 text-white hover:bg-white/20" 
              : "bg-red-500/20 text-red-500 hover:bg-red-500/30"
          }`}
        >
          {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
        </button>

        <button
          onClick={() => setShowChat(!showChat)}
          className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
            showChat 
              ? "bg-primary text-primary-foreground" 
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          <MessageSquare className="h-5 w-5" />
        </button>

        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
          <Users className="h-5 w-5" />
        </button>

        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
          <Maximize className="h-5 w-5" />
        </button>

        <div className="mx-4 h-8 w-px bg-white/10" />

        <Button
          onClick={handleEndSession}
          className="rounded-full bg-red-500 px-6 text-white hover:bg-red-600"
        >
          <Phone className="mr-2 h-4 w-4 rotate-[135deg]" />
          End session
        </Button>
      </footer>
    </div>
  )
}
