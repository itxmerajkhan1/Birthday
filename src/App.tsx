import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Music, Volume2, VolumeX, Heart, Mail } from "lucide-react";

import Preloader from "./components/Preloader";
import GiftOpening from "./components/GiftOpening";
import HeroSection from "./components/HeroSection";
import Countdown from "./components/Countdown";
import FriendshipNotes from "./components/FriendshipNotes";
import MemoryWall from "./components/MemoryWall";
import WhyAmazing from "./components/WhyAmazing";
import SurpriseModal from "./components/SurpriseModal";
import PhotoGallery from "./components/PhotoGallery";
import FireworksCelebration from "./components/FireworksCelebration";
import GrandFinale from "./components/GrandFinale";

import { synth } from "./components/AudioSynthesizer";

type AppStage = "PRELOADER" | "GIFT_BOX" | "MAIN_CONTENT";

export default function App() {
  const [stage, setStage] = useState<AppStage>("PRELOADER");
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isBirthdayUnlocked, setIsBirthdayUnlocked] = useState(false);

  // Monitor the Synthesizer playing state to sync with the floating music controller
  useEffect(() => {
    const syncInterval = setInterval(() => {
      setIsMusicPlaying(synth.getIsPlaying());
    }, 500);
    return () => clearInterval(syncInterval);
  }, []);

  const handleToggleMusic = () => {
    if (isMusicPlaying) {
      synth.stopMelody();
      setIsMusicPlaying(false);
    } else {
      synth.playBirthdayMelody();
      setIsMusicPlaying(true);
    }
  };

  const handleUnlockAll = () => {
    setIsBirthdayUnlocked(true);
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 font-sans antialiased relative selection:bg-gold-500/20 selection:text-gold-200">
      
      {/* Visual grain overlay for premium film cinematic look */}
      <div className="fixed inset-0 pointer-events-none noise-overlay z-50 opacity-[0.15]" />

      <AnimatePresence mode="wait">
        {/* Stage 1: Preloader */}
        {stage === "PRELOADER" && (
          <motion.div
            key="preloader-wrapper"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Preloader onComplete={() => setStage("GIFT_BOX")} />
          </motion.div>
        )}

        {/* Stage 2: Gift Box Gatekeeper */}
        {stage === "GIFT_BOX" && (
          <motion.div
            key="giftbox-wrapper"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <GiftOpening onOpenComplete={() => {
              setStage("MAIN_CONTENT");
              setIsMusicPlaying(true);
            }} />
          </motion.div>
        )}

        {/* Stage 3: Fully Fleshed Out Birthday Page */}
        {stage === "MAIN_CONTENT" && (
          <motion.div
            key="main-content-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full relative"
          >
            {/* Ambient Background Glow Spotlights */}
            <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-amber-500/[0.02] rounded-full blur-[160px] pointer-events-none" />
            <div className="fixed bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-gold-400/[0.02] rounded-full blur-[160px] pointer-events-none" />

            {/* Premium Header / Navigation Mimic line */}
            <header className="w-full border-b border-white/5 py-6 px-8 flex justify-between items-center bg-black/40 backdrop-blur-md sticky top-0 z-30 select-none">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gold-600 to-amber-500 flex items-center justify-center shadow-md">
                  <span className="text-black font-serif text-sm font-bold">M</span>
                </div>
                <span className="font-serif text-gold-100 font-medium tracking-wide text-sm hidden sm:inline">
                  M U N E E Z A
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[9px] tracking-widest text-zinc-500">
                  9 JULY 2026 CELEBRATION
                </span>
              </div>
            </header>

            {/* Core Sections Stack */}
            <main className="relative pb-24 overflow-hidden">
              
              {/* Section 1: Cinematic Greetings */}
              <HeroSection />

              {/* Section 2: Precise Countdown Ticker */}
              <Countdown onUnlockAll={handleUnlockAll} isUnlocked={isBirthdayUnlocked} />

              {/* Section 3: Friendship Diary Pages */}
              <FriendshipNotes />

              {/* Section 4: Character Spotlight Bento Gird */}
              <WhyAmazing />

              {/* Section 5: The Post-it Memory Wall */}
              <MemoryWall />

              {/* Section 6: Special Surprise trigger button */}
              <SurpriseModal />

              {/* Section 7: Curated Wallpaper Gallery */}
              <PhotoGallery />

              {/* Section 8: Interactive HTML5 Canvas Firework Shooter */}
              <FireworksCelebration />

              {/* Section 9: Closing Emotional Final Message */}
              <section id="final-message" className="relative max-w-4xl mx-auto px-6 py-16 text-center z-10 select-none">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold-500/[0.02] to-transparent pointer-events-none" />
                
                <div className="relative rounded-3xl border border-gold-300/10 p-10 md:p-16 glass-panel relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  {/* Glowing decorative rings */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

                  <div className="mx-auto w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-6">
                    <Heart className="w-5 h-5 fill-current" />
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl md:text-4xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-slate-100 to-rose-200 font-semibold mb-6 tracking-tight leading-snug">
                    💖 Muneeza, Have The Most Wonderful Birthday Ever! 💖
                  </h2>

                  {/* Body Subtext */}
                  <p className="text-zinc-300 font-sans font-light text-base md:text-lg leading-relaxed tracking-wide max-w-2xl mx-auto italic">
                    "May this new year of your life bring endless happiness, success, achievements, good health, unforgettable memories, and countless reasons to smile. Stay happy and keep shining."
                  </p>

                  {/* Micro label */}
                  <div className="mt-10 flex items-center justify-center gap-2 opacity-50">
                    <Mail className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="font-mono text-[9px] tracking-widest text-zinc-400 uppercase">
                      FOREVER AN EXTRAORDINARY COMPANION
                    </span>
                  </div>
                </div>
              </section>

              {/* Section 10: Grand Finale */}
              <GrandFinale />

            </main>

            {/* Floating Music Control Widget in bottom right */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 2, type: "spring" }}
              className="fixed bottom-6 right-6 z-40 select-none"
            >
              <button
                onClick={handleToggleMusic}
                className="w-12 h-12 rounded-full bg-zinc-950/90 border border-gold-300/20 flex items-center justify-center text-gold-300 hover:text-white hover:border-gold-300/40 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg cursor-pointer"
                title={isMusicPlaying ? "Mute Music Box" : "Unmute Music Box"}
              >
                {isMusicPlaying ? (
                  <Volume2 className="w-5 h-5 animate-bounce" style={{ animationDuration: '2s' }} />
                ) : (
                  <VolumeX className="w-5 h-5 opacity-60" />
                )}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
