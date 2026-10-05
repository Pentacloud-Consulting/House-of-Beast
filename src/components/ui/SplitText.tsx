"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SplitTextProps {
  children: string;
  className?: string;
  type?: "chars" | "words" | "lines";
  stagger?: number;
  delay?: number;
  as?: React.ElementType;
}

export function SplitText({
  children,
  className = "",
  type = "words",
  stagger = 0.04,
  delay = 0,
  as: Component = "div"
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const targets = containerRef.current?.querySelectorAll(".split-item");
      if (!targets || targets.length === 0) return;

      gsap.fromTo(
        targets,
        {
          yPercent: 120,
          opacity: 0,
          rotateX: type === "chars" ? -45 : 0
        },
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.1,
          ease: "power4.out",
          stagger: stagger,
          delay: delay,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [children, delay, prefersReduced, stagger, type]);

  if (prefersReduced) {
    return <Component className={className}>{children}</Component>;
  }

  const words = children.split(" ");

  if (type === "words") {
    return (
      <Component ref={containerRef} className={`inline-block ${className}`}>
        {words.map((word, wIdx) => (
          <span key={wIdx} className="inline-block overflow-hidden align-top mr-[0.25em]">
            <span className="split-item inline-block transform-gpu">{word}</span>
          </span>
        ))}
      </Component>
    );
  }

  if (type === "chars") {
    return (
      <Component ref={containerRef} className={`inline-block ${className}`}>
        {words.map((word, wIdx) => (
          <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
            {word.split("").map((char, cIdx) => (
              <span key={cIdx} className="inline-block overflow-hidden align-top">
                <span className="split-item inline-block transform-gpu">{char}</span>
              </span>
            ))}
          </span>
        ))}
      </Component>
    );
  }

  // lines
  return (
    <Component ref={containerRef} className={`block overflow-hidden ${className}`}>
      <span className="split-item block transform-gpu">{children}</span>
    </Component>
  );
}
