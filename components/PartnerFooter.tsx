"use client";

import React from "react";
import { motion } from "framer-motion";

/* SVG Logo Marks */
const CotiLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M20 4L32 10V22C32 30 27 35 20 38C13 35 8 30 8 22V10L20 4Z" stroke="#1A1A1A" strokeWidth="1.5" fill="none" />
    <circle cx="20" cy="20" r="5" fill="#1A1A1A" opacity="0.15" />
    <circle cx="20" cy="20" r="2" fill="#1A1A1A" />
  </svg>
);

const EthLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M20 6L30 20L20 26L10 20L20 6Z" fill="#1A1A1A" opacity="0.12" />
    <path d="M20 6L30 20L20 26L10 20L20 6Z" stroke="#1A1A1A" strokeWidth="1.2" fill="none" />
    <path d="M20 28L30 22L20 34L10 22L20 28Z" stroke="#1A1A1A" strokeWidth="1.2" fill="none" />
  </svg>
);

const HardhatLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M8 22H32V28C32 30 30 32 28 32H12C10 32 8 30 8 28V22Z" stroke="#1A1A1A" strokeWidth="1.2" fill="none" />
    <path d="M12 22C12 16 15 10 20 8C25 10 28 16 28 22" stroke="#1A1A1A" strokeWidth="1.5" fill="none" />
    <line x1="6" y1="22" x2="34" y2="22" stroke="#1A1A1A" strokeWidth="1.5" />
  </svg>
);

const MetamaskLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M20 8L28 14L32 20L28 28L24 32H16L12 28L8 20L12 14L20 8Z" stroke="#1A1A1A" strokeWidth="1.2" fill="none" />
    <path d="M14 18L20 14L26 18" stroke="#1A1A1A" strokeWidth="1" fill="none" />
    <circle cx="16" cy="21" r="1.5" fill="#1A1A1A" />
    <circle cx="24" cy="21" r="1.5" fill="#1A1A1A" />
    <path d="M16 26L20 28L24 26" stroke="#1A1A1A" strokeWidth="1" fill="none" />
  </svg>
);

const WagmiLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <circle cx="12" cy="20" r="4" stroke="#1A1A1A" strokeWidth="1.2" fill="none" />
    <circle cx="28" cy="20" r="4" stroke="#1A1A1A" strokeWidth="1.2" fill="none" />
    <circle cx="20" cy="12" r="3" stroke="#1A1A1A" strokeWidth="1.2" fill="none" />
    <circle cx="20" cy="28" r="3" stroke="#1A1A1A" strokeWidth="1.2" fill="none" />
    <line x1="15" y1="18" x2="17" y2="14" stroke="#1A1A1A" strokeWidth="0.8" />
    <line x1="25" y1="18" x2="23" y2="14" stroke="#1A1A1A" strokeWidth="0.8" />
    <line x1="15" y1="22" x2="17" y2="26" stroke="#1A1A1A" strokeWidth="0.8" />
    <line x1="25" y1="22" x2="23" y2="26" stroke="#1A1A1A" strokeWidth="0.8" />
  </svg>
);

const logos = [
  { name: "COTI V2", Logo: CotiLogo },
  { name: "ETHEREUM", Logo: EthLogo },
  { name: "HARDHAT", Logo: HardhatLogo },
  { name: "METAMASK", Logo: MetamaskLogo },
  { name: "WAGMI", Logo: WagmiLogo },
];

// Duplicate for seamless marquee loop
const doubledLogos = [...logos, ...logos, ...logos];

export const PartnerFooter: React.FC = () => {
  return (
    <footer className="w-full max-w-7xl mx-auto px-6 md:px-10 pt-10 pb-8">
      <div className="section-divider mb-10" />

      <div className="text-center mb-8">
        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#9CA3AF]">
          ECOSYSTEM PARTNERS & INTEGRATIONS
        </span>
      </div>

      {/* Infinite Marquee with gradient fade masks */}
      <div
        className="relative overflow-hidden py-4"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
      >
        <motion.div
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
          className="flex items-center gap-16 w-fit"
        >
          {doubledLogos.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="flex items-center gap-3 shrink-0 opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-pointer group"
            >
              <div className="group-hover:scale-110 transition-transform duration-300">
                <item.Logo />
              </div>
              <span className="text-[13px] font-bold tracking-tight text-[#1A1A1A] font-mono whitespace-nowrap">
                {item.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Footer Bar */}
      <div className="mt-10 pt-6 border-t border-[rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#9CA3AF]">
        <span className="font-medium">© 2024 Sanctuary Protocol. All rights reserved.</span>
        <div className="flex items-center gap-4 font-medium">
          <a
            href="https://github.com/GreatSage-dev/sanctuary-"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1A1A1A] transition-colors"
          >
            GitHub
          </a>
          <span className="w-1 h-1 rounded-full bg-[#D1D5DB]" />
          <a href="#" className="hover:text-[#1A1A1A] transition-colors">
            Documentation
          </a>
          <span className="w-1 h-1 rounded-full bg-[#D1D5DB]" />
          <a
            href="https://coti.io"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1A1A1A] transition-colors"
          >
            COTI Network
          </a>
        </div>
      </div>
    </footer>
  );
};
