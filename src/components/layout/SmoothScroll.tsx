"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });

    // If preloader has not been dismissed yet, stop scrolling
    const hasEntered = sessionStorage.getItem("hob_entered") === "true";
    if (!hasEntered) {
      lenis.stop();
    }

    const handleEnter = () => {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
      lenis.start();
    };

    window.addEventListener("hob_enter_experience", handleEnter);

    const handleMenuState = (e: Event) => {
      const customEvent = e as CustomEvent<{ isOpen: boolean }>;
      if (customEvent.detail?.isOpen) {
        lenis.stop();
      } else {
        if (sessionStorage.getItem("hob_entered") === "true") {
          lenis.start();
        }
      }
    };
    window.addEventListener("hob_menu_state", handleMenuState);

    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after all content (fonts, images) has loaded
    // This ensures Section 06 pin starts ONLY after Section 05 has fully scrolled past
    const refreshOnLoad = () => {
      setTimeout(() => ScrollTrigger.refresh(), 300);
    };

    if (document.readyState === "complete") {
      refreshOnLoad();
    } else {
      window.addEventListener("load", refreshOnLoad, { once: true });
    }

    // Also refresh when fonts are ready
    document.fonts?.ready?.then(() => {
      setTimeout(() => ScrollTrigger.refresh(), 100);
    });

    return () => {
      window.removeEventListener("hob_enter_experience", handleEnter);
      window.removeEventListener("hob_menu_state", handleMenuState);
      window.removeEventListener("load", refreshOnLoad);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, [prefersReduced]);

  return <>{children}</>;
}
