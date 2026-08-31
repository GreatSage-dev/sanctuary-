"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Lock, Cpu, Zap } from "lucide-react";

/* Animated counter hook */
function useCountUp(target: number, duration: number, inView: boolean, decimals = 0) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;

    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration, decimals]);

  return value;
}

export const MetricsBar: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const volume = useCountUp(14.2, 2000, inView, 1);
  const switches = useCountUp(1480, 2200, inView, 0);
  const proofs = useCountUp(100, 1800, inView, 0);
  const latency = useCountUp(2.4, 1600, inView, 1);

  const metrics = [
    {
      label: "Confidential Volume",
      value: `$${volume}M+`,
      sub: "Protected in Garbled Vaults",
      icon: Shield,
      gradient: "from-purple-500 to-violet-600",
    },
    {
      label: "Active Dead-Man Switches",
      value: `${Math.floor(switches).toLocaleString()}+`,
      sub: "Monitored by COTI Keepers",
      icon: Zap,
      gradient: "from-violet-500 to-purple-600",
    },
    {
      label: "MPC Enclave Proofs",
      value: `${Math.floor(proofs)}%`,
      sub: "Zero Beneficiary Leaks",
      icon: Lock,
      gradient: "from-emerald-400 to-emerald-600",
    },
    {
      label: "Execution Latency",
      value: `< ${latency}s`,
      sub: "COTI V2 Garbled Circuit Speed",
      icon: Cpu,
      gradient: "from-cyan-400 to-blue-500",
    },
  ];

  return (
    <section ref={sectionRef} className="w-full max-w-7xl mx-auto px-6 md:px-10 py-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {metrics.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative bg-white rounded-2xl p-5 md:p-6 border border-[rgba(0,0,0,0.06)] shadow-[0_8px_30px_-6px_rgba(0,0,0,0.04)] overflow-hidden group"
            >
              {/* Animated gradient left accent bar */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b ${item.gradient} origin-top`}
              />

              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.12em] text-[#9CA3AF]">
                  {item.label}
                </span>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="w-7 h-7 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center text-coti-violet"
                >
                  <Icon className="w-3.5 h-3.5" />
                </motion.div>
              </div>

              <div className="text-[28px] md:text-[32px] font-mono font-extrabold tracking-tight text-[#1A1A1A] leading-none mb-1">
                {item.value}
              </div>
              <div className="text-[11px] text-[#9CA3AF] font-medium">
                {item.sub}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
