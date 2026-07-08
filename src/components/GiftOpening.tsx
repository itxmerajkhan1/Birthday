import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Gift } from "lucide-react";
import { synth } from "./AudioSynthesizer";

interface GiftOpeningProps {
  onOpenComplete: () => void;
}

interface Balloon {
  id: number;
  x: number;
  delay: number;
  color: string;
  size: number;
  speed: number;
}

export default function GiftOpening({ onOpenComplete }: GiftOpeningProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  const balloonColors = [
    "bg-red-500",
    "bg-amber-400",
    "bg-sky-400",
    "bg-emerald-400",
    "bg-fuchsia-400",
    "bg-rose-400",
    "bg-purple-400"
  ];

  const handleOpenGift = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Initialize Web Audio and play the Happy Birthday melody loop
    synth.playBirthdayMelody();

    // Spawn 18 flying balloons with various speeds and offsets
    const spawned: Balloon[] = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: 10 + Math.random() * 80, // % width
      delay: Math.random() * 1.5,
      color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
      size: 40 + Math.random() * 40, // px
      speed: 6 + Math.random() * 6 // seconds duration
    }));
    setBalloons(spawned);

    // Trigger complete reveal after 3.5 seconds of beautiful opening animations
    setTimeout(() => {
      onOpenComplete();
    }, 3800);
  };

  return (
    <div className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center overflow-hidden noise-overlay">
      {/* Floating Sparkles around the Gift Box */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-gold-300 opacity-30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0.5, 1.2, 0.5],
              opacity: [0.2, 0.8, 0.2],
              y: [-10, -50, -10]
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          >
            <Sparkles className="w-4 h-4 text-gold-200" />
          </motion.div>
        ))}
      </div>

      {/* Portal Container for Flying Balloons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-25">
        {balloons.map((b) => (
          <motion.div
            key={b.id}
            className={`absolute rounded-full shadow-lg flex flex-col items-center`}
            style={{
              left: `${b.x}%`,
              width: b.size,
              height: b.size * 1.2, // Egg shape
              bottom: "-100px",
            }}
            initial={{ bottom: "-100px", opacity: 0 }}
            animate={{ bottom: "110%", opacity: [0, 1, 1, 0] }}
            transition={{
              duration: b.speed,
              delay: b.delay,
              ease: "easeOut"
            }}
          >
            {/* Balloon Body */}
            <div className={`w-full h-full rounded-3xl ${b.color} relative border border-white/10 opacity-95`}>
              {/* Highlight */}
              <div className="absolute top-2 left-3 w-3 h-6 bg-white/25 rounded-full blur-[1px]" />
            </div>
            {/* Knot */}
            <div className={`w-2 h-2 ${b.color} -mt-[1px] rotate-45`} />
            {/* String */}
            <div className="w-[1px] h-12 bg-white/20 -mt-1" />
          </motion.div>
        ))}
      </div>

      {/* Floating Ambient Glow behind the Box */}
      <motion.div 
        animate={{
          scale: isOpening ? [1, 2, 4] : [1, 1.1, 1],
          opacity: isOpening ? [0.4, 0.8, 0] : [0.3, 0.5, 0.3]
        }}
        transition={{ duration: isOpening ? 3.5 : 4, repeat: isOpening ? 0 : Infinity }}
        className="absolute w-80 h-80 bg-gold-400/10 blur-[120px] rounded-full pointer-events-none z-0"
      />

      <div className="relative flex flex-col items-center text-center px-6 z-10 select-none">
        <AnimatePresence>
          {!isOpening ? (
            <motion.div
              key="text-intro"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <h1 className="text-3xl md:text-4xl font-serif text-gold-100 tracking-wide font-light mb-3">
                A Magical Gift Awaits
              </h1>
              <p className="text-zinc-500 font-sans text-xs md:text-sm tracking-widest uppercase">
                CRACK THE SEAL TO UNLOCK THE SURPRISE
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="text-opening"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mb-12"
            >
              <h1 className="text-3xl md:text-4xl font-serif text-gold-300 tracking-wide font-light mb-3 animate-pulse">
                Unlocking Surprises... ✨
              </h1>
              <p className="text-zinc-400 font-sans text-xs tracking-widest uppercase">
                Welcome to your world, Muneeza!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3D-Like Gift Box Construction */}
        <motion.div
          onClick={handleOpenGift}
          className="relative w-48 h-48 md:w-56 md:h-56 cursor-pointer group active:scale-95 transition-transform duration-100"
          animate={isOpening ? {
            rotateY: [0, 15, -15, 30, -30, 360],
            scale: [1, 1.05, 0.95, 1.1, 0.8, 0],
            opacity: [1, 1, 1, 1, 1, 0]
          } : {
            y: [0, -6, 0]
          }}
          transition={{
            duration: isOpening ? 3.5 : 3.5,
            repeat: isOpening ? 0 : Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Sparkles on hover */}
          <div className="absolute inset-0 bg-gold-400/5 rounded-full blur-xl group-hover:bg-gold-400/10 transition-colors duration-500 pointer-events-none" />

          {/* LID OF THE BOX */}
          <motion.div
            className="absolute top-0 inset-x-0 h-12 bg-gradient-to-r from-gold-500 via-amber-400 to-gold-600 rounded-t-lg shadow-md z-30 flex items-center justify-center"
            animate={isOpening ? {
              y: -120,
              rotate: -25,
              opacity: 0
            } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {/* Box Ribbon Tie Bow on top */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-6 flex justify-between z-40 pointer-events-none">
              <div className="w-7 h-7 rounded-full border-[3px] border-amber-800 bg-transparent rotate-45 transform origin-bottom-right" />
              <div className="w-7 h-7 rounded-full border-[3px] border-amber-800 bg-transparent -rotate-45 transform origin-bottom-left" />
            </div>
            {/* Horizontal Ribbon on Lid */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-5 bg-amber-800/90 shadow-inner" />
          </motion.div>

          {/* BODY OF THE BOX */}
          <div className="absolute top-10 bottom-0 inset-x-2 bg-gradient-to-b from-gold-600 via-gold-700 to-amber-900 rounded-b-xl border border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.6)] overflow-hidden z-20">
            {/* Vertical Ribbon */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-5 bg-amber-800 shadow-inner" />
            {/* Horizontal Ribbon */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-5 bg-amber-800 shadow-inner" />

            {/* Shine Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            
            {/* Centered Golden Seal Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gold-400/25 border border-gold-300/40 flex items-center justify-center text-gold-100 shadow-[0_0_15px_rgba(219,189,106,0.3)] group-hover:scale-110 transition-transform duration-500">
                <Gift className="w-5 h-5" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Prompt */}
        <AnimatePresence>
          {!isOpening && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-8 font-mono text-[10px] md:text-xs tracking-widest text-gold-300/80 uppercase"
            >
              ✦ Tap Box to Unveil Birthday Magic ✦
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
