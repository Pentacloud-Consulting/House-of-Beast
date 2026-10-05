"use client";

import React, { useState } from "react";
import { CREATORS_DATA, UGC_POSTS } from "@/data/creators";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Marquee } from "@/components/ui/Marquee";
import { BookingModal } from "@/components/ui/BookingModal";
import { EVENTS_DATA } from "@/data/events";

export function SectionCreators() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

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
              <div className="absolute inset-0 bg-[--mint]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>

            {/* Top Location & Handle Tag */}
            <div className="relative z-10 mb-auto flex items-center justify-between">
              <span className="font-mono text-[10px] bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[--mint] border border-white/10 uppercase">
                {creator.location}
              </span>
              <span className="font-mono text-[10px] text-neutral-400 uppercase">{creator.handle}</span>
            </div>

            {/* Bottom Content revealed by sliding text */}
            <div className="relative z-10 space-y-2 transform group-hover:-translate-y-2 transition-transform duration-300">
              <p className="font-mono text-[10px] text-[--mint] uppercase tracking-widest">
                {creator.collabTitle}
              </p>
              <h3 className="font-heading text-2xl font-bold uppercase tracking-tight text-white group-hover:text-[--mint] transition-colors">
                {creator.name}
              </h3>
              <p className="font-mono text-xs text-neutral-400 uppercase">{creator.role}</p>
            </div>
          </div>
        ))}
      </div>

      {/* UGC Wall Strip: Two-row opposite direction marquee */}
      <div className="w-full my-16 py-8 border-y border-neutral-900 space-y-6">
        <div className="text-center font-mono text-xs text-[--mint] uppercase tracking-widest mb-4">
          COMMUNITY UGC WALL // #FINDTHEBEAT
        </div>

        {/* Row 1: Forward */}
        <Marquee speed={1.5} className="py-2">
          {UGC_POSTS.map((post) => (
            <div
              key={post.id}
              className="inline-flex items-center gap-4 bg-neutral-950 border border-neutral-900 px-4 py-2 rounded-2xl group hover:border-[--mint]"
            >
              <img src={post.image} alt={post.tag} className="w-12 h-12 rounded-xl object-cover grayscale group-hover:grayscale-0" />
              <div className="text-left font-mono text-xs">
                <div className="text-white font-bold">{post.tag}</div>
                <div className="text-neutral-500">{post.author}</div>
              </div>
            </div>
          ))}
        </Marquee>

        {/* Row 2: Reverse */}
        <Marquee speed={1.5} reverse className="py-2">
          {UGC_POSTS.slice().reverse().map((post) => (
            <div
              key={post.id}
              className="inline-flex items-center gap-4 bg-neutral-950 border border-neutral-900 px-4 py-2 rounded-2xl group hover:border-[--mint]"
            >
              <img src={post.image} alt={post.tag} className="w-12 h-12 rounded-xl object-cover grayscale group-hover:grayscale-0" />
              <div className="text-left font-mono text-xs">
                <div className="text-[--mint] font-bold">{post.tag}</div>
                <div className="text-neutral-500">{post.author}</div>
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
          className="bg-[--mint] text-black hover:bg-white px-8 py-4 rounded-full font-heading font-black text-sm tracking-widest shadow-[0_0_25px_rgba(118,237,187,0.3)]"
        >
          JOIN THE MOVEMENT ↗
        </MagneticButton>
      </div>

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
