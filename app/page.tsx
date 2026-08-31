"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LandingHeader } from "@/components/LandingHeader";
import { MetricsBar } from "@/components/MetricsBar";
import { ScrollJourney } from "@/components/ScrollJourney";
import { PrivacyComparisonTable } from "@/components/PrivacyComparisonTable";
import { GarbledPlayground } from "@/components/GarbledPlayground";
import { GarbledShowcaseSection } from "@/components/GarbledShowcaseSection";
import { UseCasesGrid } from "@/components/UseCasesGrid";
import { FAQSection } from "@/components/FAQSection";
import { FinalInvitationCTA } from "@/components/FinalInvitationCTA";
import { PartnerFooter } from "@/components/PartnerFooter";
import { SanctuaryLogoMark } from "@/components/SanctuaryLogoMark";
import { ArrowRight } from "lucide-react";

/* ── Central 3D Shield Primitive ── */
const HeroPrimitive = () => (
  <motion.div
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    className="relative flex items-center justify-center z-10"
  >
    <SanctuaryLogoMark size="hero" showBlocks={true} />
  </motion.div>
);

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col bg-canvas text-[#1A1A1A] overflow-hidden">
      {/* Light Navigation Header */}
      <LandingHeader />

      {/* Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto px-6 md:px-10 pt-4 pb-12">
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center pb-6 pt-4"
        >
          <span className="inline-flex items-center gap-2 text-[12px] font-medium text-[#6B7280]">
            Powered by
            <span className="inline-flex items-center gap-1 font-bold text-[#1A1A1A]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L4 6V12C4 16.42 7.4 20.56 12 22C16.6 20.56 20 16.42 20 12V6L12 2Z" fill="#8B5CF6" />
              </svg>
              COTI V2 GARBLED CIRCUITS
            </span>
          </span>
        </motion.div>

        {/* Hero Graphic Backdrop Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-3xl hero-gradient min-h-[360px] md:min-h-[420px] flex items-center justify-center overflow-hidden shadow-card-rest"
        >
          <HeroPrimitive />
        </motion.div>

        {/* Below-hero dual text card row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-0 mt-0"
        >
          {/* Left Hero Card */}
          <div className="px-2 py-10 md:pr-12">
            <h1 className="text-[28px] md:text-[36px] font-bold tracking-tighter leading-[1.1] text-[#1A1A1A] mb-3">
              The Privacy Architecture<br />Protocol On COTI V2
            </h1>
            <p className="text-[14px] text-[#6B7280] leading-relaxed mb-6">
              Autonomous dead-man&apos;s switch keeping your assets, private keys, and emergency escape funds 100% confidential on-chain using Garbled Circuits.
            </p>
            <Link
              href="/vault"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1A1A1A] hover:bg-[#2D2D2D] text-white text-[13px] font-semibold transition-all duration-300 shadow-btn-black hover:shadow-btn-black-hover hover:-translate-y-0.5"
            >
              <span>Launch Sanctuary Vault</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Right Hero Card */}
          <div className="px-2 py-10 md:pl-12 md:border-l border-border-subtle">
            <h2 className="text-[20px] md:text-[24px] font-bold tracking-tighter text-[#1A1A1A] mb-2">
              Garbled Vaults
            </h2>
            <p className="text-[14px] text-[#6B7280] leading-relaxed mb-4">
              Configure encrypted check-in intervals and confidential execution triggers. Recipient addresses and balances are stored as garbled MPC ciphertexts — invisible on block explorers.
            </p>
            <Link
              href="/vault"
              className="text-[13px] font-semibold text-[#1A1A1A] hover:text-coti-violet transition-colors duration-300 inline-flex items-center gap-1.5 group"
            >
              <span>Enter Vault Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Protocol Metrics Bar */}
      <MetricsBar />

      {/* Interactive Storytelling Scroll Journey */}
      <ScrollJourney />

      {/* Privacy Comparison Table */}
      <PrivacyComparisonTable />

      {/* Live Interactive Garbled MPC Simulator */}
      <GarbledPlayground />

      {/* ── FROSTED GLASSMORPHISM SHOWCASE SECTION WITH GIANT WATERMARK TEXT "GARBLED" ── */}
      <GarbledShowcaseSection />

      {/* Web3 Use Cases */}
      <UseCasesGrid />

      {/* FAQ Accordion Section */}
      <FAQSection />

      {/* Final Editorial Invitation CTA */}
      <FinalInvitationCTA />

      {/* Partner Footer */}
      <PartnerFooter />
    </main>
  );
}
