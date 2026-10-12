"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "@/data/site";
import { Marquee } from "@/components/ui/Marquee";
import { MagneticButton } from "@/components/ui/MagneticButton";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function SectionFindTheBeat() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [activeTagModal, setActiveTagModal] = useState<string | null>(null);

  // Cryptic countdown to OPENING_DATE
  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(SITE_CONFIG.openingDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
    console.log("Waitlist Email Joined:", email);
  };

  return (
    <section
      id="find-the-beat"
      className="relative w-full bg-gradient-to-b from-[#8EF5CA] via-[#76EDBB] to-[#5AE0A8] text-black py-28 sm:py-36 px-6 sm:px-12 overflow-hidden select-none"
    >
      {/* Subtle architectural noise / dot grid texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.06)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Top and bottom subtle vignettes for soft section blending */}
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black/15 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Editorial Pill Badge */}
        <div className="inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-widest uppercase mb-5 px-4 py-1.5 rounded-full bg-black/10 backdrop-blur-md border border-black/15 text-black shadow-sm">
          <span className="w-2 h-2 rounded-full bg-black animate-ping" />
          <span>[ 08 // THE INAUGURATION COUNTDOWN ]</span>
        </div>

        {/* Section Heading */}
        <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-black mb-4 drop-shadow-sm">
          THE BEAT STARTS HERE
        </h2>

        {/* Editorial Tagline */}
        <p className="font-mono text-xs sm:text-sm text-black/80 max-w-lg mx-auto uppercase tracking-wider mb-14 font-semibold leading-relaxed">
          DEVIATING FROM THE ORDINARY. BERLIN & AMSTERDAM RESIDENCY KEYS OPENING SOON.
        </p>

        {/* Luxury Obsidian Countdown Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-7 mb-20 max-w-4xl mx-auto">
          {[
            { label: "DAYS", value: timeLeft.days, id: "01" },
            { label: "HOURS", value: timeLeft.hours, id: "02" },
            { label: "MINUTES", value: timeLeft.minutes, id: "03" },
            { label: "SECONDS", value: timeLeft.seconds, id: "04" }
          ].map((item, idx) => (
            <div
              key={idx}
              className="group relative bg-black/95 text-white p-6 sm:p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)] border border-black/10 flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(0,0,0,0.5)] overflow-hidden cursor-default"
            >
              {/* Mint top-edge light reflection line */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#76EDBB] to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Upper corner micro tag */}
              <div className="w-full flex items-center justify-between text-[10px] font-mono text-neutral-500 uppercase mb-2">
                <span>⌜ {item.id} ⌟</span>
                <span className="text-[9px] tracking-wider text-[#76EDBB]/80">T-MINUS</span>
              </div>

              {/* Numbers */}
              <span className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold font-mono tracking-tighter text-[#76EDBB] drop-shadow-[0_0_16px_rgba(118,237,187,0.35)] group-hover:scale-105 transition-transform duration-300 py-1">
                {String(item.value).padStart(2, "0")}
              </span>

              {/* Label */}
              <span className="font-mono text-[11px] sm:text-xs tracking-widest text-neutral-300 mt-2 uppercase font-extrabold">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Exclusive VIP Credential Pass Form */}
        <div className="max-w-xl mx-auto bg-black/95 text-white p-8 sm:p-12 rounded-[2.5rem] shadow-[0_35px_80px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] border border-white/10 relative overflow-hidden backdrop-blur-xl">
          {/* Top subtle mint glow accent line */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#76EDBB] to-transparent opacity-70" />

          {/* Corner credential labels */}
          <span className="absolute top-5 left-6 font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
            ⌜ PASS // 2026 ⌟
          </span>
          <span className="absolute top-5 right-6 font-mono text-[10px] text-[#76EDBB] uppercase tracking-widest font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#76EDBB] animate-ping" />
            PHASE 01
          </span>

          {/* Floating glowing audio note badge */}
          <div className="w-12 h-12 rounded-2xl bg-[#76EDBB] text-black flex items-center justify-center font-black text-xl shadow-[0_0_25px_rgba(118,237,187,0.6)] mt-2 mb-6 mx-auto hover:rotate-12 transition-transform duration-300 cursor-default">
            ♫
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="font-heading text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-2">
                REQUEST EARLY ACCESS PASS
              </h3>
              <p className="font-mono text-xs text-neutral-400 uppercase max-w-md mx-auto leading-relaxed">
                RECEIVE CONFIDENTIAL DROPS AND PRE-OPENING ROOM RESERVATION KEYS DIRECT TO YOUR INBOX.
              </p>

              <div className="relative pt-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER YOUR EMAIL ADDRESS..."
                  className="w-full bg-neutral-900/90 border border-neutral-700/80 focus:border-[#76EDBB] focus:ring-2 focus:ring-[#76EDBB]/20 rounded-2xl px-5 py-4 text-sm text-white placeholder-neutral-500 font-mono outline-none transition-all shadow-inner"
                />
              </div>

              <MagneticButton
                type="submit"
                className="w-full bg-[#76EDBB] text-black hover:bg-white py-4 rounded-2xl font-heading font-black text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(118,237,187,0.4)] transition-all cursor-pointer"
              >
                JOIN THE WAITLIST ↗
              </MagneticButton>

              {/* Trust Signal Badges */}
              <div className="flex items-center justify-center gap-4 sm:gap-6 font-mono text-[10px] text-neutral-400 uppercase tracking-widest pt-4 border-t border-white/5">
                <span>✦ ZERO SPAM</span>
                <span>✦ ENCRYPTED KEYS</span>
                <span>✦ 24H AUDIO PASS</span>
              </div>
            </form>
          ) : (
            <div className="py-8 space-y-4 relative">
              {/* Note-burst animation */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                    animate={{
                      scale: [0, 1.4, 0],
                      x: (Math.random() - 0.5) * 300,
                      y: (Math.random() - 0.5) * 300,
                      opacity: [1, 1, 0]
                    }}
                    transition={{ duration: 1 }}
                    className="absolute text-[#76EDBB] font-bold text-lg"
                  >
                    ♫
                  </motion.div>
                ))}
              </div>

              <div className="w-16 h-16 rounded-full bg-[#76EDBB]/20 border border-[#76EDBB] text-[#76EDBB] flex items-center justify-center text-3xl mx-auto shadow-[0_0_25px_rgba(118,237,187,0.3)]">
                ✓
              </div>
              <h4 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white">
                YOU ARE ON THE LIST
              </h4>
              <p className="font-mono text-xs text-neutral-400 uppercase max-w-xs mx-auto">
                CONFIDENTIAL KEYS WILL BE DISPATCHED PRIOR TO INAUGURATION.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Marquee Hashtag Popup Modal */}
      <AnimatePresence>
        {activeTagModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl"
            onClick={() => setActiveTagModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-neutral-950 border border-neutral-800 text-white rounded-3xl p-8 sm:p-10 shadow-2xl shadow-black/90 space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveTagModal(null)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-black/60 border border-white/10 hover:border-[#76EDBB] text-white hover:text-[#76EDBB] flex items-center justify-center text-lg transition-colors cursor-pointer"
                aria-label="Close"
              >
                ✕
              </button>

              <div className="font-mono text-[11px] text-[#76EDBB] tracking-widest uppercase">
                [ 08 // COMMUNITY ACCESS FREQUENCY ]
              </div>

              <div>
                <h3 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mb-2">
                  {activeTagModal}
                </h3>
                <p className="font-mono text-xs text-neutral-400 uppercase leading-relaxed">
                  WHERE UNDERGROUND SOUND IDENTITY MEETS ARCHITECTURAL SANCTUARY. GET DIRECT ACCESS TO INAUGURATION SESSIONS & EXCLUSIVE VINYL DROPS.
                </p>
              </div>

              {/* Sound frequency badge */}
              <div className="p-4 rounded-2xl bg-neutral-900 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#76EDBB] animate-ping" />
                  <span className="font-mono text-xs text-[#76EDBB] uppercase font-bold tracking-wider">
                    BROADCAST: ACTIVE
                  </span>
                </div>
                <span className="font-mono text-[10px] text-neutral-400 uppercase">BERLIN / AMS</span>
              </div>

              <div className="space-y-3 pt-2">
                <MagneticButton
                  onClick={() => {
                    setActiveTagModal(null);
                    const formEl = document.querySelector("#find-the-beat form input");
                    if (formEl) (formEl as HTMLElement).focus();
                  }}
                  className="w-full bg-[#76EDBB] text-black hover:bg-white py-4 rounded-xl font-heading font-black text-xs uppercase tracking-wider text-center shadow-[0_0_20px_rgba(118,237,187,0.35)]"
                >
                  CLAIM EARLY PASS KEY ↗
                </MagneticButton>
                <button
                  onClick={() => setActiveTagModal(null)}
                  className="w-full py-2.5 text-center font-mono text-xs text-neutral-400 hover:text-white uppercase tracking-wider transition-colors cursor-pointer"
                >
                  RETURN TO SANCTUARY
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
