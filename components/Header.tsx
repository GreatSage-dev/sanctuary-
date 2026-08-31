"use client";

import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

/* ── Custom Shield SVG Icon ── */
const ShieldIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2L4 6V12C4 16.42 7.4 20.56 12 22C16.6 20.56 20 16.42 20 12V6L12 2Z"
      stroke="#1A1A1A"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 8V12M12 16H12.01"
      stroke="#1A1A1A"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const Header: React.FC = () => {
  const navItems = ["About", "Vaults", "Privacy", "Keepers", "COTI V2"];

  return (
    <header className="w-full px-6 md:px-10 py-5 max-w-7xl mx-auto flex items-center justify-between">
      {/* Brand */}
      <div className="flex items-center gap-2.5 cursor-pointer">
        <ShieldIcon />
        <span className="font-extrabold text-[17px] tracking-[-0.04em] text-[#1A1A1A]">
          SANCTUARY
        </span>
      </div>

      {/* Center Nav Links */}
      <nav className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(" ", "-")}`}
            className="text-[13px] font-medium text-[#6B7280] hover:text-[#1A1A1A] transition-colors duration-300"
          >
            {item}
          </a>
        ))}
      </nav>

      {/* RainbowKit Connect Button — custom rendered to match reference black pill */}
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          mounted,
        }) => {
          const ready = mounted;
          const connected = ready && account && chain;

          return (
            <div
              {...(!ready && {
                "aria-hidden": true,
                style: {
                  opacity: 0,
                  pointerEvents: "none" as const,
                  userSelect: "none" as const,
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button
                      onClick={openConnectModal}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1A1A1A] hover:bg-[#2D2D2D] text-white text-[13px] font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-btn-black hover:shadow-btn-black-hover hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <span>Connect Wallet</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="6" width="18" height="13" rx="2" stroke="white" strokeWidth="2" />
                        <path d="M3 10H21" stroke="white" strokeWidth="2" />
                        <circle cx="17" cy="14" r="1.5" fill="white" />
                      </svg>
                    </button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button
                      onClick={openChainModal}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600 text-white text-[13px] font-semibold shadow-btn-black hover:-translate-y-0.5 transition-all duration-300"
                    >
                      Wrong Network
                    </button>
                  );
                }

                return (
                  <div className="flex items-center gap-2">
                    {/* Chain badge */}
                    <button
                      onClick={openChainModal}
                      className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full bg-canvas border border-border-subtle text-[12px] font-medium text-[#6B7280] hover:border-[#D1D5DB] transition-all duration-300"
                    >
                      <span className="w-2 h-2 rounded-full bg-coti-emerald pulse-dot" />
                      {chain.name}
                    </button>

                    {/* Account button */}
                    <button
                      onClick={openAccountModal}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1A1A1A] hover:bg-[#2D2D2D] text-white text-[13px] font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-btn-black hover:shadow-btn-black-hover hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <span>{account.displayName}</span>
                      <span className="w-2 h-2 rounded-full bg-coti-emerald" />
                    </button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </header>
  );
};
