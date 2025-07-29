"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Video, VideoOff, Mic, MicOff, Users, Settings } from "lucide-react"
import ParticleBackground from "@/components/particle-background"
import Link from "next/link"

export default function StreamPage() {
  const [isStreaming, setIsStreaming] = useState(false)
  const [isCameraOn, setIsCameraOn] = useState(false)
  const [isMicOn, setIsMicOn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [participants] = useState([
    { id: 1, name: "User 1", avatar: "👤" },
    { id: 2, name: "User 2", avatar: "👥" },
    { id: 3, name: "User 3", avatar: "🧑‍💻" },
  ])

  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const startCamera = async () => {
    setIsLoading(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      streamRef.current = stream
      setIsCameraOn(true)
      setIsMicOn(true)
    } catch (error) {
      console.error("Error accessing camera:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setIsCameraOn(false)
    setIsMicOn(false)
    setIsStreaming(false)
  }

  const toggleStreaming = () => {
    if (!isCameraOn) {
      startCamera()
    }
    setIsStreaming(!isStreaming)
  }

  const toggleMic = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !isMicOn
        setIsMicOn(!isMicOn)
      }
    }
  }

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      <ParticleBackground />

      {/* Navigation */}
      <nav className="relative z-10 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-white hover:text-purple-400 transition-colors">
                StreamLive
              </Link>
              <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30">
                {isStreaming ? "🔴 Live" : "⚫ Offline"}
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-white border-white/30">
                <Users className="w-4 h-4 mr-1" />
                {participants.length + 1}
              </Badge>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Stream Room</h1>
          <p className="text-slate-300 text-lg">Share your content with the world</p>
        </div>

        {/* Main Video Grid */}
        <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Local Video Preview */}
          <div className="lg:col-span-2">
            <Card className="bg-black/40 backdrop-blur-lg border-white/20 overflow-hidden">
              <div className="aspect-video relative bg-slate-800">
                {isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
                  </div>
                ) : isCameraOn ? (
                  <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                    <div className="text-center">
                      <VideoOff className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Camera is off</p>
                    </div>
                  </div>
                )}

                {/* Video Controls Overlay */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center space-x-3 bg-black/60 backdrop-blur-sm rounded-full px-6 py-3">
                    <Button
                      size="sm"
                      variant={isCameraOn ? "default" : "secondary"}
                      onClick={() => (isCameraOn ? stopCamera() : startCamera())}
                      className="rounded-full"
                    >
                      {isCameraOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant={isMicOn ? "default" : "secondary"}
                      onClick={toggleMic}
                      className="rounded-full"
                      disabled={!isCameraOn}
                    >
                      {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Stream Controls */}
              <div className="p-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={toggleStreaming}
                    className={`px-8 py-3 font-semibold ${
                      isStreaming ? "bg-red-600 hover:bg-red-700" : "bg-purple-600 hover:bg-purple-700"
                    }`}
                    disabled={isLoading}
                  >
                    {isStreaming ? "Stop Streaming" : "Start Streaming"}
                  </Button>
                  <Link href="/watch">
                    <Button
                      variant="outline"
                      className="px-8 py-3 border-white/30 text-white hover:bg-white/10 bg-transparent"
                    >
                      View as Audience
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>

          {/* Participants Panel */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">Participants</h3>

            {/* Remote Participants Grid */}
            <div className="grid grid-cols-1 gap-4">
              {participants.map((participant) => (
                <Card key={participant.id} className="bg-black/40 backdrop-blur-lg border-white/20">
                  <div className="aspect-video relative bg-slate-800 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                      <div className="text-center">
                        <div className="text-4xl mb-2">{participant.avatar}</div>
                        <p className="text-sm">{participant.name}</p>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-green-500/20 text-green-400 text-xs">
                        Connected
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}

              {/* Empty slots */}
              {Array.from({ length: Math.max(0, 4 - participants.length) }).map((_, index) => (
                <Card key={`empty-${index}`} className="bg-black/20 backdrop-blur-lg border-white/10 border-dashed">
                  <div className="aspect-video relative bg-slate-800/50 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                      <div className="text-center">
                        <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-xs">Waiting for participant</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
