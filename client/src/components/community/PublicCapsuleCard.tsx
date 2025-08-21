import { useState } from 'react';
import { Heart, MessageCircle, Share, Clock, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import useCountdown from '@/hooks/useCountdown';

interface PublicCapsule {
  id: string;
  title: string;
  preview: string;
  author: string;
  emoji: string;
  unlockDate: Date;
  status: 'locked' | 'unlocked';
  likes?: number;
  comments?: number;
}

interface PublicCapsuleCardProps {
  capsule: PublicCapsule;
}

export default function PublicCapsuleCard({ capsule }: PublicCapsuleCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(capsule.likes || 0);
  const countdown = useCountdown(capsule.unlockDate);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    
    // TODO: Implement like API call
    console.log('Like capsule:', capsule.id, !isLiked);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: capsule.title,
          text: `Check out this time capsule: ${capsule.title}`,
          url: window.location.href,
        });
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const getDaysUntilUnlock = () => {
    const now = new Date();
    const timeDiff = capsule.unlockDate.getTime() - now.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  };

  const daysUntil = getDaysUntilUnlock();
  const isUnlocked = daysUntil <= 0;

  return (
    <Card 
      className={`interactive-card glassmorphism rounded-xl relative overflow-hidden ${
        isUnlocked ? 'border-timeline-green/30' : 'border-gray-300/30'
      }`}
      data-testid={`public-capsule-card-${capsule.id}`}
    >
      <CardContent className="p-0">
        {/* Locked/Unlocked Overlay */}
        {!isUnlocked && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="text-center text-white">
              <Clock className="w-12 h-12 mx-auto mb-2 animate-pulse" />
              <p className="text-lg font-semibold">Sealed Until</p>
              <p className="text-sm opacity-80">{capsule.unlockDate.toLocaleDateString()}</p>
              {countdown && (
                <p className="text-xs opacity-60 mt-1">{countdown}</p>
              )}
            </div>
          </div>
        )}

        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{capsule.emoji}</span>
              <Badge 
                className={`${
                  isUnlocked 
                    ? 'bg-timeline-green/20 text-timeline-green border-timeline-green/30' 
                    : 'bg-tva-orange/20 text-tva-orange border-tva-orange/30'
                } border`}
                data-testid={`status-badge-${capsule.status}`}
              >
                {isUnlocked ? 'Unlocked' : `${daysUntil} days left`}
              </Badge>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              by {capsule.author}
            </div>
          </div>

          {/* Content */}
          <h3 className="text-xl font-semibold mb-2" data-testid="capsule-title">
            {capsule.title}
          </h3>
          
          <p 
            className={`text-gray-600 dark:text-gray-400 mb-4 ${
              isUnlocked ? '' : 'blur-sm select-none'
            }`}
            data-testid="capsule-preview"
          >
            {isUnlocked ? capsule.preview : 'Content hidden until unlock date...'}
          </p>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`hover:bg-pruning-red/20 ${
                  isLiked ? 'text-pruning-red' : 'text-gray-500'
                }`}
                data-testid="like-button"
              >
                <Heart className={`w-4 h-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
                {likesCount}
              </Button>
              
              {isUnlocked && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-timeline-green/20 text-gray-500"
                  data-testid="comment-button"
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  {capsule.comments || 0}
                </Button>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="hover:bg-tva-orange/20 text-gray-500"
                data-testid="share-button"
              >
                <Share className="w-4 h-4" />
              </Button>
              
              {isUnlocked && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-timeline-green/20 text-timeline-green"
                  data-testid="view-full-button"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View Full
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
