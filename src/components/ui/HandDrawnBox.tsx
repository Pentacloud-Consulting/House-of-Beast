"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HandDrawnBoxProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
}

export function HandDrawnBox({ children, className = "", color = "#76EDBB" }: HandDrawnBoxProps) {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !pathRef.current || !containerRef.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length
    });

    const trigger = gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.2,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });

    return () => {
      trigger.scrollTrigger?.kill();
    };
  }, [prefersReduced]);

  return (
    <span ref={containerRef} className={`relative inline-block px-4 py-2 my-1 ${className}`}>
      <span className="relative z-10">{children}</span>
      {/* SVG Outline positioned safely OUTSIDE the text area using negative inset */}
      <svg
        className="absolute -inset-2.5 w-[calc(100%+1.25rem)] h-[calc(100%+1.25rem)] pointer-events-none overflow-visible z-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          ref={pathRef}
          d="M 3,4 C 30,1 70,2 97,5 C 99,35 96,65 97,96 C 70,98 30,97 3,95 C 1,65 4,35 3,4 Z"
          stroke={color}
          strokeWidth="2.5"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
