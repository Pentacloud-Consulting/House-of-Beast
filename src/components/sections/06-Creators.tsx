"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CREATORS_DATA, UGC_POSTS } from "@/data/creators";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Marquee } from "@/components/ui/Marquee";
import { BookingModal } from "@/components/ui/BookingModal";
import { EVENTS_DATA } from "@/data/events";

export function SectionCreators() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [selectedUgc, setSelectedUgc] = useState<(typeof UGC_POSTS)[0] | null>(null);

  return (
    <section id="creators" className="relative w-full bg-black text-white py-24 px-6 sm:px-12 border-t border-neutral-900 overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="font-mono text-xs text-neutral-400 tracking-widest uppercase mb-2">
            [ 06 // RESIDENTS & COLLABORATORS ]
          </div>
          <h2 className="font-heading text-4xl sm:text-7xl font-black uppercase tracking-tight text-white">
            THE CREW
          </h2>
        </div>
        <p className="font-mono text-xs text-neutral-400 uppercase max-w-xs tracking-wider">
          THE ARTISTS, DJS, AND PRODUCERS RESHAPING OUR CITY FREQUENCIES.
        </p>
      </div>

      {/* Asymmetric Masonry Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 mb-24">
        {CREATORS_DATA.map((creator, idx) => (
          <div
            key={creator.id}
            className={`group relative rounded-3xl overflow-hidden border border-neutral-900 bg-neutral-950 aspect-[3/4] flex flex-col justify-end p-8 cursor-pointer ${
              idx % 2 === 1 ? "md:translate-y-8" : "md:translate-y-0"
            }`}
          >
            {/* Background B&W Photo -> Color + Mint tint on hover */}
            <div className="absolute inset-0 z-0">
              <img
                src={creator.image}
                alt={creator.name}
                className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent group-hover:from-black/90 transition-colors duration-500" />
              <div className="absolute inset-0 bg-[#76EDBB]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>

            {/* Top Location & Handle Tag */}
            <div className="relative z-10 mb-auto flex items-center justify-between">
              <span className="font-mono text-[10px] bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[#76EDBB] border border-white/10 uppercase">
                {creator.location}
              </span>
              <span className="font-mono text-[10px] text-neutral-400 uppercase">{creator.handle}</span>
            </div>

            {/* Bottom Content revealed by sliding text */}
            <div className="relative z-10 space-y-2 transform group-hover:-translate-y-2 transition-transform duration-300">
              <p className="font-mono text-[10px] text-[#76EDBB] uppercase tracking-widest">
                {creator.collabTitle}
              </p>
              <h3 className="font-heading text-2xl font-bold uppercase tracking-tight text-white group-hover:text-[#76EDBB] transition-colors">
                {creator.name}
              </h3>
              <p className="font-mono text-xs text-neutral-400 uppercase">{creator.role}</p>
            </div>
          </div>
        ))}
      </div>

      {/* UGC Wall Strip: Two-row opposite direction marquee */}
      <div className="-mx-6 sm:-mx-12 w-[calc(100%+3rem)] sm:w-[calc(100%+6rem)] my-20 py-10 border-y border-neutral-900/80 bg-neutral-950/40 backdrop-blur-sm space-y-6 overflow-hidden">
        <div className="text-center font-mono text-xs text-[#76EDBB] uppercase tracking-widest mb-3 flex items-center justify-center gap-3">
          <span className="w-8 h-px bg-[#76EDBB]/40" />
          <span>COMMUNITY UGC WALL // #FINDTHEBEAT</span>
          <span className="w-8 h-px bg-[#76EDBB]/40" />
        </div>

        {/* Row 1: Forward */}
        <Marquee speed={1.2} fadeEdges className="py-2">
          {UGC_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedUgc(post)}
              className="inline-flex items-center gap-4 bg-neutral-950/90 border border-neutral-800/80 hover:border-[#76EDBB] px-5 py-3 rounded-2xl group transition-all duration-300 hover:scale-[1.03] shadow-lg shadow-black/60 flex-shrink-0 cursor-pointer active:scale-95"
            >
              <img
                src={post.image}
                alt={post.tag}
                className="w-12 h-12 rounded-xl object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
              />
              <div className="text-left font-mono text-xs pr-2">
                <div className="text-white font-bold group-hover:text-[#76EDBB] transition-colors">{post.tag}</div>
                <div className="text-neutral-400 text-[11px]">{post.author}</div>
              </div>
            </div>
          ))}
        </Marquee>

        {/* Row 2: Reverse */}
        <Marquee speed={1.2} reverse fadeEdges className="py-2">
          {UGC_POSTS.slice().reverse().map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedUgc(post)}
              className="inline-flex items-center gap-4 bg-neutral-950/90 border border-neutral-800/80 hover:border-[#76EDBB] px-5 py-3 rounded-2xl group transition-all duration-300 hover:scale-[1.03] shadow-lg shadow-black/60 flex-shrink-0 cursor-pointer active:scale-95"
            >
              <img
                src={post.image}
                alt={post.tag}
                className="w-12 h-12 rounded-xl object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
              />
              <div className="text-left font-mono text-xs pr-2">
                <div className="text-[#76EDBB] font-bold group-hover:text-white transition-colors">{post.tag}</div>
                <div className="text-neutral-400 text-[11px]">{post.author}</div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>

      {/* CTA: JOIN THE MOVEMENT */}
      <div className="max-w-4xl mx-auto text-center mt-20">
        <h3 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white mb-6">
          ARE YOU A CREATOR OR SELECTOR?
        </h3>
        <MagneticButton
          onClick={() => setIsJoinModalOpen(true)}
          className="bg-[#76EDBB] text-black hover:bg-white px-8 py-4 rounded-full font-heading font-black text-sm tracking-widest shadow-[0_0_25px_rgba(118,237,187,0.4)] transition-all duration-300"
        >
          JOIN THE MOVEMENT ↗
        </MagneticButton>
      </div>

      {/* UGC Post Popup / Lightbox Modal */}
      <AnimatePresence>
        {selectedUgc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl"
            onClick={() => setSelectedUgc(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl shadow-black/80 flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedUgc(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 border border-white/10 hover:border-[#76EDBB] text-white hover:text-[#76EDBB] flex items-center justify-center text-lg transition-colors cursor-pointer"
                aria-label="Close"
              >
                ✕
              </button>

              {/* Left / Top: High-Res Image with Mint Ambient Glow */}
              <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto min-h-[260px] md:min-h-[380px] bg-black">
                <img
                  src={selectedUgc.image}
                  alt={selectedUgc.tag}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent md:hidden" />
                <div className="absolute top-4 left-4 z-10 font-mono text-[10px] bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[#76EDBB] border border-[#76EDBB]/30 uppercase">
                  LIVE SNAPSHOT
                </div>
              </div>

              {/* Right / Bottom: Details & Audio Snippet */}
              <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full border border-[#76EDBB]/50 overflow-hidden bg-neutral-900">
                      <img src={selectedUgc.image} alt={selectedUgc.author} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-heading font-bold text-white text-sm">{selectedUgc.author}</div>
                      <div className="font-mono text-[10px] text-neutral-400 uppercase">BERLIN // RESIDENT SELECTOR</div>
                    </div>
                  </div>

                  <div className="font-heading text-2xl font-black text-[#76EDBB] tracking-tight uppercase mb-2">
                    {selectedUgc.tag}
                  </div>

                  <p className="font-mono text-xs text-neutral-300 leading-relaxed uppercase">
                    CAPTURED LIVE AT HOUSE OF BEATS CULTURAL SANCTUARY. RAW ANALOG SOUND FREQUENCY & COMMUNITY ENERGY.
                  </p>

                  {/* Audio Equalizer Simulation */}
                  <div className="mt-6 p-4 rounded-2xl bg-neutral-900/80 border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-end gap-1 h-5">
                        <span className="w-1 bg-[#76EDBB] h-3 animate-pulse" />
                        <span className="w-1 bg-[#76EDBB] h-5 animate-pulse delay-75" />
                        <span className="w-1 bg-[#76EDBB] h-2 animate-pulse delay-150" />
                        <span className="w-1 bg-[#76EDBB] h-4 animate-pulse delay-100" />
                      </div>
                      <span className="font-mono text-[10px] text-[#76EDBB] uppercase tracking-wider font-bold">
                        AUDIO SNIPPET // 128 BPM
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-neutral-500 uppercase">HQ STEREO</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setSelectedUgc(null)}
                    className="flex-1 bg-[#76EDBB] hover:bg-white text-black font-heading font-black text-xs uppercase tracking-wider py-3.5 px-5 rounded-xl shadow-[0_0_20px_rgba(118,237,187,0.35)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] transition-all duration-300 text-center cursor-pointer active:scale-95"
                  >
                    CLOSE PREVIEW
                  </button>
                  <button
                    onClick={() => {
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(window.location.href);
                      }
                      alert("Link copied to clipboard!");
                    }}
                    className="bg-neutral-900 hover:bg-neutral-800 text-white hover:text-[#76EDBB] border border-neutral-700 hover:border-[#76EDBB]/50 py-3.5 px-5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer active:scale-95"
                  >
                    SHARE ↗
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Re-use Booking Modal as Creator Application Modal */}
      <BookingModal
        event={
          isJoinModalOpen
            ? {
                id: "creator-apply",
                day: "NOW",
                month: "OPEN",
                year: "2026",
                title: "CREATOR & DJ RESIDENCY APPLICATION",
                artist: "HOUSE OF BEATS CULTURE BOARD",
                tag: "OPEN ACCESS",
                location: "BERLIN / AMSTERDAM LABS",
                time: "APPLICATION PASS",
                featuredImage: "",
                description: "Submit your mix or portfolio for our upcoming residency drops."
              }
            : null
        }
        onClose={() => setIsJoinModalOpen(false)}
      />
    </section>
  );
}
