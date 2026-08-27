import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import GlassCard from '../components/GlassCard';
import content from '../content/howWeMet.json';

export default function HowWeMet() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const watermarkY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const cardRotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  return (
    <section ref={ref} className="py-32 px-6 relative max-w-6xl mx-auto z-10">
      <SectionHeader 
        eyebrow={content.eyebrow}
        title={content.title}
        body={content.body}
      />

      <div className="relative mt-20 flex justify-center items-center min-h-[400px]">
        {/* Giant Watermark Text */}
        <motion.div 
          style={{ y: watermarkY }}
          className="absolute z-0 font-bold text-[20vw] leading-none text-white/[0.02] select-none pointer-events-none"
        >
          {content.watermark}
        </motion.div>

        {/* Story Card */}
        <motion.div 
          style={{ rotate: cardRotate }}
          className="z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ type: 'spring', damping: 15 }}
        >
          <GlassCard className="max-w-md w-full p-4 pb-10 rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 -rotate-2 w-20 h-6 bg-accent-gold/40 backdrop-blur-md z-20 shadow-sm" />
            
            <div className="w-full aspect-square bg-gradient-to-br from-accent-gold/20 to-accent-pink/20 rounded-xl flex items-center justify-center border border-white/10 mb-4">
              <span className="text-8xl drop-shadow-2xl">{content.imagePlaceholder}</span>
            </div>
            
            <p className="font-script text-2xl text-center text-text-primary">
              {content.cardCaption}
            </p>
          </GlassCard>
        </motion.div>
        
        {/* Floating stickers */}
        <motion.div 
          animate={{ y: [0, -10, 0] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-[15%] text-4xl drop-shadow-lg"
        >
          ✨
        </motion.div>
      </div>
    </section>
  );
}
