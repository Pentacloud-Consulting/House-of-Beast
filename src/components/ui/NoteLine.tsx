"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface NoteLineProps {
  isVisible?: boolean;
}

export function NoteLine({ isVisible = true }: NoteLineProps) {
  const pathRef = useRef<SVGPathElement | null>(null);
  const dotRef = useRef<SVGGElement | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !pathRef.current || !dotRef.current || !isVisible) return;

    const path = pathRef.current;
    const length = path.getTotalLength();

    // Set initial dasharray and offset
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length
    });

    const trigger = ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        const currentOffset = length * (1 - progress);
        gsap.set(path, { strokeDashoffset: currentOffset });

        // Update dot position at the leading edge of the line
        const point = path.getPointAtLength(length * progress);
        gsap.set(dotRef.current, { x: point.x, y: point.y });
      }
    });

    return () => {
      trigger.kill();
    };
  }, [isVisible, prefersReduced]);

  if (prefersReduced) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-20 w-full h-full transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Subtle background path track */}
        <path
          d="M 50,0 Q 52,25 48,50 T 50,100"
          stroke="rgba(118, 237, 187, 0.1)"
          strokeWidth="0.15"
          vectorEffect="non-scaling-stroke"
        />
        {/* Scrubbing line path */}
        <path
          ref={pathRef}
          d="M 50,0 Q 52,25 48,50 T 50,100"
          stroke="#76EDBB"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
        />
        {/* Music Note Dot at the head of the drawing stroke */}
        <g ref={dotRef} className="transform-gpu">
          <circle r="6" fill="#76EDBB" className="animate-ping opacity-75" />
          <circle r="4" fill="#76EDBB" />
          <path
            d="M 2 -4 V -12 H 7 V -8 H 2"
            stroke="#000000"
            strokeWidth="1.5"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
}
