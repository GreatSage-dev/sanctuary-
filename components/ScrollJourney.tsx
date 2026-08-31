"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Zap, Cpu, ArrowRight } from "lucide-react";

export const ScrollJourney: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: "01",
      kicker: "The Invisible Leak",
      title: "Public blockchains reveal your beneficiaries to the world.",
      body: "On Ethereum or Polygon, dead-man switches leak your target recipient address and fund amounts on Etherscan. Anyone inspecting the contract can see who inherits your crypto. Sanctuary eliminates this vulnerability using COTI V2 Garbled Circuits.",
      badge: "STATE PRIVACY",
      icon: Shield,
    },
    {
      num: "02",
      kicker: "The Liveness Rhythm",
      title: "One silent signature keeps your vault sealed.",
      body: "As long as you are active, periodically click 'Send Heartbeat' to reset your check-in timer (24h to 30d). Every heartbeat updates your on-chain timestamp, keeping your vault sealed and safe.",
      badge: "AUTONOMOUS RHYTHM",
      icon: Zap,
    },
    {
      num: "03",
      kicker: "Zero-Knowledge Escape",
      title: "Autonomous payout without revealing the recipient.",
      body: "If your heartbeat timer expires without a ping, any decentralized keeper can call executeEscape(). The COTI MPC enclave decrypts the beneficiary payload inside an encrypted circuit — zero leaks to block explorers or keepers.",
      badge: "MPC ENCLAVE EXECUTION",
      icon: Cpu,
    },
  ];

  return (
    <section id="how-it-works" className="w-full max-w-7xl mx-auto px-6 md:px-10 py-16">
      <div className="section-divider mb-16 opacity-20" />

      {/* Section Header */}
      <div className="text-center mb-16">
        <p className="text-[12px] font-mono font-bold uppercase tracking-widest text-purple-300">
          THE SANCTUARY JOURNEY
        </p>
        <h2 className="text-[32px] md:text-[46px] font-extrabold tracking-tighter leading-[1.05] text-white mt-1">
          How Sanctuary Secures Your Legacy
        </h2>
      </div>

      {/* ── Scroll-Pinned Parent Grid Container ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
        {/* Left Column: STICKY PINNED STEP PILLS (Dark Glassmorphic Style) */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 z-20 space-y-3">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => {
                  setActiveStep(idx);
                  const el = document.getElementById(`journey-step-${idx}`);
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className={`p-5 rounded-2xl border cursor-pointer transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] relative overflow-hidden ${
                  isActive
                    ? "glass-card border-purple-500/50 bg-white/[0.08] shadow-2xl -translate-y-0.5"
                    : "bg-white/[0.02] border-white/10 hover:border-white/20 opacity-60"
                }`}
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <motion.div
                    layoutId="activePillIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-purple-400"
                    transition={{ duration: 0.3 }}
                  />
                )}

                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-bold uppercase text-purple-300">
                    0{step.num} — {step.badge}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                      isActive ? "bg-purple-600 text-white" : "bg-white/10 text-gray-400"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <h3
                  className={`text-[15px] font-bold tracking-tight ${
                    isActive ? "text-white" : "text-gray-400"
                  }`}
                >
                  {step.kicker}
                </h3>
              </motion.div>
            );
          })}
        </div>

        {/* Right Column: SCROLLING STEP CONTENT CARDS */}
        <div className="lg:col-span-8 space-y-16 py-1">
          {steps.map((step, idx) => (
            <motion.div
              id={`journey-step-${idx}`}
              key={step.num}
              onViewportEnter={() => setActiveStep(idx)}
              viewport={{ margin: "-35% 0px -35% 0px" }}
              initial={{ opacity: 0.5, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`glass-card p-8 md:p-12 min-h-[320px] flex flex-col justify-between border transition-all duration-500 relative overflow-hidden ${
                activeStep === idx
                  ? "border-purple-500/40 bg-white/[0.06] shadow-2xl"
                  : "border-white/10 opacity-60 bg-white/[0.02]"
              }`}
            >
              {/* Background Glow */}
              {activeStep === idx && (
                <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
              )}

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[12px] font-mono font-bold uppercase tracking-wider text-purple-300">
                    STEP 0{step.num} • {step.badge}
                  </span>
                  <div className="flex items-center gap-1">
                    {[0, 1, 2].map((dot) => (
                      <div
                        key={dot}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          dot === idx ? "w-6 bg-purple-400" : "w-1.5 bg-white/20"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <h3 className="text-[26px] md:text-[34px] font-extrabold tracking-tight text-white leading-[1.1] mb-4">
                  {step.title}
                </h3>
                <p className="text-[15px] text-gray-300 leading-relaxed max-w-xl">
                  {step.body}
                </p>
              </div>

              <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-[12px] font-mono font-semibold text-white">
                <span>COTI V2 MPC Architecture</span>
                <span className="flex items-center gap-1 text-purple-300">
                  Phase 0{step.num} Active <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
