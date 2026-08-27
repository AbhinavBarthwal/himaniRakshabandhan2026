import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import PhotoCard from '../components/PhotoCard';
import content from '../content/clicks.json';
import { motion, AnimatePresence } from 'framer-motion';

export default function RandomClicks() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <section className="py-24 px-6 relative max-w-7xl mx-auto z-10">
      <SectionHeader 
        eyebrow={content.eyebrow}
        title={content.title}
        body={content.subtitle}
      />
      
      <div className="flex flex-wrap justify-center gap-10 mt-16 pb-20 relative">
        {content.items.map((photo, i) => {
          const rotate = (i % 2 === 0 ? 1 : -1) * (4 + Math.random() * 4);
          
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.8, rotate: rotate - 10 }}
              whileInView={{ opacity: 1, scale: 1, rotate }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ type: 'spring', damping: 12, delay: i * 0.1 }}
            >
              <PhotoCard 
                image={photo.image}
                caption={photo.caption}
                placeholder={photo.placeholder}
              />
            </motion.div>
          );
        })}

        {/* Secret Sticker */}
        <div className="absolute bottom-4 right-[10%] sm:right-[20%] z-30">
          <motion.button 
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowTooltip(!showTooltip)}
            className="text-4xl drop-shadow-md cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent-pink rounded-full"
            aria-label="a tiny secret sticker"
          >
            🐱
          </motion.button>
          
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                className="absolute bottom-14 right-0 sm:right-auto bg-bg-card backdrop-blur-xl border border-white/10 text-text-primary p-4 rounded-2xl w-[85vw] max-w-xs sm:w-64 shadow-2xl font-script text-lg sm:text-xl leading-snug z-50"
              >
                {content.secretTooltip.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i === 0 && <br />}
                  </React.Fragment>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
