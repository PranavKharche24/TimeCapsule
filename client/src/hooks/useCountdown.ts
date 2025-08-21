import { useState, useEffect } from 'react';

interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  timeString: string;
}

export default function useCountdown(targetDate: Date | null): string | null {
  const [timeLeft, setTimeLeft] = useState<CountdownResult | null>(null);

  useEffect(() => {
    if (!targetDate) {
      setTimeLeft(null);
      return;
    }

    const calculateTimeLeft = (): CountdownResult => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
          timeString: 'Expired',
        };
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      // Format the time string
      let timeString = '';
      if (days > 0) {
        timeString += `${days} day${days !== 1 ? 's' : ''}`;
        if (hours > 0) {
          timeString += `, ${hours} hour${hours !== 1 ? 's' : ''}`;
        }
      } else if (hours > 0) {
        timeString += `${hours} hour${hours !== 1 ? 's' : ''}`;
        if (minutes > 0) {
          timeString += `, ${minutes} minute${minutes !== 1 ? 's' : ''}`;
        }
      } else if (minutes > 0) {
        timeString += `${minutes} minute${minutes !== 1 ? 's' : ''}`;
        if (seconds > 0) {
          timeString += `, ${seconds} second${seconds !== 1 ? 's' : ''}`;
        }
      } else {
        timeString = `${seconds} second${seconds !== 1 ? 's' : ''}`;
      }

      return {
        days,
        hours,
        minutes,
        seconds,
        isExpired: false,
        timeString: `Opens in ${timeString}`,
      };
    };

    // Calculate initial time
    setTimeLeft(calculateTimeLeft());

    // Set up interval to update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft?.timeString || null;
}

// Additional hook for more detailed countdown information
export function useDetailedCountdown(targetDate: Date | null): CountdownResult | null {
  const [timeLeft, setTimeLeft] = useState<CountdownResult | null>(null);

  useEffect(() => {
    if (!targetDate) {
      setTimeLeft(null);
      return;
    }

    const calculateTimeLeft = (): CountdownResult => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
          timeString: 'Expired',
        };
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      let timeString = '';
      if (days > 0) {
        timeString += `${days}d `;
      }
      if (hours > 0 || days > 0) {
        timeString += `${hours}h `;
      }
      if (minutes > 0 || hours > 0 || days > 0) {
        timeString += `${minutes}m `;
      }
      timeString += `${seconds}s`;

      return {
        days,
        hours,
        minutes,
        seconds,
        isExpired: false,
        timeString: timeString.trim(),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

// Hook for relative time formatting (e.g., "2 days ago", "in 3 hours")
export function useRelativeTime(date: Date | null): string {
  const [relativeTime, setRelativeTime] = useState<string>('');

  useEffect(() => {
    if (!date) {
      setRelativeTime('');
      return;
    }

    const updateRelativeTime = () => {
      const now = new Date().getTime();
      const target = new Date(date).getTime();
      const difference = Math.abs(target - now);
      const isPast = target < now;

      const seconds = Math.floor(difference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const weeks = Math.floor(days / 7);
      const months = Math.floor(days / 30);
      const years = Math.floor(days / 365);

      let timeString = '';

      if (years > 0) {
        timeString = `${years} year${years !== 1 ? 's' : ''}`;
      } else if (months > 0) {
        timeString = `${months} month${months !== 1 ? 's' : ''}`;
      } else if (weeks > 0) {
        timeString = `${weeks} week${weeks !== 1 ? 's' : ''}`;
      } else if (days > 0) {
        timeString = `${days} day${days !== 1 ? 's' : ''}`;
      } else if (hours > 0) {
        timeString = `${hours} hour${hours !== 1 ? 's' : ''}`;
      } else if (minutes > 0) {
        timeString = `${minutes} minute${minutes !== 1 ? 's' : ''}`;
      } else {
        timeString = 'just now';
      }

      if (timeString !== 'just now') {
        timeString = isPast ? `${timeString} ago` : `in ${timeString}`;
      }

      setRelativeTime(timeString);
    };

    updateRelativeTime();

    // Update every minute for accuracy
    const timer = setInterval(updateRelativeTime, 60000);

    return () => clearInterval(timer);
  }, [date]);

  return relativeTime;
}
