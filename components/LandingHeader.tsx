"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Shield, Moon, Sun, Menu, X } from "lucide-react";

export const LandingHeader: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = ["About", "Garbled MPC", "Keepers", "FAQ"];

  useEffect(() => {
    // Check initial dark mode state
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
    <header className="sticky top-4 sm:top-6 z-50 w-full px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="glass-pill-light px-4 sm:px-6 py-3 flex items-center justify-between shadow-card-rest border border-white/80 dark:border-white/15 bg-white/75 dark:bg-white/[0.06] backdrop-blur-xl transition-colors duration-300">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-7 h-7 rounded-lg bg-canvas dark:bg-white/10 flex items-center justify-center border border-border-subtle dark:border-white/15 text-coti-violet">
            <Shield className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-[14px] sm:text-[15px] tracking-[-0.03em] text-[#1A1A1A] dark:text-white">
            SANCTUARY
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium text-[#6B7280] dark:text-gray-300">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="hover:text-[#1A1A1A] dark:hover:text-white transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Right Actions: Theme Toggle & Launch App Button */}
        <div className="flex items-center gap-2.5">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-8 h-8 rounded-full bg-canvas dark:bg-white/10 border border-border-subtle dark:border-white/15 flex items-center justify-center text-[#6B7280] dark:text-gray-300 hover:text-[#1A1A1A] dark:hover:text-white transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-purple-600" />}
          </button>

          {/* Launch App Pill */}
          <Link
            href="/vault"
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-[#1A1A1A] dark:bg-white hover:bg-[#2D2D2D] dark:hover:bg-gray-100 text-white dark:text-[#08080A] text-[11px] sm:text-[12px] font-bold transition-all duration-300 shadow-btn-black hover:-translate-y-0.5"
          >
            <span>Launch App</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-8 h-8 rounded-full bg-canvas dark:bg-white/10 flex items-center justify-center text-[#1A1A1A] dark:text-white"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden mt-2 p-4 rounded-2xl glass-pill-light border border-white/80 dark:border-white/15 bg-white/95 dark:bg-[#0D0E12]/95 backdrop-blur-2xl flex flex-col gap-3 shadow-2xl animate-in fade-in slide-in-from-top-2">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl text-[14px] font-semibold text-[#1A1A1A] dark:text-white hover:bg-canvas dark:hover:bg-white/10 transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};
