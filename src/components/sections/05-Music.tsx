"use client";

import React, { useState } from "react";
import { PLAYLISTS_DATA, Playlist } from "@/data/playlists";
import { useAudio } from "@/context/AudioContext";
import { Equalizer } from "@/components/ui/Equalizer";

export function SectionMusic() {
  const { currentTrack, isPlaying, playTrack, togglePlay } = useAudio();
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const tags = ["ALL", "Warm-up", "Peak Hour", "After Hours", "Lobby Selects"];

  const filteredPlaylists =
    activeFilter === "ALL"
      ? PLAYLISTS_DATA
      : PLAYLISTS_DATA.filter((pl) => pl.tag === activeFilter);

  const handlePlayPlaylist = (pl: Playlist) => {
    if (currentTrack.id === pl.id) {
      togglePlay();
    } else {
      playTrack({
        id: pl.id,
        title: pl.title,
        artist: pl.dj,
        audioUrl: pl.audioUrl
      });
    }
  };

  return (
    <section id="music" className="relative w-full bg-[#050505] text-white py-28 px-6 sm:px-12 border-t border-neutral-900 select-none">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#76EDBB] tracking-widest uppercase mb-3 bg-[#76EDBB]/10 px-3 py-1 rounded-full border border-[#76EDBB]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#76EDBB] animate-ping" />
            <span>05 // SOUND LAB & CURATION</span>
          </div>
          <h2 className="font-heading text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white drop-shadow-md">
            TUNE <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#76EDBB]">IN</span>
          </h2>
        </div>
        <div className="max-w-xs space-y-1">
          <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider">
            24-HOUR SONIC ARCHITECTURE CURATED BY OUR RESIDENT SELECTORS.
          </p>
          <div className="flex items-center gap-2 font-mono text-[10px] text-[#76EDBB]">
            <span>✦ VINYL & DIGITAL ARCHIVE</span>
          </div>
        </div>
      </div>

      {/* Modern Pill Filter Tabs - Perfectly Aligned with Soft Ambient Glow */}
      <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto no-scrollbar py-4 mb-12 relative z-10">
        {tags.map((tag) => {
          const isActive = activeFilter === tag;
          return (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              style={
                isActive
                  ? {
                      backgroundColor: "#76EDBB",
                      color: "#000000",
                      borderColor: "#76EDBB",
                      boxShadow: "0 4px 20px -2px rgba(118, 237, 187, 0.4)"
                    }
                  : {
                      backgroundColor: "#171717",
                      color: "#E5E5E5",
                      borderColor: "#262626"
                    }
              }
              className="h-11 px-7 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-200 cursor-pointer flex items-center justify-center shrink-0 border font-bold hover:border-neutral-500 hover:text-white"
            >
              <span>{tag}</span>
            </button>
          );
        })}
      </div>

      {/* Premium Vinyl Record Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 relative z-10">
        {filteredPlaylists.map((pl) => {
          const isThisPlaying = currentTrack.id === pl.id && isPlaying;
          const isHovered = hoveredCardId === pl.id;

          return (
            <div
              key={pl.id}
              onClick={() => handlePlayPlaylist(pl)}
              onMouseEnter={() => setHoveredCardId(pl.id)}
              onMouseLeave={() => setHoveredCardId(null)}
              className={`group relative rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-8 cursor-pointer transition-all duration-500 overflow-visible ${
                isThisPlaying
                  ? "bg-neutral-900 border-2 border-[#76EDBB] shadow-[0_15px_40px_rgba(118,237,187,0.25)]"
                  : "bg-neutral-950 hover:bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 shadow-xl"
              }`}
            >
              {/* Left Column: Cover Sleeve + Slide-Out Vinyl Record */}
              <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex-shrink-0">
                {/* Vinyl Record (Slides out to the right on hover or when playing) */}
                <div
                  className={`absolute inset-0 z-0 w-44 h-44 sm:w-48 sm:h-48 rounded-full bg-[#0a0a0a] border-4 border-neutral-800 flex items-center justify-center shadow-2xl transition-all duration-700 ease-out ${
                    isThisPlaying
                      ? "translate-x-14 sm:translate-x-16 rotate-[360deg] animate-[spin_5s_linear_infinite]"
                      : isHovered
                      ? "translate-x-12 sm:translate-x-14 rotate-90"
                      : "translate-x-0 rotate-0"
                  }`}
                  style={{
                    boxShadow: isThisPlaying
                      ? `0 0 30px ${pl.vinylColor}40`
                      : "0 10px 25px rgba(0,0,0,0.8)"
                  }}
                >
                  {/* Concentric Realistic Vinyl Grooves */}
                  <div className="w-36 h-36 rounded-full border border-neutral-800/80 flex items-center justify-center">
                    <div className="w-28 h-28 rounded-full border border-neutral-800/60 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full border border-neutral-800/40 flex items-center justify-center">
                        {/* Center Vinyl Center Label with dynamic color */}
                        <div
                          className="w-14 h-14 rounded-full flex flex-col items-center justify-center border-2 border-black/40 font-mono text-[7px] font-black text-black tracking-tighter"
                          style={{ backgroundColor: pl.vinylColor }}
                        >
                          <span>HOB</span>
                          <span className="text-[5px] opacity-80">{pl.bpm}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sleeve Cover Art Container (Sits above the vinyl) */}
                <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden border border-neutral-700/80 bg-neutral-900 shadow-2xl transition-transform duration-500 group-hover:-translate-x-2">
                  <img
                    src={pl.coverImage}
                    alt={pl.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  {/* Sleeve Gloss Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-white/10" />

                  {/* BPM Tag on Sleeve */}
                  <div className="absolute top-3 left-3 bg-black/90 backdrop-blur-md px-2.5 py-1 rounded-full font-mono text-[9px] font-bold text-[#76EDBB] border border-neutral-700">
                    {pl.bpm} BPM
                  </div>

                  {/* Overlay Play Indicator on sleeve */}
                  <div
                    className={`absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center transition-opacity duration-300 ${
                      isThisPlaying || isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-[#76EDBB] text-black flex items-center justify-center font-black text-base shadow-[0_0_20px_rgba(118,237,187,0.8)] transform transition-transform group-hover:scale-110">
                      {isThisPlaying ? "❚❚" : "▶"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Playlist Info & Action */}
              <div className="flex-1 space-y-3.5 text-center sm:text-left z-20 w-full">
                {/* Tag & Equalizer Row */}
                <div className="flex items-center justify-center sm:justify-start gap-2.5">
                  <span className="font-mono text-[10px] bg-neutral-900 border border-neutral-700 text-[#76EDBB] px-3 py-1 rounded-full uppercase font-bold tracking-wider">
                    {pl.tag}
                  </span>
                  {isThisPlaying ? (
                    <div className="flex items-center gap-1.5 bg-[#76EDBB]/15 border border-[#76EDBB]/40 px-2.5 py-0.5 rounded-full">
                      <Equalizer isPlaying={true} barCount={4} color="bg-[#76EDBB]" className="h-3.5" />
                      <span className="font-mono text-[9px] text-[#76EDBB] uppercase font-bold">PLAYING</span>
                    </div>
                  ) : null}
                </div>

                {/* Title */}
                <h3 className="font-heading text-2xl sm:text-3xl font-black uppercase tracking-tight text-white group-hover:text-[#76EDBB] transition-colors duration-300">
                  {pl.title}
                </h3>

                {/* Curator DJ */}
                <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider">
                  CURATED BY <span className="text-white font-semibold">{pl.dj}</span>
                </p>

                {/* Play Button & Track Count */}
                <div className="pt-2 flex items-center justify-center sm:justify-start gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayPlaylist(pl);
                    }}
                    style={
                      isThisPlaying
                        ? {
                            backgroundColor: "#FFFFFF",
                            color: "#000000",
                            boxShadow: "0 0 20px rgba(255, 255, 255, 0.4)"
                          }
                        : {
                            backgroundColor: "#76EDBB",
                            color: "#000000",
                            boxShadow: "0 0 20px rgba(118, 237, 187, 0.5)"
                          }
                    }
                    className="flex items-center gap-2 font-heading font-black text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
                  >
                    <span>{isThisPlaying ? "PAUSE MIX" : "PLAY MIX"}</span>
                    <span>{isThisPlaying ? "❚❚" : "♫"}</span>
                  </button>
                  <span className="font-mono text-xs text-neutral-300 font-bold tracking-wider">
                    {pl.tracks.length} TRACKS
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
