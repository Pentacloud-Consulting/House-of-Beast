"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui/Logo";

const NAV_LINKS = [
  { full: "01 // HERO", href: "#hero", tag: "IMMERSIVE ENTRY" },
  { full: "02 // MANIFESTO", href: "#manifesto", tag: "AUDIO PHILOSOPHY" },
  { full: "03 // LIVE FEED", href: "#social-feed", tag: "RESIDENT DROPS" },
  { full: "04 // EVENTS", href: "#events", tag: "NIGHTLIFE & LABS" },
  { full: "05 // MUSIC", href: "#music", tag: "24/7 SOUND IDENTITY" },
  { full: "06 // CREW", href: "#creators", tag: "GLOBAL SOUND MAKERS" },
  { full: "07 // STORIES", href: "#stories", tag: "CULTURAL JOURNAL" },
  { full: "08 // FIND THE BEAT", href: "#find-the-beat", tag: "KEYS & WAITLIST" }
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasEntered, setHasEntered] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("hob_entered") === "true") {
      setHasEntered(true);
    }
    const handleEnter = () => {
      setTimeout(() => setHasEntered(true), 500);
    };
    window.addEventListener("hob_enter_experience", handleEnter);
    return () => window.removeEventListener("hob_enter_experience", handleEnter);
  }, []);

  // Lock background website scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      window.dispatchEvent(new CustomEvent("hob_menu_state", { detail: { isOpen: true } }));

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsMenuOpen(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
        window.dispatchEvent(new CustomEvent("hob_menu_state", { detail: { isOpen: false } }));
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY && !isMenuOpen) {
          setIsVisible(false); // Hide on scroll down
        } else {
          setIsVisible(true); // Show on scroll up
        }
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen, lastScrollY]);

  const handleLinkClick = (href: string) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 250);
  };

  return (
    <>
      {/* Sticky Header Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 px-6 sm:px-12 py-6 flex items-center justify-between transition-all duration-700 ease-out mix-blend-difference pointer-events-auto ${
          hasEntered && isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <a href="#hero" className="flex items-center gap-3 text-white group" aria-label="House of Beats Home" data-cursor="hover">
          <Logo size={32} className="group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-heading font-black text-lg tracking-tighter uppercase">
            HOUSE OF BEATS
          </span>
        </a>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          data-cursor="hover"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="flex items-center gap-2 text-white font-mono text-xs uppercase tracking-widest px-4 py-2 rounded-full border border-white/30 hover:border-white transition-colors"
        >
          <span>{isMenuOpen ? "CLOSE" : "MENU"}</span>
          <span className="text-lg leading-none font-bold">{isMenuOpen ? "✕" : "┼"}</span>
        </button>
      </header>

      {/* Fullscreen Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            data-lenis-prevent="true"
            className="fixed inset-0 z-50 bg-black text-white flex flex-col justify-between p-8 sm:p-16 overflow-y-auto overscroll-contain select-none"
          >
            {/* Top Row */}
            <div className="flex items-center justify-between">
              <a href="#hero" onClick={() => setIsMenuOpen(false)} data-cursor="hover" className="flex items-center gap-3">
                <Logo size={36} className="text-[--mint]" />
                <span className="font-heading font-black text-xl tracking-tighter uppercase text-white">
                  HOUSE OF BEATS
                </span>
              </a>
              <button
                onClick={() => setIsMenuOpen(false)}
                data-cursor="hover"
                aria-label="Close menu"
                className="font-mono text-xs text-neutral-400 hover:text-[--mint] uppercase tracking-widest px-4 py-2 rounded-full border border-neutral-800 hover:border-[--mint] transition-colors"
              >
                CLOSE [ ESC ]
              </button>
            </div>

            {/* Menu Links List */}
            <div
              className="my-auto py-8 sm:py-12 flex flex-col gap-2 sm:gap-3"
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {NAV_LINKS.map((link, idx) => {
                const isHovered = hoveredIdx === idx;
                const isAnyHovered = hoveredIdx !== null;
                const isDimmed = isAnyHovered && !isHovered;

                return (
                  <motion.div
                    key={link.href}
                    initial={{ y: 25, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.04, duration: 0.35, ease: "easeOut" }}
                    className="relative"
                  >
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      data-cursor="hover"
                      className={`group relative w-full flex items-center justify-between py-1.5 sm:py-2 text-left transition-all duration-300 ${
                        isDimmed ? "opacity-25 blur-[0.4px]" : "opacity-100"
                      }`}
                    >
                      {/* Left: Glowing indicator bar + Title */}
                      <div className="flex items-center gap-3 sm:gap-6">
                        {/* Glowing mint accent diamond/bullet */}
                        <span
                          className={`text-sm sm:text-xl text-[--mint] transition-all duration-300 ${
                            isHovered
                              ? "opacity-100 scale-125 translate-x-0 rotate-45"
                              : "opacity-0 scale-0 -translate-x-4 rotate-0"
                          }`}
                        >
                          ✦
                        </span>

                        {/* Big Headline */}
                        <span
                          className={`font-display text-3xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight transition-all duration-300 ${
                            isHovered
                              ? "text-[--mint] translate-x-2 sm:translate-x-4 drop-shadow-[0_0_25px_rgba(118,237,187,0.5)]"
                              : "text-neutral-400 translate-x-0 group-hover:text-white"
                          }`}
                        >
                          {link.full}
                        </span>
                      </div>

                      {/* Right: Category Tag pill revealing on hover */}
                      <div
                        className={`hidden md:flex items-center gap-2 font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full border transition-all duration-300 ${
                          isHovered
                            ? "border-[--mint]/50 text-[--mint] bg-[--mint]/10 opacity-100 translate-x-0"
                            : "border-transparent text-neutral-600 opacity-0 translate-x-4 pointer-events-none"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[--mint] animate-ping" />
                        <span>{link.tag}</span>
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Menu Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-neutral-900 pt-6 font-mono text-xs text-neutral-500 gap-4">
              <div>BERLIN // AMSTERDAM — PRE-OPENING 2026</div>
              <div className="flex gap-6 text-neutral-400 uppercase">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" data-cursor="hover" className="hover:text-[--mint] transition-colors">IG</a>
                <a href="https://tiktok.com" target="_blank" rel="noreferrer" data-cursor="hover" className="hover:text-[--mint] transition-colors">TK</a>
                <a href="https://spotify.com" target="_blank" rel="noreferrer" data-cursor="hover" className="hover:text-[--mint] transition-colors">SP</a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
