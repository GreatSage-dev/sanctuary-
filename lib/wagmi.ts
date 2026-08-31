"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { type Chain } from "viem";

// ── Official COTI V2 Testnet Chain Definition ──
export const cotiTestnet: Chain = {
  id: 7082400,
  name: "COTI V2 Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "COTI",
    symbol: "COTI",
  },
  rpcUrls: {
    default: {
      http: ["https://testnet.coti.io/rpc"],
    },
  },
  blockExplorers: {
    default: {
      name: "COTI Scan",
      url: "https://testnet.cotiscan.io",
    },
  },
  testnet: true,
};

// ── Wagmi + RainbowKit Config ──
export const wagmiConfig = getDefaultConfig({
  appName: "Sanctuary",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "3a64810435d24b61ef2d0b59a3ec0150",
  chains: [cotiTestnet],
  ssr: true,
});
