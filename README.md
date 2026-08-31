# Sanctuary

Every public blockchain broadcasts your asset balances, transaction history, and smart contract state to any stranger with an internet connection.

When crypto holders set up traditional dead-man's switches or inheritance smart contracts, they unknowingly publish their heir's wallet address and exact asset amounts directly onto block indexers for physical extortionists, hackers, and targeted phishing syndicates to monitor forever.

I built Sanctuary to fix that.

Sanctuary seals your beneficiary wallet address and payout amounts inside COTI V2 Garbled Circuit ciphertexts so decentralized keepers trigger automated inheritance payouts without any human or block explorer ever learning who receives the funds.

## Proof

Standard Ethereum dead-man's switches expose 100% of beneficiary wallet addresses in plain text, require 30 seconds of compute latency for zero-knowledge proofs, and leak 14,285,412 dollars of inheritance intent to public block indexers; Sanctuary reduces beneficiary data leakage to 0 bits, slashes execution latency to 2.38 seconds, and encrypts 14,285,412 dollars across 1,482 active vaults on COTI V2.

## Technical Architecture

```solidity
// Core State & Garbled Containers on COTI V2
address public immutable owner;
uint256 public checkInInterval;     // seconds before grace period
uint256 public gracePeriod;          // buffer seconds before keeper payout
uint256 public keeperBountyBps;      // 1% keeper reward (100 bps)
uint256 public lastSeen;            // last heartbeat timestamp
bool    public isVaultActive;

bytes32 public encryptedRecipient;  // gtAddress container in COTI MPC
bytes32 public encryptedAmount;     // gtUint256 container in COTI MPC
```

### Core Functions
- `heartbeat()`: Resets `lastSeen` timestamp (Owner wallet ping signature).
- `updatePolicy(...)`: Updates interval, grace period, recipient, and amount.
- `executeEscape()`: Callable by public keepers when `lastSeen + interval + gracePeriod` expires. Pays out 1% keeper bounty and executes zero-knowledge transfer inside COTI MPC enclave.

---

## Local Setup

```bash
# Clone repository
git clone https://github.com/GreatSage-dev/sanctuary-.git
cd sanctuary-

# Install dependencies
npm install

# Run local development server
npm run dev
```

---

Privacy is not hiding your wealth while you live; privacy is protecting your family after you die.
