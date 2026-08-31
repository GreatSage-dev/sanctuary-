"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { type Chain } from "viem";

// ── COTI V2 Devnet Chain Definition ──
export const cotiDevnet: Chain = {
  id: 13068200,
  name: "COTI V2 Devnet",
  nativeCurrency: {
    decimals: 18,
    name: "COTI",
    symbol: "COTI",
  },
  rpcUrls: {
    default: {
      http: ["https://devnet.coti.io/rpc"],
    },
  },
  blockExplorers: {
    default: {
      name: "COTI Explorer",
      url: "https://explorer-devnet.coti.io",
    },
  },
  testnet: true,
};

// ── Wagmi + RainbowKit Config ──
export const wagmiConfig = getDefaultConfig({
  appName: "Sanctuary",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "PLACEHOLDER_PROJECT_ID",
  chains: [cotiDevnet],
  ssr: true,
});
