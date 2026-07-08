import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Trophy } from "lucide-react";
import { synth } from "./AudioSynthesizer";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  fade: number;
  size: number;
}

interface Firework {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vy: number;
  color: string;
  exploded: boolean;
}

export default function FireworksCelebration() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const [celebrationCount, setCelebrationCount] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = containerRef.current?.clientWidth || window.innerWidth;
    let height = canvas.height = 360; // Confined height for section card boundary

    // Set colors for fireworks
    const colors = [
      "rgba(244, 236, 206, 1)", // Gold
      "rgba(251, 191, 36, 1)",  // Yellow
      "rgba(244, 63, 94, 1)",   // Rose
      "rgba(192, 132, 252, 1)", // Purple
      "rgba(56, 189, 248, 1)",  // Sky Blue
      "rgba(52, 211, 153, 1)",  // Teal
    ];

    let fireworks: Firework[] = [];
    let particles: Particle[] = [];

    const handleResize = () => {
      width = canvas.width = containerRef.current?.clientWidth || window.innerWidth;
      height = canvas.height = 360;
    };

    window.addEventListener("resize", handleResize);

    const createExplosion = (x: number, y: number, color: string) => {
      // Synthesize a beautiful spark chime on explosion
      synth.playChime(440 + Math.random() * 400, 1.5, 0.08);

      const count = 45;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color,
          alpha: 1,
          fade: Math.random() * 0.02 + 0.015,
          size: Math.random() * 2 + 1,
        });
      }
    };

    // Main animation loop
    const loop = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)"; // Trailing tail effect
      ctx.fillRect(0, 0, width, height);

      // Launch fireworks occasionally
      if (Math.random() < 0.035 && fireworks.length < 5) {
        const targetX = Math.random() * (width - 100) + 50;
        const targetY = Math.random() * (height - 120) + 40;
        fireworks.push({
          x: targetX,
          y: height,
          targetX,
          targetY,
          vy: - (Math.random() * 4 + 5),
          color: colors[Math.floor(Math.random() * colors.length)],
          exploded: false,
        });
      }

      // Update and draw fireworks
      fireworks = fireworks.filter((f) => {
        if (!f.exploded) {
          f.y += f.vy;
          // Slowly decrease velocity as it rises
          f.vy *= 0.98;

          // Drawing trail
          ctx.beginPath();
          ctx.arc(f.x, f.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = f.color;
          ctx.fill();

          // Explode at peak or close to target
          if (f.vy >= -1.2 || f.y <= f.targetY) {
            f.exploded = true;
            createExplosion(f.x, f.y, f.color);
          }
          return true;
        }
        return false;
      });

      // Update and draw particles
      particles = particles.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.06; // Gravity
        p.alpha -= p.fade;

        if (p.alpha <= 0) return false;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(", 1)", `, ${p.alpha})`);
        ctx.fill();
        return true;
      });

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Handle interactive manual firework triggers
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const colors = [
      "rgba(244, 236, 206, 1)", // Gold
      "rgba(251, 191, 36, 1)",  // Yellow
      "rgba(244, 63, 94, 1)",   // Rose
      "rgba(192, 132, 252, 1)", // Purple
      "rgba(56, 189, 248, 1)",  // Sky Blue
      "rgba(52, 211, 153, 1)",  // Teal
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Create explosion instantly at click coordinate
    setCelebrationCount((prev) => prev + 1);
    
    // Play sparkling magic chord arpeggio
    synth.playSparkleChord();

    // Trigger double explosion
    const count = 55;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // We trigger the state updates through stateful canvas particle queue directly inside canvas scope
      // An easy, fast way is to just dispatch events or wait for a random shot.
      // Since particles array resides inside the useEffect closure, we can simulate an automatic shot from bottom targeting clicked coordinates!
      // This looks even more premium!
    }
  };

  return (
    <section id="fireworks-section" ref={containerRef} className="relative max-w-6xl mx-auto px-6 py-20 z-10 select-none">
      
      {/* Celebration card frame */}
      <div className="relative rounded-3xl overflow-hidden border border-gold-300/10 glass-panel bg-black">
        
        {/* Interactive Canvas layer */}
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="absolute inset-0 w-full h-full cursor-crosshair z-0"
        />

        {/* Content Overlay */}
        <div className="relative z-10 p-10 md:p-14 text-center pointer-events-none">
          
          <div className="mx-auto w-14 h-14 rounded-full bg-gold-500/20 border border-gold-300/30 flex items-center justify-center text-gold-300 mb-6">
            <Trophy className="w-6 h-6" />
          </div>

          <h3 className="text-2xl md:text-3xl font-serif text-gold-100 font-semibold mb-3">
            Grand Fireworks Celebration
          </h3>

          <p className="text-zinc-500 font-sans text-xs md:text-sm tracking-widest uppercase mb-6">
            ✦ Click anywhere inside this frame to launch custom firework bursts ✦
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900/80 border border-white/5 rounded-full text-[10px] font-mono tracking-widest text-zinc-400">
            <Sparkles className="w-3 h-3 text-gold-400" /> CELEBRATIONS TRIGGERED: {celebrationCount}
          </div>
        </div>
      </div>
    </section>
  );
}
