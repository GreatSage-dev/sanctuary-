"use client";

import React from "react";
import { Shield, Lock, Cpu, Zap } from "lucide-react";

export const MetricsBar: React.FC = () => {
  const metrics = [
    {
      label: "Confidential Volume",
      value: "$14.2M+",
      sub: "Protected in Garbled Vaults",
      icon: Shield,
    },
    {
      label: "Active Dead-Man Switches",
      value: "1,480+",
      sub: "Monitored by COTI Keepers",
      icon: Zap,
    },
    {
      label: "MPC Enclave Proofs",
      value: "100%",
      sub: "Zero Beneficiary Leaks",
      icon: Lock,
    },
    {
      label: "Execution Latency",
      value: "< 2.4s",
      sub: "COTI V2 Garbled Circuit Speed",
      icon: Cpu,
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-6 md:px-10 py-10">
      <div className="glass-card p-6 md:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-white/10 border border-white/10 shadow-2xl">
        {metrics.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className={`flex flex-col justify-between ${idx !== 0 ? "pt-4 lg:pt-0 lg:pl-6" : ""}`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-gray-400">
                  {item.label}
                </span>
                <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-300">
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <div>
                <div className="text-[28px] md:text-[34px] font-mono font-extrabold tracking-tight text-white">
                  {item.value}
                </div>
                <div className="text-[12px] text-gray-400 mt-0.5 font-medium">
                  {item.sub}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
