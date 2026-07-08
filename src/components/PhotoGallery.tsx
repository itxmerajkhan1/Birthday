import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, Maximize2, X, Sparkles, Download } from "lucide-react";
import { synth } from "./AudioSynthesizer";

// Direct references to the premium generated wallpapers
const GALLERY_ITEMS = [
  {
    id: 1,
    title: "Dreamy Skies",
    subtitle: "A smooth pastel fluid gradient, celebrating serenity.",
    src: "/src/assets/images/muneeza_sky_dream_1783540038095.jpg",
    aspect: "aspect-video"
  },
  {
    id: 2,
    title: "Sparkling Starfield",
    subtitle: "A magical golden bokeh constellation of hopes and dreams.",
    src: "/src/assets/images/muneeza_starry_spark_1783540051875.jpg",
    aspect: "aspect-video"
  },
  {
    id: 3,
    title: "Floral Grace",
    subtitle: "Elegant minimalist watercolor petals, representing natural poise.",
    src: "/src/assets/images/muneeza_floral_grace_1783540071401.jpg",
    aspect: "aspect-video"
  },
  {
    id: 4,
    title: "Hopeful Aurora",
    subtitle: "A majestic cosmic dawn of rose-gold and lavender.",
    src: "/src/assets/images/muneeza_aurora_hope_1783540089586.jpg",
    aspect: "aspect-video"
  }
];

export default function PhotoGallery() {
  const [activeImage, setActiveImage] = useState<typeof GALLERY_ITEMS[0] | null>(null);

  const handleOpenLightbox = (item: typeof GALLERY_ITEMS[0]) => {
    setActiveImage(item);
    // Play sparkling magic chime sound
    synth.playSparkleChord();
  };

  const handleCloseLightbox = () => {
    setActiveImage(null);
  };

  return (
    <section id="photo-gallery" className="relative max-w-6xl mx-auto px-6 py-24 z-10 select-none">
      {/* Background Soft Ambient Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-gold-600/5 to-transparent rounded-full blur-[130px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-950/80 border border-gold-300/10 mb-4">
          <Camera className="w-3.5 h-3.5 text-gold-300" />
          <span className="text-gold-200/90 font-mono text-[10px] tracking-widest uppercase">
            Curated Fine-Art Exhibition
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-serif font-medium text-slate-100">
          Birthday Wallpaper Gallery
        </h2>
        <p className="text-zinc-500 font-sans text-xs tracking-widest mt-2 uppercase">
          A FOUR-PART COLLECTION OF LUXURY DIGITAL ARTWORK PREPARED FOR MUNEEZA
        </p>
      </div>

      {/* Grid of Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {GALLERY_ITEMS.map((item, index) => {
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => handleOpenLightbox(item)}
              className="group cursor-pointer relative rounded-2xl overflow-hidden glass-panel border border-white/5 bg-zinc-950/40"
            >
              {/* Image Aspect ratio container with overlay */}
              <div className={`w-full overflow-hidden relative ${item.aspect}`}>
                
                {/* Image element with safety tags */}
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-1000 ease-[0.16, 1, 0.3, 1]"
                  referrerPolicy="no-referrer"
                />

                {/* Frost Glass Cover Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform duration-500 shadow-lg">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>

                {/* High Contrast Gradient Ambient Top border accent */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
              </div>

              {/* Tag Caption details */}
              <div className="p-6 md:p-8 relative">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg md:text-xl font-serif font-medium text-slate-100 group-hover:text-gold-200 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <span className="text-[10px] font-mono tracking-widest text-gold-300 bg-gold-600/10 border border-gold-500/20 px-2 py-0.5 rounded-full">
                    WALLPAPER_0{item.id}
                  </span>
                </div>
                <p className="text-zinc-500 text-xs md:text-sm font-light leading-relaxed tracking-wide group-hover:text-zinc-400 transition-colors duration-300">
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Cinematic Lightbox Preview Popup */}
      <AnimatePresence>
        {activeImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 select-none">
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.95 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseLightbox}
              className="absolute inset-0 bg-black backdrop-blur-2xl pointer-events-auto"
            />

            {/* Lightbox box contents */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="relative max-w-5xl w-full rounded-2xl overflow-hidden glass-panel border border-white/10 bg-zinc-950/80 shadow-[0_0_80px_rgba(0,0,0,0.8)] z-10 flex flex-col"
            >
              {/* Close Button top-right */}
              <button
                onClick={handleCloseLightbox}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:border-white/20 transition-all duration-200 z-30 cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Full Image frame */}
              <div className="w-full relative aspect-video bg-black flex items-center justify-center">
                <img
                  src={activeImage.src}
                  alt={activeImage.title}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Bottom Caption bar */}
              <div className="p-6 md:p-8 bg-zinc-950 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Sparkles className="w-4 h-4 text-gold-300 animate-pulse" />
                    <h4 className="text-xl font-serif text-slate-100 font-semibold">{activeImage.title}</h4>
                  </div>
                  <p className="text-zinc-400 font-sans font-light text-xs md:text-sm tracking-wide">
                    {activeImage.subtitle}
                  </p>
                </div>

                {/* Download option */}
                <a
                  href={activeImage.src}
                  download={`Muneeza_Birthday_Wallpaper_${activeImage.id}.jpg`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => synth.playChime(659.25, 0.8, 0.1)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-gold-600 to-amber-500 text-black font-semibold text-xs font-mono tracking-widest uppercase hover:shadow-[0_0_15px_rgba(219,189,106,0.3)] transition-all duration-300 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> Save Artwork
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
