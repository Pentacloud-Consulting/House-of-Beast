"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui/Logo";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check session flag
    const hasEnteredBefore = sessionStorage.getItem("hob_entered");
    if (hasEnteredBefore === "true") {
      setIsDismissed(true);
      onComplete();
      return;
    }

    // Counter animation 0 to 100
    const duration = 1800; // ms
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = Math.min(100, Math.floor((currentStep / steps) * 100));
      setCount(progress);

      if (progress >= 100) {
        clearInterval(timer);
        setIsReady(true);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Lock scrolling completely while preloader is active
  useEffect(() => {
    if (isDismissed) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    const preventKeys = (e: KeyboardEvent) => {
      if (
        ["ArrowUp", "ArrowDown", "Space", "PageUp", "PageDown", "Home", "End"].includes(
          e.code
        )
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", preventKeys);

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventKeys);
    };
  }, [isDismissed]);

  const handleTapToEnter = async () => {
    sessionStorage.setItem("hob_entered", "true");
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("hob_enter_experience"));
    }
    setIsDismissed(true);
  };

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isDismissed && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1, y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 1.0, ease: [0.77, 0, 0.175, 1] }
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-black text-white p-8 select-none overflow-hidden"
        >
          {/* Top spacer */}
          <div className="w-full h-4" />

          {/* Center: Logo drawing & Counter / Tap Button */}
          <div className="flex flex-col items-center justify-center text-center my-auto">
            {/* Animated SVG Logo */}
            <div className="relative mb-8">
              <Logo size={90} className="text-[--mint] transition-transform duration-700 hover:scale-110" />
            </div>

            {!isReady ? (
              <div className="flex flex-col items-center gap-2">
                <span className="font-display text-5xl sm:text-7xl font-bold tracking-tight text-[--mint]">
                  {count}%
                </span>
                <span className="font-mono text-xs tracking-widest text-neutral-400 uppercase">
                  TUNING FREQUENCIES
                </span>
              </div>
            ) : (
              <motion.button
                onClick={handleTapToEnter}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group flex items-center justify-center cursor-pointer py-4 px-8 rounded-full border border-[--mint]/50 bg-black/60 backdrop-blur-md"
              >
                {/* Pulsing mint ring */}
                <span className="absolute inset-0 rounded-full border-2 border-[--mint] animate-ping opacity-60 pointer-events-none" />
                <span className="font-heading font-black text-sm tracking-widest uppercase text-[--mint] group-hover:text-white transition-colors">
                  TAP TO ENTER ♫
                </span>
              </motion.button>
            )}
          </div>

          {/* Bottom Disclaimer */}
          <div className="w-full text-center font-mono text-[10px] text-neutral-600 tracking-wider uppercase">
            BEST EXPERIENCED WITH AUDIO ENABLED
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

