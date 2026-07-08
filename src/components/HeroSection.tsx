import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export default function HeroSection() {
  const [typedSubtitle, setTypedSubtitle] = useState("");
  const fullSubtitle = "Today is a celebration of your smile, your kindness, your achievements, and the wonderful person you are.";

  // Dynamic Typing Animation effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedSubtitle((prev) => {
        if (index < fullSubtitle.length) {
          const char = fullSubtitle.charAt(index);
          index++;
          return prev + char;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 35);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-6 py-20 text-center overflow-hidden">
      {/* Background radial soft light gradient */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-gold-600/5 to-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Hero Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-950/80 border border-gold-300/10 mb-8 backdrop-blur-md relative"
      >
        <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-spin" style={{ animationDuration: '6s' }} />
        <span className="text-gold-200/90 font-mono text-[10px] md:text-xs tracking-widest uppercase">
          A Cinematic Celebration of Friendship
        </span>
      </motion.div>

      {/* Main Title Headings */}
      <div className="relative max-w-4xl z-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-8xl font-serif font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-slate-50 via-gold-100 to-gold-300/80 mb-6 relative py-2"
        >
          <span className="inline-block hover:scale-105 transition-transform duration-500 cursor-default select-none">🎉</span>{" "}
          Happy Birthday Muneeza{" "}
          <span className="inline-block hover:scale-105 transition-transform duration-500 cursor-default select-none">🎉</span>
        </motion.h1>

        {/* Typing Subtitle Display */}
        <div className="min-h-[4rem] sm:min-h-[3rem] max-w-2xl mx-auto flex items-center justify-center">
          <p className="text-zinc-400 font-sans font-light text-base sm:text-lg md:text-xl tracking-wide leading-relaxed">
            {typedSubtitle}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-[2px] h-[1.125rem] bg-gold-300 ml-1"
            />
          </p>
        </div>
      </div>

      {/* Decorative Interactive Scroll Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-12 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">Scroll Down to Explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-zinc-700 flex justify-center p-1.5"
        >
          <div className="w-1 h-2 bg-gold-400 rounded-full" />
        </motion.div>
      </motion.div>

      {/* Sparkling Stars float system */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gold-200"
            style={{
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
            }}
            animate={{
              opacity: [0.1, 0.7, 0.1],
              scale: [0.8, 1.4, 0.8],
            }}
            transition={{
              duration: 2.5 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 1.5,
            }}
          />
        ))}
      </div>
    </section>
  );
}
