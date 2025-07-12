import React from 'react';
import { cn } from '@/lib/utils';

interface TopProgressBarProps {
  showBar: boolean;
  scrollPercent: number;
}

const TopProgressBar: React.FC<TopProgressBarProps> = ({ showBar, scrollPercent }) => (
  <div
    className={cn(
      'fixed top-0 left-0 w-full h-0.5 z-[100] transition-all duration-300',
      showBar ? 'opacity-100' : 'opacity-0 pointer-events-none'
    )}
    style={{ 
      background: 'rgba(20, 20, 20, 0.7)', 
      backdropFilter: 'blur(2px)',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
    }}
  >
    <div
      className="h-full"
      style={{
        width: `${scrollPercent}%`,
        background: '#fff',
        borderRadius: '0 2px 2px 0',
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
        transition: 'none'
      }}
    />
  </div>
);

export default TopProgressBar; 