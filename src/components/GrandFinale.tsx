import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Heart } from "lucide-react";
import { synth } from "./AudioSynthesizer";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
}

interface Balloon {
  id: number;
  x: number;
  color: string;
  size: number;
  speed: number;
  delay: number;
}

export default function GrandFinale() {
  const [inView, setInView] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [signatureComplete, setSignatureComplete] = useState(false);
  const [showUnderline, setShowUnderline] = useState(false);
  const [showSparkleBurst, setShowSparkleBurst] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  // Lists of randomized visual items
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [bgStars, setBgStars] = useState<Particle[]>([]);
  const [confetti, setConfetti] = useState<Particle[]>([]);
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  const cardRef = useRef<HTMLDivElement>(null);

  // Track Mouse movement relative to card for interactive glow
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  useEffect(() => {
    // Generate background stars
    const stars = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      speedY: -(0.05 + Math.random() * 0.08),
      speedX: (Math.random() - 0.5) * 0.04,
      opacity: 0.1 + Math.random() * 0.6
    }));
    setBgStars(stars);

    // Generate random sparklers inside card
    const randomSparkles = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      size: Math.random() * 10 + 10,
      delay: Math.random() * 5
    }));
    setSparkles(randomSparkles);

    // Slow starry movement interval
    const starInterval = setInterval(() => {
      setBgStars((prev) =>
        prev.map((s) => {
          let newY = s.y + s.speedY;
          let newX = s.x + s.speedX;
          if (newY < 0) newY = 100;
          if (newX < 0 || newX > 100) newX = Math.random() * 100;
          return { ...s, y: newY, x: newX };
        })
      );
    }, 50);

    return () => clearInterval(starInterval);
  }, []);

  // Trigger elements on viewport enter
  const handleSectionEnter = () => {
    if (inView) return;
    setInView(true);

    // Play high-frequency sparkling chime to celebrate the grand final entrance
    synth.playSparkleChord();

    // Trigger falling confetti
    const confettiColors = ["#dbbd6a", "#f6ecce", "#cca03f", "#f43f5e", "#38bdf8", "#34d399"];
    const items = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 20,
      size: Math.random() * 6 + 4,
      speedY: 1.5 + Math.random() * 2.5,
      speedX: (Math.random() - 0.5) * 1.5,
      opacity: 0.7 + Math.random() * 0.3
    }));
    setConfetti(items);

    // Spawn subtle background balloons
    const balloonColors = ["rgba(219,189,106,0.1)", "rgba(244,63,94,0.08)", "rgba(56,189,248,0.08)"];
    const bItems = Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      x: 15 + Math.random() * 70,
      color: balloonColors[i % balloonColors.length],
      size: 60 + Math.random() * 50,
      speed: 12 + Math.random() * 8,
      delay: i * 1.5
    }));
    setBalloons(bItems);

    // Timed stages for the signature handwriting, underline and text reveal
    setTimeout(() => {
      setSignatureComplete(true);
    }, 2200); // Wait for signature path writing to complete

    setTimeout(() => {
      setShowUnderline(true);
      setShowSparkleBurst(true);
      // Play a lovely final bell sound
      synth.playChime(523.25, 2.0, 0.15); // C5 crystalline note chime
    }, 2350);

    setTimeout(() => {
      setShowThankYou(true);
    }, 4500); // 3 seconds after signature starts, fade in the subtitle elegantly
  };

  // Confetti falling movement interval
  useEffect(() => {
    if (!inView) return;
    const confettiInterval = setInterval(() => {
      setConfetti((prev) => {
        const updated = prev.map((c) => {
          const nextY = c.y + c.speedY;
          const nextX = c.x + c.speedX;
          // Slowly decrease opacity as they approach screen bottom
          const nextOpacity = nextY > 80 ? Math.max(0, c.opacity - 0.05) : c.opacity;
          return { ...c, y: nextY, x: nextX, opacity: nextOpacity };
        });
        // Filter out completely faded/fallen items to save CPU
        return updated.filter((c) => c.y < 110 && c.opacity > 0);
      });
    }, 40);

    return () => clearInterval(confettiInterval);
  }, [inView]);

  return (
    <motion.section
      onViewportEnter={handleSectionEnter}
      viewport={{ once: true, margin: "-100px" }}
      className="relative max-w-4xl mx-auto px-6 py-28 z-10 select-none overflow-hidden"
    >
      {/* Aurora & Background rotating gradient glow */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft rotating backdrop light */}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-gold-600/5 via-amber-500/[0.03] to-rose-500/[0.03] rounded-full blur-[140px] opacity-80"
        />
        {/* Secondary Aurora wave overlay */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-500/[0.02] rounded-full blur-[120px] mix-blend-screen" />
      </div>

      {/* Floating Star Particles Background */}
      <div className="absolute inset-0 pointer-events-none">
        {bgStars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-gold-200"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              boxShadow: star.size > 2 ? "0 0 8px rgba(219,189,106,0.3)" : "none",
            }}
          />
        ))}
      </div>

      {/* Falling Confetti System */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {confetti.map((c) => (
          <div
            key={c.id}
            className="absolute rounded-sm"
            style={{
              left: `${c.x}%`,
              top: `${c.y}%`,
              width: `${c.size}px`,
              height: `${c.size * 1.5}px`,
              backgroundColor: c.id % 2 === 0 ? "#dbbd6a" : c.id % 3 === 0 ? "#f43f5e" : "#38bdf8",
              opacity: c.opacity,
              transform: `rotate(${c.y * 3}deg)`,
            }}
          />
        ))}
      </div>

      {/* Slow Floating Balloons behind the Card */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {balloons.map((b) => (
          <motion.div
            key={b.id}
            className="absolute rounded-full flex flex-col items-center"
            style={{
              left: `${b.x}%`,
              width: `${b.size}px`,
              height: `${b.size * 1.2}px`,
              backgroundColor: b.color,
              filter: "blur(4px)",
              bottom: "-150px",
            }}
            initial={{ y: 0 }}
            animate={{ y: -900 }}
            transition={{
              duration: b.speed,
              delay: b.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Balloon Knot */}
            <div className="w-2.5 h-2.5 bg-current rotate-45 mt-[-1px] opacity-20" />
          </motion.div>
        ))}
      </div>

      {/* Premium Glass Card Wrapper */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{
          y: -8,
          boxShadow: "0 35px 70px rgba(0, 0, 0, 0.6), 0 0 45px rgba(219, 189, 106, 0.15)",
        }}
        className="relative rounded-3xl p-10 md:p-16 overflow-hidden glass-panel border border-white/[0.06] transition-all duration-700 ease-out flex flex-col items-center justify-center text-center select-none z-10"
        style={{
          // Custom interactive glowing spotlight variables
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(219, 189, 106, 0.08) 0%, rgba(15, 15, 20, 0.45) 60%)`,
        }}
      >
        {/* Interactive Mouse Highlight Flare */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle 180px at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.03) 0%, transparent 100%)`,
          }}
        />

        {/* Shimmer Effect bar crossing title */}
        <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/[0.02] to-transparent transform -skew-x-12 animate-pulse pointer-events-none" style={{ animationDuration: '8s' }} />

        {/* Ambient sparkling stars inside the glass panel card */}
        {sparkles.map((sp) => (
          <motion.div
            key={sp.id}
            className="absolute text-gold-300 pointer-events-none"
            style={{ left: `${sp.x}%`, top: `${sp.y}%` }}
            animate={{
              scale: [0.3, 1, 0.3],
              opacity: [0.1, 0.7, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: sp.delay,
            }}
          >
            <Sparkles className="w-3.5 h-3.5 opacity-40 fill-current" />
          </motion.div>
        ))}

        {/* Main Header / Cinematic Greeting Icon */}
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-300/20 flex items-center justify-center text-gold-300 shadow-[0_0_15px_rgba(219,189,106,0.15)] mb-8"
        >
          <Heart className="w-5 h-5 fill-current" />
        </motion.div>

        {/* Grand Centered Message exactly as requested */}
        <div className="space-y-6 max-w-2xl mb-12 select-none">
          <p className="text-zinc-400 font-sans font-light tracking-wide text-sm md:text-base leading-relaxed">
            This little website was created <br />
            to celebrate someone truly wonderful.
          </p>

          <p className="text-zinc-300 font-serif italic text-base md:text-lg tracking-wide leading-relaxed">
            May every dream become reality, <br />
            every smile last longer, <br />
            and every new day bring happiness.
          </p>

          <p className="text-xl md:text-2xl font-serif font-medium text-gold-100 tracking-wide">
            Happy Birthday, Muneeza.
          </p>

          <div className="pt-2">
            <p className="text-zinc-500 font-sans text-xs tracking-widest uppercase">
              With Respect & Best Wishes,
            </p>
          </div>
        </div>

        {/* Realistic Calligraphy Signature Canvas with SVGs */}
        <div className="relative h-20 w-64 flex flex-col items-center justify-center mb-6">
          
          {/* Animated signature "From Hassan" */}
          <svg
            className="w-48 h-12 z-10"
            viewBox="0 0 200 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.text
              x="50%"
              y="35"
              textAnchor="middle"
              className="font-cursive text-3xl font-bold fill-none"
              style={{
                stroke: "#dbbd6a",
                strokeWidth: "1.2px",
                filter: signatureComplete ? "drop-shadow(0 0 6px rgba(219,189,106,0.5))" : "none",
                transition: "fill 1s ease-in-out, filter 1s ease-in-out",
              }}
              animate={{
                strokeDashoffset: [400, 0],
                fill: signatureComplete ? ["rgba(219,189,106,0)", "rgba(219,189,106,1)"] : "rgba(219,189,106,0)",
              }}
              transition={{
                strokeDashoffset: { duration: 2.2, ease: "easeInOut" },
                fill: { delay: 1.8, duration: 1.0 },
              }}
              strokeDasharray="400"
            >
              From Hassan ✨
            </motion.text>
          </svg>

          {/* Underline drawn left-to-right with soft glow */}
          <div className="absolute bottom-3 w-40 h-[1.5px] overflow-hidden">
            <AnimatePresence>
              {showUnderline && (
                <motion.div
                  initial={{ left: "-100%" }}
                  animate={{ left: "0%" }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-300 to-transparent shadow-[0_0_8px_rgba(219,189,106,0.8)]"
                />
              )}
            </AnimatePresence>
          </div>

          {/* Sparkle Burst Sparkler */}
          <AnimatePresence>
            {showSparkleBurst && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.3, 0], opacity: [0, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute right-8 top-2 pointer-events-none text-gold-200"
              >
                <Sparkles className="w-5 h-5 fill-current animate-spin" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Small Elegant text footer: "Thank You For Visiting" */}
        <div className="h-6 overflow-hidden">
          <AnimatePresence>
            {showThankYou && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.75, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="text-[10px] md:text-xs font-mono text-zinc-500 tracking-widest uppercase glow-text"
              >
                ✦ Thank You For Visiting ✦
              </motion.p>
            )}
          </AnimatePresence>
        </div>

      </motion.div>
    </motion.section>
  );
}
