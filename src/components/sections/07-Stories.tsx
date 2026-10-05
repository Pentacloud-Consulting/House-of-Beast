"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STORIES_DATA } from "@/data/stories";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SectionStories() {
  const containerRef = useRef<HTMLElement | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll(".story-card");
      cards?.forEach((card) => {
        gsap.fromTo(
          card,
          { clipPath: "inset(20% 0% 20% 0%)", opacity: 0 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section
      id="stories"
      ref={containerRef}
      className="relative w-full bg-black text-white py-24 px-6 sm:px-12 border-t border-neutral-900"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="font-mono text-xs text-neutral-400 tracking-widest uppercase mb-2">
            [ 07 // EDITORIAL & DISPATCHES ]
          </div>
          <h2 className="font-heading text-4xl sm:text-7xl font-black uppercase tracking-tight text-white">
            CHRONICLES
          </h2>
        </div>
        <p className="font-mono text-xs text-neutral-400 uppercase max-w-xs tracking-wider">
          PEOPLE, CULTURE, AND CITY ESSAYS FROM OUR ANTIMONOTONY JOURNAL.
        </p>
      </div>

      {/* Magazine-Style Cover Cards */}
      <div className="max-w-7xl mx-auto space-y-16 lg:space-y-24">
        {STORIES_DATA.map((story, idx) => (
          <div
            key={story.id}
            className={`story-card group relative bg-neutral-950 border border-neutral-900 rounded-3xl overflow-hidden p-8 sm:p-12 flex flex-col ${
              idx % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
            } items-center gap-12 cursor-pointer hover:border-[--mint]/50 transition-colors duration-500`}
          >
            {/* Story Image with Zoom Hover */}
            <div className="relative w-full lg:w-1/2 aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800">
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 font-mono text-[10px] bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[--mint] uppercase">
                {story.category}
              </div>
            </div>

            {/* Content Column */}
            <div className="w-full lg:w-1/2 space-y-4 text-left">
              <div className="flex items-center gap-3 font-mono text-xs text-neutral-400 uppercase">
                <span>{story.date}</span>
                <span>•</span>
                <span>{story.readTime}</span>
              </div>

              <h3 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white group-hover:text-[--mint] transition-colors leading-tight">
                {story.title}
              </h3>

              <p className="font-heading text-sm text-neutral-300 font-semibold uppercase tracking-wider">
                {story.subtitle}
              </p>

              <p className="font-sans text-sm text-neutral-400 leading-relaxed max-w-md">
                {story.excerpt}
              </p>

              <div className="pt-4 flex items-center gap-2 font-mono text-xs text-[--mint] uppercase font-bold tracking-widest">
                <span>READ DISPATCH</span>
                <span className="group-hover:translate-x-2 transition-transform duration-300">
                  →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
