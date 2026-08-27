import React from 'react';
import useTilt from '../hooks/useTilt';
import GlassCard from './GlassCard';

export default function PhotoCard({ image, placeholder, caption, className = '', rotate = 0 }) {
  const { ref, style, reflection, handleMouseMove, handleMouseLeave } = useTilt({
    maxTilt: 15,
    scale: 1.05,
    glare: true,
  });

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-block transition-transform duration-200 ease-out z-10 hover:z-20 ${className}`}
      style={{
        ...style,
        transform: style.transform !== 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)' 
          ? style.transform 
          : `perspective(1000px) rotate(${rotate}deg)`,
      }}
    >
      <GlassCard className="p-3 sm:p-4 pb-10 w-64 sm:w-72 md:w-80" glow={true}>
        {/* Reflection glare overlay */}
        <div 
          className="pointer-events-none absolute inset-0 z-20 rounded-2xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${reflection.x}% ${reflection.y}%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)`,
            opacity: reflection.opacity,
            mixBlendMode: 'overlay',
          }}
        />
        
        {/* Tape detail */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 -rotate-3 w-16 h-5 bg-white/20 backdrop-blur-sm shadow-sm z-30" />
        
        {/* Photo area */}
        <div className="w-full aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-bg-secondary to-bg-primary relative flex items-center justify-center border border-white/5">
          {image ? (
            <img src={`/images/${image}`} alt={caption} className="w-full h-full object-cover" />
          ) : (
            <span className="text-6xl drop-shadow-lg">{placeholder}</span>
          )}
        </div>
        
        <p className="font-script text-xl text-center mt-4 text-text-primary">
          {caption}
        </p>
      </GlassCard>
    </div>
  );
}
