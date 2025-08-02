import React from 'react';

interface MarqueeProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
}

const Marquee: React.FC<MarqueeProps> = ({ 
  children, 
  direction = 'left', 
  speed = 'normal',
  className = '' 
}) => {
  const speedClass = {
    slow: 'animate-marquee-slow',
    normal: 'animate-marquee',
    fast: 'animate-marquee-fast'
  };

  const directionClass = direction === 'right' ? 'animate-marquee-reverse' : '';

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className={`inline-block ${speedClass[speed]} ${directionClass}`}>
        {children}
      </div>
    </div>
  );
};

export default Marquee;