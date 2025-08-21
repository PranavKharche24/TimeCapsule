import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MissMinutesClock from "@/components/common/MissMinutesClock";
import { Clock, Calendar, Users, Shield, Sparkles, ArrowRight, Lock, Heart, Eye, Plus } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

// Plan V3 Time Capsule Home Page with Loki/TVA Theming
export default function Home() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-950 via-amber-900 to-yellow-800 relative overflow-hidden">
      {/* TVA Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#f97316_1px,transparent_1px),linear-gradient(180deg,#f97316_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Sacred Timeline Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-400/40 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-6 pt-20 pb-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Hero Section with Miss Minutes Clock */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="bg-orange-900/30 border-orange-500/40 text-orange-200 mb-8" data-testid="badge-tva-protocol">
              <Clock className="w-4 h-4 mr-2" />
              Time Variance Authority Protocol
            </Badge>
            
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-orange-200 via-amber-100 to-yellow-200 bg-clip-text text-transparent mb-8 font-mono tracking-wider">
              TIME CAPSULE
            </h1>
            
            {/* Miss Minutes Clock */}
            <MissMinutesClock />
            
            <p className="text-xl text-orange-100/80 max-w-3xl mx-auto leading-relaxed mb-8">
              Secure temporal message delivery system approved by the Time Variance Authority. 
              Create, schedule, and manage time-locked communications across the Sacred Timeline.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard">
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                      data-testid="button-dashboard"
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      My Timeline
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  
                  <Link href="/create-capsule">
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="border-orange-500/40 bg-orange-900/20 text-orange-200 hover:bg-orange-800/30 px-8 py-3 rounded-xl transition-all duration-300 backdrop-blur-sm"
                      data-testid="button-create-new"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Create Capsule
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/auth/register">
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                      data-testid="button-get-started"
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      Begin Timeline
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  
                  <Link href="/auth/login">
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="border-orange-500/40 bg-orange-900/20 text-orange-200 hover:bg-orange-800/30 px-8 py-3 rounded-xl transition-all duration-300 backdrop-blur-sm"
                      data-testid="button-login"
                    >
                      <Users className="w-5 h-5 mr-2" />
                      Access Portal
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* TVA Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-gradient-to-br from-orange-900/40 to-amber-900/40 border-orange-500/20 backdrop-blur-sm hover:bg-orange-800/50 transition-all duration-300 group" data-testid="card-temporal-security">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-orange-300" />
                </div>
                <CardTitle className="text-orange-100">Temporal Security</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-orange-200/70">
                  Advanced TVA-approved encryption ensures your messages remain sealed until the predetermined moment in the Sacred Timeline.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-900/40 to-amber-900/40 border-orange-500/20 backdrop-blur-sm hover:bg-orange-800/50 transition-all duration-300 group" data-testid="card-rich-media">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6 text-orange-300" />
                </div>
                <CardTitle className="text-orange-100">Rich Content</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-orange-200/70">
                  Include text, images, audio recordings, and videos in your temporal communications. Full multimedia support.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-900/40 to-amber-900/40 border-orange-500/20 backdrop-blur-sm hover:bg-orange-800/50 transition-all duration-300 group" data-testid="card-timeline-management">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6 text-orange-300" />
                </div>
                <CardTitle className="text-orange-100">Timeline Control</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-orange-200/70">
                  Schedule deliveries from minutes to decades in the future with precision temporal targeting technology.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Community Timeline Preview */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-orange-100 mb-4 font-mono">Sacred Timeline</h2>
              <p className="text-orange-200/70 max-w-2xl mx-auto">
                Explore public time capsules from across the multiverse. Some are unlocked and ready to read, 
                others are still sealed until their delivery date.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Unlocked Capsule */}
              <Card className="bg-gradient-to-br from-orange-800/40 to-amber-800/40 border-green-500/30 hover:bg-orange-700/50 transition-all duration-300" data-testid="capsule-unlocked">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                      <Eye className="w-3 h-3 mr-1" />
                      Unlocked
                    </Badge>
                    <span className="text-orange-200/60 text-sm">Dec 2023</span>
                  </div>
                  <CardTitle className="text-orange-100 text-lg">College Dreams Realized</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-orange-200/80 text-sm mb-3">
                    "Writing this on graduation day, hoping future me achieves everything we dreamed of today..."
                  </p>
                  <div className="flex items-center justify-between text-xs text-orange-200/60">
                    <span>by @sacred_timeline</span>
                    <div className="flex items-center gap-2">
                      <Heart className="w-3 h-3" />
                      <span>142</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Locked Capsule */}
              <Card className="bg-gradient-to-br from-orange-900/40 to-amber-900/40 border-orange-500/30 hover:bg-orange-800/50 transition-all duration-300" data-testid="capsule-locked">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                      <Lock className="w-3 h-3 mr-1" />
                      Sealed
                    </Badge>
                    <span className="text-orange-200/60 text-sm">June 2024</span>
                  </div>
                  <CardTitle className="text-orange-100 text-lg">Future Wisdom</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <Lock className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                    <p className="text-orange-200/60 text-sm mb-2">This capsule is temporally sealed</p>
                    <p className="text-orange-300 text-xs">Unlocks in 4 months, 12 days</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-orange-200/60">
                    <span>by @time_keeper</span>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      <span>Countdown active</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Long-term Capsule */}
              <Card className="bg-gradient-to-br from-orange-900/40 to-amber-900/40 border-yellow-500/30 hover:bg-orange-800/50 transition-all duration-300" data-testid="capsule-future">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                      <Lock className="w-3 h-3 mr-1" />
                      Long-term
                    </Badge>
                    <span className="text-orange-200/60 text-sm">Jan 2030</span>
                  </div>
                  <CardTitle className="text-orange-100 text-lg">Decade Reflections</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <Lock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <p className="text-orange-200/60 text-sm mb-2">Extended temporal lock</p>
                    <p className="text-yellow-300 text-xs">Unlocks in 5 years, 2 months</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-orange-200/60">
                    <span>by @decade_dreamer</span>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3 h-3" />
                      <span>AI Reflection enabled</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <Link href="/community">
                <Button variant="outline" className="border-orange-500/40 text-orange-200 hover:bg-orange-800/30" data-testid="button-explore-timeline">
                  Explore Full Timeline
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}