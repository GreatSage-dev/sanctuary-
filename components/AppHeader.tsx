"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Shield, Settings, Moon, Sun } from "lucide-react";

interface AppHeaderProps {
  onOpenPolicyModal: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onOpenPolicyModal }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  };

  return (
    <header className="sticky top-4 z-50 w-full px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="glass-pill-light px-4 sm:px-8 py-3 flex items-center justify-between shadow-card-rest border border-white/80 dark:border-white/15 bg-white/75 dark:bg-white/[0.06] backdrop-blur-xl">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-xl bg-[#1A1A1A] dark:bg-white text-white dark:text-[#0D0E12] flex items-center justify-center font-bold shadow-md">
            <Shield className="w-4 h-4 text-coti-emerald" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-[15px] tracking-tight text-[#1A1A1A] dark:text-white leading-none">
              SANCTUARY
            </span>
            <span className="text-[9px] font-mono text-coti-violet font-semibold tracking-widest uppercase mt-0.5">
              COTI V2 VAULT
            </span>
          </div>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-canvas dark:bg-white/10 border border-border-subtle dark:border-white/15 flex items-center justify-center text-[#6B7280] dark:text-gray-300 hover:text-[#1A1A1A] dark:hover:text-white transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-purple-600" />}
          </button>

          {/* Configure Policy Modal Button */}
          <button
            onClick={onOpenPolicyModal}
            className="px-3 sm:px-4 py-2 rounded-full bg-canvas dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 border border-border-subtle dark:border-white/15 text-[11px] sm:text-[12px] font-semibold text-[#1A1A1A] dark:text-white transition-colors flex items-center gap-1.5"
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
