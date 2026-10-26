"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CREATORS_DATA, Creator } from "@/data/creators";
import { BookingModal } from "@/components/ui/BookingModal";
import { useAudio } from "@/context/AudioContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SectionCreators() {
  const { currentTrack, isPlaying, playTrack, togglePlay } = useAudio();
  const [activeCity, setActiveCity] = useState<string>("ALL");
  const [activeCreatorId, setActiveCreatorId] = useState<string>(CREATORS_DATA[0].id);
  const [selectedDossier, setSelectedDossier] = useState<Creator | null>(null);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const pinnedStageRef = useRef<HTMLDivElement | null>(null);
  const rosterContainerRef = useRef<HTMLDivElement | null>(null);
  const rosterListRef = useRef<HTMLDivElement | null>(null);

  const prefersReduced = useReducedMotion();

  const filteredCreators =
    activeCity === "ALL"
      ? CREATORS_DATA
      : CREATORS_DATA.filter((c) => c.location === activeCity);

  const currentCreator =
    CREATORS_DATA.find((c) => c.id === activeCreatorId) || filteredCreators[0] || CREATORS_DATA[0];

  const isCurrentPlaying = isPlaying && currentTrack.id === currentCreator.id;

  // GSAP Pinning: Title + Left Card stick, Right List scrolls till last item
  useEffect(() => {
    if (prefersReduced || !sectionRef.current || !pinnedStageRef.current || !rosterListRef.current) return;

    const ctx = gsap.context(() => {
      // Only pin on screens with width >= 1024px (desktop & laptops)
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const rosterEl = rosterListRef.current;
        const containerEl = rosterContainerRef.current;
        if (!rosterEl || !containerEl) return;

        const getScrollDistance = () => {
          const distance = rosterEl.scrollHeight - containerEl.clientHeight + 40;
          return Math.max(0, distance);
        };

        const totalScrollDistance = getScrollDistance();
        // Give comfortable scroll length (at least 1400px of scroll travel)
        const pinDuration = Math.max(1400, totalScrollDistance * 2.5);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${pinDuration}`,
            scrub: 0.6,
            pin: pinnedStageRef.current,
            pinSpacing: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // As the right list scrolls, dynamically switch active artist based on scroll progress
              const progress = self.progress;
              const index = Math.min(
                filteredCreators.length - 1,
                Math.floor(progress * filteredCreators.length)
              );
              if (filteredCreators[index]) {
                setActiveCreatorId(filteredCreators[index].id);
              }
            }
          }
        });

        // Translate only the right list upwards till the last card is fully visible
        tl.to(rosterEl, {
          y: () => -getScrollDistance(),
          ease: "none",
          duration: 1
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCity, filteredCreators, prefersReduced]);

  const handleTrackToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentTrack.id === currentCreator.id) {
      togglePlay();
    } else {
      playTrack({
        id: currentCreator.id,
        title: currentCreator.trackTitle,
        artist: currentCreator.name,
        audioUrl: currentCreator.audioUrl
      });
    }
  };

  const handleRosterClick = (creator: Creator) => {
    setActiveCreatorId(creator.id);
  };

  return (
    <section
      id="creators"
      ref={sectionRef}
      className="relative w-full bg-[#050505] text-white select-none border-t border-neutral-900"
    >
      {/* Background Ambience: Mint Radial Glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(118,237,187,0.04),transparent_70%)] pointer-events-none" />

      {/* PINNED STAGE WRAPPER: Contains Header + Dual Console in a single 100vh frame */}
      <div
        ref={pinnedStageRef}
        className="relative w-full min-h-screen lg:h-screen lg:max-h-screen flex flex-col justify-between pt-6 pb-6 px-6 sm:px-12 overflow-hidden z-10"
      >
        {/* TITLE & CITY FILTER (Image 1 - Stays Stitched to top of screen) */}
        <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5 flex-shrink-0">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs text-[#76EDBB] tracking-widest uppercase mb-1 bg-[#76EDBB]/10 px-3 py-1 rounded-full border border-[#76EDBB]/25">
              <span className="w-1.5 h-1.5 rounded-full bg-[#76EDBB] animate-ping" />
              <span>06 // SOUND RESIDENTS & ARCHITECTS</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-none">
              THE <span className="font-display italic text-[#76EDBB] font-normal lowercase tracking-normal">creative</span> ROSTER
            </h2>
          </div>

          {/* City Filter Pills */}
          <div className="flex items-center gap-1.5 bg-neutral-900/90 p-1 rounded-full border border-neutral-800 self-start sm:self-auto flex-shrink-0">
            {[
              { label: "ALL FREQUENCIES", val: "ALL" },
              { label: "BERLIN", val: "BERLIN" },
              { label: "AMSTERDAM", val: "AMSTERDAM" }
            ].map((tab) => {
              const isActive = activeCity === tab.val;
              return (
                <button
                  key={tab.val}
                  onClick={() => {
                    setActiveCity(tab.val);
                    const firstInCity =
                      tab.val === "ALL"
                        ? CREATORS_DATA[0]
                        : CREATORS_DATA.find((c) => c.location === tab.val);
                    if (firstInCity) setActiveCreatorId(firstInCity.id);
                  }}
                  data-cursor="hover"
                  className={`font-mono text-[11px] sm:text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-[#76EDBB] text-black font-bold shadow-[0_0_15px_rgba(118,237,187,0.35)]"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* DUAL-CONSOLE AREA (Fills available screen space cleanly) */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1 my-auto overflow-hidden py-3">
          {/* LEFT PANEL: Clean, Compact Spotlight Card (Image 2 - STAYS 100% STUCK) */}
          <div className="lg:col-span-5 flex items-center justify-center w-full">
            <div className="relative w-full max-w-[420px] aspect-[4/5] max-h-[460px] sm:max-h-[480px] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl shadow-black flex flex-col justify-between p-5 sm:p-6">
              {/* Animated Crossfading Portrait */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCreator.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 z-0"
                >
                  <img
                    src={currentCreator.image}
                    alt={currentCreator.name}
                    className="w-full h-full object-cover contrast-115 grayscale brightness-95"
                  />
                  {/* Filmic gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/25" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(118,237,187,0.22),transparent_65%)]" />
                </motion.div>
              </AnimatePresence>

              {/* Top Header Tags */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[#76EDBB] border border-[#76EDBB]/30 uppercase tracking-widest shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#76EDBB] animate-ping" />
                  <span>{currentCreator.location} RESIDENT</span>
                </div>

                <div className="font-mono text-[10px] text-neutral-300 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 uppercase tracking-wider">
                  {currentCreator.bpm}
                </div>
              </div>

              {/* Bottom Card Identity & Sonic Bar */}
              <div className="relative z-10 space-y-2.5">
                <div>
                  <div className="font-mono text-[10px] text-[#76EDBB] uppercase tracking-widest font-semibold mb-0.5">
                    {currentCreator.collabTitle}
                  </div>

                  <h3 className="font-heading text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-tight">
                    {currentCreator.name}
                  </h3>

                  <div className="flex items-center justify-between text-neutral-300 text-[11px] font-mono uppercase tracking-wider">
                    <span>{currentCreator.role}</span>
                    <button
                      onClick={() => setSelectedDossier(currentCreator)}
                      data-cursor="hover"
                      className="text-[#76EDBB] hover:underline cursor-pointer"
                    >
                      DOSSIER & GEAR ↗
                    </button>
                  </div>
                </div>

                {/* Sonic Frequency Player Bar */}
                <div className="p-3 rounded-2xl bg-black/85 backdrop-blur-xl border border-white/10 flex items-center justify-between gap-3 shadow-lg">
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={handleTrackToggle}
                      data-cursor="hover"
                      aria-label={isCurrentPlaying ? "Pause preview" : "Play signature cut"}
                      className="w-8 h-8 rounded-full bg-[#76EDBB] hover:bg-white text-black flex items-center justify-center font-bold text-xs shadow-[0_0_15px_rgba(118,237,187,0.4)] transition-all cursor-pointer flex-shrink-0"
                    >
                      {isCurrentPlaying ? "❚❚" : "▶"}
                    </button>

                    <div className="flex flex-col overflow-hidden">
                      <span className="font-mono text-[8px] text-[#76EDBB] uppercase font-bold tracking-wider">
                        SIGNATURE SOUND CUT
                      </span>
                      <span className="font-heading text-xs font-bold text-white uppercase truncate max-w-[150px] sm:max-w-[190px]">
                        {currentCreator.trackTitle}
                      </span>
                    </div>
                  </div>

                  {/* Equalizer Waveform Bars */}
                  <div className="flex items-end gap-1 h-3.5 pr-1">
                    <span className={`w-0.5 bg-[#76EDBB] h-2 ${isCurrentPlaying ? "animate-pulse" : "opacity-30"}`} />
                    <span className={`w-0.5 bg-[#76EDBB] h-3.5 ${isCurrentPlaying ? "animate-pulse delay-75" : "opacity-30"}`} />
                    <span className={`w-0.5 bg-[#76EDBB] h-1.5 ${isCurrentPlaying ? "animate-pulse delay-150" : "opacity-30"}`} />
                    <span className={`w-0.5 bg-[#76EDBB] h-2.5 ${isCurrentPlaying ? "animate-pulse delay-100" : "opacity-30"}`} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Scrolled List (Image 3 - SCROLLS TILL LAST ITEM) */}
          <div
            ref={rosterContainerRef}
            className="lg:col-span-7 h-full max-h-[490px] sm:max-h-[520px] overflow-hidden relative"
          >
            <div
              ref={rosterListRef}
              className="space-y-4 will-change-transform py-1"
            >
              <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest pb-2 border-b border-neutral-900 flex items-center justify-between">
                <span>RESIDENT SELECTOR CATALOG</span>
                <span>[{filteredCreators.length} ARTISTS]</span>
              </div>

              {filteredCreators.map((creator, idx) => {
                const isSelected = creator.id === currentCreator.id;
                const isThisPlaying = isPlaying && currentTrack.id === creator.id;

                return (
                  <div
                    key={creator.id}
                    onClick={() => handleRosterClick(creator)}
                    data-cursor="hover"
                    className={`group relative rounded-xl overflow-hidden p-5 sm:p-6 transition-all duration-300 cursor-pointer border ${
                      isSelected
                        ? "bg-gradient-to-r from-neutral-900/95 via-neutral-900/80 to-neutral-950 border-[#76EDBB] shadow-[0_4px_25px_rgba(118,237,187,0.18)]"
                        : "bg-neutral-950/70 border-neutral-900 hover:border-neutral-700 hover:bg-neutral-900/50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      {/* Left: Index Number & Mini Avatar */}
                      <div className="flex items-center gap-4 sm:gap-6">
                        <span
                          className={`font-mono text-sm sm:text-base font-bold transition-colors ${
                            isSelected ? "text-[#76EDBB]" : "text-neutral-600 group-hover:text-neutral-400"
                          }`}
                        >
                          0{idx + 1}
                        </span>

                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden border border-neutral-800 flex-shrink-0 relative">
                          <img
                            src={creator.image}
                            alt={creator.name}
                            className={`w-full h-full object-cover transition-all duration-500 ${
                              isSelected ? "grayscale-0 scale-105" : "grayscale group-hover:grayscale-0"
                            }`}
                          />
                          {isThisPlaying && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                              <span className="w-2 h-2 rounded-full bg-[#76EDBB] animate-ping" />
                            </div>
                          )}
                        </div>

                        {/* Name & Role */}
                        <div className="flex flex-col">
                          <h4
                            className={`font-heading text-lg sm:text-2xl font-black uppercase tracking-tight transition-all duration-300 ${
                              isSelected
                                ? "text-[#76EDBB] translate-x-1"
                                : "text-white group-hover:text-[#76EDBB]"
                            }`}
                          >
                            {creator.name}
                          </h4>
                          <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider">
                            {creator.role}
                          </span>
                        </div>
                      </div>

                      {/* Right: Location & Sound Genre Tag */}
                      <div className="hidden sm:flex flex-col items-end text-right">
                        <span className="font-mono text-xs text-neutral-300 font-bold uppercase tracking-wider">
                          {creator.location}
                        </span>
                        <span className="font-mono text-[11px] text-neutral-500 uppercase tracking-tight">
                          {creator.genre}
                        </span>
                      </div>

                      {/* Mobile Location Badge */}
                      <div className="sm:hidden">
                        <span className="font-mono text-[10px] text-[#76EDBB] border border-[#76EDBB]/30 px-2 py-0.5 rounded-full uppercase">
                          {creator.location}
                        </span>
                      </div>
                    </div>

                    {/* Expanded Detail Tray when Selected */}
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs"
                      >
                        <div className="text-neutral-400 uppercase">
                          <span className="text-[#76EDBB]">FOCUS:</span> {creator.collabTitle}
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-neutral-500 uppercase">{creator.bpm}</span>
                          <span className="text-neutral-700">•</span>
                          <span className="text-neutral-400 uppercase">{creator.handle}</span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* BOTTOM ACCENT BAR */}
        <div className="w-full max-w-7xl mx-auto pt-3 border-t border-white/5 flex items-center justify-between font-mono text-[11px] text-neutral-500 flex-shrink-0">
          <div>BERLIN SANCTUARY // AMSTERDAM SOUND LAB RESIDENCY</div>
          <div className="text-[#76EDBB]">SCROLL TO EXPLORE ALL RESIDENTS ↓</div>
        </div>
      </div>

      {/* Detailed Artist Dossier Modal */}
      <AnimatePresence>
        {selectedDossier && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl select-none"
            onClick={() => setSelectedDossier(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl shadow-black p-6 sm:p-8 space-y-6"
            >
              <button
                onClick={() => setSelectedDossier(null)}
                data-cursor="hover"
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 border border-white/10 hover:border-[#76EDBB] text-white hover:text-[#76EDBB] flex items-center justify-center text-sm transition-colors cursor-pointer"
                aria-label="Close"
              >
                ✕
              </button>

              <div className="flex items-center gap-4">
                <img
                  src={selectedDossier.image}
                  alt={selectedDossier.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-[#76EDBB]/50"
                />
                <div>
                  <div className="font-mono text-[10px] text-[#76EDBB] uppercase tracking-widest">
                    {selectedDossier.location} RESIDENT • {selectedDossier.bpm}
                  </div>
                  <h3 className="font-heading text-2xl sm:text-3xl font-black uppercase text-white">
                    {selectedDossier.name}
                  </h3>
                  <div className="font-mono text-xs text-neutral-400 uppercase">
                    {selectedDossier.role}
                  </div>
                </div>
              </div>

              <p className="font-mono text-xs sm:text-sm text-neutral-300 leading-relaxed uppercase border-y border-white/5 py-4">
                "{selectedDossier.bio}"
              </p>

              <div>
                <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block mb-2">
                  STUDIO ARSENAL & HARDWARE:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDossier.gear.map((item, gIdx) => (
                    <span
                      key={gIdx}
                      className="font-mono text-[10px] bg-neutral-900 border border-neutral-800/80 px-2.5 py-1 rounded-md text-neutral-300 uppercase"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => {
                    setSelectedDossier(null);
                    setIsJoinModalOpen(true);
                  }}
                  data-cursor="hover"
                  className="flex-1 bg-[#76EDBB] hover:bg-white text-black font-heading font-black text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl shadow-lg transition-all text-center cursor-pointer active:scale-95"
                >
                  REQUEST STUDIO SESSION ↗
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Application Modal */}
      <BookingModal
        event={
          isJoinModalOpen
            ? {
                id: "creator-apply",
                day: "NOW",
                month: "OPEN",
                year: "2026",
                title: "CREATOR & DJ RESIDENCY APPLICATION",
                artist: "HOUSE OF BEATS CULTURE BOARD",
                tag: "OPEN ACCESS",
                location: "BERLIN / AMSTERDAM LABS",
                time: "APPLICATION PASS",
                featuredImage: "",
                description: "Submit your mix or portfolio for our upcoming residency drops."
              }
            : null
        }
        onClose={() => setIsJoinModalOpen(false)}
      />
    </section>
  );
}
