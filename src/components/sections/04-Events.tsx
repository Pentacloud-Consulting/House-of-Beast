"use client";

import React, { useState } from "react";
import { EVENTS_DATA, EventItem } from "@/data/events";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BookingModal } from "@/components/ui/BookingModal";
import { useMousePosition } from "@/hooks/useMousePosition";

export function SectionEvents() {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [hoveredEvent, setHoveredEvent] = useState<EventItem | null>(null);
  const [isHoveringButton, setIsHoveringButton] = useState<boolean>(false);
  const mouse = useMousePosition();

  // Shift image preview to LEFT of cursor when mouse approaches right edge or button
  const windowWidth = typeof window !== "undefined" ? window.innerWidth : 1200;
  const isNearRightEdge = mouse.x > windowWidth - 440 || isHoveringButton;
  const previewLeft = isNearRightEdge ? mouse.x - 280 : mouse.x + 24;
  const previewTop = Math.max(20, Math.min(typeof window !== "undefined" ? window.innerHeight - 340 : 600, mouse.y - 160));

  return (
    <section id="events" className="relative w-full bg-black text-white py-24 px-6 sm:px-12 border-t border-neutral-900 select-none">
      {/* Floating Image Preview Following Mouse Cursor */}
      {hoveredEvent && (
        <div
          className="fixed pointer-events-none z-30 w-64 h-80 rounded-2xl overflow-hidden border border-[--mint]/60 shadow-[0_10px_35px_rgba(0,0,0,0.8)] hidden lg:block"
          style={{
            left: previewLeft,
            top: previewTop,
            transition: "left 0.25s cubic-bezier(0.16, 1, 0.3, 1), top 0.08s ease-out"
          }}
        >
          <img
            src={hoveredEvent.featuredImage}
            alt={hoveredEvent.title}
            className="w-full h-full object-cover saturate-125 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 font-mono text-[10px] text-[--mint] uppercase font-bold tracking-wider">
            {hoveredEvent.artist}
          </div>
        </div>
      )}

      {/* Section Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="font-mono text-xs text-neutral-400 tracking-widest uppercase mb-2">
            [ 04 // LIVE SESSIONS & GIGS ]
          </div>
          <h2 className="font-heading text-4xl sm:text-7xl font-black uppercase tracking-tight text-white">
            AUDIO RITUALS
          </h2>
        </div>
        <p className="font-mono text-xs text-neutral-400 uppercase max-w-xs tracking-wider">
          UNANNOUNCED DROPS & INTIMATE ACOUSTIC SESSIONS. ONE-CLICK SANCTUARY PASS.
        </p>
      </div>

      {/* List Layout (Resident Advisor x Editorial) */}
      <div className="max-w-7xl mx-auto divide-y divide-neutral-900">
        {EVENTS_DATA.map((evt) => {
          const isHovered = hoveredEvent?.id === evt.id;
          const isAnyHovered = hoveredEvent !== null;

          return (
            <div
              key={evt.id}
              onMouseEnter={() => setHoveredEvent(evt)}
              onMouseLeave={() => {
                setHoveredEvent(null);
                setIsHoveringButton(false);
              }}
              data-cursor="book"
              className={`group py-8 sm:py-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-opacity duration-300 ${
                isAnyHovered && !isHovered ? "opacity-30" : "opacity-100"
              }`}
            >
              {/* Left Column: Date Numerals */}
              <div className="flex items-baseline gap-4 min-w-[180px]">
                <span className="font-display text-5xl sm:text-7xl font-extrabold text-[--mint] group-hover:scale-105 transition-transform duration-300">
                  {evt.day}
                </span>
                <div className="font-mono text-xs text-neutral-400 uppercase">
                  <div>{evt.month}</div>
                  <div>{evt.year}</div>
                </div>
              </div>

              {/* Center Column: Event Title + Artist + Tag */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <span
                    className={`font-mono text-[10px] px-2.5 py-1 rounded-full uppercase font-bold tracking-wider ${
                      evt.tag === "SECRET"
                        ? "bg-red-950 text-red-400 border border-red-800"
                        : evt.tag === "MYSTERY"
                        ? "bg-purple-950 text-purple-300 border border-purple-800"
                        : "bg-neutral-900 text-[--mint] border border-neutral-800"
                    }`}
                  >
                    {evt.tag}
                  </span>
                  <span className="font-mono text-xs text-neutral-500 uppercase">{evt.time}</span>
                </div>

                <h3 className="font-heading text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white group-hover:text-[--mint] group-hover:translate-x-3 transition-all duration-300">
                  {evt.isMystery ? (
                    <span className="bg-neutral-800 text-transparent select-none blur-sm hover:blur-none hover:text-white transition-all duration-300">
                      CLASSIFIED BOILER SESSION
                    </span>
                  ) : (
                    evt.title
                  )}
                </h3>

                <p className="font-mono text-xs text-neutral-400 uppercase">
                  {evt.artist} — <span className="text-neutral-500">{evt.location}</span>
                </p>
              </div>

              {/* Right Column: Book Button */}
              <div
                onMouseEnter={() => setIsHoveringButton(true)}
                onMouseLeave={() => setIsHoveringButton(false)}
              >
                <MagneticButton
                  onClick={() => setSelectedEvent(evt)}
                  cursorType="book"
                  className="px-6 py-3.5 rounded-full bg-white text-black border border-white text-xs font-mono font-extrabold tracking-widest hover:bg-[--mint] hover:border-[--mint] hover:shadow-[0_0_25px_rgba(118,237,187,0.6)] transition-all duration-300"
                >
                  RESERVE PASS ↗
                </MagneticButton>
              </div>
            </div>
          );
        })}
      </div>

      {/* Booking Modal */}
      <BookingModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </section>
  );
}
