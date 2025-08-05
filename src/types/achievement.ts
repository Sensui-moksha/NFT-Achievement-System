export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: AchievementCategory;
  tier: AchievementTier;
  icon: string;
  requirements: string;
  pointsRequired: number;
  isUnlocked: boolean;
  unlockedAt?: Date;
  rarity: AchievementRarity;
  metadata: {
    imageUrl?: string;
    externalUrl?: string;
    attributes: Array<{
      trait_type: string;
      value: string | number;
    }>;
  };
}

export enum AchievementCategory {
  TRADING = "trading",
  SOCIAL = "social", 
  GAMING = "gaming",
  DEFI = "defi",
  COLLECTION = "collection",
  MILESTONE = "milestone",
  SPECIAL = "special"
}

export enum AchievementTier {
  BRONZE = "bronze",
  SILVER = "silver", 
  GOLD = "gold",
  PLATINUM = "platinum",
  DIAMOND = "diamond"
}

export enum AchievementRarity {
  COMMON = "common",
  UNCOMMON = "uncommon",
  RARE = "rare",
  EPIC = "epic",
  LEGENDARY = "legendary"
}

export interface UserProfile {
  address: string;
  username?: string;
  totalAchievements: number;
  totalPoints: number;
  level: number;
  joinedAt: Date;
  achievements: Achievement[];
  badges: string[];
}

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  external_url?: string;
  attributes: Array<{
    trait_type: string;
    value: string | number;
    display_type?: string;
  }>;
  achievement_id: string;
  minted_at: string;
  tier: AchievementTier;
  rarity: AchievementRarity;
}