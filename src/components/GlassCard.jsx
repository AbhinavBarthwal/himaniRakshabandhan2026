import React from 'react';

export default function GlassCard({ children, className = '', glow = false, ...props }) {
  return (
    <div
      className={`glass-panel p-6 sm:p-8 relative ${
        glow ? 'shadow-[0_0_30px_rgba(255,111,145,0.15)]' : ''
      } ${className}`}
      {...props}
    >
      {/* Subtle top border glow for depth */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-t-2xl" />
      {children}
    </div>
  );
}
