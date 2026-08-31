"use client";

import React from "react";
import { motion } from "framer-motion";

interface SanctuaryLogoMarkProps {
  size?: "sm" | "md" | "lg" | "hero";
  className?: string;
  showBlocks?: boolean;
}

export const SanctuaryLogoMark: React.FC<SanctuaryLogoMarkProps> = ({
  size = "md",
  className = "",
  showBlocks = true,
}) => {
  // Dimension mapping
  const sizeMap = {
    sm: { width: 32, height: 32, scale: 0.2 },
    md: { width: 40, height: 40, scale: 0.25 },
    lg: { width: 56, height: 56, scale: 0.35 },
    hero: { width: 280, height: 280, scale: 1.0 },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 ${className}`}
      style={{ width: currentSize.width, height: currentSize.height }}
    >
      <svg
        width={currentSize.width}
        height={currentSize.height}
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_12px_32px_rgba(139,92,246,0.3)]"
      >
        <defs>
          {/* Left Shield Facet Gradient (Darker Purple) */}
          <linearGradient id="shieldLeftFacet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="50%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#6D28D9" />
          </linearGradient>

          {/* Right Shield Facet Gradient (Lighter Facet Highlight) */}
          <linearGradient id="shieldRightFacet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C4B5FD" />
            <stop offset="50%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>

          {/* Shield Outer Glow */}
          <radialGradient id="shieldGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </radialGradient>

          {/* Glossy Top Reflection */}
          <linearGradient id="shieldReflection" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Ambient Glow */}
        <circle cx="150" cy="150" r="140" fill="url(#shieldGlow)" />

        {/* Floating Background Blocks Matrix (2 rows x 6 columns rounded tiles) */}
        {showBlocks && (
          <g opacity="0.45">
            {/* Top Row Blocks */}
            {[...Array(6)].map((_, i) => (
              <rect
                key={`top-blk-${i}`}
                x={48 + i * 36}
                y={62}
                width={28}
                height={26}
                rx={6}
                fill="#C4B5FD"
                opacity={0.35 + (i % 3) * 0.15}
              />
            ))}
            {/* Bottom Row Blocks */}
            {[...Array(6)].map((_, i) => (
              <rect
                key={`bot-blk-${i}`}
                x={48 + i * 36}
                y={96}
                width={28}
                height={26}
                rx={6}
                fill="#A78BFA"
                opacity={0.4 + (i % 3) * 0.15}
              />
            ))}
          </g>
        )}

        {/* Main 3D Shield Base - Left Facet */}
        <path
          d="M 150 75 L 150 255 C 108 238 80 205 80 160 V 98 Z"
          fill="url(#shieldLeftFacet)"
        />

        {/* Main 3D Shield Base - Right Facet (Reflective Highlight) */}
        <path
          d="M 150 75 L 220 98 V 160 C 220 205 192 238 150 255 Z"
          fill="url(#shieldRightFacet)"
        />

        {/* Shield Outer Bezel Line */}
        <path
          d="M 150 75 L 220 98 V 160 C 220 205 192 238 150 255 C 108 238 80 205 80 160 V 98 Z"
          stroke="#7C3AED"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Subtle Diagonal Gloss Reflection Overlay */}
        <path
          d="M 150 78 L 216 100 V 155 C 216 185 198 215 150 248 Z"
          fill="url(#shieldReflection)"
          opacity="0.3"
        />

        {/* Center Circular Keyhole Emblem */}
        <circle cx="150" cy="160" r="24" fill="#0D0E12" stroke="#A78BFA" strokeWidth="2.5" />
        
        {/* Keyhole Shape (Top Circle + Tapered Slot) */}
        <circle cx="150" cy="154" r="8" fill="#FFFFFF" />
        <path
          d="M 144.5 156 L 155.5 156 L 157 174 C 157 176 154 177 150 177 C 146 177 143 176 143 174 Z"
          fill="#FFFFFF"
        />
      </svg>
    </div>
  );
};
