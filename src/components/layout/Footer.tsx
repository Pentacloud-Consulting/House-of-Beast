"use client";

import React, { useState } from "react";
import { SITE_CONFIG } from "@/data/site";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const [hoveredLetter, setHoveredLetter] = useState<number | null>(null);

  const wordmark = "HOUSE OF BEATS";

  return (
    <footer className="relative bg-black text-white pt-24 pb-12 px-6 sm:px-12 border-t border-neutral-900 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[50vh]">
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <Logo size={36} className="text-[--mint]" />
              <span className="font-heading font-black text-2xl tracking-tighter text-white">
                HOUSE OF BEATS
              </span>
            </div>
            <p className="text-sm font-mono text-neutral-400 max-w-md leading-relaxed">
              {SITE_CONFIG.tagline}
            </p>
            <div className="pt-2 text-xs font-mono text-[--mint] tracking-widest uppercase">
              #FINDTHEBEAT // #THEBEATSTARTSHERE
            </div>
          </div>

          {/* Col 2: Locations & Opening */}
          <div className="space-y-3 font-mono text-xs text-neutral-400">
            <div className="text-white font-bold tracking-wider uppercase mb-2">SANCTUARIES</div>
            <p>BERLIN — KREUZBERG SONIC HUB</p>
            <p>AMSTERDAM — CANAL VAULT</p>
            <p className="text-[--mint] pt-2">LAUNCHING Q4 2026</p>
          </div>

          {/* Col 3: Social Links */}
          <div className="space-y-3 font-mono text-xs text-neutral-400">
            <div className="text-white font-bold tracking-wider uppercase mb-2">CONNECT</div>
            <div className="flex flex-col gap-2">
              <a href={SITE_CONFIG.socials.instagram} target="_blank" rel="noreferrer" className="hover:text-[--mint] transition-colors">
                INSTAGRAM ↗
              </a>
              <a href={SITE_CONFIG.socials.tiktok} target="_blank" rel="noreferrer" className="hover:text-[--mint] transition-colors">
                TIKTOK ↗
              </a>
              <a href={SITE_CONFIG.socials.spotify} target="_blank" rel="noreferrer" className="hover:text-[--mint] transition-colors">
                SPOTIFY ↗
              </a>
              <a href={SITE_CONFIG.socials.youtube} target="_blank" rel="noreferrer" className="hover:text-[--mint] transition-colors">
                YOUTUBE ↗
              </a>
            </div>
          </div>
        </div>

        {/* Interactive Giant Wordmark */}
        <div className="my-12 text-center select-none overflow-hidden py-4">
          <div className="inline-flex justify-center flex-wrap gap-1 sm:gap-2">
            {wordmark.split("").map((char, idx) => (
              <span
                key={idx}
                onMouseEnter={() => setHoveredLetter(idx)}
                onMouseLeave={() => setHoveredLetter(null)}
                style={{
                  transform: hoveredLetter === idx ? "translateY(-12px) scale(1.15)" : "translateY(0) scale(1)",
                  color: hoveredLetter === idx ? "#76EDBB" : "#FFFFFF"
                }}
                className="font-display text-[10vw] sm:text-[11vw] font-black leading-none transition-all duration-200 cursor-pointer inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-neutral-900 font-mono text-[10px] text-neutral-600 gap-4">
          <div>{SITE_CONFIG.copyright}</div>
          <div className="flex gap-6 uppercase">
            <span>NO CLASSIC HOSPITALITY</span>
            <span>MUSIC-FIRST MOVEMENT</span>
            <span>PRIVACY & TERMS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
