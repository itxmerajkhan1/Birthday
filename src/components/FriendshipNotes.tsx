import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Sparkles, ChevronRight } from "lucide-react";
import { FRIENDSHIP_NOTES } from "../types";
import { synth } from "./AudioSynthesizer";

export default function FriendshipNotes() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  const handleNextPage = () => {
    // Play a gentle, high-frequency music box chime when page turns to sound physical & premium
    synth.playChime(659.25, 0.8, 0.12); // E5 note chime

    setDirection(1);
    setCurrentPageIndex((prev) => (prev + 1) % FRIENDSHIP_NOTES.length);
  };

  const handlePrevPage = () => {
    synth.playChime(523.25, 0.8, 0.12); // C5 note chime
    setDirection(-1);
    setCurrentPageIndex((prev) => (prev - 1 + FRIENDSHIP_NOTES.length) % FRIENDSHIP_NOTES.length);
  };

  const currentNote = FRIENDSHIP_NOTES[currentPageIndex];

  // Paper flip variants for motion to simulate turning
  const pageVariants = {
    initial: (dir: number) => ({
      rotateY: dir > 0 ? 80 : -80,
      opacity: 0,
      transformOrigin: "left center",
      scale: 0.95,
    }),
    animate: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (dir: number) => ({
      rotateY: dir > 0 ? -90 : 90,
      opacity: 0,
      scale: 0.95,
      transformOrigin: "left center",
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section id="friendship-notes" className="relative max-w-4xl mx-auto px-6 py-24 z-10 select-none">
      {/* Glow Behind */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-400/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Info */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-950/80 border border-gold-300/10 mb-4">
          <BookOpen className="w-3.5 h-3.5 text-gold-300" />
          <span className="text-gold-200/90 font-mono text-[10px] tracking-widest uppercase">
            Sincere Friendship Diary
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-serif font-medium text-slate-100">
          Special Friendship Notes
        </h2>
        <p className="text-zinc-500 font-sans text-xs tracking-widest mt-2 uppercase">
          A COLLECTION OF 15 HANDWRITTEN WISHES & MEMORABLE TRUTHS
        </p>
      </div>

      {/* Notebook Wrapper with 3D Perspective enabled */}
      <div className="perspective-1500 relative flex justify-center items-center w-full min-h-[460px] md:min-h-[420px]">
        
        {/* Left spiral wire mesh overlay to simulate notebook binder rings */}
        <div className="absolute left-4 md:left-12 top-6 bottom-6 w-8 flex flex-col justify-around z-30 pointer-events-none opacity-90">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="relative flex items-center">
              {/* Silver/Gold Wire Ring */}
              <div className="w-8 h-4 rounded-full border-r-[4px] border-t-[3px] border-b-[2px] border-gold-400/40 bg-transparent shadow-[2px_2px_3px_rgba(0,0,0,0.4)]" />
              <div className="w-3 h-1.5 bg-zinc-900 rounded-full absolute -left-1 shadow-inner border border-white/5" />
            </div>
          ))}
        </div>

        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentNote.id}
            custom={direction}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full max-w-2xl bg-[#fdfaf2] text-[#2c2317] rounded-2xl shadow-2xl pl-12 pr-8 py-10 md:py-12 flex flex-col justify-between border border-[#e8dfc7] relative overflow-hidden notebook-page"
          >
            {/* Lined Paper Lines Grid decoration */}
            <div className="absolute inset-0 pointer-events-none noise-overlay" />

            {/* Red Margin Line on the left */}
            <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-red-300/60" />

            {/* Page Header */}
            <div className="relative mb-6 flex justify-between items-center border-b border-zinc-300/40 pb-4">
              <span className="font-mono text-xs text-zinc-500 tracking-widest uppercase">
                Date: 9 July, 2026
              </span>
              <span className="font-serif text-sm font-medium italic text-amber-800">
                Page {currentNote.id} of {FRIENDSHIP_NOTES.length}
              </span>
            </div>

            {/* Note Content */}
            <div className="relative flex-grow flex flex-col justify-center min-h-[220px] md:min-h-[180px] z-10 pl-4">
              <h3 className="text-xl md:text-2xl font-serif font-semibold text-amber-950 mb-4 tracking-tight">
                {currentNote.title}
              </h3>
              <p className="font-sans text-stone-700 font-light text-sm md:text-base leading-relaxed tracking-wide italic">
                "{currentNote.message}"
              </p>
            </div>

            {/* Note Footer signature */}
            <div className="relative flex justify-end items-center mt-6 border-t border-zinc-300/40 pt-4 text-amber-900">
              <span className="font-serif text-sm italic tracking-wider opacity-80">
                ~ With warm wishes, forever.
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Diary Control Navigation Buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10">
        <div className="flex gap-4">
          <button
            onClick={handlePrevPage}
            className="px-5 py-2.5 rounded-full glass-panel text-zinc-400 hover:text-gold-200 hover:border-gold-300/20 text-xs font-mono tracking-widest transition-all duration-300 uppercase cursor-pointer"
          >
            ← Back
          </button>

          <button
            onClick={handleNextPage}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-gold-600 to-amber-500 text-black hover:shadow-[0_0_20px_rgba(219,189,106,0.3)] text-xs font-mono font-semibold tracking-widest transition-all duration-300 uppercase flex items-center gap-2 cursor-pointer"
          >
            Open Next Message <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Bullet Progress indicator */}
        <div className="flex gap-1.5 mt-4 sm:mt-0">
          {FRIENDSHIP_NOTES.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentPageIndex ? 1 : -1);
                setCurrentPageIndex(i);
                synth.playChime(440 + i * 20, 0.6, 0.08); // Arpeggiating pitches on bullet click
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === currentPageIndex 
                  ? "w-4 bg-gold-400" 
                  : "bg-zinc-800 hover:bg-zinc-600"
              }`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
