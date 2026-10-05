"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EventItem } from "@/data/events";
import { SITE_CONFIG } from "@/data/site";
import { MagneticButton } from "./MagneticButton";
import { Logo } from "./Logo";

interface BookingModalProps {
  event: EventItem | null;
  onClose: () => void;
}

export function BookingModal({ event, onClose }: BookingModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tickets, setTickets] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!event) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Log reservation details or dispatch to placeholder endpoint
      console.log("Booking Confirmed:", { eventId: event.id, name, email, tickets, url: SITE_CONFIG.bookingUrl });
    }, 900);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-full max-w-lg bg-neutral-950 border border-neutral-800 rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 text-white shadow-2xl overflow-hidden z-10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close booking modal"
            className="absolute top-6 right-6 p-2 rounded-full bg-neutral-900 border border-neutral-800 hover:border-[--mint] text-neutral-400 hover:text-white transition-colors"
          >
            ✕
          </button>

          {!isSuccess ? (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Logo size={28} className="text-[--mint]" />
                <span className="text-xs font-mono tracking-widest text-[--mint] uppercase">
                  ACCESS CODE // TICKET PASS
                </span>
              </div>

              <h3 className="font-heading text-xl sm:text-2xl font-bold uppercase tracking-tight text-white mb-2">
                {event.title}
              </h3>
              <p className="text-xs font-mono text-neutral-400 mb-6 uppercase">
                {event.day} {event.month} {event.year} — {event.location}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                    FULL NAME / ALIAS
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.G. ALEX GROOVE"
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-[--mint] rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                    GUEST EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="YOU@DOMAIN.COM"
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-[--mint] rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-colors"
                  />
                </div>

                <div className="flex items-center justify-between py-2 border-y border-neutral-800">
                  <span className="text-xs font-mono uppercase text-neutral-400">TICKETS</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setTickets((t) => Math.max(1, t - 1))}
                      className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center font-bold text-lg hover:border-[--mint]"
                    >
                      -
                    </button>
                    <span className="font-mono text-lg font-bold px-2">{tickets}</span>
                    <button
                      type="button"
                      onClick={() => setTickets((t) => Math.min(6, t + 1))}
                      className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center font-bold text-lg hover:border-[--mint]"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="pt-4">
                  <MagneticButton
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[--mint] text-black hover:bg-white py-4 rounded-xl font-heading font-black text-sm tracking-wider"
                  >
                    {isSubmitting ? "ENCRYPTING PASS..." : "CONFIRM RESERVATION"}
                  </MagneticButton>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center py-8 relative overflow-hidden">
              {/* Note burst / particle celebration */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                    animate={{
                      scale: [0, 1.5, 0],
                      x: (Math.random() - 0.5) * 350,
                      y: (Math.random() - 0.5) * 350,
                      opacity: [1, 1, 0]
                    }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute text-[--mint] font-black text-xl"
                  >
                    ♫
                  </motion.div>
                ))}
              </div>

              <div className="w-16 h-16 rounded-full bg-[--mint]/10 border border-[--mint] text-[--mint] flex items-center justify-center text-3xl mx-auto mb-4">
                ✓
              </div>
              <h4 className="font-display text-2xl font-bold uppercase tracking-tight text-white mb-2">
                ACCESS GRANTED
              </h4>
              <p className="text-xs text-neutral-400 max-w-xs mx-auto mb-6">
                Your confirmation code has been dispatched to{" "}
                <span className="text-[--mint]">{email}</span>. Show your pass at the threshold.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono uppercase tracking-widest text-neutral-300 hover:text-white hover:border-[--mint] transition-colors"
              >
                CLOSE SANCTUARY PASS
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
