# SANCTUARY 🛡️ — Privacy-Preserving Autonomous Dead-Man's Switch on COTI V2

> **COTI Vibe Code Challenge Hackathon Submission**  
> *Track: Private App, Agent & Confidential Automation on COTI V2*

---

## 🏆 Project Overview

**Sanctuary** is a privacy-preserving, autonomous dead-man's switch protocol built natively on **COTI V2 Garbled Circuits**. It enables crypto asset holders, founders, and DAO keyholders to configure automated emergency escape policies, distress key releases, and confidential inheritance transfers without ever leaking target beneficiary wallet addresses or asset allocation amounts to public block explorers.

On standard EVM blockchains (Ethereum, Polygon, Arbitrum), dead-man switches expose recipient addresses in plaintext on Etherscan. Anyone inspecting the smart contract can track who inherits high-value assets, creating severe extortion, kidnapping, and physical security risks. 

Sanctuary solves this by using **COTI V2 Multi-Party Computation (MPC) Garbled Circuits** (`gtAddress` and `gtUint256`) to keep all beneficiary identities and payout amounts 100% encrypted on-chain.

---

## ✨ Key Features & Architecture

- **🔒 100% Garbled Circuit Confidentiality**: Beneficiary addresses and fund amounts are stored as on-chain garbled ciphertexts. Zero leakage to block explorers, RPC nodes, or external keepers.
- **⚡ Heartbeat Liveness Pings**: Non-custodial, periodic wallet signatures update the on-chain `lastSeen` timestamp and reset the countdown timer (24h to 30d).
- **🛡️ Emergency Grace Period Buffer**: Configurable buffer window (12h to 48h) after countdown expiry. Prevents accidental fund escape if the owner is temporarily off-grid or traveling.
- **💰 Decentralized Keeper Economic Bounties**: Public keepers receive an automated **1% execution bounty** upon calling `executeEscape()`, ensuring economic alignment for keeper bots.
- **🎨 Sticky-Pin Editorial UI / UX**: Designed to top-tier SaaS standards with off-white `#F5F5F7` canvas, Framer Motion sticky-pin scroll animations, live COTI MPC garbled circuit playground simulator, and RainbowKit wallet integration.

---

## 📐 Smart Contract Architecture (`SanctuaryVault.sol`)

The `SanctuaryVault.sol` contract manages vault parameters and handles private execution triggers:

```solidity
// Core State & Garbled Containers
address public immutable owner;
uint256 public checkInInterval;     // seconds before grace period starts
uint256 public gracePeriod;          // buffer seconds before keeper payout
uint256 public keeperBountyBps;      // 1% keeper reward (100 bps)
uint256 public lastSeen;            // last heartbeat timestamp
bool    public isVaultActive;

bytes32 public encryptedRecipient;  // gtAddress container in COTI MPC
bytes32 public encryptedAmount;     // gtUint256 container in COTI MPC
```

### Core Functions:
1. `heartbeat()` — Resets `lastSeen` timestamp (Owner only).
2. `updatePolicy(...)` — Updates interval, grace period, recipient, and amount (Owner only).
3. `executeEscape()` — Callable by public keepers when `lastSeen + interval + gracePeriod` expires. Transfers keeper bounty reward and executes private payout via COTI MPC enclave.
4. `getVaultStatus()` — Single-call view returning active state, remaining seconds, grace period flag, and execution eligibility.

---

## 🛠️ Tech Stack

- **Smart Contracts**: Solidity 0.8.24, Hardhat, Ethers.js v6
- **Frontend Framework**: Next.js 14 (App Router), TypeScript
- **Styling & Motion**: Tailwind CSS, Framer Motion (Sticky-Pin Scroll Animations), Lucide React
- **Web3 Layer**: Wagmi v2, RainbowKit v2, Viem
- **Network Target**: COTI V2 Devnet (Chain ID `13068200`, RPC `https://devnet.coti.io/rpc`)

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm / npx

### Installation & Local Setup

```bash
# Clone the repository
git clone https://github.com/GreatSage-dev/sanctuary-.git
cd sanctuary-

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Run local development server
npm run dev
```

Open `http://localhost:3000` to view the landing page or `http://localhost:3000/vault` to open the Vault Dashboard.

### Compiling & Deploying to COTI V2 Devnet

```bash
# Compile Solidity contracts with Hardhat
npx hardhat compile

# Deploy SanctuaryVault to COTI V2 Devnet
npm run deploy:devnet
```

Copy the deployed contract address output into your `.env` file:
```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourDeployedContractAddress
```

---

## 📜 License

MIT License — Built for the **COTI Vibe Code Challenge Hackathon 2026**.
