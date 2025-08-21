import { useTheme } from '@/components/ui/theme-provider';

export default function VideoBackground() {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Dark mode cosmic background */}
      <div className={`${theme === 'dark' ? 'block' : 'hidden'} absolute inset-0 bg-gradient-to-br from-cosmic-black via-cosmic-gray to-temporal-smoke`}>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-tva-orange/10 to-transparent animate-timeline-flow"></div>
        </div>
      </div>
      
      {/* Light mode clean background */}
      <div className={`${theme === 'light' ? 'block' : 'hidden'} absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-temporal-light`}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-timeline-green/10 to-transparent animate-timeline-flow"></div>
        </div>
      </div>
      
      {/* Video overlay */}
      <div 
        className="absolute inset-0 z-10" 
        style={{
          background: 'linear-gradient(135deg, rgba(10, 10, 11, 0.7), rgba(42, 42, 43, 0.5))'
        }}
      ></div>
    </div>
  );
}
