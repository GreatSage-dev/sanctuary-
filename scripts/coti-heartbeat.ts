import hre from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

const COTI_RPC_URL = process.env.COTI_RPC_URL || "https://testnet.coti.io/rpc";
const COTI_EXPLORER_URL = "https://testnet.cotiscan.io";
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0xa8E1d0BDdA53313a8A59b4F7A144d16bB77AdB8a";

const SANCTUARY_VAULT_ABI = [
  "function heartbeat() external",
  "function getVaultStatus() external view returns (bool active, uint256 interval, uint256 graceSec, uint256 lastHeartbeat, uint256 timeRemaining, bool inGrace, bool canExecute)",
  "function owner() external view returns (address)",
  "function isVaultActive() external view returns (bool)",
  "function checkInInterval() external view returns (uint256)",
  "function gracePeriod() external view returns (uint256)",
  "function lastSeen() external view returns (uint256)"
];

async function main() {
  const { ethers } = hre;

  console.log("==========================================================");
  console.log("🛡️  SANCTUARY PROTOCOL — COTI V2 ON-CHAIN HEARTBEAT SCRIPT");
  console.log("==========================================================");

  const [signer] = await ethers.getSigners();
  console.log(`\n🌐 Connected to COTI Network: Chain ID 7082400`);
  console.log(`👤 Signer Wallet Address:     ${signer.address}`);

  const balance = await ethers.provider.getBalance(signer.address);
  console.log(`💰 Signer COTI Balance:      ${ethers.formatEther(balance)} COTI`);
  console.log(`📜 Target Sanctuary Contract: ${CONTRACT_ADDRESS}`);

  console.log("\n----------------------------------------------------------");
  console.log("🚀 EXECUTING ON-CHAIN HEARTBEAT TRANSACTION ON COTI V2...");
  console.log("----------------------------------------------------------");

  try {
    const sanctuaryContract = new ethers.Contract(CONTRACT_ADDRESS, SANCTUARY_VAULT_ABI, signer);
    
    console.log("⏳ Transmitting heartbeat() transaction to COTI V2 node...");
    const tx = await sanctuaryContract.heartbeat({ gasLimit: 500000 });
    console.log(`📡 Broadcast Transaction Hash: ${tx.hash}`);
    console.log("⏳ Awaiting block confirmation on COTI V2 Testnet...");

    const receipt = await tx.wait(1);
    
    console.log("\n==========================================================");
    console.log("✅ ON-CHAIN HEARTBEAT TRANSACTION CONFIRMED!");
    console.log("==========================================================");
    console.log(`📦 Confirmed in Block:       #${receipt.blockNumber}`);
    console.log(`⛽ Gas Used:                 ${receipt.gasUsed.toString()} units`);
    console.log(`🔗 COTI Explorer Link:       ${COTI_EXPLORER_URL}/tx/${tx.hash}`);
    console.log("==========================================================\n");
  } catch (error: any) {
    console.error("\n❌ Transaction Execution Error:", error?.reason || error?.message || error);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Fatal Error:", err);
  process.exit(1);
});
