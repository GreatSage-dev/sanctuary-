import hre from "hardhat";

async function main() {
  const { ethers } = hre;

  console.log("--------------------------------------------------");
  console.log("Deploying SanctuaryVault to COTI V2 Testnet...");
  console.log("--------------------------------------------------");

  const [deployer] = await ethers.getSigners();
  console.log("Deployer Wallet Address:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Deployer COTI Balance:  ", ethers.formatEther(balance), "COTI");

  if (balance === 0n) {
    console.error("❌ ERROR: Deployer wallet has 0 COTI testnet tokens!");
    console.error("Please request testnet tokens from COTI Faucet at https://faucet.coti.io");
    process.exit(1);
  }

  const intervalSeconds = 86400; // 24 hours
  const gracePeriodSeconds = 86400; // 24 hours
  const encRecipient = ethers.keccak256(ethers.toUtf8Bytes("0x71C7656EC7ab88b098defB751B7401B5f6d8976F"));
  const encAmount = ethers.keccak256(ethers.toUtf8Bytes("5000000000000000000000")); // 5000 COTI

  const SanctuaryVault = await ethers.getContractFactory("SanctuaryVault");
  const vault = await SanctuaryVault.deploy(
    intervalSeconds,
    gracePeriodSeconds,
    encRecipient,
    encAmount
  );

  await vault.waitForDeployment();

  const vaultAddress = await vault.getAddress();

  console.log("--------------------------------------------------");
  console.log("✅ SanctuaryVault Deployed Successfully!");
  console.log("Contract Address:", vaultAddress);
  console.log("Owner Address:   ", deployer.address);
  console.log("--------------------------------------------------");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
