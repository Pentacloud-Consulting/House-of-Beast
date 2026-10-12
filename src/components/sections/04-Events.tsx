"use client";

import React, { useState, useEffect } from "react";
import { EVENTS_DATA, EventItem } from "@/data/events";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BookingModal } from "@/components/ui/BookingModal";

export function SectionEvents() {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [hoveredEvent, setHoveredEvent] = useState<EventItem | null>(null);
  const [isHoveringButton, setIsHoveringButton] = useState<boolean>(false);

  // Smooth floating preview refs for 60/120 FPS lerp follow
  const previewRef = React.useRef<HTMLDivElement | null>(null);
  const targetPos = React.useRef({ x: -400, y: -400 });
  const currentPos = React.useRef({ x: -400, y: -400 });
  const hoveredEventRef = React.useRef<EventItem | null>(null);
  const isHoveringButtonRef = React.useRef(false);

  useEffect(() => {
    hoveredEventRef.current = hoveredEvent;
  }, [hoveredEvent]);

  useEffect(() => {
    isHoveringButtonRef.current = isHoveringButton;
  }, [isHoveringButton]);

  useEffect(() => {
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const windowWidth = window.innerWidth;
      const isNearRightEdge = e.clientX > windowWidth - 440 || isHoveringButtonRef.current;
      
      const targetX = isNearRightEdge ? e.clientX - 280 : e.clientX + 28;
      const targetY = Math.max(20, Math.min(window.innerHeight - 340, e.clientY - 160));

      targetPos.current = { x: targetX, y: targetY };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Smooth physics lerp loop
    const render = () => {
      if (previewRef.current && hoveredEventRef.current) {
        // High quality silky smooth lerp factor
        const ease = 0.14;
        currentPos.current.x += (targetPos.current.x - currentPos.current.x) * ease;
        currentPos.current.y += (targetPos.current.y - currentPos.current.y) * ease;

        previewRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section id="events" className="relative w-full bg-black text-white py-24 px-6 sm:px-12 border-t border-neutral-900 select-none">
      {/* Smooth Floating Image Preview Following Mouse Cursor */}
      <div
        ref={previewRef}
        className={`fixed pointer-events-none z-30 w-64 h-80 rounded-2xl overflow-hidden border border-[#76EDBB]/60 shadow-[0_20px_50px_rgba(0,0,0,0.9)] hidden lg:block will-change-transform transition-all duration-300 ease-out ${
          hoveredEvent ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
        }`}
        style={{
          top: 0,
          left: 0
        }}
      >
        {hoveredEvent && (
          <>
            <img
              src={hoveredEvent.featuredImage}
              alt={hoveredEvent.title}
              className="w-full h-full object-cover saturate-125 contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 font-mono text-[10px] text-[#76EDBB] uppercase font-bold tracking-wider">
              {hoveredEvent.artist}
            </div>
          </>
        )}
      </div>

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
              className={`group py-8 sm:py-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-opacity duration-300 ${
                isAnyHovered && !isHovered ? "opacity-30" : "opacity-100"
              }`}
            >
              {/* Left Column: Date Numerals */}
              <div className="flex items-baseline gap-4 min-w-[180px]">
                <span className="font-display text-5xl sm:text-7xl font-extrabold text-[#76EDBB] group-hover:scale-105 transition-transform duration-300">
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
                        : "bg-neutral-900 text-[#76EDBB] border border-neutral-800"
                    }`}
                  >
                    {evt.tag}
                  </span>
                  <span className="font-mono text-xs text-neutral-500 uppercase">{evt.time}</span>
                </div>

                <h3 className="font-heading text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white group-hover:text-[#76EDBB] group-hover:translate-x-3 transition-all duration-300">
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
                  className="px-6 py-3.5 rounded-full bg-white text-black border border-white text-xs font-mono font-extrabold tracking-widest hover:bg-[#76EDBB] hover:border-[#76EDBB] hover:shadow-[0_0_25px_rgba(118,237,187,0.6)] transition-all duration-300"
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
