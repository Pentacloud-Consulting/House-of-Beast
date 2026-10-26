"use client";

import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type CursorMode = "default" | "hover" | "play" | "drag" | "book" | "text";

export function CustomCursor() {
  const isTouch = useMediaQuery("(pointer: coarse)");

  const [cursorMode, setCursorMode] = useState<CursorMode>("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // References for direct DOM updates
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const cursorModeRef = useRef<CursorMode>("default");
  const isClickingRef = useRef(false);

  useEffect(() => {
    cursorModeRef.current = cursorMode;
  }, [cursorMode]);

  useEffect(() => {
    if (isTouch) return;

    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (!isVisible) {
        setIsVisible(true);
        ringPos.current = { x: e.clientX, y: e.clientY };
      }

      // Update precision dot IMMEDIATELY (zero lag)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }

      // Detect cursor targets
      const target = e.target as HTMLElement;
      const cursorTarget = target?.closest("[data-cursor]") as HTMLElement;

      if (cursorTarget) {
        const mode = cursorTarget.getAttribute("data-cursor") as CursorMode;
        if (mode && mode !== cursorModeRef.current) {
          setCursorMode(mode);
        }
      } else if (target?.closest("input, textarea, [contenteditable='true']")) {
        if (cursorModeRef.current !== "text") setCursorMode("text");
      } else if (target?.closest("a, button, [role='button'], select, .cursor-pointer")) {
        if (cursorModeRef.current !== "hover") setCursorMode("hover");
      } else {
        if (cursorModeRef.current !== "default") setCursorMode("default");
      }
    };

    const handleMouseDown = () => {
      isClickingRef.current = true;
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      isClickingRef.current = false;
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Fluid trailing physics for the outer follower ring
    const render = () => {
      const targetX = mousePos.current.x;
      const targetY = mousePos.current.y;

      // Smooth lag factor for luxury fluid feel
      const ease = 0.22;
      ringPos.current.x += (targetX - ringPos.current.x) * ease;
      ringPos.current.y += (targetY - ringPos.current.y) * ease;

      if (ringRef.current) {
        const clickScale = isClickingRef.current ? 0.85 : 1;
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${clickScale})`;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [isTouch, isVisible]);

  if (isTouch) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden select-none"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.25s ease-out",
      }}
    >
      {/* 1. Precision Center Dot (Instant Tracking - Never lags or covers text) */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none will-change-transform z-[999999] flex items-center justify-center transition-opacity duration-150 ${
          cursorMode === "text" ? "opacity-0" : "opacity-100"
        }`}
      >
        <div
          className={`rounded-full bg-[#76EDBB] shadow-[0_0_8px_#76EDBB] transition-all duration-200 ${
            isClicking ? "w-2.5 h-2.5" : "w-1.5 h-1.5"
          }`}
        />
      </div>

      {/* 2. Fluid Trailing Follower Ring (Smooth physics - Delicate and translucent) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform z-[999998] flex items-center justify-center"
      >
        {/* Default Mode: Elegant thin circular reticle */}
        {cursorMode === "default" && (
          <div className="w-8 h-8 rounded-full border border-[#76EDBB]/50 bg-[#76EDBB]/[0.06] backdrop-blur-[1px] transition-all duration-200" />
        )}

        {/* Hover Mode: Expanded magnetic lens with crosshair accents */}
        {cursorMode === "hover" && (
          <div className="relative w-12 h-12 rounded-full border border-[#76EDBB] bg-[#76EDBB]/10 backdrop-blur-[2px] shadow-[0_0_15px_rgba(118,237,187,0.3)] transition-all duration-200 flex items-center justify-center">
            {/* Minimal reticle notches */}
            <span className="absolute -top-1 w-1.5 h-0.5 bg-[#76EDBB]" />
            <span className="absolute -bottom-1 w-1.5 h-0.5 bg-[#76EDBB]" />
            <span className="absolute -left-1 h-1.5 w-0.5 bg-[#76EDBB]" />
            <span className="absolute -right-1 h-1.5 w-0.5 bg-[#76EDBB]" />
          </div>
        )}

        {/* Play Mode: Translucent vinyl equalizer disc */}
        {cursorMode === "play" && (
          <div className="relative w-16 h-16 rounded-full bg-black/85 border border-[#76EDBB] shadow-[0_0_20px_rgba(118,237,187,0.4)] flex flex-col items-center justify-center gap-1 transition-all duration-200 backdrop-blur-md">
            <div className="flex items-end gap-1 h-3">
              <span className="w-0.5 bg-[#76EDBB] h-2 animate-pulse" />
              <span className="w-0.5 bg-[#76EDBB] h-3 animate-pulse delay-75" />
              <span className="w-0.5 bg-[#76EDBB] h-1.5 animate-pulse delay-150" />
              <span className="w-0.5 bg-[#76EDBB] h-2.5 animate-pulse delay-100" />
            </div>
            <span className="font-heading font-black text-[9px] tracking-widest text-[#76EDBB] uppercase">
              PLAY
            </span>
          </div>
        )}

        {/* Drag Mode: Glassmorphic pill */}
        {cursorMode === "drag" && (
          <div className="relative px-3.5 py-1.5 rounded-full bg-black/85 border border-[#76EDBB] shadow-[0_0_18px_rgba(118,237,187,0.35)] flex items-center justify-center gap-1.5 transition-all duration-200 backdrop-blur-md">
            <span className="font-heading font-black text-[10px] text-[#76EDBB]">‹</span>
            <span className="font-mono text-[9px] font-bold tracking-widest text-white uppercase">DRAG</span>
            <span className="font-heading font-black text-[10px] text-[#76EDBB]">›</span>
          </div>
        )}

        {/* Book Mode: Glassmorphic VIP pill (never blocks text) */}
        {cursorMode === "book" && (
          <div className="relative px-4 py-2 rounded-full bg-black/85 border border-[#76EDBB] shadow-[0_0_20px_rgba(118,237,187,0.4)] flex items-center justify-center gap-1.5 transition-all duration-200 backdrop-blur-md">
            <span className="font-heading font-black text-[10px] tracking-wider text-[#76EDBB] uppercase">
              BOOK ↗
            </span>
          </div>
        )}

        {/* Text Mode: Subtle vertical beam */}
        {cursorMode === "text" && (
          <div className="w-[2px] h-5 bg-[#76EDBB] shadow-[0_0_8px_#76EDBB] rounded-full animate-pulse" />
        )}
      </div>
    </div>
  );
}
