"use client";

import React, { useState } from "react";
import { PLAYLISTS_DATA, Playlist } from "@/data/playlists";
import { useAudio } from "@/context/AudioContext";
import { Equalizer } from "@/components/ui/Equalizer";

export function SectionMusic() {
  const { currentTrack, isPlaying, playTrack, togglePlay } = useAudio();
  const [activeFilter, setActiveFilter] = useState<string>("ALL");

  const tags = ["ALL", "Warm-up", "Peak Hour", "After Hours", "Lobby Selects"];

  const filteredPlaylists =
    activeFilter === "ALL"
      ? PLAYLISTS_DATA
      : PLAYLISTS_DATA.filter((pl) => pl.tag === activeFilter);

  const handlePlayPlaylist = (pl: Playlist) => {
    playTrack({
      id: pl.id,
      title: pl.title,
      artist: pl.dj,
      audioUrl: pl.audioUrl
    });
  };

  return (
    <section id="music" className="relative w-full bg-black text-white py-24 px-6 sm:px-12 border-t border-neutral-900">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="font-mono text-xs text-neutral-400 tracking-widest uppercase mb-2">
            [ 05 // SOUND LAB & CURATION ]
          </div>
          <h2 className="font-heading text-4xl sm:text-7xl font-black uppercase tracking-tight text-white">
            TUNE IN
          </h2>
        </div>
        <p className="font-mono text-xs text-neutral-400 uppercase max-w-xs tracking-wider">
          24-HOUR SONIC ARCHITECTURE CURATED BY OUR RESIDENT SELECTORS.
        </p>
      </div>

      {/* Filter Tags Bar */}
      <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto no-scrollbar pb-8 mb-8">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveFilter(tag)}
            className={`px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-200 ${
              activeFilter === tag
                ? "bg-[--mint] text-black font-bold shadow-[0_0_15px_rgba(118,237,187,0.4)]"
                : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Vinyl Record Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {filteredPlaylists.map((pl) => {
          const isThisPlaying = currentTrack.id === pl.id && isPlaying;

          return (
            <div
              key={pl.id}
              onClick={() => handlePlayPlaylist(pl)}
              data-cursor="play"
              className="group relative bg-neutral-950 border border-neutral-900 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-8 cursor-pointer hover:border-[--mint]/60 transition-colors duration-300"
            >
              {/* Sleeve + Interactive Sliding Spinning Vinyl Record */}
              <div className="relative w-48 h-48 flex-shrink-0">
                {/* Sleeve Cover Art */}
                <div className="absolute inset-0 z-10 rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-xl group-hover:-translate-x-3 transition-transform duration-500">
                  <img
                    src={pl.coverImage}
                    alt={pl.title}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full font-mono text-[9px] text-[--mint] uppercase">
                    {pl.bpm} BPM
                  </div>
                </div>

                {/* Vinyl Record (slides right & spins on hover or playing) */}
                <div
                  className={`absolute inset-0 z-0 w-48 h-48 rounded-full bg-black border-4 border-neutral-800 flex items-center justify-center shadow-2xl transition-all duration-500 ${
                    isThisPlaying
                      ? "translate-x-12 rotate-[360deg] animate-[spin_4s_linear_infinite]"
                      : "group-hover:translate-x-12 group-hover:rotate-180"
                  }`}
                >
                  {/* Vinyl Grooves */}
                  <div className="w-40 h-40 rounded-full border border-neutral-800/80 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border border-neutral-800/60 flex items-center justify-center">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center border-2 border-black font-mono text-[8px] font-bold text-black text-center p-1"
                        style={{ backgroundColor: pl.vinylColor }}
                      >
                        HOB
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Playlist Details & Audio Trigger */}
              <div className="flex-1 space-y-3 text-center sm:text-left z-20">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="font-mono text-[10px] bg-neutral-900 border border-neutral-800 text-[--mint] px-2.5 py-1 rounded-full uppercase">
                    {pl.tag}
                  </span>
                  {isThisPlaying && <Equalizer isPlaying={true} />}
                </div>

                <h3 className="font-heading text-2xl font-bold uppercase tracking-tight text-white group-hover:text-[--mint] transition-colors">
                  {pl.title}
                </h3>

                <p className="font-mono text-xs text-neutral-400 uppercase">
                  CURATED BY <span className="text-white">{pl.dj}</span>
                </p>

                {/* Track Count & Play Action */}
                <div className="pt-4 flex items-center justify-center sm:justify-start gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isThisPlaying) togglePlay();
                      else handlePlayPlaylist(pl);
                    }}
                    className="flex items-center gap-2 font-heading font-black text-xs uppercase tracking-wider px-5 py-2.5 rounded-full bg-[--mint] text-black hover:bg-white transition-colors"
                  >
                    <span>{isThisPlaying ? "PAUSE MIX" : "PLAY MIX ♫"}</span>
                  </button>
                  <span className="font-mono text-xs text-neutral-500">
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
