import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TextReveal from '../components/TextReveal';
import content from '../content/sister.json';
import { burst } from '../components/burst';

export default function GotASister() {
  const headingRef = useRef(null);

  const handleHeadingClick = (e) => {
    if (!headingRef.current) return;
    const rect = headingRef.current.getBoundingClientRect();
    burst(rect.left + rect.width / 2, rect.top + rect.height / 2, ['💕', '💖', '✨', '🎀', '😭'], 14);
  };

  return (
    <section className="py-32 px-6 relative max-w-4xl mx-auto z-10 flex flex-col items-center text-center">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-accent-pink/10 blur-[100px] rounded-full pointer-events-none" />

      <motion.span 
        initial={{ opacity: 0, y: 10, rotate: 2 }}
        whileInView={{ opacity: 1, y: 0, rotate: 2 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        className="font-script text-accent-pink text-2xl mb-4 inline-block"
      >
        {content.eyebrow}
      </motion.span>
      
      <div 
        ref={headingRef}
        onClick={handleHeadingClick}
        className="cursor-pointer group relative"
      >
        <TextReveal 
          text={content.title} 
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 justify-center group-hover:scale-105 transition-transform duration-300" 
        />
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="font-script text-accent-gold text-lg mb-8"
        >
          {content.hint}
        </motion.div>
      </div>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-text-secondary text-xl sm:text-2xl max-w-2xl mx-auto leading-relaxed"
      >
        {content.body}
      </motion.p>
    </section>
  );
}
