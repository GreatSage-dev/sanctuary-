"use client";

import React from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ArrowLeft, Shield, Lock } from "lucide-react";

interface AppHeaderProps {
  onOpenPolicyModal: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onOpenPolicyModal }) => {
  return (
    <header className="w-full px-6 md:px-10 py-5 max-w-7xl mx-auto flex items-center justify-between border-b border-border-subtle">
      {/* Brand & Back Link */}
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-[12px] font-medium text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <div className="h-4 w-px bg-border-subtle" />
        <Link href="/vault" className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L4 6V12C4 16.42 7.4 20.56 12 22C16.6 20.56 20 16.42 20 12V6L12 2Z"
              stroke="#1A1A1A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M12 8V12M12 16H12.01" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="font-extrabold text-[16px] tracking-[-0.03em] text-[#1A1A1A]">
            SANCTUARY <span className="text-coti-violet text-[12px] font-mono font-bold uppercase ml-1">VAULT</span>
          </span>
        </Link>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-3">
        {/* Policy Modal Trigger */}
        <button
          onClick={onOpenPolicyModal}
          className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-canvas border border-border-subtle hover:border-[#D1D5DB] text-[12px] font-semibold text-[#1A1A1A] transition-all duration-300"
        >
          <Lock className="w-3.5 h-3.5 text-coti-violet" />
          <span>Configure Policy</span>
        </button>

        {/* RainbowKit Wallet Button */}
        <ConnectButton.Custom>
          {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
            const ready = mounted;
            const connected = ready && account && chain;

            return (
              <div
                {...(!ready && {
                  "aria-hidden": true,
                  style: { opacity: 0, pointerEvents: "none", userSelect: "none" },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <button
                        onClick={openConnectModal}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1A1A1A] hover:bg-[#2D2D2D] text-white text-[13px] font-semibold transition-all duration-300 shadow-btn-black hover:-translate-y-0.5"
                      >
                        Connect Wallet
                      </button>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      <button
                        onClick={openChainModal}
                        className="px-5 py-2.5 rounded-full bg-red-600 text-white text-[13px] font-semibold"
                      >
                        Wrong Network
                      </button>
                    );
                  }

                  return (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={openAccountModal}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1A1A1A] hover:bg-[#2D2D2D] text-white text-[13px] font-semibold transition-all duration-300 shadow-btn-black hover:-translate-y-0.5"
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
      </div>
    </header>
  );
};
