import { useState, useCallback, useRef } from 'react';

export default function useTilt(settings = {}) {
  const ref = useRef(null);
  const [style, setStyle] = useState({ transform: 'perspective(1000px)' });
  const [reflection, setReflection] = useState({ opacity: 0, x: 50, y: 50 });

  const { maxTilt = 15, scale = 1.05, glare = true } = settings;

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = (mouseX / width - 0.5) * 2;
    const yPct = (mouseY / height - 0.5) * 2;
    
    const rotateX = yPct * maxTilt * -1;
    const rotateY = xPct * maxTilt;
    
    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`,
    });

    if (glare) {
      setReflection({
        opacity: 0.15,
        x: (mouseX / width) * 100,
        y: (mouseY / height) * 100,
      });
    }
  }, [maxTilt, scale, glare]);

  const handleMouseLeave = useCallback(() => {
    setStyle({ transform: 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)' });
    setReflection({ opacity: 0, x: 50, y: 50 });
  }, []);

  return { ref, style, reflection, handleMouseMove, handleMouseLeave };
}
