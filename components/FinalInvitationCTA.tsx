"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SanctuaryLogoMark } from "./SanctuaryLogoMark";

/* Floating background particles */
const FloatingDots = () => {
  const dots = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 4,
    opacity: 0.06 + Math.random() * 0.1,
    duration: 8 + Math.random() * 12,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          animate={{
            y: [0, -60, 0],
            x: [0, Math.random() > 0.5 ? 15 : -15, 0],
            opacity: [dot.opacity, dot.opacity * 1.5, dot.opacity],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: dot.delay,
          }}
          className="absolute rounded-full bg-purple-400"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: dot.size,
            height: dot.size,
          }}
        />
      ))}
    </div>
  );
};

/* Sonar ping rings around shield icon */
const SonarRings = () => (
  <>
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        animate={{
          scale: [1, 2.5],
          opacity: [0.3, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeOut",
          delay: i * 0.8,
        }}
        className="absolute inset-0 rounded-full border-2 border-purple-300 pointer-events-none"
      />
    ))}
  </>
);

export const FinalInvitationCTA: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} className="w-full max-w-7xl mx-auto px-6 md:px-10 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-[32px] bg-white p-10 md:p-16 text-center flex flex-col items-center justify-center overflow-hidden border border-[rgba(0,0,0,0.06)] shadow-[0_30px_80px_-20px_rgba(139,92,246,0.12)]"
      >
        {/* Parallax Background Layer */}
        <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
          <FloatingDots />
          {/* Radial gradient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-purple-100/50 via-purple-50/20 to-transparent rounded-full blur-3xl" />
        </motion.div>

        {/* Shield Icon with Sonar Rings */}
        <div className="relative mb-8 z-10">
          <SonarRings />
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <SanctuaryLogoMark size="lg" showBlocks={false} />
          </motion.div>
        </div>

        <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#9CA3AF] mb-4 z-10">
          BECOME PROTECTED
        </span>

        <h2 className="text-[32px] md:text-[48px] font-extrabold tracking-tighter leading-[1.06] max-w-2xl z-10">
          <span className="text-[#1A1A1A]">If your assets and legacy matter, </span>
          <span className="bg-gradient-to-r from-purple-600 via-violet-500 to-purple-600 bg-clip-text text-transparent">
            start with Sanctuary.
          </span>
        </h2>

        <p className="text-[15px] md:text-[16px] text-[#6B7280] leading-relaxed max-w-lg mt-5 z-10">
          Configure your encrypted dead-man&apos;s switch on COTI V2. 100% confidential
          beneficiaries, zero-knowledge keeper execution.
        </p>

        {/* CTA Button with shimmer */}
        <motion.div
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="mt-8 z-10"
        >
          <Link
            href="/vault"
            className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#1A1A1A] text-white text-[14px] font-bold transition-all duration-300 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_40px_-6px_rgba(0,0,0,0.4)] overflow-hidden"
          >
            {/* Shimmer highlight */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <span className="relative">Launch Sanctuary Vault</span>
            <ArrowRight className="w-4 h-4 relative" />
          </Link>
        </motion.div>

        {/* Footer tags */}
        <div className="mt-10 pt-6 border-t border-[rgba(0,0,0,0.06)] w-full max-w-md flex items-center justify-center gap-6 text-[11px] font-mono text-[#9CA3AF] z-10">
          <span>COTI V2 Testnet</span>
          <span className="w-1 h-1 rounded-full bg-[#D1D5DB]" />
          <span>100% Non-Custodial</span>
          <span className="w-1 h-1 rounded-full bg-[#D1D5DB]" />
          <span>Zero Leaks</span>
        </div>
      </motion.div>
    </section>
  );
};
