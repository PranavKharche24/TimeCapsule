import Navigation from '@/components/layout/Navigation';
import TimelineVisualization from '@/components/community/TimelineVisualization';
import PublicCapsuleCard from '@/components/community/PublicCapsuleCard';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

export default function Community() {
  // Mock public capsules data
  const mockPublicCapsules = [
    {
      id: '1',
      title: 'Climate Predictions 2024',
      preview: 'A message about environmental hopes...',
      author: '@EcoFuturist',
      emoji: '🌍',
      unlockDate: new Date('2024-12-25'),
      status: 'locked' as const,
    },
    {
      id: '2',
      title: 'Mars Mission Dreams',
      preview: 'My thoughts on space exploration...',
      author: '@SpaceExplorer',
      emoji: '🚀',
      unlockDate: new Date('2024-12-30'),
      status: 'locked' as const,
    },
    {
      id: '3',
      title: 'Graduation Wisdom',
      preview: 'Advice for my younger self...',
      author: '@WiseGraduate',
      emoji: '🎓',
      unlockDate: new Date('2025-01-08'),
      status: 'locked' as const,
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-cascade-in" data-testid="community-title">
            <span className="bg-gradient-to-r from-pruning-red to-timeline-green bg-clip-text text-transparent">
              Community Timeline
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 animate-cascade-in cascade-delay-1">
            Discover public time capsules from around the world
          </p>
        </div>

        {/* Timeline Visualization */}
        <div className="mb-16 animate-cascade-in cascade-delay-2">
          <TimelineVisualization capsules={mockPublicCapsules} />
        </div>

        {/* Public Capsules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {mockPublicCapsules.map((capsule, index) => (
            <div
              key={capsule.id}
              className="animate-cascade-in"
              style={{ animationDelay: `${(index + 3) * 0.1}s` }}
            >
              <PublicCapsuleCard capsule={capsule} />
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center animate-cascade-in cascade-delay-5">
          <Button 
            variant="ghost"
            size="lg"
            className="glassmorphism text-gray-900 dark:text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300"
            data-testid="explore-all-capsules"
          >
            <Eye className="mr-2" />
            Explore All Public Capsules
          </Button>
        </div>
      </div>
    </div>
  );
}
