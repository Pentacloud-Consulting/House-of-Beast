"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HandDrawnBox } from "@/components/ui/HandDrawnBox";
import { Marquee } from "@/components/ui/Marquee";
import { Equalizer } from "@/components/ui/Equalizer";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SectionManifesto() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinnedRef = useRef<HTMLDivElement | null>(null);
  const line1Ref = useRef<HTMLDivElement | null>(null);
  const line2Ref = useRef<HTMLDivElement | null>(null);
  const line3Ref = useRef<HTMLDivElement | null>(null);
  const line4Ref = useRef<HTMLDivElement | null>(null);

  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !sectionRef.current || !pinnedRef.current) return;

    const ctx = gsap.context(() => {
      const lines = [line1Ref.current, line2Ref.current, line3Ref.current, line4Ref.current];

      // Pure GSAP GPU-accelerated Timeline with zero React re-renders to prevent flickering
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinnedRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 0.6,
          pin: true,
          pinSpacing: true
        }
      });

      // Line 1 highlight (Neon Mint)
      tl.to(lines[0], { opacity: 1, y: 0, color: "#76EDBB", filter: "drop-shadow(0 0 15px rgba(118,237,187,0.4))", duration: 1 })
        // Line 2 reveal (Pure White with HandDrawnBox)
        .to(lines[1], { opacity: 1, y: 0, color: "#FFFFFF", duration: 1 }, "+=0.3")
        .to(lines[0], { opacity: 0.35, filter: "none", color: "#888888" }, "<")
        // Line 3 reveal (Clean White)
        .to(lines[2], { opacity: 1, y: 0, color: "#FFFFFF", duration: 1 }, "+=0.3")
        .to(lines[1], { opacity: 0.35, color: "#888888" }, "<")
        // Line 4 reveal (Glowing Mint Impact)
        .to(lines[3], { opacity: 1, y: 0, color: "#76EDBB", filter: "drop-shadow(0 0 25px rgba(118,237,187,0.6))", duration: 1 }, "+=0.3")
        .to(lines[2], { opacity: 0.35, color: "#888888" }, "<");
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section id="manifesto" ref={sectionRef} className="relative w-full bg-black text-white select-none">
      {/* 
        Pinned Experience Container:
        Includes Header Tag AND Manifesto lines so Header Tag NEVER scrolls up or disappears!
      */}
      <div
        ref={pinnedRef}
        className="relative w-full h-screen flex flex-col justify-between px-6 sm:px-12 pt-24 pb-8 overflow-hidden bg-black"
      >
        {/* Subtle Cyber Grid Background Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#111111_1px,transparent_1px),linear-gradient(to_bottom,#111111_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-40" />

        {/* Section Header Tag - STAYS PINNED cleanly inside pinnedRef! */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between font-mono text-[10px] sm:text-xs text-neutral-400 tracking-widest uppercase">
          <span className="flex items-center gap-2 text-[--mint]">
            <span className="w-2 h-2 rounded-full bg-[--mint] animate-pulse" />
            [ 02 // MANIFESTO & CULTURAL VISION ]
          </span>
          <span className="hidden sm:inline-block font-mono text-neutral-500">HOUSE OF BEATS © 2026</span>
        </div>

        {/* Pinned 3D Kinetic Typographic Sequence - Centered vertically */}
        <div className="relative z-10 max-w-4xl lg:max-w-5xl mx-auto w-full flex flex-col justify-center gap-4 sm:gap-6 lg:gap-7 my-auto">
          {/* Line 1 */}
          <div
            ref={line1Ref}
            className="opacity-25 translate-y-4 font-display text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold uppercase tracking-tight transition-colors duration-300 leading-snug flex items-center gap-4 transform-gpu"
          >
            <span>WE ARE NOT A CLASSIC HOTEL.</span>
            <Equalizer isPlaying={true} className="hidden sm:flex h-3" />
          </div>

          {/* Line 2 with HandDrawnBox */}
          <div
            ref={line2Ref}
            className="opacity-25 translate-y-4 font-display text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold uppercase tracking-tight transition-colors duration-300 leading-snug transform-gpu"
          >
            <HandDrawnBox>WE ARE MORE THAN A HOTEL.</HandDrawnBox>
          </div>

          {/* Line 3 */}
          <div
            ref={line3Ref}
            className="opacity-25 translate-y-4 font-display text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold uppercase tracking-tight transition-colors duration-300 leading-snug transform-gpu"
          >
            WE DO THE UNEXPECTED.
          </div>

          {/* Line 4 with Neon Frame */}
          <div
            ref={line4Ref}
            className="opacity-25 translate-y-4 font-display text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold uppercase tracking-tight transition-colors duration-300 leading-snug transform-gpu"
          >
            <HandDrawnBox color="#FFFFFF">WE ARE A MUSIC-LED LIFESTYLE BRAND.</HandDrawnBox>
          </div>
        </div>

        {/* Bottom Pinned Cue */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-neutral-500 uppercase tracking-widest">
          <span>SCROLL TO UNLOCK FREQUENCIES</span>
          <span className="text-[--mint]">02 / 08</span>
        </div>
      </div>

      {/* Marquee Band (Scrolls naturally after unpinning) */}
      <div className="relative w-full bg-black px-6 sm:px-12 py-8 lg:py-12 border-t border-neutral-900">
        <Marquee speed={2.2} className="font-heading font-black text-2xl sm:text-4xl lg:text-4xl xl:text-5xl tracking-tighter uppercase text-[--mint]">
          <span className="mx-6 drop-shadow-[0_0_12px_rgba(118,237,187,0.5)]">
            WHERE LOCAL DNA BECOMES GLOBAL ENERGY
          </span>
          <span className="text-white mx-6">✦</span>
          <span className="mx-6 drop-shadow-[0_0_12px_rgba(118,237,187,0.5)]">
            WHERE LOCAL DNA BECOMES GLOBAL ENERGY
          </span>
          <span className="text-white mx-6">✦</span>
        </Marquee>
      </div>
    </section>
  );
}
