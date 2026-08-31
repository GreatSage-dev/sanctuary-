"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { VaultConfig, HeartbeatStatus } from "@/lib/types";

interface HeroSectionProps {
  vault: VaultConfig;
  status: HeartbeatStatus;
  onSendHeartbeat: () => Promise<void>;
  onOpenPolicyModal: () => void;
  isProcessingHeartbeat: boolean;
}

/* ── Central 3D Shield / Geometric Primitive SVG ── */
const HeroPrimitive = () => (
  <svg
    width="260"
    height="260"
    viewBox="0 0 300 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="drop-shadow-[0_20px_60px_rgba(139,92,246,0.35)]"
  >
    <defs>
      <linearGradient id="heroGrad1" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#C4B5FD" />
        <stop offset="50%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#6D28D9" />
      </linearGradient>
      <linearGradient id="heroGrad2" x1="0%" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" stopColor="#DDD6FE" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.6" />
      </linearGradient>
      <linearGradient id="heroShine" x1="30%" y1="0%" x2="70%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.7" />
        <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
      <radialGradient id="glowBg" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Ambient glow */}
    <circle cx="150" cy="150" r="140" fill="url(#glowBg)" />

    {/* Blocky / Pixel Grid Effect (matching the reference mosaic backdrop) */}
    {[...Array(6)].map((_, i) => (
      <rect
        key={`px-${i}`}
        x={60 + i * 32}
        y={40}
        width={28}
        height={28}
        rx={4}
        fill="#C4B5FD"
        opacity={0.15 + i * 0.08}
      />
    ))}
    {[...Array(7)].map((_, i) => (
      <rect
        key={`px2-${i}`}
        x={44 + i * 32}
        y={72}
        width={28}
        height={28}
        rx={4}
        fill="#A78BFA"
        opacity={0.2 + i * 0.06}
      />
    ))}

    {/* Central 3D Metallic Shield Form */}
    <path
      d="M150 70 L150 70 C150 70 210 95 210 95 L210 165 C210 200 185 225 150 240 C115 225 90 200 90 165 L90 95 Z"
      fill="url(#heroGrad1)"
      stroke="#7C3AED"
      strokeWidth="1.5"
    />
    <path
      d="M150 70 L210 95 L210 165 C210 200 185 225 150 240 Z"
      fill="url(#heroGrad2)"
      opacity="0.6"
    />
    <path
      d="M150 80 L200 100 L200 160 C200 190 178 210 150 224 Z"
      fill="url(#heroShine)"
      opacity="0.4"
    />

    {/* Inner Lock Keyhole */}
    <circle cx="150" cy="148" r="16" fill="#0D0E12" opacity="0.8" />
    <circle cx="150" cy="145" r="8" fill="none" stroke="#C4B5FD" strokeWidth="2.5" />
    <rect x="147" y="150" width="6" height="14" rx="3" fill="#C4B5FD" />
  </svg>
);

export const HeroSection: React.FC<HeroSectionProps> = ({
  vault,
  status,
  onSendHeartbeat,
  onOpenPolicyModal,
  isProcessingHeartbeat,
}) => {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 md:px-10">
      {/* Top badge (matches reference "Grant recipient from…") */}
      <div className="flex justify-center pt-6 pb-8">
        <span className="inline-flex items-center gap-2 text-[12px] font-medium text-[#6B7280]">
          Powered by
          <span className="inline-flex items-center gap-1 font-bold text-[#1A1A1A]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L4 6V12C4 16.42 7.4 20.56 12 22C16.6 20.56 20 16.42 20 12V6L12 2Z" fill="#8B5CF6" />
            </svg>
            COTI V2 GARBLED CIRCUITS
          </span>
        </span>
      </div>

      {/* Hero Graphic Backdrop Area (violet gradient + central primitive) */}
      <div className="relative w-full rounded-3xl hero-gradient min-h-[360px] md:min-h-[420px] flex items-center justify-center overflow-hidden">
        {/* Pixel grid subtle overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }} />

        <HeroPrimitive />
      </div>

      {/* Below-hero dual card row (matches reference Left & Right text cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mt-0">
        {/* Left card */}
        <div className="px-2 py-10 md:pr-12">
          <h1 className="text-[28px] md:text-[36px] font-bold tracking-tighter leading-[1.1] text-[#1A1A1A] mb-3">
            The Privacy Architecture<br />Protocol On COTI V2
          </h1>
          <p className="text-[14px] text-[#6B7280] leading-relaxed mb-6">
            Autonomous dead-man's switch keeping your assets,
            private keys, and emergency escape funds 100%
            confidential on-chain.
          </p>
          <button
            onClick={onSendHeartbeat}
            disabled={isProcessingHeartbeat}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1A1A1A] hover:bg-[#2D2D2D] text-white text-[13px] font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-btn-black hover:shadow-btn-black-hover hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60"
          >
            {isProcessingHeartbeat ? (
              <span>Emitting Signal...</span>
            ) : (
              <>
                <span>Send Heartbeat</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>

        {/* Right card */}
        <div className="px-2 py-10 md:pl-12 md:border-l border-border-subtle">
          <h2 className="text-[20px] md:text-[24px] font-bold tracking-tighter text-[#1A1A1A] mb-2">
            Garbled Vaults
          </h2>
          <p className="text-[14px] text-[#6B7280] leading-relaxed mb-4">
            Configure encrypted check-in intervals and confidential execution
            triggers. Recipient addresses and balances are stored as garbled
            MPC ciphertexts — invisible on block explorers.
          </p>
          <button
            onClick={onOpenPolicyModal}
            className="text-[13px] font-semibold text-[#1A1A1A] hover:text-coti-violet transition-colors duration-300 inline-flex items-center gap-1.5"
          >
            Configure Policy
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Tiny icon row / brand marks (matches reference small icons below hero) */}
      <div className="flex items-center justify-center gap-4 py-4 opacity-30">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2L4 6V12C4 16.42 7.4 20.56 12 22C16.6 20.56 20 16.42 20 12V6L12 2Z" stroke="#1A1A1A" strokeWidth="2"/></svg>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#1A1A1A" strokeWidth="2"/><path d="M12 6v6l4 2" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round"/></svg>
      </div>
    </section>
  );
};
