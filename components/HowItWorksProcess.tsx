"use client";

import React from "react";
import { Lock, Zap, Cpu, ArrowRight } from "lucide-react";

export const HowItWorksProcess: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "Encrypt Policy & Target Beneficiary",
      desc: "Configure your check-in interval (24h to 30d). Input beneficiary address and emergency escape fund amount. COTI V2 Garbled Circuits convert inputs into private `gtAddress` and `gtUint256` ciphertexts on-chain.",
      icon: Lock,
      badge: "COTI MPC Garbling",
    },
    {
      num: "02",
      title: "Maintain Liveness via Heartbeat",
      desc: "As long as you are active, periodically click 'Send Heartbeat' or sign a lightweight wallet ping. Each heartbeat updates the on-chain `lastSeen` timestamp and resets your countdown timer.",
      icon: Zap,
      badge: "Wallet Liveness Ping",
    },
    {
      num: "03",
      title: "Autonomous Zero-Knowledge Escape",
      desc: "If your check-in timer expires without a heartbeat signal, decentralized keepers call `executeEscape()`. The COTI MPC enclave decrypts beneficiary payout target autonomously without public disclosure.",
      icon: Cpu,
      badge: "Decentralized Keeper Network",
    },
  ];

  return (
    <section id="how-it-works" className="w-full max-w-7xl mx-auto px-6 md:px-10 py-16">
      <div className="section-divider mb-16" />

      <div className="text-center mb-12">
        <span className="text-[12px] font-mono font-bold uppercase tracking-widest text-[#6B7280]">
          Protocol Workflow
        </span>
        <h2 className="text-[32px] md:text-[46px] font-extrabold tracking-tighter leading-[1.05] text-[#1A1A1A] mt-1">
          How Sanctuary Works in 3 Steps
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div key={step.num} className="card-white p-8 flex flex-col justify-between relative group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[32px] font-mono font-extrabold text-coti-violet/40 group-hover:text-coti-violet transition-colors">
                    {step.num}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-canvas border border-border-subtle text-[11px] font-mono font-semibold text-[#6B7280]">
                    {step.badge}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-coti-violet mb-4">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-[20px] font-bold tracking-tight text-[#1A1A1A] mb-2">
                  {step.title}
                </h3>

                <p className="text-[13px] text-[#6B7280] leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border-subtle flex items-center justify-between text-[12px] font-mono font-semibold text-coti-violet">
                <span>Phase {step.num}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
