"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { SanctuaryLogoMark } from "./SanctuaryLogoMark";

export const LandingHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = ["About", "Garbled MPC", "Keepers", "FAQ"];

  return (
    <header className="sticky top-4 sm:top-6 z-50 w-full px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="glass-pill-light px-4 sm:px-6 py-3 flex items-center justify-between shadow-card-rest border border-white/80 bg-white/75 backdrop-blur-xl">
        {/* Brand Logo with Custom 3D Shield Keyhole Mark */}
        <Link href="/" className="flex items-center gap-2.5 cursor-pointer group">
          <SanctuaryLogoMark size="sm" showBlocks={false} />
          <span className="font-extrabold text-[15px] tracking-[-0.03em] text-[#1A1A1A] group-hover:text-coti-violet transition-colors">
            SANCTUARY
          </span>
        </Link>

        {/* Desktop Nav Links */}
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

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Launch App Pill */}
          <Link
            href="/vault"
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-[#1A1A1A] text-white text-[11px] sm:text-[12px] font-bold transition-all duration-300 shadow-btn-black hover:bg-[#2D2D2D] hover:-translate-y-0.5"
          >
            <span>Launch App</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-8 h-8 rounded-full bg-canvas flex items-center justify-center text-[#1A1A1A]"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden mt-2 p-4 rounded-2xl glass-pill-light border border-white/80 bg-white/95 backdrop-blur-2xl flex flex-col gap-3 shadow-2xl">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl text-[14px] font-semibold text-[#1A1A1A] hover:bg-canvas transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};
