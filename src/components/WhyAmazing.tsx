import React from "react";
import { motion } from "motion/react";
import { 
  Heart, 
  Sun, 
  Sparkles, 
  Palette, 
  Brain, 
  HandHelping, 
  Gem, 
  Smile, 
  Compass, 
  Award,
  CircleDot
} from "lucide-react";
import { AMAZING_CARDS } from "../types";
import { synth } from "./AudioSynthesizer";

// Map strings to Lucide Icon components safely
const iconMap: { [key: string]: React.ComponentType<any> } = {
  Heart,
  Sun,
  Sparkles,
  Palette,
  Brain,
  HandHelping,
  Gem,
  Smile,
  Compass,
  Award,
};

export default function WhyAmazing() {
  return (
    <section id="why-amazing" className="relative max-w-6xl mx-auto px-6 py-24 z-10">
      {/* Soft Decorative Ambient Spotlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-16 select-none">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-950/80 border border-gold-300/10 mb-4">
          <CircleDot className="w-3.5 h-3.5 text-gold-300" />
          <span className="text-gold-200/90 font-mono text-[10px] tracking-widest uppercase">
            A Portrait of Character
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-serif font-medium text-slate-100">
          Why You Are Amazing
        </h2>
        <p className="text-zinc-500 font-sans text-xs tracking-widest mt-2 uppercase">
          TEN PREMIUM INSIGHTS INTO MUNEEZA'S WONDERFUL PERSONALITY
        </p>
      </div>

      {/* Cards Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {AMAZING_CARDS.map((card, index) => {
          const IconComponent = iconMap[card.iconName] || Sparkles;
          
          // Determine bento stretching span class for visual rhythm variance
          const spanClass = 
            index === 0 || index === 9 
              ? "lg:col-span-3 md:col-span-2" 
              : index === 4 || index === 5
              ? "lg:col-span-2"
              : "lg:col-span-2";

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8, 
                delay: (index % 5) * 0.1, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              whileHover={{ 
                y: -6,
                borderColor: "rgba(219, 189, 106, 0.35)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
              }}
              onHoverStart={() => {
                // Synthesize quick high bell tone on hover
                synth.playChime(523.25 + (index * 30), 0.5, 0.04);
              }}
              className={`relative p-8 rounded-2xl glass-panel group overflow-hidden border border-white/5 transition-all duration-300 flex flex-col justify-between ${spanClass} cursor-default select-none`}
            >
              {/* Subtle light leak gradient circle behind card */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gold-500/5 to-transparent rounded-full blur-xl pointer-events-none group-hover:from-gold-400/10 transition-all duration-500" />

              {/* Icon Container with glowing aura */}
              <div>
                <div className="relative w-12 h-12 rounded-xl bg-zinc-900/90 border border-white/5 flex items-center justify-center text-gold-300 mb-6 group-hover:text-gold-200 group-hover:border-gold-300/25 group-hover:shadow-[0_0_15px_rgba(219,189,106,0.15)] transition-all duration-300">
                  <IconComponent className="w-5 h-5" />
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-serif text-slate-200 font-medium tracking-wide mb-3 group-hover:text-gold-100 transition-colors duration-300">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-zinc-500 group-hover:text-zinc-400 text-xs md:text-sm leading-relaxed tracking-wide transition-colors duration-300 font-light">
                  {card.description}
                </p>
              </div>

              {/* Card Bottom Decorator Index */}
              <div className="flex items-center gap-2 mt-8 opacity-35 group-hover:opacity-60 transition-opacity duration-300">
                <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                <span className="font-mono text-[9px] tracking-widest text-zinc-400">
                  QUAL_0{card.id}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
