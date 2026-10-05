"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function CustomCursor() {
  const isTouch = useMediaQuery("(pointer: coarse)");
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [cursorMode, setCursorMode] = useState<"default" | "hover" | "play" | "drag" | "book">("default");

  useEffect(() => {
    if (isTouch) return;

    let animFrame: number;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Check cursor data attributes on target element
      const target = e.target as HTMLElement;
      const cursorTarget = target?.closest("[data-cursor]") as HTMLElement;

      if (cursorTarget) {
        const mode = cursorTarget.getAttribute("data-cursor") as any;
        if (mode) setCursorMode(mode);
      } else if (target?.closest("a, button, input, [role='button']")) {
        setCursorMode("hover");
      } else {
        setCursorMode("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Lerped trailing ring animation
    const updateTrailing = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.18,
        y: prev.y + (pos.y - prev.y) * 0.18
      }));
      animFrame = requestAnimationFrame(updateTrailing);
    };
    animFrame = requestAnimationFrame(updateTrailing);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animFrame);
    };
  }, [isTouch, pos.x, pos.y]);

  if (isTouch) return null;

  const isBubble = cursorMode === "play" || cursorMode === "drag" || cursorMode === "book";

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none">
      {/* Center Mint Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-[--mint] rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ left: pos.x, top: pos.y }}
        animate={{
          scale: isBubble ? 0 : cursorMode === "hover" ? 1.5 : 1
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Trailing Ring or Custom Label Bubble */}
      <motion.div
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-heading font-black text-[10px] tracking-widest uppercase transition-all duration-200 ${
          isBubble
            ? "w-16 h-16 rounded-full bg-[--mint] text-black shadow-lg"
            : cursorMode === "hover"
            ? "w-12 h-12 rounded-full border-2 border-white mix-blend-difference bg-white/20"
            : "w-8 h-8 rounded-full border border-[--mint]/60 bg-transparent"
        }`}
        style={{ left: trailingPos.x, top: trailingPos.y }}
      >
        {isBubble && <span>{cursorMode}</span>}
      </motion.div>
    </div>
  );
}
