import Link from "next/link";
import { Button } from "@/frontend/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/frontend/components/ui/card";
import { Video, Eye } from "lucide-react";
import ParticleBackground from "@/frontend/components/particle-background";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Stream<span className="text-purple-400">Live</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Connect, stream, and watch live video content with our modern
            platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 group">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500/30 transition-colors">
                <Video className="w-8 h-8 text-purple-400" />
              </div>
              <CardTitle className="text-2xl text-white">
                Start Streaming
              </CardTitle>
              <CardDescription className="text-slate-300">
                Go live and share your content with viewers
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link href="/stream">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3">
                  Enter Stream Room
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 group">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/30 transition-colors">
                <Eye className="w-8 h-8 text-blue-400" />
              </div>
              <CardTitle className="text-2xl text-white">Watch Live</CardTitle>
              <CardDescription className="text-slate-300">
                Join live streams and interact with content
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link href="/watch">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3">
                  Watch Stream
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
