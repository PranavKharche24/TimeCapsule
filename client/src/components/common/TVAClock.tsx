import { useState, useEffect } from 'react';

export default function TVAClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div 
      className="fixed top-4 right-4 z-50 glassmorphism px-4 py-2 rounded-lg border border-timeline-green/30 animate-temporal-glow"
      data-testid="tva-clock"
    >
      <div className="font-mono text-timeline-green text-sm">
        <div className="font-bold" data-testid="clock-time">
          {formatTime(time)}
        </div>
        <div className="text-xs opacity-75" data-testid="clock-date">
          {formatDate(time)}
        </div>
      </div>
    </div>
  );
}
