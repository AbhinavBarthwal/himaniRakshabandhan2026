import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

// All misc photos that will rain down
const RAIN_IMAGES = [
  '/images/misc/img0.png',
  '/images/misc/img1.png',
  '/images/misc/img2.png',
  '/images/misc/img3.png',
  '/images/misc/img4.png',
  '/images/misc/img5.png',
  '/images/misc/img6.png',
  '/images/misc/img7.png',
  '/images/misc/img8.png',
  '/images/misc/img9.png',
  '/images/misc/img10.png',
  '/images/misc/img11.png',
];

// Each raindrop is a photo card falling from top
function RaindropPhoto({ src, style, delay, isMobile }) {
  const size = isMobile
    ? Math.random() * 60 + 70   // 70–130px on mobile
    : Math.random() * 80 + 100; // 100–180px on desktop

  const rotate = (Math.random() - 0.5) * 40;

  return (
    <motion.div
      className="absolute top-0 rounded-xl overflow-hidden shadow-2xl border-2 border-white/20 pointer-events-none"
      style={{
        left: style.left,
        width: size,
        height: size,
        rotate,
      }}
      initial={{ y: '-10vh', opacity: 0 }}
      animate={{ y: '110vh', opacity: [0, 1, 1, 0] }}
      transition={{
        duration: isMobile ? 3.5 : 4.5,
        delay,
        ease: 'linear',
        repeat: Infinity,
        repeatDelay: Math.random() * 3 + 2,
      }}
    >
      <img
        src={src}
        alt=""
        loading="lazy"
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}

export default function HappyRakhi() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-10% 0px' });
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Generate a stable set of drops
  const drops = useRef(
    Array.from({ length: isMobile ? 8 : 14 }, (_, i) => ({
      src: RAIN_IMAGES[i % RAIN_IMAGES.length],
      left: `${Math.random() * 96}%`,
      delay: (i / (isMobile ? 8 : 14)) * 4,
    }))
  ).current;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden z-10 py-20"
    >
      {/* Photo rainfall — only active when visible */}
      {isInView && drops.map((drop, i) => (
        <RaindropPhoto
          key={i}
          src={drop.src}
          style={{ left: drop.left }}
          delay={drop.delay}
          isMobile={isMobile}
        />
      ))}

      {/* Big goofy text */}
      <div className="relative z-20 text-center px-4 select-none pointer-events-none">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-script text-accent-pink text-2xl sm:text-3xl mb-6 drop-shadow-lg"
        >
          from your bhai, with love 🎀
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', damping: 10, stiffness: 80, delay: 0.2 }}
          className="leading-tight drop-shadow-[0_0_40px_rgba(255,111,145,0.6)]"
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: 'clamp(3rem, 14vw, 10rem)',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #FFD3DE 0%, #FF6F91 40%, #FFD700 80%, #FFB347 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.02em',
          }}
        >
          Happy
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', damping: 10, stiffness: 80, delay: 0.4 }}
          className="leading-tight drop-shadow-[0_0_40px_rgba(255,215,0,0.5)]"
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: 'clamp(2.4rem, 11vw, 8rem)',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #FFD700 0%, #FFB347 50%, #FF6F91 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.02em',
          }}
        >
          Raksha Bandhan
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="font-script text-accent-gold text-xl sm:text-2xl mt-6 drop-shadow-lg"
        >
          Himani 🎀
        </motion.p>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-primary to-transparent z-10 pointer-events-none" />
    </section>
  );
}
