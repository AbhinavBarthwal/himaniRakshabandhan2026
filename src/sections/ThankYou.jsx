import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TextReveal from '../components/TextReveal';
import content from '../content/thankyou.json';
import { burst } from '../components/burst';

export default function ThankYou() {
  const [bowTaps, setBowTaps] = useState(0);

  const handleBowClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;
    
    setBowTaps(prev => prev + 1);
    
    burst(x, y, ['🎉', '🎀', '✨', '🌸', '💛'], 10);
    
    if (bowTaps + 1 >= 2) {
      // Big celebration on double tap
      for(let i = 0; i < 30; i++) {
        setTimeout(() => {
          burst(Math.random() * window.innerWidth, -20, ['🎉', '🎀', '✨', '🌸', '💛', '💕'], 1);
        }, i * 40);
      }
      setBowTaps(0);
    }
  };

  return (
    <section className="pt-32 pb-10 px-6 relative max-w-4xl mx-auto z-10 flex flex-col items-center text-center overflow-hidden">
      <motion.span 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-script text-accent-pink text-2xl mb-4"
      >
        {content.eyebrow}
      </motion.span>
      
      <TextReveal 
        text={content.title} 
        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-10 justify-center" 
      />
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="text-text-primary text-xl max-w-2xl mx-auto leading-relaxed mb-12"
      >
        {content.body}
      </motion.p>
      
      <div className="mb-24 flex flex-col items-center">
        <motion.button 
          whileHover={{ scale: 1.15, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleBowClick}
          className="text-6xl drop-shadow-lg cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent-pink rounded-full mb-2"
          aria-label="tap the bow for a surprise"
        >
          🎀
        </motion.button>
        <span className="font-script text-accent-gold text-lg">
          {content.bowHint}
        </span>
      </div>
      
      <footer className="w-full text-center py-6 border-t border-white/5 font-script text-text-secondary text-xl">
        {content.footer}
      </footer>
    </section>
  );
}
