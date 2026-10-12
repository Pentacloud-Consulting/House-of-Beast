"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STORIES_DATA, Story } from "@/data/stories";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SectionStories() {
  const containerRef = useRef<HTMLElement | null>(null);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll(".story-card");
      cards?.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section
      id="stories"
      ref={containerRef}
      className="relative w-full bg-black text-white py-24 px-6 sm:px-12 border-t border-neutral-900"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="font-mono text-xs text-neutral-400 tracking-widest uppercase mb-2">
            [ 07 // EDITORIAL & DISPATCHES ]
          </div>
          <h2 className="font-heading text-4xl sm:text-7xl font-black uppercase tracking-tight text-white">
            CHRONICLES
          </h2>
        </div>
        <p className="font-mono text-xs text-neutral-400 uppercase max-w-xs tracking-wider">
          PEOPLE, CULTURE, AND CITY ESSAYS FROM OUR ANTIMONOTONY JOURNAL.
        </p>
      </div>

      {/* Magazine-Style Cover Cards */}
      <div className="max-w-7xl mx-auto space-y-16 lg:space-y-24">
        {STORIES_DATA.map((story, idx) => (
          <div
            key={story.id}
            onClick={() => setSelectedStory(story)}
            className={`story-card group relative bg-neutral-950 border border-neutral-900 hover:border-[#76EDBB]/60 rounded-3xl overflow-hidden p-8 sm:p-12 flex flex-col ${
              idx % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
            } items-center gap-12 cursor-pointer transition-all duration-500 shadow-xl shadow-black/80`}
          >
            {/* Story Image with Zoom Hover */}
            <div className="relative w-full lg:w-1/2 aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800">
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 font-mono text-[10px] bg-black/85 backdrop-blur-md px-3 py-1 rounded-full text-[#76EDBB] border border-[#76EDBB]/30 uppercase font-bold">
                {story.category}
              </div>
            </div>

            {/* Content Column */}
            <div className="w-full lg:w-1/2 space-y-4 text-left">
              <div className="flex items-center gap-3 font-mono text-xs text-neutral-400 uppercase">
                <span>{story.date}</span>
                <span>•</span>
                <span>{story.readTime}</span>
              </div>

              <h3 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white group-hover:text-[#76EDBB] transition-colors leading-tight">
                {story.title}
              </h3>

              <p className="font-heading text-sm text-[#76EDBB] font-semibold uppercase tracking-wider">
                {story.subtitle}
              </p>

              <p className="font-sans text-sm text-neutral-300 leading-relaxed max-w-md">
                {story.excerpt}
              </p>

              <div className="pt-4 flex items-center gap-2 font-mono text-xs text-[#76EDBB] uppercase font-bold tracking-widest group-hover:translate-x-1 transition-transform">
                <span>READ DISPATCH</span>
                <span className="text-base">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Story Reader Popup Modal */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl"
            onClick={() => setSelectedStory(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-neutral-950 border border-neutral-800 rounded-3xl shadow-2xl shadow-black/90 p-6 sm:p-10 text-white space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedStory(null)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-black/70 border border-white/10 hover:border-[#76EDBB] text-white hover:text-[#76EDBB] flex items-center justify-center text-lg transition-colors cursor-pointer z-10"
                aria-label="Close"
              >
                ✕
              </button>

              {/* Cover Image */}
              <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden border border-neutral-800">
                <img
                  src={selectedStory.image}
                  alt={selectedStory.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 font-mono text-[10px] bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[#76EDBB] border border-[#76EDBB]/30 uppercase font-bold">
                  {selectedStory.category} // DISPATCH
                </div>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-3 font-mono text-xs text-neutral-400 uppercase pt-2">
                <span>{selectedStory.date}</span>
                <span>•</span>
                <span>{selectedStory.readTime}</span>
                <span>•</span>
                <span className="text-[#76EDBB]">HOUSE OF BEATS JOURNAL</span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white mb-2">
                  {selectedStory.title}
                </h2>
                <p className="font-heading text-sm text-[#76EDBB] uppercase font-bold tracking-widest">
                  {selectedStory.subtitle}
                </p>
              </div>

              {/* Full Article Body */}
              <div className="space-y-4 font-sans text-sm sm:text-base text-neutral-300 leading-relaxed border-t border-neutral-900 pt-6">
                <p className="font-semibold text-white">
                  {selectedStory.excerpt}
                </p>
                <p>
                  At House of Beats, sound is not background wallpaper—it is the foundational material. Across our studios, listening lounges, and communal rooms, every acoustic reflection has been calculated to cultivate deep presence and creative rhythm.
                </p>
                <p>
                  From rare vinyl collectors unearthing forgotten master cuts to resident audio architects hosting nocturnal frequencies, this dispatch documents the creators shaping our sonic landscape.
                </p>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center gap-4 pt-6 border-t border-neutral-900">
                <button
                  onClick={() => setSelectedStory(null)}
                  className="bg-[#76EDBB] text-black hover:bg-white py-3.5 px-6 rounded-xl font-heading font-black text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  CLOSE DISPATCH
                </button>
                <button
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(window.location.href);
                    }
                    alert("Dispatch link copied to clipboard!");
                  }}
                  className="bg-neutral-900 hover:bg-neutral-800 text-white hover:text-[#76EDBB] border border-neutral-700 py-3.5 px-6 rounded-xl font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  SHARE STORY ↗
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
