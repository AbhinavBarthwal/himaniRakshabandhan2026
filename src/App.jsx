import React from 'react';
import SmoothScroll from './components/SmoothScroll';
import ParticleBackground from './components/ParticleBackground';
import ScrollProgress from './components/ScrollProgress';

import Hero from './sections/Hero';
import HowWeMet from './sections/HowWeMet';
import GotASister from './sections/GotASister';
import FoodieGallery from './sections/FoodieGallery';
import ChitChat from './sections/ChitChat';
import RandomClicks from './sections/RandomClicks';
import ThankYou from './sections/ThankYou';
import HappyRakhi from './sections/HappyRakhi';

function App() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-bg-primary text-text-primary overflow-x-hidden selection:bg-accent-pink/30">
        <ParticleBackground />
        <ScrollProgress />
        
        <main className="relative z-10">
          <Hero />
          <HowWeMet />
          <GotASister />
          <FoodieGallery />
          <ChitChat />
          <RandomClicks />
          <ThankYou />
          <HappyRakhi />
        </main>
      </div>
    </SmoothScroll>
  );
}

export default App;
