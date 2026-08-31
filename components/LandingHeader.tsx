"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Shield } from "lucide-react";

export const LandingHeader: React.FC = () => {
  const navItems = ["About", "Garbled MPC", "Keepers", "Docs"];

  return (
    <header className="w-full px-6 md:px-10 py-5 max-w-7xl mx-auto flex items-center justify-between">
      {/* Brand Logo */}
      <Link href="/" className="flex items-center gap-2.5 cursor-pointer">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L4 6V12C4 16.42 7.4 20.56 12 22C16.6 20.56 20 16.42 20 12V6L12 2Z"
            stroke="#1A1A1A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M12 8V12M12 16H12.01" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className="font-extrabold text-[17px] tracking-[-0.04em] text-[#1A1A1A]">
          SANCTUARY
        </span>
      </Link>

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

      {/* Right Action: Launch Vault App CTA Button */}
      <Link
        href="/vault"
        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1A1A1A] hover:bg-[#2D2D2D] text-white text-[13px] font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-btn-black hover:shadow-btn-black-hover hover:-translate-y-0.5 active:translate-y-0"
      >
        <span>Launch App</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </header>
  );
};
