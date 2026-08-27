import React from 'react';
import TextReveal from './TextReveal';
import { motion } from 'framer-motion';

export default function SectionHeader({ eyebrow, title, body, className = '' }) {
  return (
    <div className={`flex flex-col items-center text-center mb-16 ${className}`}>
      {eyebrow && (
        <motion.span 
          initial={{ opacity: 0, y: 10, rotate: -2 }}
          whileInView={{ opacity: 1, y: 0, rotate: -2 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.5 }}
          className="font-script text-accent-pink text-2xl mb-2"
        >
          {eyebrow}
        </motion.span>
      )}
      
      <TextReveal 
        text={title} 
        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 justify-center" 
      />
      
      {body && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed"
        >
          {body}
        </motion.p>
      )}
    </div>
  );
}
