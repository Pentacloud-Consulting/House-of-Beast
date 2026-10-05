"use client";

import React, { useRef, useState } from "react";
import { FeedItem } from "@/data/feed";

interface VideoCardProps {
  item: FeedItem;
  onClick: (item: FeedItem) => void;
  className?: string;
}

export function VideoCard({ item, onClick, className = "" }: VideoCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // 3D tilt calculation
    const rx = (-y / rect.height) * 10;
    const ry = (x / rect.width) * 10;
    setTilt({ rx, ry });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rx: 0, ry: 0 });
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(item)}
      data-cursor="play"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale3d(${isHovered ? 1.04 : 1}, ${isHovered ? 1.04 : 1}, 1)`,
        transition: "transform 0.15s ease-out, filter 0.3s ease, border-color 0.3s ease"
      }}
      className={`relative flex-shrink-0 w-[180px] sm:w-[205px] lg:w-[215px] aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer group bg-neutral-950 border border-neutral-800/90 hover:border-[--mint]/60 shadow-2xl hover:shadow-[0_12px_32px_rgba(118,237,187,0.18)] ${className}`}
    >
      {/* Video or Thumbnail Poster */}
      <div className="absolute inset-0 bg-black">
        {item.videoUrl ? (
          <video
            ref={videoRef}
            src={item.videoUrl}
            poster={item.thumbnail}
            muted
            loop
            playsInline
            preload="metadata"
            className={`w-full h-full object-cover transition-all duration-500 ${
              isHovered ? "saturate-125 scale-105" : "saturate-75"
            }`}
          />
        ) : (
          <img
            src={item.thumbnail}
            alt={item.caption}
            className={`w-full h-full object-cover transition-all duration-500 ${
              isHovered ? "saturate-125 scale-105" : "saturate-75"
            }`}
          />
        )}
      </div>

      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

      {/* Top Header: Platform Icon + Username */}
      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
        <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
          <img
            src={item.userAvatar}
            alt={item.username}
            className="w-3.5 h-3.5 rounded-full object-cover"
          />
          <span className="text-[9px] font-semibold text-white tracking-wide truncate max-w-[85px]">{item.username}</span>
        </div>
        <div className="bg-black/70 backdrop-blur-md p-1 rounded-full border border-white/10 text-[--mint]">
          {item.platform === "instagram" ? (
            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          ) : (
            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.96-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.29-2.67.65-5.43 2.58-7.3 1.93-1.87 4.75-2.67 7.37-2.12v4.22c-1.37-.44-2.91-.25-4.1.48-1.2.73-1.99 2.06-2.04 3.47-.07 1.45.62 2.87 1.8 3.65 1.18.78 2.73.91 4.02.32 1.29-.58 2.16-1.89 2.19-3.31.06-3.89.02-7.78.04-11.67-.01-.01-.01-.02-.02-.03z" />
            </svg>
          )}
        </div>
      </div>

      {/* Bottom Info: Caption + Likes */}
      <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 flex flex-col gap-1">
        <p className="text-[10px] text-neutral-200 line-clamp-2 leading-tight drop-shadow-md font-sans">
          {item.caption}
        </p>
        <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[9px] text-neutral-400 font-mono">
          <span className="flex items-center gap-1 font-semibold text-[--mint]">
            ♥ {item.likes}
          </span>
          <span className="tracking-wider uppercase opacity-80 truncate max-w-[80px]">{item.location}</span>
        </div>
      </div>
    </div>
  );
}
