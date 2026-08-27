import React from 'react';
import SectionHeader from '../components/SectionHeader';
import PhotoCard from '../components/PhotoCard';
import content from '../content/foodie.json';
import { motion } from 'framer-motion';

export default function FoodieGallery() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 15 } }
  };

  return (
    <section className="py-24 px-4 sm:px-6 relative max-w-7xl mx-auto z-10">
      <SectionHeader 
        eyebrow={content.eyebrow}
        title={content.title}
        body={content.body}
      />
      
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className="flex flex-wrap justify-center gap-8 md:gap-12 mt-16"
      >
        {content.items.map((photo, i) => {
          // Generate a slight random rotation for the scrapbook feel
          const rotate = (i % 2 === 0 ? 1 : -1) * (2 + Math.random() * 3);
          
          return (
            <motion.div key={i} variants={item}>
              <PhotoCard 
                image={photo.image}
                caption={photo.caption}
                placeholder={photo.placeholder}
                rotate={rotate}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
