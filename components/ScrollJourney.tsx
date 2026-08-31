"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  const currentStep = steps[activeStep];
  const Icon = currentStep.icon;

  return (
    <section id="how-it-works" className="w-full max-w-7xl mx-auto px-6 md:px-10 py-16">
      <div className="section-divider mb-16" />

      {/* Section Header */}
      <div className="text-center mb-14">
        <p className="text-[12px] font-mono font-bold uppercase tracking-widest text-[#6B7280]">
          THE SANCTUARY JOURNEY
        </p>
        <h2 className="text-[32px] md:text-[44px] font-extrabold tracking-tighter leading-[1.05] text-[#1A1A1A] mt-1">
          How Sanctuary Secures Your Legacy
        </h2>
      </div>

      {/* Standard Clean 2-Column Layout (No Sticky Pin / No Page Lock) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Step Navigation Pills */}
        <div className="lg:col-span-4 space-y-3">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            const StepIcon = step.icon;
            return (
              <div
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 relative overflow-hidden ${
                  isActive
                    ? "bg-white border-[#1A1A1A] shadow-card-hover -translate-y-0.5"
                    : "bg-canvas border-border-subtle hover:border-[#D1D5DB] opacity-60"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePillIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-[#1A1A1A]"
                    transition={{ duration: 0.3 }}
                  />
                )}

                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-bold uppercase text-coti-violet">
                    0{step.num} — {step.badge}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                      isActive ? "bg-[#1A1A1A] text-white" : "bg-gray-200 text-[#6B7280]"
                    }`}
                  >
                    <StepIcon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <h3
                  className={`text-[15px] font-bold tracking-tight ${
                    isActive ? "text-[#1A1A1A]" : "text-[#6B7280]"
                  }`}
                >
                  {step.kicker}
                </h3>
              </div>
            );
          })}
        </div>

        {/* Right Column: Active Step Details Card */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep.num}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="card-white p-8 md:p-12 min-h-[360px] flex flex-col justify-between border border-border-subtle shadow-card-elevated relative overflow-hidden bg-white"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-purple-50 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[12px] font-mono font-bold uppercase tracking-wider text-coti-violet">
                    STEP 0{currentStep.num} • {currentStep.badge}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {steps.map((_, dotIdx) => (
                      <div
                        key={dotIdx}
                        onClick={() => setActiveStep(dotIdx)}
                        className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${
                          dotIdx === activeStep ? "w-6 bg-coti-violet" : "w-1.5 bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <h3 className="text-[26px] md:text-[34px] font-extrabold tracking-tight text-[#1A1A1A] leading-[1.1] mb-4">
                  {currentStep.title}
                </h3>
                <p className="text-[15px] text-[#6B7280] leading-relaxed max-w-xl">
                  {currentStep.body}
                </p>
              </div>

              <div className="relative z-10 pt-6 border-t border-border-subtle flex items-center justify-between text-[12px] font-mono font-semibold text-[#1A1A1A]">
                <span>COTI V2 MPC Architecture</span>
                <span className="flex items-center gap-1 text-coti-violet">
                  Phase 0{currentStep.num} Active <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
