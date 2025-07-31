"use client";

import { useState, useEffect } from "react";
import { Button } from "@/frontend/components/ui/button";
import { Card } from "@/frontend/components/ui/card";
import { Badge } from "@/frontend/components/ui/badge";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Users,
  Heart,
} from "lucide-react";
import ParticleBackground from "@/frontend/components/particle-background";
import Link from "next/link";

export default function WatchPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isStreamLive, setIsStreamLive] = useState(false);
  const [viewerCount, setViewerCount] = useState(1247);
  const [likes, setLikes] = useState(89);
  const [hasLiked, setHasLiked] = useState(false);

  // Simulate stream going live after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsStreamLive(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Simulate viewer count updates
  useEffect(() => {
    if (isStreamLive) {
      const interval = setInterval(() => {
        setViewerCount((prev) => prev + Math.floor(Math.random() * 5) - 2);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isStreamLive]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleLike = () => {
    setHasLiked(!hasLiked);
    setLikes((prev) => (hasLiked ? prev - 1 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative">
      <ParticleBackground />

      {/* Navigation */}
      <nav className="relative z-10 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-2xl font-bold text-white hover:text-blue-400 transition-colors"
              >
                StreamLive
              </Link>
              <Badge
                variant="secondary"
                className={`${
                  isStreamLive
                    ? "bg-red-500/20 text-red-400 border-red-500/30"
                    : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                }`}
              >
                {isStreamLive ? "🔴 Live" : "⚫ Offline"}
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-white border-white/30">
                <Users className="w-4 h-4 mr-1" />
                {viewerCount.toLocaleString()}
              </Badge>
              <Link href="/stream">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                >
                  Go Live
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Watch Live Stream
          </h1>
          <p className="text-slate-300 text-lg">
            Experience live content in real-time
          </p>
        </div>

        {/* Video Player */}
        <div className="max-w-6xl mx-auto">
          <Card className="bg-black/40 backdrop-blur-lg border-white/20 overflow-hidden">
            <div className="aspect-video relative bg-black">
              {!isStreamLive ? (
                // Waiting State
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-pulse mb-6">
                      <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Play className="w-12 h-12 text-blue-400" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-2">
                      Waiting for stream to start...
                    </h3>
                    <p className="text-slate-400">
                      The streamer will be with you shortly
                    </p>
                    <div className="mt-6">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto"></div>
                    </div>
                  </div>
                </div>
              ) : (
                // Live Stream Player
                <div className="relative w-full h-full bg-gradient-to-br from-purple-900/50 to-blue-900/50">
                  {/* Simulated Video Content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🎥</div>
                      <h3 className="text-2xl font-semibold text-white mb-2">
                        Live Stream Content
                      </h3>
                      <p className="text-slate-300">
                        This would be your HLS video player
                      </p>
                    </div>
                  </div>

                  {/* Video Controls Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={togglePlay}
                          className="text-white hover:bg-white/20 rounded-full w-12 h-12"
                        >
                          {isPlaying ? (
                            <Pause className="w-5 h-5" />
                          ) : (
                            <Play className="w-5 h-5" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={toggleMute}
                          className="text-white hover:bg-white/20 rounded-full w-12 h-12"
                        >
                          {isMuted ? (
                            <VolumeX className="w-5 h-5" />
                          ) : (
                            <Volume2 className="w-5 h-5" />
                          )}
                        </Button>
                        <div className="text-white text-sm">
                          Live • {viewerCount.toLocaleString()} viewers
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={toggleLike}
                          className={`text-white hover:bg-white/20 rounded-full ${
                            hasLiked ? "text-red-400" : ""
                          }`}
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              hasLiked ? "fill-current" : ""
                            }`}
                          />
                          <span className="ml-1 text-sm">{likes}</span>
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-white hover:bg-white/20 rounded-full w-12 h-12"
                        >
                          <Maximize className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Stream Info */}
          {isStreamLive && (
            <div className="mt-6 grid md:grid-cols-3 gap-6">
              <Card className="bg-black/40 backdrop-blur-lg border-white/20 p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Stream Quality
                </h3>
                <div className="space-y-2 text-sm text-slate-300">
                  <div className="flex justify-between">
                    <span>Resolution:</span>
                    <span className="text-green-400">1080p</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bitrate:</span>
                    <span className="text-green-400">6000 kbps</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Latency:</span>
                    <span className="text-green-400">2.3s</span>
                  </div>
                </div>
              </Card>

              <Card className="bg-black/40 backdrop-blur-lg border-white/20 p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Engagement
                </h3>
                <div className="space-y-2 text-sm text-slate-300">
                  <div className="flex justify-between">
                    <span>Viewers:</span>
                    <span className="text-blue-400">
                      {viewerCount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Likes:</span>
                    <span className="text-red-400">{likes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="text-purple-400">12:34</span>
                  </div>
                </div>
              </Card>

              <Card className="bg-black/40 backdrop-blur-lg border-white/20 p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Actions
                </h3>
                <div className="space-y-3">
                  <Button
                    onClick={toggleLike}
                    className={`w-full ${
                      hasLiked
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-gray-600 hover:bg-gray-700"
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 mr-2 ${
                        hasLiked ? "fill-current" : ""
                      }`}
                    />
                    {hasLiked ? "Liked" : "Like Stream"}
                  </Button>
                  <Link href="/stream" className="block">
                    <Button
                      variant="outline"
                      className="w-full border-white/30 text-white hover:bg-white/10 bg-transparent"
                    >
                      Start Your Stream
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
