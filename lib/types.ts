export interface VaultConfig {
  checkInIntervalHours: number;
  gracePeriodHours: number;
  encryptedRecipient: string; // Garbled ctAddress string
  encryptedAmount: string; // Garbled ctUint256 amount in $COTI
  lastSeenTimestamp: number; // Unix epoch seconds
  isActive: boolean;
  vaultAddress: string;
  ownerAddress: string;
  keeperBountyBps: number; // e.g. 100 = 1% keeper reward
}

export interface HeartbeatStatus {
  remainingSeconds: number;
  status: "active" | "warning" | "grace_period" | "expired";
  formattedCountdown: string;
  healthPercentage: number;
  inGracePeriod: boolean;
}

export interface GarbledCircuitPreview {
  rawInput: string;
  garbledCiphertext: string;
  circuitProofHash: string;
  isEncryptedOnChain: boolean;
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  chainId: number | null;
  networkName: string;
  balanceCOTI: string;
}
