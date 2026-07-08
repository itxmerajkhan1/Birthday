import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Gift, X, Star, Heart } from "lucide-react";
import { synth } from "./AudioSynthesizer";

interface FloatingParticle {
  id: number;
  type: "star" | "heart";
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export default function SurpriseModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [particles, setParticles] = useState<FloatingParticle[]>([]);
  const [timeLeft, setTimeLeft] = useState(10); // 10 second auto close timer

  const handleOpen = () => {
    setIsOpen(true);
    setTimeLeft(10);
    
    // Play magical arpeggio chord!
    synth.playSparkleChord();

    // Generate floating stars and hearts
    const generated: FloatingParticle[] = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      type: Math.random() > 0.5 ? "star" : "heart",
      x: Math.random() * 100, // % width
      y: Math.random() * 100, // % height
      size: 15 + Math.random() * 25, // px
      delay: Math.random() * 0.5,
      duration: 3 + Math.random() * 4, // seconds
    }));
    setParticles(generated);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsOpen(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 relative z-10 select-none">
      
      {/* Glowing Surprise Trigger Button */}
      <motion.button
        onClick={handleOpen}
        whileHover={{ scale: 1.05, boxShadow: "0 0 35px rgba(219, 189, 106, 0.4)" }}
        whileTap={{ scale: 0.98 }}
        className="relative group px-10 py-5 rounded-full bg-gradient-to-r from-gold-600 via-amber-400 to-gold-500 text-black font-serif font-semibold text-lg md:text-xl tracking-wide shadow-[0_15px_30px_rgba(219,189,106,0.2)] transition-all duration-300 flex items-center gap-3 border border-gold-300/30 cursor-pointer"
      >
        {/* Dynamic Sparkle Icon */}
        <Sparkles className="w-5 h-5 text-amber-900 animate-spin" style={{ animationDuration: '4s' }} />
        <span>🎁 Click For A Special Surprise</span>
        <Sparkles className="w-5 h-5 text-amber-900 animate-bounce" />
      </motion.button>

      {/* Floating Sparkle Dust below Button */}
      <p className="text-[10px] md:text-xs font-mono text-zinc-500 tracking-widest mt-4 uppercase">
        A Warm Digital Blessing Awaits Muneeza
      </p>

      {/* Full-Screen Surprise Dialog Modal overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 overflow-hidden">
            
            {/* Darkened Backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl pointer-events-auto"
            />

            {/* Floating Hearts and Stars portal */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
              {particles.map((p) => {
                const Icon = p.type === "star" ? Star : Heart;
                const color = p.type === "star" ? "text-amber-400/30" : "text-rose-500/20";
                return (
                  <motion.div
                    key={p.id}
                    className={`absolute ${color}`}
                    style={{
                      left: `${p.x}%`,
                      top: `${p.y}%`,
                      width: p.size,
                      height: p.size,
                    }}
                    initial={{ y: "110vh", rotate: 0, opacity: 0 }}
                    animate={{ y: "-10vh", rotate: 360, opacity: [0, 1, 1, 0] }}
                    transition={{
                      duration: p.duration,
                      delay: p.delay,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <Icon className="w-full h-full fill-current" />
                  </motion.div>
                );
              })}
            </div>

            {/* Glowing Spotlight backdrop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-400/10 blur-[130px] rounded-full pointer-events-none z-0" />

            {/* Modal Dialog Content Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 100, damping: 18 }}
              className="relative w-full max-w-xl bg-zinc-950/90 rounded-3xl border border-gold-400/25 p-8 md:p-12 text-center shadow-[0_0_50px_rgba(219,189,106,0.3)] z-20 overflow-hidden"
            >
              {/* Closing Action Button */}
              <button
                onClick={handleClose}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/10 transition-colors duration-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Gift Badge Icon decoration */}
              <div className="mx-auto w-16 h-16 rounded-full bg-gold-500/20 border border-gold-300/30 flex items-center justify-center text-gold-300 shadow-[0_0_20px_rgba(219,189,106,0.2)] mb-8">
                <Gift className="w-7 h-7" />
              </div>

              {/* Blessing Message Title */}
              <h3 className="text-xl md:text-2xl font-serif text-gold-100 font-semibold mb-6">
                Friendship Blessing for Muneeza ✨
              </h3>

              {/* Blessing Message Text */}
              <p className="text-zinc-300 font-sans font-light text-sm md:text-base leading-relaxed tracking-wide italic mb-8">
                "Muneeza, may your life always be filled with happiness, success, good health, beautiful opportunities, and wonderful memories. Thank you for being such a positive person. Keep smiling, keep growing, and keep achieving your dreams. Happy Birthday!"
              </p>

              {/* Countdown Progress indicator strip bar */}
              <div className="relative w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden border border-white/5 mb-2">
                <motion.div
                  className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-gold-500 to-amber-400 rounded-full"
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 10, ease: "linear" }}
                />
              </div>

              {/* Time remaining indicator */}
              <span className="font-mono text-[10px] text-zinc-500 tracking-wider">
                CLOSING AUTOMATICALLY IN {timeLeft} SECONDS...
              </span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
