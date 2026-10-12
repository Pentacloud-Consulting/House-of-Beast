"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FeedItem, fetchFeed } from "@/data/feed";
import { VideoCard } from "@/components/ui/VideoCard";
import { Logo } from "@/components/ui/Logo";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SectionSocialFeed() {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [activeStory, setActiveStory] = useState<FeedItem | null>(null);
  const [activeStoryIndex, setActiveStoryIndex] = useState<number>(0);

  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const railContainerRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    fetchFeed().then((data) => setFeedItems(data));
  }, []);

  useEffect(() => {
    if (prefersReduced || !sectionRef.current || !railRef.current || feedItems.length === 0) return;

    const section = sectionRef.current;
    const rail = railRef.current;
    const header = headerRef.current;
    const railContainer = railContainerRef.current;

    const ctx = gsap.context(() => {
      const getScrollAmount = () => {
        const railWidth = rail.scrollWidth;
        return -(railWidth - window.innerWidth + 80);
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.abs(getScrollAmount()) + 200}`,
          scrub: 0.8,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true
        }
      });

      // 1. Header slides up and fades out smoothly
      if (header) {
        tl.to(header, { y: -90, opacity: 0, duration: 0.4, ease: "power1.out" }, 0);
      }

      // 2. Rail container shifts UP to occupy header space so cards are never cut off at bottom
      if (railContainer) {
        tl.to(railContainer, { y: -65, duration: 0.4, ease: "power1.out" }, 0);
      }

      // 3. Rail translates horizontally right to left
      tl.to(rail, {
        x: getScrollAmount,
        ease: "none",
        duration: 2
      }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, [feedItems, prefersReduced]);

  const handleCardClick = (item: FeedItem) => {
    const idx = feedItems.findIndex((f) => f.id === item.id);
    setActiveStoryIndex(idx >= 0 ? idx : 0);
    setActiveStory(item);
  };

  const handleNextStory = () => {
    if (activeStoryIndex < feedItems.length - 1) {
      const nextIdx = activeStoryIndex + 1;
      setActiveStoryIndex(nextIdx);
      setActiveStory(feedItems[nextIdx]);
    } else {
      setActiveStory(null);
    }
  };

  const handlePrevStory = () => {
    if (activeStoryIndex > 0) {
      const prevIdx = activeStoryIndex - 1;
      setActiveStoryIndex(prevIdx);
      setActiveStory(feedItems[prevIdx]);
    }
  };

  return (
    <section
      id="social-feed"
      ref={sectionRef}
      className="relative w-full h-screen bg-black text-white pt-20 pb-8 px-6 sm:px-12 overflow-hidden flex flex-col justify-between select-none"
    >
      {/* Section Header - Fades & slides up on scroll */}
      <div
        ref={headerRef}
        className="max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between mb-2 gap-3 z-10 transform-gpu"
      >
        <div>
          <div className="font-mono text-[10px] sm:text-xs text-neutral-400 tracking-widest uppercase mb-1">
            [ 03 // COMMUNITY & UGC ]
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase tracking-tight text-white flex items-center gap-3">
            <span>LIVE FROM THE BEAT</span>
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#76EDBB] opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#76EDBB]" />
            </span>
          </h2>
        </div>
        <p className="font-mono text-[10px] sm:text-xs text-neutral-400 uppercase max-w-xs tracking-wider">
          UNFILTERED DISPATCHES FROM OUR CREATIVE ECOSYSTEM. SCROLL TO EXPLORE CARDS.
        </p>
      </div>

      {/* Horizontal Scroll Rail Container - Shifts UP on scroll */}
      <div ref={railContainerRef} className="relative w-full overflow-hidden my-auto py-8 sm:py-10 transform-gpu">
        <div
          ref={railRef}
          data-cursor="drag"
          className="flex gap-4 sm:gap-6 lg:gap-7 items-center w-max px-4 transform-gpu"
        >
          {feedItems.map((item, idx) => {
            const isUp = idx % 2 === 0;
            return (
              <div
                key={item.id}
                className={`transition-transform duration-300 transform-gpu ${
                  isUp ? "-translate-y-5 sm:-translate-y-8" : "translate-y-5 sm:translate-y-8"
                }`}
              >
                <VideoCard
                  item={item}
                  onClick={handleCardClick}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Cue */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-neutral-500 uppercase tracking-widest z-10 pt-2 border-t border-neutral-900">
        <span>HORIZONTAL SONIC DISPATCHES</span>
        <span className="text-[#76EDBB]">03 / 08</span>
      </div>

      {/* Fullscreen Vertical Story Modal */}
      <AnimatePresence>
        {activeStory && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-0 sm:p-6"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveStory(null)}
              aria-label="Close story viewer"
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-neutral-900 border border-neutral-800 text-white font-mono text-sm hover:border-[#76EDBB]"
            >
              ✕
            </button>

            {/* Story Card Mobile Format */}
            <div className="relative w-full sm:max-w-sm h-full sm:h-[85vh] bg-neutral-950 rounded-none sm:rounded-3xl overflow-hidden border border-neutral-800 flex flex-col justify-between shadow-2xl">
              {/* Top Progress Bars */}
              <div className="absolute top-4 left-4 right-4 z-20 flex gap-1.5">
                {feedItems.map((_, i) => (
                  <div key={i} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-[#76EDBB] transition-all duration-300 ${
                        i < activeStoryIndex ? "w-full" : i === activeStoryIndex ? "w-full animate-pulse" : "w-0"
                      }`}
                    />
                  </div>
                ))}
              </div>

              {/* Story Video / Media */}
              <div className="absolute inset-0 z-0 bg-black">
                {activeStory.videoUrl ? (
                  <video
                    src={activeStory.videoUrl}
                    poster={activeStory.thumbnail}
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={activeStory.thumbnail}
                    alt={activeStory.caption}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60" />
              </div>

              {/* Left/Right Tap Overlay Controls */}
              <div className="absolute inset-0 z-10 flex">
                <div onClick={handlePrevStory} className="w-1/2 h-full cursor-pointer" />
                <div onClick={handleNextStory} className="w-1/2 h-full cursor-pointer" />
              </div>

              {/* Top User Header */}
              <div className="relative z-20 p-6 pt-10 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-3">
                  <img
                    src={activeStory.userAvatar}
                    alt={activeStory.username}
                    className="w-8 h-8 rounded-full object-cover border border-[#76EDBB]"
                  />
                  <div>
                    <div className="font-heading font-bold text-sm text-white">{activeStory.username}</div>
                    <div className="font-mono text-[10px] text-neutral-400">{activeStory.timestamp}</div>
                  </div>
                </div>
                <Logo size={24} className="text-[#76EDBB]" />
              </div>

              {/* Bottom Details */}
              <div className="relative z-20 p-6 pointer-events-none space-y-3">
                <p className="text-sm font-sans text-white leading-relaxed drop-shadow-md">
                  {activeStory.caption}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-white/10 font-mono text-xs text-[#76EDBB]">
                  <span>♥ {activeStory.likes} LIKES</span>
                  <span>{activeStory.location}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
