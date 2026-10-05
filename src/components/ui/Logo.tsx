"use client";

import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
  color?: string;
}

export function Logo({ className = "", size = 40, color = "currentColor" }: LogoProps) {
  return (
    <svg
      width={size}
      height={size * 1.15}
      viewBox="0 0 100 115"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${className}`}
      aria-label="House of Beats B Logo"
    >
      {/* Outer B Shape with music note cut-out */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 5H60C78 5 90 14 90 29C90 39.5 83 48 72 52.5C86 57 95 67 95 83C95 100 81 110 60 110H10V5ZM35 25V43H56C64 43 69 39 69 34C69 29 64 25 56 25H35ZM35 65V90H60C69 90 74 85 74 77.5C74 70 69 65 60 65H35Z"
        fill={color}
      />
      {/* Cutout details for beat / note motif */}
      <circle cx="48" cy="78" r="7" fill="black" />
      <path d="M55 78V68H64V78H55Z" fill="black" />
    </svg>
  );
}
