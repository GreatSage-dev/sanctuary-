"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Shield } from "lucide-react";

export const LandingHeader: React.FC = () => {
  const navItems = ["About", "Garbled MPC", "Keepers", "FAQ"];

  return (
    <header className="sticky top-6 z-50 w-full px-6 max-w-5xl mx-auto">
      <div className="glass-pill-light px-6 py-3 flex items-center justify-between shadow-card-rest border border-white/80 bg-white/75 backdrop-blur-xl">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-7 h-7 rounded-lg bg-canvas flex items-center justify-center border border-border-subtle text-coti-violet">
            <Shield className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-[15px] tracking-[-0.03em] text-[#1A1A1A]">
            SANCTUARY
          </span>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium text-[#6B7280]">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="hover:text-[#1A1A1A] transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Right Action: Launch App Button */}
        <Link
          href="/vault"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1A1A] hover:bg-[#2D2D2D] text-white text-[12px] font-bold transition-all duration-300 shadow-btn-black hover:shadow-btn-black-hover hover:-translate-y-0.5"
        >
          <span>Launch App</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </header>
  );
};
