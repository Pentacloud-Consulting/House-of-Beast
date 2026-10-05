"use client";

import React, { useEffect, useRef } from "react";

export function GrainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = 200);
    let height = (canvas.height = 200);

    const generateNoise = () => {
      const imgData = ctx.createImageData(width, height);
      const buffer = new Uint32Array(imgData.data.buffer);
      const len = buffer.length;

      for (let i = 0; i < len; i++) {
        if (Math.random() < 0.15) {
          // White grain pixel with varying alpha
          const alpha = Math.floor(Math.random() * 40);
          buffer[i] = (alpha << 24) | (255 << 16) | (255 << 8) | 255;
        }
      }
      ctx.putImageData(imgData, 0, 0);
    };

    let frame = 0;
    const loop = () => {
      frame++;
      if (frame % 3 === 0) {
        generateNoise();
      }
      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-30 opacity-[0.06] overflow-hidden mix-blend-overlay">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover repeat"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
}
