import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);

  const phrases = [
    "Preparing Something Special For Muneeza...",
    "Gathering floating balloons & wishes...",
    "Setting up magical sparklers...",
    "Rolling out the red carpet...",
    "Almost ready to celebrate Muneeza's Day! ✨"
  ];

  useEffect(() => {
    // Increase progress smoothly over 4.5 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + step, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Cycle phrases based on progress
    if (progress < 25) {
      setPhraseIndex(0);
    } else if (progress < 50) {
      setPhraseIndex(1);
    } else if (progress < 70) {
      setPhraseIndex(2);
    } else if (progress < 90) {
      setPhraseIndex(3);
    } else {
      setPhraseIndex(4);
    }
  }, [progress]);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  // Create ambient background stars for the loading experience
  const bgStars = Array.from({ length: 24 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 2 + 1.5,
    delay: Math.random() * 2
  }));

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center overflow-hidden noise-overlay">
      {/* Star Field */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {bgStars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-amber-200/60"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
            animate={{
              opacity: [0.1, 0.9, 0.1],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Floating Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gold-600/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Main Content */}
      <div className="relative flex flex-col items-center max-w-md px-6 text-center z-10">
        {/* Decorative Golden Ring Emblem */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-20 h-20 mb-8 flex items-center justify-center"
        >
          <div className="absolute inset-0 rounded-full border border-gold-300/30 animate-spin" style={{ animationDuration: '12s' }} />
          <div className="absolute inset-1 rounded-full border border-dashed border-gold-200/20 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }} />
          <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-gold-600/30 to-amber-400/20 flex items-center justify-center">
            <span className="text-gold-300 font-serif text-2xl font-bold">M</span>
          </div>
        </motion.div>

        {/* Text Area */}
        <div className="h-14 flex items-center justify-center mb-6">
          <AnimatePresence mode="wait">
            <motion.h2
              key={phraseIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="text-gold-200 font-sans font-light tracking-wide text-lg md:text-xl text-shadow-sm"
            >
              {phrases[phraseIndex]}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* Progress Container */}
        <div className="w-64 bg-zinc-900/80 rounded-full h-[3px] border border-white/5 overflow-hidden backdrop-blur-sm relative">
          <motion.div
            className="h-full bg-gradient-to-r from-gold-500 via-amber-300 to-gold-400 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeInOut" }}
          />
        </div>

        {/* Percentage */}
        <motion.p
          className="text-zinc-500 font-mono text-xs mt-3 tracking-widest"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {progress}% SECURE CHANNEL
        </motion.p>
      </div>
    </div>
  );
}
