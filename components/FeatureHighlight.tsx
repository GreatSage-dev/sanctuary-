"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface FeatureHighlightProps {
  onOpenPolicyModal?: () => void;
}

/* ── Custom SVG: 3D Flower / Organic Shape (matches reference bottom-right 3D graphic) ── */
const FlowerPrimitiveSVG = () => (
  <svg width="220" height="200" viewBox="0 0 280 260" fill="none">
    <defs>
      <linearGradient id="petalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#6D28D9" />
      </linearGradient>
      <linearGradient id="petalShine" x1="20%" y1="0%" x2="80%" y2="100%">
        <stop offset="0%" stopColor="#DDD6FE" />
        <stop offset="100%" stopColor="#A78BFA" />
      </linearGradient>
    </defs>

    {/* Petals radiating from center */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <ellipse
        key={i}
        cx="140"
        cy="130"
        rx="50"
        ry="18"
        fill={i % 2 === 0 ? "url(#petalGrad)" : "url(#petalShine)"}
        opacity={0.7 + (i % 3) * 0.1}
        transform={`rotate(${angle} 140 130)`}
      />
    ))}

    {/* Central sphere */}
    <circle cx="140" cy="130" r="22" fill="#6D28D9" />
    <circle cx="136" cy="126" r="8" fill="#C4B5FD" opacity="0.4" />

    {/* Label */}
    <rect x="80" y="10" rx="8" width="120" height="24" fill="#F5F5F7" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
    <text x="140" y="26" textAnchor="middle" fill="#6B7280" fontSize="9" fontFamily="monospace">GARBLED MPC</text>
  </svg>
);

export const FeatureHighlight: React.FC<FeatureHighlightProps> = ({
  onOpenPolicyModal,
}) => {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 md:px-10 py-8">
      {/* Section divider */}
      <div className="section-divider mb-12" />

      {/* Layout: Left text + Right graphic */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-8">
        {/* Left: Text content */}
        <div>
          <h2 className="text-[28px] md:text-[36px] font-bold tracking-tighter leading-[1.1] text-[#1A1A1A] mb-3">
            COTI V2 Garbled<br />Circuit Architecture
          </h2>
          <p className="text-[14px] text-[#6B7280] leading-relaxed mb-6 max-w-md">
            Deploy, configure, and execute autonomous vault policies across
            COTI V2's encrypted MPC environment. Beneficiary addresses and
            allocation amounts remain confidential.
          </p>
          {onOpenPolicyModal ? (
            <button
              onClick={onOpenPolicyModal}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1A1A1A] hover:bg-[#2D2D2D] text-white text-[13px] font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-btn-black hover:shadow-btn-black-hover hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Deploy Vault</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <Link
              href="/vault"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1A1A1A] hover:bg-[#2D2D2D] text-white text-[13px] font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-btn-black hover:shadow-btn-black-hover hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Deploy Vault</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {/* Right: 3D Graphic */}
        <div className="flex justify-center lg:justify-end">
          <FlowerPrimitiveSVG />
        </div>
      </div>
    </section>
  );
};
