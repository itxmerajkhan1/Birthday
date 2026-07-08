import React from "react";
import { motion } from "motion/react";
import { Heart, Pin } from "lucide-react";
import { STICKY_NOTES } from "../types";
import { synth } from "./AudioSynthesizer";

export default function MemoryWall() {
  return (
    <section id="memory-wall" className="relative max-w-6xl mx-auto px-6 py-24 z-10">
      {/* Background Soft Glows */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-rose-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-16 select-none">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-950/80 border border-gold-300/10 mb-4">
          <Heart className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
          <span className="text-gold-200/90 font-mono text-[10px] tracking-widest uppercase">
            Blessings & Motivation Wall
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-serif font-medium text-slate-100">
          The Memory Wall
        </h2>
        <p className="text-zinc-500 font-sans text-xs tracking-widest mt-2 uppercase">
          STUNTING POST-IT NOTES OF POSITIVE THOUGHTS & SUCCESS WISHES
        </p>
      </div>

      {/* Grid of Sticky Notes with 3D perspective hover feel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {STICKY_NOTES.map((note, index) => {
          return (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                rotate: note.rotation,
              }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ 
                type: "spring", 
                stiffness: 70, 
                damping: 14,
                delay: index * 0.1 
              }}
              whileHover={{ 
                scale: 1.06, 
                rotate: 0,
                zIndex: 20,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
              }}
              onHoverStart={() => {
                // Play subtle tick sound
                synth.playChime(329.63 + (index * 40), 0.5, 0.04);
              }}
              className={`relative bg-gradient-to-br ${note.color} p-6 rounded-lg min-h-[190px] flex flex-col justify-between shadow-[0_10px_20px_rgba(0,0,0,0.25)] border-t border-white/20 select-none cursor-default`}
            >
              {/* Sticky Note Pin / Tape Decorative element */}
              <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
                <Pin className="w-4 h-4 text-rose-500/80 drop-shadow-sm rotate-45 fill-rose-500/50" />
                {/* Simulated piece of transparent tape */}
                <div className="w-10 h-3 bg-white/30 backdrop-blur-[1px] rounded-[1px] rotate-2 shadow-sm border border-white/10 mt-[-2px]" />
              </div>

              {/* Message text area */}
              <div className="pt-4 flex-grow">
                <p className="font-serif italic text-base leading-relaxed leading-6 tracking-wide">
                  "{note.message}"
                </p>
              </div>

              {/* Decorative signature mark */}
              <div className="flex justify-between items-center text-[10px] uppercase font-mono tracking-wider opacity-60 mt-4">
                <span>✦ Wish {note.id}</span>
                <span>Muneeza's Day</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
