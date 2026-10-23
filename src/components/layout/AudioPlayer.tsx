"use client";

import React from "react";
import { useAudio } from "@/context/AudioContext";
import { Equalizer } from "@/components/ui/Equalizer";

export function AudioPlayer() {
  const { isPlaying, isMuted, currentTrack, togglePlay, toggleMute, audioLevels, hasStarted } = useAudio();


  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 sm:left-8 sm:translate-x-0 z-40 flex items-center gap-4 bg-black/90 backdrop-blur-xl border border-neutral-800 px-4 py-3 rounded-full shadow-2xl text-white pointer-events-auto transition-transform duration-300 hover:scale-105">
      {/* Equalizer visualizer */}
      <Equalizer isPlaying={isPlaying && !isMuted} levels={audioLevels} />

      {/* Track info */}
      <div className="flex flex-col max-w-[140px] sm:max-w-[180px] overflow-hidden">
        <span className="font-mono text-[10px] text-neutral-400 truncate uppercase">
          NOW PLAYING
        </span>
        <span className="font-heading text-xs font-bold text-[--mint] truncate uppercase tracking-tight">
          {currentTrack.title}
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 pl-2 border-l border-neutral-800">
        <button
          onClick={togglePlay}
          data-cursor="button"
          aria-label={isPlaying ? "Pause music" : "Play music"}
          className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-[--mint] hover:text-black border border-neutral-700 flex items-center justify-center text-xs transition-colors"
        >
          {isPlaying ? "❚❚" : "▶"}
        </button>

        <button
          onClick={toggleMute}
          data-cursor="button"
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 flex items-center justify-center text-xs text-neutral-400 hover:text-white transition-colors"
        >
          {isMuted ? "🔇" : "🔊"}
        </button>
      </div>
    </div>
  );
}
