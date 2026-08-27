import React, { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (scrollHeight > 0) {
        setProgress(Math.min(1, Math.max(0, currentScrollY / scrollHeight)));
      }
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-4 sm:left-8 w-1.5 h-full z-40 hidden md:block pointer-events-none opacity-60">
      <div className="w-full h-full bg-gradient-to-b from-accent-rose via-accent-gold to-accent-rose rounded-full opacity-30" />
      
      <div 
        className="absolute top-0 left-0 w-full rounded-full transition-all duration-75 ease-linear bg-gradient-to-b from-accent-rose to-accent-gold shadow-[0_0_10px_rgba(242,183,5,0.5)]"
        style={{ height: `${progress * 100}%` }}
      />
      
      <div 
        className="absolute left-1/2 -translate-x-1/2 text-2xl drop-shadow-md transition-all duration-75 ease-linear"
        style={{ top: `calc(${progress * 100}% - 15px)` }}
      >
        🪢
      </div>
    </div>
  );
}
