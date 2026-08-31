"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Shield } from "lucide-react";

export const LandingHeader: React.FC = () => {
  const navItems = ["About", "Garbled MPC", "Pricing", "Keepers", "FAQ"];

  return (
    <header className="sticky top-6 z-50 w-full px-6 max-w-5xl mx-auto">
      <div className="glass-pill px-6 py-3 flex items-center justify-between shadow-2xl border border-white/15 bg-white/[0.05] backdrop-blur-xl">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center border border-white/15 text-purple-400">
            <Shield className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-[15px] tracking-[-0.03em] text-white">
            SANCTUARY
          </span>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium text-gray-300">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="hover:text-white transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Right Action: Launch App Pill Button */}
        <Link
          href="/vault"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-gray-100 text-[#08080A] text-[12px] font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          <span>Launch App</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </header>
  );
};
