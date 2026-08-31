"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";

export const FinalInvitationCTA: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 md:px-10 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="card-white p-10 md:p-16 text-center flex flex-col items-center justify-center relative overflow-hidden shadow-card-elevated border border-border-subtle"
      >
        {/* Background Radial Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/50 via-transparent to-transparent pointer-events-none" />

        {/* Shield Icon Mark */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-14 h-14 rounded-2xl bg-[#1A1A1A] text-white flex items-center justify-center mb-6 shadow-btn-black z-10"
        >
          <Shield className="w-7 h-7 text-coti-emerald" />
        </motion.div>

        <span className="text-[12px] font-mono font-bold uppercase tracking-widest text-[#6B7280] mb-3 z-10">
          BECOME PROTECTED
        </span>

        <h2 className="text-[34px] md:text-[52px] font-extrabold tracking-tighter leading-[1.04] text-[#1A1A1A] max-w-2xl z-10">
          If your assets and legacy matter, start with Sanctuary.
        </h2>

        <p className="text-[15px] md:text-[17px] text-[#6B7280] leading-relaxed max-w-lg mt-4 z-10">
          Configure your encrypted dead-man's switch on COTI V2. 100% confidential beneficiaries, zero-knowledge keeper execution.
        </p>

        <motion.div
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="mt-8 z-10"
        >
          <Link
            href="/vault"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#1A1A1A] text-white text-[14px] font-bold transition-all duration-300 shadow-btn-black hover:shadow-btn-black-hover hover:bg-[#2D2D2D]"
          >
            <span>Launch Sanctuary Vault</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="mt-8 pt-6 border-t border-border-subtle w-full max-w-md flex items-center justify-center gap-6 text-[12px] font-mono text-[#6B7280] z-10">
          <span>COTI V2 Testnet</span>
          <span>•</span>
          <span>100% Non-Custodial</span>
          <span>•</span>
          <span>Zero Leaks</span>
        </div>
      </motion.div>
    </section>
  );
};
