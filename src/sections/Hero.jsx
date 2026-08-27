import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroContent from '../content/hero.json';
import HalftoneImage from '../components/HalftoneImage';

export default function Hero() {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Background moves slowest (downwards as we scroll down)
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  // Text moves mid-speed
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  // Cutout moves fast up
  const cutoutY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section 
      ref={ref}
      className="relative w-full overflow-hidden flex flex-col items-center justify-center pt-20"
      style={{ height: 'calc(var(--vh, 1vh) * 120)' }}
    >
      {/* Background Layer */}
      <motion.div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
        style={{ 
          backgroundImage: "url('/images/hero/background.png')",
          y: bgY 
        }}
      />
      
      {/* Gradient overlay to blend background */}
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-transparent via-bg-primary/50 to-bg-primary" />

      {/* Content Layer */}
      <motion.div 
        style={{ y: textY }}
        className="relative z-10 flex flex-col items-center text-center w-full px-4"
      >
        <motion.span 
          initial={{ opacity: 0, y: -20, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-script text-3xl md:text-4xl text-accent-pink mb-4 drop-shadow-md"
        >
          {heroContent.eyebrow}
        </motion.span>
        
        <motion.h1 
          className="text-[12vw] sm:text-[10vw] md:text-[8rem] font-bold leading-none tracking-tighter"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Hello, <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-pink to-accent-gold">
            Himani
          </span>
        </motion.h1>
        
      </motion.div>

      {/* Cutout Layer with Halftone */}
      <motion.div 
        style={{ y: cutoutY }}
        className="absolute bottom-[5vh] md:bottom-[-10vh] left-[55%] md:left-[60%] -translate-x-1/2 w-[95vw] max-w-[600px] h-[60vh] md:h-[80vh] z-20 pointer-events-none"
      >
        <img 
          src="/images/hero/himani_cutout.png" 
          alt="Himani" 
          className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(255,111,145,0.3)] contrast-125 saturate-110"
        />
      </motion.div>

      {/* Paragraph Layer (z-30 so it's readable over the cutout) */}
      <motion.div 
        style={{ y: textY }}
        className="relative z-30 flex flex-col items-center text-center w-full px-4 mt-8"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-lg sm:text-xl text-text-primary max-w-md mx-auto drop-shadow-md bg-bg-primary/20 backdrop-blur-sm p-4 rounded-2xl md:bg-transparent md:backdrop-blur-none"
        >
          {heroContent.body}
        </motion.p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 font-script text-xl text-text-secondary animate-bounce"
      >
        {heroContent.scrollCue}
      </motion.div>
    </section>
  );
}
