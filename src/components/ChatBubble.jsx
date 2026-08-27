import React from 'react';
import { motion } from 'framer-motion';

export default function ChatBubble({ message, index }) {
  const { text, isMe, sender } = message;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-5% 0px' }}
      transition={{ 
        type: 'spring', 
        stiffness: 120, 
        damping: 14,
        delay: index * 0.15 
      }}
      className={`flex flex-col max-w-[80%] ${isMe ? 'self-end items-end' : 'self-start items-start'} mb-4`}
    >
      <span className="text-xs font-script text-text-secondary mb-1 px-1 opacity-70">
        {sender}
      </span>
      
      <div 
        className={`px-5 py-3 rounded-2xl text-[15px] sm:text-base leading-relaxed shadow-lg ${
          isMe 
            ? 'bg-accent-pink text-white rounded-br-sm' 
            : 'bg-white/10 backdrop-blur-md border border-white/10 text-text-primary rounded-bl-sm'
        }`}
      >
        {text}
      </div>
    </motion.div>
  );
}
