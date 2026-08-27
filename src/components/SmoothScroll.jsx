import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';


// Note: since this is a single page we might not need router, but just in case
export default function SmoothScroll({ children }) {
  const lenisRef = useRef();

  useEffect(() => {
    if (window.innerWidth < 768) {
      // Don't initialize Lenis on mobile - native scroll is much more performant for basic Androids
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
