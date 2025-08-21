import { TrendingUp, Calendar, CheckCircle, Edit3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatsData {
  totalCapsules: number;
  scheduledCapsules: number;
  deliveredCapsules: number;
  draftCapsules: number;
}

interface StatsOverviewProps {
  stats: StatsData;
}

export default function StatsOverview({ stats }: StatsOverviewProps) {
  const statItems = [
    {
      title: 'Total Capsules',
      value: stats.totalCapsules,
      icon: TrendingUp,
      color: 'text-tva-orange',
      bgColor: 'bg-tva-orange/10',
      borderColor: 'border-tva-orange/20',
    },
    {
      title: 'Scheduled',
      value: stats.scheduledCapsules,
      icon: Calendar,
      color: 'text-timeline-green',
      bgColor: 'bg-timeline-green/10',
      borderColor: 'border-timeline-green/20',
    },
    {
      title: 'Delivered',
      value: stats.deliveredCapsules,
      icon: CheckCircle,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
    },
    {
      title: 'Drafts',
      value: stats.draftCapsules,
      icon: Edit3,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="stats-overview">
      {statItems.map((item, index) => (
        <Card
          key={item.title}
          className={`glassmorphism border ${item.borderColor} animate-cascade-in`}
          style={{ animationDelay: `${index * 0.1}s` }}
          data-testid={`stat-card-${item.title.toLowerCase().replace(' ', '-')}`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {item.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${item.bgColor}`}>
              <item.icon className={`w-4 h-4 ${item.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${item.color}`} data-testid={`stat-value-${item.title.toLowerCase().replace(' ', '-')}`}>
              {item.value.toLocaleString()}
            </div>
            
            {/* Progress Indicator */}
            <div className="mt-2">
              <div className="flex items-center text-xs text-gray-500">
                {item.title === 'Total Capsules' && (
                  <span className="text-tva-orange">↗ Growing timeline</span>
                )}
                {item.title === 'Scheduled' && (
                  <span className="text-timeline-green">⏳ Awaiting unlock</span>
                )}
                {item.title === 'Delivered' && (
                  <span className="text-blue-500">✓ Successfully delivered</span>
                )}
                {item.title === 'Drafts' && (
                  <span className="text-yellow-500">✏ In progress</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
