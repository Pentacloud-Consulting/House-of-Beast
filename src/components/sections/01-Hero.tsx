"use client";

import React, { useEffect, useRef } from "react";
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
  const mouse = useMousePosition();

  // Try autoplay video with audio enabled
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set initial state
    video.muted = false;
    video
      .play()
      .then(() => {
        setIsAudioActive(true);
      })
      .catch((err) => {
        // Browser policy blocks unmuted autoplay without prior interaction
        console.warn("Unmuted autoplay blocked by browser policy, falling back to muted till first interaction:", err);
        video.muted = true;
        setIsAudioActive(false);
        video.play().catch(() => {});

        // Unmute automatically on first click/interaction anywhere
        const enableSoundOnce = () => {
          if (videoRef.current) {
            videoRef.current.muted = false;
            videoRef.current.play().then(() => setIsAudioActive(true)).catch(() => {});
          }
          window.removeEventListener("click", enableSoundOnce);
          window.removeEventListener("keydown", enableSoundOnce);
          window.removeEventListener("touchstart", enableSoundOnce);
        };

        window.addEventListener("click", enableSoundOnce, { once: true });
        window.addEventListener("keydown", enableSoundOnce, { once: true });
        window.addEventListener("touchstart", enableSoundOnce, { once: true });
      });

    // Also listen to custom event if preloader or other trigger dispatches it
    const handleUnmuteEvent = () => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.play().then(() => setIsAudioActive(true)).catch(() => {});
      }
    };
    window.addEventListener("hob_enter_experience", handleUnmuteEvent);

    return () => {
      window.removeEventListener("hob_enter_experience", handleUnmuteEvent);
    };
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
          className="w-full h-full object-cover opacity-100"
        >
          <source src="/videos/HOB%20BG%20VIDEO.mp4" type="video/mp4" />
          <source src="/videos/HOB BG VIDEO.mp4" type="video/mp4" />
        </video>
        {/* Minimal gradient only at top/bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />
      </div>

      {/* Hero Header Space (Laptop responsive padding & text) */}
      <div className="relative z-10 pt-20 sm:pt-24 lg:pt-20 px-6 sm:px-12 flex items-center justify-between pointer-events-auto">
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
        className="relative z-10 my-auto px-6 sm:px-12 max-w-5xl lg:max-w-6xl mx-auto text-center flex flex-col items-center justify-center transform-gpu pointer-events-none"
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
      <div className="relative z-10 pb-6 lg:pb-8 border-t border-white/10 bg-black/40 backdrop-blur-md pt-3 lg:pt-4 pointer-events-none">
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
