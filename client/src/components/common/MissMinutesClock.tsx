import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function MissMinutesClock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="relative flex items-center justify-center w-64 h-64 mx-auto mb-8">
      {/* Clock Face */}
      <div className="relative w-full h-full rounded-full bg-gradient-to-br from-orange-600/20 to-amber-500/20 backdrop-blur-sm border-2 border-orange-400/30 shadow-2xl">
        {/* Clock Numbers */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const x = 50 + 40 * Math.cos(angle);
          const y = 50 + 40 * Math.sin(angle);
          
          return (
            <div
              key={i}
              className="absolute w-6 h-6 flex items-center justify-center text-orange-200 font-bold text-sm"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {i === 0 ? 12 : i}
            </div>
          );
        })}

        {/* Clock Hands */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Hour Hand */}
          <div
            className="absolute w-1 bg-orange-300 rounded-full origin-bottom"
            style={{
              height: '25%',
              transform: `rotate(${(currentTime.getHours() % 12) * 30 + currentTime.getMinutes() * 0.5}deg)`,
              transformOrigin: '50% 100%',
              bottom: '50%',
            }}
          />
          
          {/* Minute Hand */}
          <div
            className="absolute w-0.5 bg-amber-300 rounded-full origin-bottom"
            style={{
              height: '35%',
              transform: `rotate(${currentTime.getMinutes() * 6}deg)`,
              transformOrigin: '50% 100%',
              bottom: '50%',
            }}
          />
          
          {/* Second Hand */}
          <div
            className="absolute w-px bg-red-400 rounded-full origin-bottom"
            style={{
              height: '40%',
              transform: `rotate(${currentTime.getSeconds() * 6}deg)`,
              transformOrigin: '50% 100%',
              bottom: '50%',
            }}
          />
          
          {/* Center Dot */}
          <div className="absolute w-3 h-3 bg-orange-400 rounded-full"></div>
        </div>

        {/* Miss Minutes Eyes */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex gap-2">
          <div className="w-2 h-2 bg-orange-300 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-orange-300 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>

        {/* Clock Arms */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-1 bg-orange-400/50 rounded-full"></div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-1 bg-orange-400/50 rounded-full"></div>
      </div>

      {/* Digital Time Display */}
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-center">
        <div className="bg-orange-900/60 backdrop-blur-sm border border-orange-400/30 rounded-lg px-4 py-2">
          <div className="text-orange-200 font-mono text-lg font-bold">
            {formatTime(currentTime)}
          </div>
          <div className="text-orange-300/70 text-xs">
            TVA TEMPORAL SYNC
          </div>
        </div>
      </div>
    </div>
  );
}