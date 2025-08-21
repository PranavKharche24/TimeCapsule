import { Calendar, Users, Clock, Edit, Trash2, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import useCountdown from '@/hooks/useCountdown';
import type { Capsule } from '@/types/capsule';

interface CapsuleCardProps {
  capsule: Capsule;
}

export default function CapsuleCard({ capsule }: CapsuleCardProps) {
  const countdown = useCountdown(capsule.deliveryDate);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-timeline-green/20 text-timeline-green border-timeline-green/30';
      case 'delivered':
        return 'bg-tva-orange/20 text-tva-orange border-tva-orange/30';
      case 'draft':
        return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case 'scheduled':
        return '📝';
      case 'delivered':
        return '✅';
      case 'draft':
        return '💭';
      default:
        return '📄';
    }
  };

  return (
    <Card 
      className="interactive-card glassmorphism rounded-xl p-6 relative overflow-hidden timeline-branch"
      data-testid={`capsule-card-${capsule.id}`}
    >
      <CardContent className="p-0">
        <div className="flex items-center justify-between mb-4">
          <Badge 
            className={`${getStatusColor(capsule.status)} border`}
            data-testid={`badge-status-${capsule.status}`}
          >
            {capsule.status.charAt(0).toUpperCase() + capsule.status.slice(1)}
          </Badge>
          <div className="text-2xl">{getStatusEmoji(capsule.status)}</div>
        </div>
        
        <h3 className="text-xl font-semibold mb-2" data-testid="capsule-title">
          {capsule.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2" data-testid="capsule-preview">
          {typeof capsule.content === 'object' && capsule.content.text 
            ? capsule.content.text.substring(0, 100) + '...'
            : 'No preview available'
          }
        </p>
        
        <div className="space-y-2 text-sm mb-4">
          {capsule.deliveryDate && (
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <Calendar className="w-4 h-4 mr-2" />
              <span data-testid="delivery-date">
                Unlocks: {capsule.deliveryDate.toLocaleDateString()}
              </span>
            </div>
          )}
          
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <Users className="w-4 h-4 mr-2" />
            <span data-testid="recipients-count">
              Recipients: {
                capsule.recipients?.length === 0 ? 'Just me' :
                capsule.recipients?.length === 1 ? '1 person' :
                `${capsule.recipients?.length} people`
              }
            </span>
          </div>
        </div>
        
        {capsule.status === 'scheduled' && countdown && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm font-semibold text-tva-orange">
              <Clock className="w-4 h-4 inline mr-1" />
              <span data-testid="countdown-timer">
                {countdown}
              </span>
            </div>
          </div>
        )}
        
        {capsule.status === 'draft' && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button 
              className="w-full bg-timeline-green/20 text-timeline-green hover:bg-timeline-green/30 border border-timeline-green/30"
              data-testid="continue-editing-button"
            >
              Continue Editing
            </Button>
          </div>
        )}

        {/* Action Buttons for non-draft capsules */}
        {capsule.status !== 'draft' && (
          <div className="flex space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button variant="outline" size="sm" data-testid="view-capsule-button">
              <Eye className="w-4 h-4 mr-1" />
              View
            </Button>
            {capsule.status === 'scheduled' && (
              <Button variant="outline" size="sm" data-testid="edit-capsule-button">
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            )}
            <Button variant="outline" size="sm" className="text-pruning-red hover:text-pruning-red" data-testid="delete-capsule-button">
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
