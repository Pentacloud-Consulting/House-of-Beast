"use client";

import React from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // Speed multiplier (1 = ~35s, 1.5 = ~24s)
  reverse?: boolean;
  fadeEdges?: boolean;
  pauseOnHover?: boolean;
}

export function Marquee({
  children,
  className = "",
  speed = 1,
  reverse = false,
  fadeEdges = false,
  pauseOnHover = true,
}: MarqueeProps) {
  const prefersReduced = useReducedMotion();
  const safeSpeed = Math.max(0.2, speed || 1);
  const duration = Math.max(8, 38 / safeSpeed);

  return (
    <div
      className={`relative w-full overflow-hidden whitespace-nowrap select-none ${
        pauseOnHover ? "marquee-pause-on-hover" : ""
      } ${className}`}
    >
      {fadeEdges && (
        <>
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-36 z-20 bg-gradient-to-r from-black via-black/80 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-36 z-20 bg-gradient-to-l from-black via-black/80 to-transparent" />
        </>
      )}

      {/* GPU hardware-accelerated continuous infinite CSS loop */}
      <div
        className={`flex items-center w-max ${
          prefersReduced ? "" : reverse ? "animate-marquee-right" : "animate-marquee-left"
        }`}
        style={{
          animationDuration: `${duration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {/* First Half (0% to -50% shift target) */}
        <div className="flex items-center flex-shrink-0 gap-8 pr-8">
          {children}
        </div>
        <div className="flex items-center flex-shrink-0 gap-8 pr-8">
          {children}
        </div>
        <div className="flex items-center flex-shrink-0 gap-8 pr-8">
          {children}
        </div>
        <div className="flex items-center flex-shrink-0 gap-8 pr-8">
          {children}
        </div>

        {/* Second Half (Exact pixel-identical duplicate for seamless 100% loop) */}
        <div className="flex items-center flex-shrink-0 gap-8 pr-8">
          {children}
        </div>
        <div className="flex items-center flex-shrink-0 gap-8 pr-8">
          {children}
        </div>
        <div className="flex items-center flex-shrink-0 gap-8 pr-8">
          {children}
        </div>
        <div className="flex items-center flex-shrink-0 gap-8 pr-8">
          {children}
        </div>
      </div>
    </div>
  );
}
