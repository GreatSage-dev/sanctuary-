"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Shield, Zap, Lock, ArrowRight } from "lucide-react";

export const PricingSection: React.FC = () => {
  const [isYearly, setIsYearly] = useState(true);

  const plans = [
    {
      name: "Individual Vault",
      price: isYearly ? "0 $COTI" : "0 $COTI",
      period: "/ forever",
      desc: "For individual crypto asset holders securing personal inheritance.",
      features: [
        "1 Active Encrypted Vault",
        "COTI `gtAddress` Garbling",
        "Standard 24h+ Check-In Interval",
        "Public Keeper Trigger",
        "Basic Heartbeat Monitoring",
      ],
      cta: "Get Started Free",
      isFeatured: false,
    },
    {
      name: "Pro Treasury Vault",
      price: isYearly ? "45 $COTI" : "50 $COTI",
      period: "/ month",
      desc: "For high-net-worth founders and crypto portfolio managers.",
      features: [
        "Unlimited Encrypted Vaults",
        "COTI `gtAddress` & `gtUint256` Garbling",
        "Custom 1h+ Check-In Interval",
        "Emergency Grace Period Buffer",
        "Automated 1% Keeper Bounty",
        "Priority MPC Enclave Processing",
      ],
      cta: "Launch Pro Vault",
      isFeatured: true,
    },
    {
      name: "Enterprise DAO Vault",
      price: isYearly ? "199 $COTI" : "250 $COTI",
      period: "/ month",
      desc: "For DAO treasuries, multisigs, and institutional key recovery.",
      features: [
        "Multi-sig MPC Fallback Controls",
        "Custom Key Release Payloads",
        "Dedicated COTI MPC Node Quorum",
        "Custom Execution Triggers",
        "24/7 Enclave Monitoring",
        "SLA & Compliance Documentation",
      ],
      cta: "Contact Enterprise",
      isFeatured: false,
    },
  ];

  return (
    <section id="pricing" className="relative w-full max-w-7xl mx-auto px-6 md:px-10 py-24 overflow-hidden">
      {/* ── GIANT BACKGROUND TEXT (Matches Reference Image "Pricing" watermark) ── */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0 w-full text-center">
        <span className="text-[110px] sm:text-[180px] md:text-[230px] font-black tracking-tighter text-white/[0.08] leading-none uppercase">
          SANCTUARY
        </span>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-16">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[12px] font-mono font-bold mb-3">
          <Shield className="w-3.5 h-3.5 text-purple-400" />
          PROTOCOL PLANS & PRICING
        </span>
        <h2 className="text-[34px] md:text-[50px] font-extrabold tracking-tighter text-white leading-[1.05]">
          Confidential Vault Plans
        </h2>
        <p className="text-[15px] text-gray-400 mt-3 max-w-xl mx-auto">
          Choose the right privacy protection level for your crypto assets, seed phrases, and DAO treasuries.
        </p>

        {/* Toggle Switch */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <span className={`text-[13px] font-mono font-medium ${!isYearly ? "text-white" : "text-gray-400"}`}>
            Billed Monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="w-12 h-6 rounded-full bg-white/10 p-1 border border-white/15 transition-colors relative"
          >
            <motion.div
              animate={{ x: isYearly ? 24 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-4 h-4 rounded-full bg-white shadow-md"
            />
          </button>
          <span className={`text-[13px] font-mono font-medium ${isYearly ? "text-white" : "text-gray-400"}`}>
            Billed Yearly <span className="text-purple-400 text-[11px] font-bold">(Save 20%)</span>
          </span>
        </div>
      </div>

      {/* ── 3 DARK GLASSMORPHISM CARDS OVERLAYING THE GIANT TEXT ── */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`glass-card p-8 flex flex-col justify-between relative overflow-hidden ${
              plan.isFeatured
                ? "border-purple-500/40 bg-white/[0.06] shadow-[0_30px_90px_rgba(139,92,246,0.3)]"
                : "border-white/10"
            }`}
          >
            {plan.isFeatured && (
              <div className="absolute top-0 right-0 bg-gradient-to-l from-purple-600 to-indigo-600 text-white text-[10px] font-mono font-bold uppercase tracking-wider px-4 py-1 rounded-bl-xl shadow-md">
                RECOMMENDED
              </div>
            )}

            <div>
              <span className="text-[12px] font-mono font-semibold text-purple-300 block mb-2">
                {plan.name}
              </span>

              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-[38px] md:text-[46px] font-extrabold tracking-tight text-white font-mono">
                  {plan.price}
                </span>
                <span className="text-[13px] text-gray-400 font-mono">{plan.period}</span>
              </div>

              <p className="text-[13px] text-gray-400 leading-relaxed mb-6 border-b border-white/10 pb-6">
                {plan.desc}
              </p>

              {/* Feature List */}
              <ul className="space-y-3 mb-8 text-[13px] text-gray-300 font-mono">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <Link
              href="/vault"
              className={`w-full py-3.5 px-6 rounded-full text-[13px] font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                plan.isFeatured
                  ? "bg-white text-[#08080A] hover:bg-gray-100 shadow-lg hover:shadow-xl font-bold"
                  : "bg-white/10 hover:bg-white/15 text-white border border-white/15"
              }`}
            >
              <span>{plan.cta}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
