import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;