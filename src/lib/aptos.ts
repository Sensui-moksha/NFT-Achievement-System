import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

const DEVNET_NODE_URL = "https://fullnode.devnet.aptoslabs.com/v1";
const DEVNET_FAUCET_URL = "https://faucet.devnet.aptoslabs.com";

// Module constants
export const MODULE_ADDRESS = "0x1"; // This will be replaced with actual deployed address
export const MODULE_NAME = "achievement_system";

export const aptosConfig = new AptosConfig({
  network: Network.DEVNET,
});

export const aptos = new Aptos(aptosConfig);

// Contract function names
export const CONTRACT_FUNCTIONS = {
  CREATE_ACHIEVEMENT: `${MODULE_ADDRESS}::${MODULE_NAME}::create_achievement`,
  MINT_ACHIEVEMENT_NFT: `${MODULE_ADDRESS}::${MODULE_NAME}::mint_achievement_nft`,
  GET_USER_ACHIEVEMENTS: `${MODULE_ADDRESS}::${MODULE_NAME}::get_user_achievements`,
  UPDATE_USER_PROGRESS: `${MODULE_ADDRESS}::${MODULE_NAME}::update_user_progress`,
  CLAIM_ACHIEVEMENT: `${MODULE_ADDRESS}::${MODULE_NAME}::claim_achievement`,
} as const;

// Helper functions
export const shortenAddress = (address: string, chars = 4): string => {
  if (!address) return "";
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
};

export const formatAptosAmount = (amount: number | string): string => {
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
  return (numAmount / 100000000).toFixed(4); // Convert from Octas to APT
};

export const isValidAptosAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{64}$/.test(address);
};