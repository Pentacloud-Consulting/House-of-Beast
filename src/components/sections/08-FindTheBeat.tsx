"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
      className="relative w-full bg-[--mint] text-black py-24 px-6 sm:px-12 overflow-hidden select-none"
    >
      {/* Top Looping Marquee */}
      <div className="w-full pb-12 border-b border-black/20">
        <Marquee speed={2} className="font-display font-black text-4xl sm:text-7xl uppercase tracking-tight text-black">
          <span className="mx-6">#FINDTHEBEAT</span>
          <span className="mx-6">✦</span>
          <span className="mx-6">#THEBEATSTARTSHERE</span>
          <span className="mx-6">✦</span>
        </Marquee>
      </div>

      <div className="max-w-5xl mx-auto my-16 text-center">
        <div className="font-mono text-xs font-bold tracking-widest uppercase mb-4 text-black/70">
          [ 08 // THE INAUGURATION COUNTDOWN ]
        </div>

        <h2 className="font-display text-4xl sm:text-7xl font-bold uppercase tracking-tight text-black mb-12">
          THE BEAT STARTS HERE
        </h2>

        {/* Cryptic Countdown Numerals */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mb-16 max-w-3xl mx-auto">
          {[
            { label: "DAYS", value: timeLeft.days },
            { label: "HOURS", value: timeLeft.hours },
            { label: "MINUTES", value: timeLeft.minutes },
            { label: "SECONDS", value: timeLeft.seconds }
          ].map((item, idx) => (
            <div key={idx} className="bg-black text-[--mint] p-6 rounded-3xl shadow-2xl flex flex-col items-center">
              <span className="font-display text-4xl sm:text-6xl font-bold font-mono tracking-tighter">
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="font-mono text-[10px] tracking-widest text-neutral-400 mt-2 uppercase">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Email Waitlist Form */}
        <div className="max-w-xl mx-auto bg-black text-white p-8 rounded-3xl shadow-2xl relative">
          {/* Pulsing note landing target indicator */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[--mint] text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm animate-bounce shadow-lg">
            ♫
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6 pt-2">
              <h3 className="font-heading text-xl font-bold uppercase tracking-wide text-white">
                REQUEST EARLY ACCESS PASS
              </h3>
              <p className="font-mono text-xs text-neutral-400 uppercase">
                RECEIVE CONFIDENTIAL DROPS AND PRE-OPENING ROOM RESERVATION KEYS.
              </p>

              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER YOUR EMAIL ADDRESS..."
                  className="w-full bg-transparent border-b-2 border-neutral-700 focus:border-[--mint] text-sm py-3 text-white placeholder-neutral-500 outline-none transition-colors font-mono"
                />
              </div>

              <MagneticButton
                type="submit"
                className="w-full bg-[--mint] text-black hover:bg-white py-4 rounded-xl font-heading font-black text-sm tracking-wider"
              >
                JOIN THE WAITLIST ↗
              </MagneticButton>
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
                    className="absolute text-[--mint] font-bold text-lg"
                  >
                    ♫
                  </motion.div>
                ))}
              </div>

              <div className="w-14 h-14 rounded-full bg-[--mint]/20 border border-[--mint] text-[--mint] flex items-center justify-center text-2xl mx-auto">
                ✓
              </div>
              <h4 className="font-display text-2xl font-bold uppercase text-white">
                YOU ARE ON THE LIST
              </h4>
              <p className="font-mono text-xs text-neutral-400 uppercase max-w-xs mx-auto">
                CONFIDENTIAL KEYS WILL BE DISPATCHED PRIOR TO INAUGURATION.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
