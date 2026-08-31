"use client";

import React from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Shield, Settings } from "lucide-react";

interface AppHeaderProps {
  onOpenPolicyModal: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onOpenPolicyModal }) => {
  return (
    <header className="sticky top-4 z-50 w-full px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="glass-pill-light px-4 sm:px-8 py-3 flex items-center justify-between shadow-card-rest border border-white/80 bg-white/75 backdrop-blur-xl">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-xl bg-[#1A1A1A] text-white flex items-center justify-center font-bold shadow-md">
            <Shield className="w-4 h-4 text-coti-emerald" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-[15px] tracking-tight text-[#1A1A1A] leading-none">
              SANCTUARY
            </span>
            <span className="text-[9px] font-mono text-coti-violet font-semibold tracking-widest uppercase mt-0.5">
              COTI V2 VAULT
            </span>
          </div>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Configure Policy Modal Button */}
          <button
            onClick={onOpenPolicyModal}
            className="px-3 sm:px-4 py-2 rounded-full bg-canvas hover:bg-gray-200 border border-border-subtle text-[11px] sm:text-[12px] font-semibold text-[#1A1A1A] transition-colors flex items-center gap-1.5"
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Configure Policy</span>
          </button>

          {/* RainbowKit Wallet Connect Button */}
          <div className="shrink-0">
            <ConnectButton
              showBalance={false}
              accountStatus={{
                smallScreen: "avatar",
                largeScreen: "full",
              }}
              chainStatus="icon"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
