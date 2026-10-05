"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui/Logo";

const NAV_LINKS = [
  { label: "01 // HERO", href: "#hero" },
  { label: "02 // MANIFESTO", href: "#manifesto" },
  { label: "03 // LIVE FEED", href: "#social-feed" },
  { label: "04 // EVENTS", href: "#events" },
  { label: "05 // MUSIC", href: "#music" },
  { label: "06 // CREW", href: "#creators" },
  { label: "07 // STORIES", href: "#stories" },
  { label: "08 // FIND THE BEAT", href: "#find-the-beat" }
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Sticky Header Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 px-6 sm:px-12 py-6 flex items-center justify-between transition-transform duration-300 mix-blend-difference pointer-events-auto ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <a href="#hero" className="flex items-center gap-3 text-white group" aria-label="House of Beats Home">
          <Logo size={32} className="group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-heading font-black text-lg tracking-tighter uppercase">
            HOUSE OF BEATS
          </span>
        </a>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          data-cursor="button"
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
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-black text-white flex flex-col justify-between p-8 sm:p-16 overflow-y-auto"
          >
            {/* Top Row */}
            <div className="flex items-center justify-between">
              <a href="#hero" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3">
                <Logo size={36} className="text-[--mint]" />
                <span className="font-heading font-black text-xl tracking-tighter uppercase text-white">
                  HOUSE OF BEATS
                </span>
              </a>
              <button
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
                className="font-mono text-xs text-neutral-400 hover:text-[--mint] uppercase tracking-widest px-4 py-2 rounded-full border border-neutral-800 hover:border-[--mint]"
              >
                CLOSE [ ESC ]
              </button>
            </div>

            {/* Menu Links List */}
            <div className="my-auto py-12 flex flex-col gap-4">
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.06, duration: 0.5, ease: "easeOut" }}
                >
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="group relative inline-block font-display text-3xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-neutral-400 hover:text-[--mint] transition-colors text-left"
                  >
                    <span className="group-hover:translate-x-4 inline-block transition-transform duration-300">
                      {link.label}
                    </span>
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Bottom Menu Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-neutral-900 pt-6 font-mono text-xs text-neutral-500 gap-4">
              <div>BERLIN // AMSTERDAM — PRE-OPENING 2026</div>
              <div className="flex gap-6 text-neutral-400 uppercase">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[--mint]">IG</a>
                <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-[--mint]">TK</a>
                <a href="https://spotify.com" target="_blank" rel="noreferrer" className="hover:text-[--mint]">SP</a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
