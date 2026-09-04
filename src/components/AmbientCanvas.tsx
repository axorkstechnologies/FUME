import React from 'react';
import { motion } from 'motion/react';
import { ThemeMode } from '../types';

interface AmbientCanvasProps {
  themeMode: ThemeMode;
}

export const AmbientCanvas: React.FC<AmbientCanvasProps> = ({ themeMode }) => {
  const isLight = themeMode === 'light';

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Dynamic Animated Gradient Mesh / Scent Aura */}
      <motion.div
        className="absolute -top-[10%] -left-[5%] w-[60vw] h-[60vw] rounded-full blur-[110px] opacity-40 mix-blend-multiply"
        style={{
          background: isLight
            ? 'radial-gradient(circle, #F7EAD9 0%, #FAF0E6 50%, transparent 70%)'
            : 'radial-gradient(circle, #2A1F10 0%, #1A1408 50%, transparent 70%)'
        }}
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Floating Pastel Rose & Gold Orb */}
      <motion.div
        className="absolute top-[35%] -right-[10%] w-[55vw] h-[55vw] rounded-full blur-[120px] opacity-35"
        style={{
          background: isLight
            ? 'radial-gradient(circle, #F8E5DF 0%, #F5EAE6 45%, transparent 70%)'
            : 'radial-gradient(circle, #331A18 0%, #1A0F0D 50%, transparent 70%)'
        }}
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 60, -40, 0],
          scale: [1, 0.92, 1.12, 1],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Floating Soft Sage / Mint Aura */}
      <motion.div
        className="absolute -bottom-[10%] left-[20%] w-[50vw] h-[50vw] rounded-full blur-[130px] opacity-30"
        style={{
          background: isLight
            ? 'radial-gradient(circle, #E8EFE8 0%, #F1F6F1 50%, transparent 70%)'
            : 'radial-gradient(circle, #10241A 0%, #08140E 50%, transparent 70%)'
        }}
        animate={{
          x: [0, 50, -40, 0],
          y: [0, -40, 50, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Subtle Floating Gold Particle Accents */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute top-[18%] left-[12%] w-2 h-2 rounded-full bg-[#C5A059] blur-[0.5px]"
          animate={{
            y: [0, -25, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[42%] right-[16%] w-2.5 h-2.5 rounded-full bg-[#D4BA7A] blur-[0.5px]"
          animate={{
            y: [0, -35, 0],
            opacity: [0.2, 0.7, 0.2],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute top-[75%] left-[28%] w-1.5 h-1.5 rounded-full bg-[#E5C985] blur-[0.5px]"
          animate={{
            y: [0, -20, 0],
            opacity: [0.4, 0.9, 0.4],
            scale: [1, 1.4, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="absolute top-[60%] right-[32%] w-2 h-2 rounded-full bg-[#C5927B] blur-[0.5px]"
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.75, 0.3],
            scale: [1, 1.25, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
      </div>
    </div>
  );
};
