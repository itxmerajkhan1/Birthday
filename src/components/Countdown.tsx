import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock, Unlock, Award } from "lucide-react";

interface CountdownProps {
  onUnlockAll: () => void;
  isUnlocked: boolean;
}

export default function Countdown({ onUnlockAll, isUnlocked }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isMidnight: false,
  });

  const [simulated, setSimulated] = useState(false);

  // Target Date: 9 July 2026, 12:00 AM
  const targetDate = new Date("2026-07-09T00:00:00");

  useEffect(() => {
    if (isUnlocked) {
      setTimeLeft(prev => ({ ...prev, isMidnight: true }));
      return;
    }

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isMidnight: true,
        });
        onUnlockAll();
        return true; // Finished
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isMidnight: false,
      });
      return false;
    };

    // Initial calculation
    const isOver = calculateTimeLeft();
    if (isOver) return;

    const timer = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearInterval(timer);
  }, [onUnlockAll, isUnlocked]);

  // Handle manual debug bypass for beautiful demonstration of zero-state
  const handleSimulateMidnight = () => {
    setSimulated(true);
    setTimeLeft({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isMidnight: true,
    });
    onUnlockAll();
  };

  const timeBlocks = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINUTES", value: timeLeft.minutes },
    { label: "SECONDS", value: timeLeft.seconds },
  ];

  return (
    <div id="countdown-section" className="relative max-w-4xl mx-auto px-6 py-12 text-center z-10">
      {/* Glow Rings behind Countdown */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Modern Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-950/80 border border-gold-300/10 mb-8 backdrop-blur-md">
        <Clock className="w-3.5 h-3.5 text-gold-300 animate-pulse" />
        <span className="text-gold-200/90 font-mono text-xs tracking-widest uppercase">
          {timeLeft.isMidnight ? "The Moment Has Arrived" : "COUNTDOWN TO THE CELEBRATION"}
        </span>
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          {!timeLeft.isMidnight ? (
            <motion.div
              key="active-countdown"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 justify-center items-center"
            >
              {timeBlocks.map((block, i) => (
                <div
                  key={block.label}
                  className="relative group p-6 rounded-2xl glass-panel-light flex flex-col items-center justify-center overflow-hidden"
                >
                  {/* Hover Accent Line */}
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-gold-300/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  
                  {/* Value */}
                  <div className="h-16 flex items-center justify-center">
                    <span className="text-4xl md:text-5xl font-serif text-gold-200 tracking-tight font-medium font-mono">
                      {String(block.value).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Label */}
                  <span className="text-[10px] md:text-xs font-mono text-zinc-500 tracking-widest mt-2 group-hover:text-gold-300/60 transition-colors duration-300">
                    {block.label}
                  </span>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="unlocked-countdown"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
              className="p-8 md:p-12 rounded-3xl glass-panel relative overflow-hidden flex flex-col items-center justify-center max-w-2xl mx-auto"
            >
              {/* Star Particle Burst on Card Background */}
              <div className="absolute inset-0 bg-gradient-to-tr from-gold-900/10 via-transparent to-amber-900/10 pointer-events-none" />
              
              <div className="relative w-16 h-16 rounded-full bg-gold-600/20 border border-gold-300/30 flex items-center justify-center mb-6 text-gold-300 shadow-[0_0_30px_rgba(177,141,39,0.2)] animate-bounce">
                <Unlock className="w-6 h-6" />
              </div>

              <h3 className="text-2xl md:text-3xl font-serif text-gold-200 font-medium mb-3">
                HAPPY BIRTHDAY, MUNEEZA! 🎉
              </h3>
              
              <p className="text-zinc-400 font-sans font-light tracking-wide max-w-md text-sm md:text-base leading-relaxed mb-6">
                The magical timer has struck zero! All surprises, messages, and elements are now fully unlocked for you to explore. Enjoy your special digital gift!
              </p>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gold-400/10 border border-gold-400/20 text-gold-300 text-xs font-mono tracking-widest uppercase">
                <Award className="w-3.5 h-3.5" /> STATUS: FULLY REVEALED
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Manual Override Debug Bypass - Elegant integration */}
      {!timeLeft.isMidnight && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          whileHover={{ opacity: 1 }}
          className="mt-8 flex justify-center"
        >
          <button
            onClick={handleSimulateMidnight}
            className="px-4 py-1.5 rounded-full border border-dashed border-zinc-800 hover:border-gold-300/40 text-zinc-600 hover:text-gold-300/80 font-mono text-[10px] tracking-widest transition-all duration-300 uppercase cursor-pointer"
          >
            🔓 Bypass countdown (Preview Surprise Instantly)
          </button>
        </motion.div>
      )}
    </div>
  );
}
