"use client";

import React from "react";

interface EqualizerProps {
  isPlaying?: boolean;
  levels?: number[];
  barCount?: number;
  className?: string;
  color?: string;
}

export function Equalizer({
  isPlaying = false,
  levels = [0.4, 0.7, 0.3, 0.9, 0.5],
  barCount = 5,
  className = "",
  color = "bg-[--mint]"
}: EqualizerProps) {
  const bars = levels.slice(0, barCount);

  return (
    <div className={`flex items-end gap-1 h-5 ${className}`} aria-hidden="true">
      {bars.map((level, idx) => (
        <span
          key={idx}
          className={`w-1 rounded-full transition-all duration-150 ${color}`}
          style={{
            height: isPlaying ? `${Math.max(15, level * 100)}%` : "20%"
          }}
        />
      ))}
    </div>
  );
}
