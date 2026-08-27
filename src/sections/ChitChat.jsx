import React from 'react';
import SectionHeader from '../components/SectionHeader';
import ChatBubble from '../components/ChatBubble';
import content from '../content/chitchat.json';
import { motion } from 'framer-motion';

export default function ChitChat() {
  return (
    <section className="py-32 px-4 relative max-w-4xl mx-auto z-10">
      <div className="absolute inset-0 bg-bg-secondary/30 backdrop-blur-[2px] -skew-y-3 -z-10" />
      
      <SectionHeader 
        eyebrow={content.eyebrow}
        title={content.title}
        body={content.subtitle}
      />
      
      <div className="max-w-md mx-auto mt-16 flex flex-col gap-2 p-6 rounded-3xl bg-black/20 border border-white/5 backdrop-blur-md shadow-2xl">
        {content.messages.map((msg, i) => (
          <ChatBubble key={i} message={msg} index={i} />
        ))}
      </div>
    </section>
  );
}
