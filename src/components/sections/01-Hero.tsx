"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Logo } from "@/components/ui/Logo";
import { SplitText } from "@/components/ui/SplitText";
import { Marquee } from "@/components/ui/Marquee";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SectionHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mediaContainerRef = useRef<HTMLDivElement | null>(null);
  const textContentRef = useRef<HTMLDivElement | null>(null);
  const mouse = useMousePosition();
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !sectionRef.current || !mediaContainerRef.current) return;

    const ctx = gsap.context(() => {
      // Pin hero section and ensure animation completes before next section starts
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%", // Complete pinning scroll distance
          scrub: 0.8,
          pin: true,
          pinSpacing: true // Ensures next section waits until hero animation finishes
        }
      });

      // 1. Scale down media background into card
      timeline.to(mediaContainerRef.current, {
        scale: 0.82,
        borderRadius: "2rem",
        filter: "brightness(0.4)",
        ease: "power2.inOut",
        duration: 1
      });

      // 2. Animate hero text upwards and fade out
      if (textContentRef.current) {
        timeline.to(
          textContentRef.current,
          {
            y: -140,
            opacity: 0,
            ease: "power2.in",
            duration: 0.9
          },
          0
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  // Subtle mouse parallax effect on text
  const parallaxX = mouse.normalizedX * 12;
  const parallaxY = mouse.normalizedY * 12;

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-black text-white flex flex-col justify-between select-none"
    >
      {/* Background Media Container with poster & fallback video */}
      <div
        ref={mediaContainerRef}
        className="absolute inset-0 w-full h-full overflow-hidden bg-gradient-to-b from-neutral-900 via-black to-neutral-950 transform-gpu z-0"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1920&auto=format&fit=crop"
          className="w-full h-full object-cover grayscale contrast-125 opacity-40 mix-blend-luminosity"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-party-lights-in-a-nightclub-43308-large.mp4" type="video/mp4" />
        </video>
        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 pointer-events-none" />
      </div>

      {/* Hero Header Space (Laptop responsive padding & text) */}
      <div className="relative z-10 pt-20 sm:pt-24 lg:pt-20 px-6 sm:px-12 flex items-center justify-between">
        <div className="font-mono text-[10px] sm:text-xs text-[--mint] tracking-widest uppercase">
          EST. 2026 // BERLIN & AMSTERDAM
        </div>
        <div className="font-mono text-[10px] sm:text-xs text-neutral-400 tracking-widest uppercase hidden sm:block">
          THE BEAT STARTS HERE
        </div>
      </div>

      {/* Center Content: Floating Logo & Compact Laptop-Responsive Headline */}
      <div
        ref={textContentRef}
        className="relative z-10 my-auto px-6 sm:px-12 max-w-5xl lg:max-w-6xl mx-auto text-center flex flex-col items-center justify-center transform-gpu"
        style={{
          transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0)`
        }}
      >
        {/* Pulsing B Logo at ~120 BPM */}
        <div className="mb-4 lg:mb-6 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]">
          <Logo size={54} className="text-[--mint] drop-shadow-[0_0_20px_rgba(118,237,187,0.4)] sm:w-16 sm:h-20 lg:w-14 lg:h-16" />
        </div>

        {/* Scaled Didone Display Headline - Responsive for laptops */}
        <h1 className="font-display text-[9vw] sm:text-[7.5vw] lg:text-[5.5vw] xl:text-[5vw] leading-[0.9] font-bold uppercase tracking-tight text-[--mint] drop-shadow-2xl">
          <SplitText type="chars" stagger={0.03}>
            THERE IS A PLACE THAT INSPIRES
          </SplitText>
        </h1>

        <p className="mt-4 lg:mt-6 font-heading text-xs sm:text-base lg:text-lg text-neutral-300 font-semibold tracking-widest uppercase max-w-xl lg:max-w-2xl mx-auto">
          WE ARE NOT A CLASSIC HOTEL. WE ARE A MUSIC-LED LIFESTYLE BRAND.
        </p>
      </div>

      {/* Bottom Hashtag Marquee */}
      <div className="relative z-10 pb-6 lg:pb-8 border-t border-white/10 bg-black/40 backdrop-blur-md pt-3 lg:pt-4">
        <Marquee speed={1.2} className="font-mono text-[10px] sm:text-xs tracking-widest text-[--mint] uppercase">
          <span className="mx-6">#FINDTHEBEAT</span>
          <span className="text-white">✦</span>
          <span className="mx-6">#THEBEATSTARTSHERE</span>
          <span className="text-white">✦</span>
          <span className="mx-6">HOUSE OF BEATS CULTURAL SANCTUARY</span>
          <span className="text-white">✦</span>
          <span className="mx-6">24/7 AUDIO IDENTITY</span>
          <span className="text-white">✦</span>
        </Marquee>
      </div>
    </section>
  );
}
