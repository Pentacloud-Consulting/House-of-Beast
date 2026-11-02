"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { SplitText } from "@/components/ui/SplitText";
import { Marquee } from "@/components/ui/Marquee";
import { useMousePosition } from "@/hooks/useMousePosition";

export function SectionHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mediaContainerRef = useRef<HTMLDivElement | null>(null);
  const textContentRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isAudioActive, setIsAudioActive] = React.useState(false);
  const [hasEntered, setHasEntered] = React.useState(false);
  const mouse = useMousePosition();

  useEffect(() => {
    if (sessionStorage.getItem("hob_entered") === "true") {
      setHasEntered(true);
    }
    const handleEnter = () => {
      // Begin entrance animations smoothly as preloader curtain rises
      setTimeout(() => {
        setHasEntered(true);
      }, 150);
    };
    window.addEventListener("hob_enter_experience", handleEnter);
    return () => window.removeEventListener("hob_enter_experience", handleEnter);
  }, []);

  // Background video plays muted by default
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    setIsAudioActive(false);
    video.play().catch(() => {});
  }, []);

  // Auto mute video when scrolling away from hero section
  useEffect(() => {
    const heroEl = sectionRef.current;
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // If hero section leaves viewport or less than 20% visible, auto mute
        if (!entry.isIntersecting || entry.intersectionRatio < 0.2) {
          const video = videoRef.current;
          if (video && !video.muted) {
            video.muted = true;
            setIsAudioActive(false);
          }
        }
      },
      {
        threshold: [0, 0.2]
      }
    );

    observer.observe(heroEl);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Toggle video audio when clicking anywhere on hero section screen
  const handleHeroClick = (e: React.MouseEvent) => {
    // Don't trigger if clicked on interactive child buttons or links (if any)
    const target = e.target as HTMLElement;
    if (target.closest("button, a, [role='button']")) {
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    if (video.muted) {
      video.muted = false;
      video.play().then(() => {
        setIsAudioActive(true);
      }).catch(() => {});
    } else {
      video.muted = true;
      setIsAudioActive(false);
    }
  };

  // Subtle mouse parallax effect on text
  const parallaxX = mouse.normalizedX * 12;
  const parallaxY = mouse.normalizedY * 12;

  return (
    <section
      id="hero"
      ref={sectionRef}
      onClick={handleHeroClick}
      className="relative w-full h-screen overflow-hidden bg-black text-white flex flex-col justify-between select-none cursor-pointer"
    >
      {/* Background Media Container with local video */}
      <div
        ref={mediaContainerRef}
        className="absolute inset-0 w-full h-full overflow-hidden bg-black z-0"
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          playsInline
          preload="auto"
          className={`w-full h-full object-cover transition-all duration-1000 ease-out ${
            hasEntered ? "scale-100 opacity-100" : "scale-110 opacity-30"
          }`}
        >
          <source src="/videos/HOB%20BG%20VIDEO.mp4" type="video/mp4" />
          <source src="/videos/HOB BG VIDEO.mp4" type="video/mp4" />
        </video>
        {/* Minimal gradient only at top/bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />
      </div>

      {/* Hero Header Space (Laptop responsive padding & text) */}
      <div
        className={`relative z-10 pt-20 sm:pt-24 lg:pt-20 px-6 sm:px-12 flex items-center justify-between pointer-events-auto transition-all duration-700 delay-200 ${
          hasEntered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="font-mono text-[10px] sm:text-xs text-[--mint] tracking-widest uppercase">
          EST. 2026 // BERLIN & AMSTERDAM
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            const video = videoRef.current;
            if (!video) return;
            if (video.muted) {
              video.muted = false;
              video.play().then(() => setIsAudioActive(true)).catch(() => {});
            } else {
              video.muted = true;
              setIsAudioActive(false);
            }
          }}
          data-cursor="button"
          className="flex items-center gap-2 font-mono text-[10px] sm:text-xs uppercase px-3 py-1.5 rounded-full border border-neutral-700/80 bg-black/60 backdrop-blur-md hover:border-[--mint] transition-colors"
        >
          <span className={`w-2 h-2 rounded-full ${isAudioActive ? "bg-[--mint] animate-ping" : "bg-neutral-600"}`} />
          <span className={isAudioActive ? "text-[--mint]" : "text-neutral-400"}>
            {isAudioActive ? "VIDEO SOUND: ON (CLICK TO MUTE)" : "VIDEO SOUND: OFF (CLICK TO UNMUTE)"}
          </span>
        </button>
      </div>

      {/* Center Content: Floating Logo & Compact Laptop-Responsive Headline */}
      <div
        ref={textContentRef}
        className={`relative z-10 my-auto px-6 sm:px-12 max-w-5xl lg:max-w-6xl mx-auto text-center flex flex-col items-center justify-center transform-gpu pointer-events-none transition-all duration-700 ${
          hasEntered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0)`
        }}
      >
        {/* Pure Clean B Monogram with Liquid Chrome Light Sweep & Musical Beat Pulse */}
        <div
          className={`relative mb-6 lg:mb-8 flex items-center justify-center transition-all duration-700 delay-300 pointer-events-auto ${
            hasEntered ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-50 -translate-y-4"
          }`}
        >
          {/* Subtle Ambient Bass Aura behind B */}
          <motion.div
            className="absolute w-28 h-28 rounded-full bg-[#76EDBB]/15 blur-2xl pointer-events-none"
            animate={{
              scale: [1, 1.35, 1],
              opacity: [0.25, 0.6, 0.25]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Pure B Vector with Specular Light Sweep & Subwoofer Pulse */}
          <motion.div
            animate={{
              scale: [1, 1.08, 0.98, 1],
              filter: [
                "drop-shadow(0 0 16px rgba(118,237,187,0.35))",
                "drop-shadow(0 0 32px rgba(118,237,187,0.75))",
                "drop-shadow(0 0 16px rgba(118,237,187,0.35))"
              ]
            }}
            transition={{
              scale: {
                duration: 1.8,
                repeat: Infinity,
                times: [0, 0.16, 0.4, 1],
                ease: [0.25, 1, 0.5, 1]
              },
              filter: {
                duration: 1.8,
                repeat: Infinity,
                times: [0, 0.16, 1],
                ease: "easeInOut"
              }
            }}
            whileHover={{ scale: 1.15, transition: { duration: 0.25 } }}
            className="relative cursor-pointer"
          >
            <svg
              width="64"
              height="74"
              viewBox="0 0 100 115"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block"
              aria-label="House of Beats B Logo"
            >
              <defs>
                {/* Dynamic Base Metallic Gradient */}
                <linearGradient id="heroBGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="35%" stopColor="#76EDBB" />
                  <stop offset="70%" stopColor="#4AE3A5" />
                  <stop offset="100%" stopColor="#FFFFFF" />
                </linearGradient>

                {/* Light Sweep Glint Gradient */}
                <linearGradient id="sweepGlint" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="white" stopOpacity="0" />
                  <stop offset="50%" stopColor="white" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>

                {/* Stencil Mask of clean B */}
                <mask id="heroBMask">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 5H60C78 5 90 14 90 29C90 39.5 83 48 72 52.5C86 57 95 67 95 83C95 100 81 110 60 110H10V5ZM35 25V43H56C64 43 69 39 69 34C69 29 64 25 56 25H35ZM35 65V90H60C69 90 74 85 74 77.5C74 70 69 65 60 65H35Z"
                    fill="white"
                  />
                </mask>
              </defs>

              {/* Base Clean B Silhouette */}
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 5H60C78 5 90 14 90 29C90 39.5 83 48 72 52.5C86 57 95 67 95 83C95 100 81 110 60 110H10V5ZM35 25V43H56C64 43 69 39 69 34C69 29 64 25 56 25H35ZM35 65V90H60C69 90 74 85 74 77.5C74 70 69 65 60 65H35Z"
                fill="url(#heroBGradient)"
              />

              {/* Specular Liquid Chrome Beam sweeping across B in continuous loop */}
              <g mask="url(#heroBMask)">
                <motion.rect
                  x="-90"
                  y="-10"
                  width="45"
                  height="140"
                  fill="url(#sweepGlint)"
                  animate={{
                    x: [-90, 160]
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    repeatDelay: 0.6,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  transform="skewX(-25)"
                />
              </g>
            </svg>
          </motion.div>
        </div>

        {/* Scaled Didone Display Headline - Responsive for laptops */}
        <h1
          className={`font-display text-[9vw] sm:text-[7.5vw] lg:text-[5.5vw] xl:text-[5vw] leading-[0.9] font-bold uppercase tracking-tight text-[--mint] drop-shadow-2xl transition-all duration-800 delay-400 ${
            hasEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SplitText type="chars" stagger={0.03}>
            THERE IS A PLACE THAT INSPIRES
          </SplitText>
        </h1>

        <p
          className={`mt-4 lg:mt-6 font-heading text-xs sm:text-base lg:text-lg text-neutral-300 font-semibold tracking-widest uppercase max-w-xl lg:max-w-2xl mx-auto transition-all duration-800 delay-600 ${
            hasEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          WE ARE NOT A CLASSIC HOTEL. WE ARE A MUSIC-LED LIFESTYLE BRAND.
        </p>
      </div>

      {/* Bottom Hashtag Marquee */}
      <div
        className={`relative z-10 pb-6 lg:pb-8 border-t border-white/10 bg-black/40 backdrop-blur-md pt-3 lg:pt-4 pointer-events-none transition-all duration-700 delay-500 ${
          hasEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
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
