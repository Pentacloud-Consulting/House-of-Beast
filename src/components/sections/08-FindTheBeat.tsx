"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "@/data/site";
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

  // Countdown to OPENING_DATE
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
  };

  return (
    <section
      id="find-the-beat"
      className="relative w-full bg-[#050505] text-white py-16 sm:py-20 px-6 sm:px-12 border-t border-neutral-900 overflow-hidden select-none"
    >
      {/* Background Ambience: Subtle Dark Neon Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(circle,rgba(118,237,187,0.05),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Compact Clean Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-3 px-3.5 py-1 rounded-full bg-[#76EDBB]/10 border border-[#76EDBB]/25 text-[#76EDBB] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#76EDBB] animate-ping" />
            <span>[ 08 // THE INAUGURATION COUNTDOWN ]</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white mb-2 leading-none">
            THE BEAT STARTS <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#76EDBB]">HERE</span>
          </h2>

          <p className="font-mono text-xs sm:text-[13px] text-neutral-400 max-w-xl mx-auto uppercase tracking-wider font-semibold">
            DEVIATING FROM THE ORDINARY • BERLIN & AMSTERDAM RESIDENCY KEYS OPENING SOON
          </p>
        </div>

        {/* Dual Console: Countdown + Early Access Pass in one clean row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Card 1: Live Launch Countdown (5 cols on lg) */}
          <div className="lg:col-span-5 bg-neutral-950/90 text-white p-6 sm:p-7 rounded-3xl shadow-2xl border border-neutral-800 hover:border-neutral-700/80 transition-all flex flex-col justify-between relative overflow-hidden">
            {/* Top Mint Accent Line */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#76EDBB] to-transparent opacity-60" />

            {/* Micro Header */}
            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 uppercase tracking-widest pb-3 border-b border-white/5">
              <span>⌜ INAUGURATION // 2026 ⌟</span>
              <span className="text-[#76EDBB] font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#76EDBB] animate-ping" />
                T-MINUS
              </span>
            </div>

            {/* 4 Countdown Blocks */}
            <div className="grid grid-cols-4 gap-2.5 py-6 my-auto">
              {[
                { label: "DAYS", value: timeLeft.days },
                { label: "HOURS", value: timeLeft.hours },
                { label: "MINS", value: timeLeft.minutes },
                { label: "SECS", value: timeLeft.seconds }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-2.5 sm:p-3.5 flex flex-col items-center justify-center text-center shadow-inner group hover:border-[#76EDBB]/40 transition-colors"
                >
                  <span className="font-mono text-2xl sm:text-3xl lg:text-4xl font-black text-[#76EDBB] tracking-tight leading-none">
                    {String(item.value).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest mt-1.5 font-bold">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Micro Footer */}
            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
              <span>BERLIN & AMS SANCTUARY</span>
              <span className="text-[#76EDBB] font-semibold">Q4 2026 DROPS</span>
            </div>
          </div>

          {/* Card 2: VIP Early Access Pass (7 cols on lg) */}
          <div className="lg:col-span-7 bg-neutral-950/90 text-white p-6 sm:p-7 rounded-3xl shadow-2xl border border-neutral-800 hover:border-neutral-700/80 transition-all flex flex-col justify-between relative overflow-hidden">
            {/* Top Mint Accent Line */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#76EDBB] to-transparent opacity-60" />

            {/* Micro Header */}
            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 uppercase tracking-widest pb-3 border-b border-white/5">
              <span>⌜ PASS // VIP INVITATION ⌟</span>
              <span className="text-[#76EDBB] font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#76EDBB]" />
                PHASE 01 ACCESS
              </span>
            </div>

            {/* Body */}
            <div className="py-4 my-auto">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="font-heading text-xl sm:text-2xl font-black uppercase tracking-tight text-white mb-1">
                      REQUEST EARLY ACCESS PASS
                    </h3>
                    <p className="font-mono text-[11px] sm:text-xs text-neutral-400 uppercase leading-relaxed">
                      RECEIVE CONFIDENTIAL DROPS AND PRE-OPENING ROOM RESERVATION KEYS DIRECT TO YOUR INBOX.
                    </p>
                  </div>

                  {/* Compact Form Row: Input + Action Button */}
                  <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ENTER YOUR EMAIL ADDRESS..."
                      className="flex-1 bg-neutral-900 border border-neutral-800 focus:border-[#76EDBB] focus:ring-1 focus:ring-[#76EDBB]/20 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 font-mono outline-none transition-all shadow-inner"
                    />

                    <MagneticButton
                      type="submit"
                      className="bg-[#76EDBB] text-black hover:bg-white px-6 py-3 rounded-xl font-heading font-black text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(118,237,187,0.35)] transition-all cursor-pointer whitespace-nowrap"
                    >
                      JOIN WAITLIST ↗
                    </MagneticButton>
                  </div>
                </form>
              ) : (
                <div className="py-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#76EDBB]/20 border border-[#76EDBB] text-[#76EDBB] flex items-center justify-center text-xl flex-shrink-0 shadow-[0_0_20px_rgba(118,237,187,0.4)]">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-heading text-lg font-black uppercase text-white">
                      YOU ARE ON THE LIST
                    </h4>
                    <p className="font-mono text-xs text-neutral-400 uppercase">
                      CONFIDENTIAL KEYS WILL BE DISPATCHED PRIOR TO INAUGURATION.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Micro Trust Signals */}
            <div className="pt-3 border-t border-white/5 flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-neutral-500 uppercase tracking-widest">
              <span>✦ ZERO SPAM</span>
              <span>✦ ENCRYPTED KEYS</span>
              <span>✦ 24H AUDIO PASS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Community Modal */}
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
              className="relative w-full max-w-lg bg-neutral-950 border border-neutral-800 text-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5"
            >
              <button
                onClick={() => setActiveTagModal(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 border border-white/10 hover:border-[#76EDBB] text-white hover:text-[#76EDBB] flex items-center justify-center text-sm transition-colors cursor-pointer"
                aria-label="Close"
              >
                ✕
              </button>

              <div className="font-mono text-[10px] text-[#76EDBB] tracking-widest uppercase">
                [ 08 // COMMUNITY ACCESS FREQUENCY ]
              </div>

              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-1.5">
                  {activeTagModal}
                </h3>
                <p className="font-mono text-xs text-neutral-400 uppercase leading-relaxed">
                  WHERE UNDERGROUND SOUND IDENTITY MEETS ARCHITECTURAL SANCTUARY. GET DIRECT ACCESS TO INAUGURATION SESSIONS & EXCLUSIVE VINYL DROPS.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <MagneticButton
                  onClick={() => {
                    setActiveTagModal(null);
                    const formEl = document.querySelector("#find-the-beat form input");
                    if (formEl) (formEl as HTMLElement).focus();
                  }}
                  className="w-full bg-[#76EDBB] text-black hover:bg-white py-3 rounded-xl font-heading font-black text-xs uppercase tracking-wider text-center"
                >
                  CLAIM EARLY PASS KEY ↗
                </MagneticButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
