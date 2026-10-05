"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // base speed multiplier
  reverse?: boolean;
}

export function Marquee({ children, className = "", speed = 1, reverse = false }: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !trackRef.current) return;

    let xPos = 0;
    const dir = reverse ? -1 : 1;
    let currentVelocity = 0;

    const scrollTriggerInst = ScrollTrigger.create({
      onUpdate: (self) => {
        currentVelocity = self.getVelocity() * 0.005;
      }
    });

    const updateMarquee = () => {
      if (!trackRef.current) return;

      const baseSpeed = 1.5 * speed * dir;
      // Combine base speed with scroll velocity boost
      const effectiveSpeed = baseSpeed + currentVelocity * dir;

      xPos -= effectiveSpeed;

      // Wrap around when reached 50% width
      const width = trackRef.current.scrollWidth / 2;
      if (Math.abs(xPos) >= width) {
        xPos = 0;
      } else if (xPos > 0) {
        xPos = -width;
      }

      gsap.set(trackRef.current, { x: xPos });

      // Decay velocity
      currentVelocity *= 0.92;
    };

    gsap.ticker.add(updateMarquee);

    return () => {
      gsap.ticker.remove(updateMarquee);
      scrollTriggerInst.kill();
    };
  }, [prefersReduced, reverse, speed]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden whitespace-nowrap select-none ${className}`}
    >
      <div ref={trackRef} className="inline-flex items-center gap-8 transform-gpu">
        <div className="inline-flex items-center gap-8">{children}</div>
        <div className="inline-flex items-center gap-8">{children}</div>
      </div>
    </div>
  );
}
