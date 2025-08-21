interface TimelineCapsule {
  id: string;
  title: string;
  author: string;
  emoji: string;
  unlockDate: Date;
  status: 'locked' | 'unlocked';
}

interface TimelineVisualizationProps {
  capsules: TimelineCapsule[];
}

export default function TimelineVisualization({ capsules }: TimelineVisualizationProps) {
  const sortedCapsules = [...capsules].sort((a, b) => a.unlockDate.getTime() - b.unlockDate.getTime());

  const getDaysUntilUnlock = (date: Date) => {
    const now = new Date();
    const timeDiff = date.getTime() - now.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  };

  const getTimelinePosition = (index: number) => {
    return index % 2 === 0 ? 'left' : 'right';
  };

  const getStatusColor = (daysUntil: number) => {
    if (daysUntil <= 0) return 'bg-timeline-green border-timeline-green';
    if (daysUntil <= 7) return 'bg-tva-orange border-tva-orange';
    return 'bg-pruning-red border-pruning-red';
  };

  return (
    <div className="relative" data-testid="timeline-visualization">
      {/* Central Timeline Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-tva-orange via-timeline-green to-pruning-red transform -translate-x-1/2 animate-pulse-glow"></div>
      
      {/* Timeline Items */}
      <div className="space-y-12">
        {sortedCapsules.map((capsule, index) => {
          const position = getTimelinePosition(index);
          const daysUntil = getDaysUntilUnlock(capsule.unlockDate);
          
          return (
            <div 
              key={capsule.id} 
              className="flex items-center animate-cascade-in"
              style={{ animationDelay: `${(index + 2) * 0.1}s` }}
              data-testid={`timeline-item-${capsule.id}`}
            >
              {position === 'left' ? (
                <>
                  {/* Left Side Content */}
                  <div className="w-1/2 pr-8 text-right">
                    <div className="glassmorphism rounded-xl p-6 interactive-card">
                      <div className="flex items-center justify-end mb-3">
                        <span className="text-2xl mr-2">{capsule.emoji}</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          daysUntil <= 0
                            ? 'bg-timeline-green/20 text-timeline-green'
                            : daysUntil <= 7
                            ? 'bg-tva-orange/20 text-tva-orange'
                            : 'bg-pruning-red/20 text-pruning-red'
                        }`}>
                          {daysUntil <= 0 ? 'Unlocked!' : `Unlocks in ${daysUntil} days`}
                        </span>
                      </div>
                      <h4 className="text-lg font-semibold mb-2">{capsule.title}</h4>
                      <div className="mt-3 text-xs text-gray-500">By {capsule.author}</div>
                    </div>
                  </div>
                  
                  {/* Timeline Node */}
                  <div className="relative">
                    <div className={`w-4 h-4 rounded-full border-4 border-white dark:border-cosmic-black animate-pulse-glow ${getStatusColor(daysUntil)}`}></div>
                  </div>
                  
                  {/* Right Side Empty */}
                  <div className="w-1/2 pl-8"></div>
                </>
              ) : (
                <>
                  {/* Left Side Empty */}
                  <div className="w-1/2 pr-8"></div>
                  
                  {/* Timeline Node */}
                  <div className="relative">
                    <div className={`w-4 h-4 rounded-full border-4 border-white dark:border-cosmic-black animate-pulse-glow ${getStatusColor(daysUntil)}`}></div>
                  </div>
                  
                  {/* Right Side Content */}
                  <div className="w-1/2 pl-8">
                    <div className="glassmorphism rounded-xl p-6 interactive-card">
                      <div className="flex items-center mb-3">
                        <span className="text-2xl mr-2">{capsule.emoji}</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          daysUntil <= 0
                            ? 'bg-timeline-green/20 text-timeline-green'
                            : daysUntil <= 7
                            ? 'bg-tva-orange/20 text-tva-orange'
                            : 'bg-pruning-red/20 text-pruning-red'
                        }`}>
                          {daysUntil <= 0 ? 'Unlocked!' : `Unlocks in ${daysUntil} days`}
                        </span>
                      </div>
                      <h4 className="text-lg font-semibold mb-2">{capsule.title}</h4>
                      <div className="mt-3 text-xs text-gray-500">By {capsule.author}</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Timeline Legend */}
      <div className="mt-12 flex justify-center">
        <div className="glassmorphism rounded-xl p-4 flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-timeline-green rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Unlocked</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-tva-orange rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Soon</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-pruning-red rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Future</span>
          </div>
        </div>
      </div>
    </div>
  );
}
