import React, { useState, useEffect } from 'react';

interface DynamicTextProps {
  texts: string[];
  className?: string;
  animationType?: 'fade' | 'slide' | 'scale' | 'rotate';
  duration?: number;
  pauseTime?: number;
}

const DynamicText: React.FC<DynamicTextProps> = ({
  texts,
  className = '',
  animationType = 'fade',
  duration = 1000,
  pauseTime = 3000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        setIsAnimating(false);
      }, duration / 2);
    }, pauseTime + duration);

    return () => clearInterval(interval);
  }, [texts.length, duration, pauseTime]);

  const getAnimationClass = () => {
    const baseClass = 'transition-all duration-500 ease-in-out';
    
    if (!isAnimating) return baseClass;
    
    switch (animationType) {
      case 'fade':
        return `${baseClass} opacity-0`;
      case 'slide':
        return `${baseClass} transform translate-x-4 opacity-0`;
      case 'scale':
        return `${baseClass} transform scale-95 opacity-0`;
      case 'rotate':
        return `${baseClass} transform rotate-1 opacity-0`;
      default:
        return `${baseClass} opacity-0`;
    }
  };

  return (
    <span className={`${className} ${getAnimationClass()}`}>
      {texts[currentIndex]}
    </span>
  );
};

export default DynamicText;