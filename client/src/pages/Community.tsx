import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Lock, Eye, Heart, Users, Calendar, Sparkles } from 'lucide-react';

export default function Community() {
  // TVA Community Timeline Data
  const communityTimeline = [
    {
      id: '1',
      title: 'Sacred Timeline Wisdom',
      preview: 'A message about the importance of temporal integrity...',
      author: '@TimeKeeper',
      unlockDate: new Date('2024-06-15'),
      status: 'unlocked' as const,
      likes: 342,
      temporalSignature: 'TVA-7721',
    },
    {
      id: '2',
      title: 'Variant Timeline Study',
      preview: 'Analysis of alternate timeline branches...',
      author: '@VariantAnalyst',
      unlockDate: new Date('2024-08-30'),
      status: 'locked' as const,
      countdown: '3 months, 12 days',
      temporalSignature: 'TVA-8844',
    },
    {
      id: '3',
      title: 'Nexus Event Documentation',
      preview: 'Important findings about timeline disruptions...',
      author: '@NexusWatcher',
      unlockDate: new Date('2025-01-01'),
      status: 'locked' as const,
      countdown: '8 months, 5 days',
      temporalSignature: 'TVA-9955',
    },
    {
      id: '4',
      title: 'Time Loop Insights',
      preview: 'Observations from repetitive temporal cycles...',
      author: '@LoopObserver',
      unlockDate: new Date('2023-12-01'),
      status: 'unlocked' as const,
      likes: 156,
      temporalSignature: 'TVA-6633',
    },
    {
      id: '5',
      title: 'Multiverse Memories',
      preview: 'Personal experiences across different realities...',
      author: '@MultiverseTraveler',
      unlockDate: new Date('2024-12-25'),
      status: 'locked' as const,
      countdown: '6 months, 18 days',
      temporalSignature: 'TVA-1122',
    },
    {
      id: '6',
      title: 'Temporal Mechanics Guide',
      preview: 'Educational content about time manipulation...',
      author: '@TimeScientist',
      unlockDate: new Date('2023-11-15'),
      status: 'unlocked' as const,
      likes: 428,
      temporalSignature: 'TVA-5544',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-950 via-amber-900 to-yellow-800 relative overflow-hidden pt-16">
      {/* TVA Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#f97316_1px,transparent_1px),linear-gradient(180deg,#f97316_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Sacred Timeline Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="bg-orange-900/30 border-orange-500/40 text-orange-200 mb-6" data-testid="community-badge">
            <Users className="w-4 h-4 mr-2" />
            Sacred Timeline Community
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-mono tracking-wider" data-testid="community-title">
            <span className="bg-gradient-to-r from-orange-200 via-amber-100 to-yellow-200 bg-clip-text text-transparent">
              COMMUNITY TIMELINE
            </span>
          </h1>
          
          <p className="text-xl text-orange-100/80 max-w-3xl mx-auto leading-relaxed">
            Explore temporal communications from TVA operatives and timeline travelers across the multiverse.
            Witness sealed capsules and unlocked wisdom from the Sacred Timeline.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-orange-900/40 to-amber-900/40 border-orange-500/20 backdrop-blur-sm" data-testid="stats-active">
            <CardHeader className="pb-3">
              <CardTitle className="text-orange-100 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-orange-300" />
                Active Capsules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-200">1,247</div>
              <p className="text-orange-300/70 text-sm">Across all timelines</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-900/40 to-amber-900/40 border-orange-500/20 backdrop-blur-sm" data-testid="stats-unlocked">
            <CardHeader className="pb-3">
              <CardTitle className="text-orange-100 flex items-center">
                <Eye className="w-5 h-5 mr-2 text-green-400" />
                Unlocked Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-300">23</div>
              <p className="text-orange-300/70 text-sm">New revelations</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-900/40 to-amber-900/40 border-orange-500/20 backdrop-blur-sm" data-testid="stats-temporal">
            <CardHeader className="pb-3">
              <CardTitle className="text-orange-100 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
                Temporal Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-300">8</div>
              <p className="text-orange-300/70 text-sm">Nexus points detected</p>
            </CardContent>
          </Card>
        </div>

        {/* Community Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {communityTimeline.map((capsule, index) => (
            <Card 
              key={capsule.id}
              className={`transition-all duration-300 hover:scale-[1.02] ${
                capsule.status === 'locked' 
                  ? 'bg-gradient-to-br from-orange-900/40 to-amber-900/40 border-orange-500/30' 
                  : 'bg-gradient-to-br from-orange-800/50 to-amber-800/50 border-green-500/30'
              } backdrop-blur-sm`}
              data-testid={`capsule-${capsule.status}-${capsule.id}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge 
                    className={capsule.status === 'locked' 
                      ? "bg-orange-500/20 text-orange-300 border-orange-500/30" 
                      : "bg-green-500/20 text-green-300 border-green-500/30"
                    }
                  >
                    {capsule.status === 'locked' ? (
                      <>
                        <Lock className="w-3 h-3 mr-1" />
                        Temporal Lock
                      </>
                    ) : (
                      <>
                        <Eye className="w-3 h-3 mr-1" />
                        Accessible
                      </>
                    )}
                  </Badge>
                  <span className="text-orange-200/60 text-xs font-mono">{capsule.temporalSignature}</span>
                </div>
                
                <CardTitle className="text-orange-100 text-lg leading-tight">{capsule.title}</CardTitle>
                <CardDescription className="text-orange-200/70 text-sm">
                  {capsule.unlockDate.toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {capsule.status === 'locked' ? (
                  <div className="text-center py-4">
                    <Lock className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                    <p className="text-orange-200/60 text-sm mb-2">Temporally sealed content</p>
                    {capsule.countdown && (
                      <p className="text-orange-300 text-xs font-mono">
                        Timeline convergence: {capsule.countdown}
                      </p>
                    )}
                  </div>
                ) : (
                  <div>
                    <p className="text-orange-200/80 text-sm mb-4 leading-relaxed">
                      {capsule.preview}
                    </p>
                    <div className="flex items-center justify-between text-xs text-orange-200/60">
                      <span>by {capsule.author}</span>
                      <div className="flex items-center gap-2">
                        <Heart className="w-3 h-3 text-red-400" />
                        <span>{capsule.likes}</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Timeline Flow Visualization */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-orange-100 mb-6 text-center font-mono">
            Temporal Flow Analysis
          </h3>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-amber-400/20 to-yellow-500/20 rounded-lg"></div>
            <div className="relative bg-orange-900/20 rounded-lg p-8 backdrop-blur-sm border border-orange-500/20">
              <div className="flex items-center justify-center space-x-8 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-amber-600 rounded-full flex items-center justify-center mb-3">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-orange-200 font-semibold">Past Events</span>
                  <span className="text-orange-300/60 text-sm">Timeline secured</span>
                </div>
                
                <div className="flex-1 h-px bg-gradient-to-r from-orange-500 to-amber-500 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 animate-pulse"></div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-yellow-600 rounded-full flex items-center justify-center mb-3 animate-pulse">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-orange-200 font-semibold">Present Nexus</span>
                  <span className="text-orange-300/60 text-sm">Active monitoring</span>
                </div>
                
                <div className="flex-1 h-px bg-gradient-to-r from-amber-500 to-yellow-500 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-400 animate-pulse"></div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-full flex items-center justify-center mb-3">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-orange-200 font-semibold">Future Sealed</span>
                  <span className="text-orange-300/60 text-sm">Temporal locks active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button 
            variant="outline" 
            className="border-orange-500/40 text-orange-200 hover:bg-orange-800/30 px-8 py-3"
            data-testid="button-load-more"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Explore Deeper Timeline
          </Button>
        </div>
      </div>
    </div>
  );
}
