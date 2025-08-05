import { Achievement, AchievementCategory, AchievementTier, AchievementRarity } from '@/types/achievement';

export const mockAchievements: Achievement[] = [
  {
    id: '1',
    name: 'First Steps',
    description: 'Complete your first transaction on the Aptos network',
    category: AchievementCategory.MILESTONE,
    tier: AchievementTier.BRONZE,
    icon: '🚀',
    requirements: 'Complete 1 transaction',
    pointsRequired: 10,
    isUnlocked: true,
    unlockedAt: new Date('2024-01-15'),
    rarity: AchievementRarity.COMMON,
    metadata: {
      imageUrl: 'https://example.com/first-steps.png',
      attributes: [
        { trait_type: 'Category', value: 'Milestone' },
        { trait_type: 'Tier', value: 'Bronze' },
        { trait_type: 'Rarity', value: 'Common' },
        { trait_type: 'Points', value: 10 }
      ]
    }
  },
  {
    id: '2',
    name: 'Trading Pioneer',
    description: 'Execute your first DEX trade on Aptos',
    category: AchievementCategory.TRADING,
    tier: AchievementTier.SILVER,
    icon: '📈',
    requirements: 'Complete 1 DEX trade',
    pointsRequired: 50,
    isUnlocked: true,
    unlockedAt: new Date('2024-01-20'),
    rarity: AchievementRarity.UNCOMMON,
    metadata: {
      attributes: [
        { trait_type: 'Category', value: 'Trading' },
        { trait_type: 'Tier', value: 'Silver' },
        { trait_type: 'Rarity', value: 'Uncommon' },
        { trait_type: 'Points', value: 50 }
      ]
    }
  },
  {
    id: '3',
    name: 'NFT Collector',
    description: 'Own your first NFT on the Aptos blockchain',
    category: AchievementCategory.COLLECTION,
    tier: AchievementTier.BRONZE,
    icon: '🎨',
    requirements: 'Own 1 NFT',
    pointsRequired: 25,
    isUnlocked: false,
    rarity: AchievementRarity.COMMON,
    metadata: {
      attributes: [
        { trait_type: 'Category', value: 'Collection' },
        { trait_type: 'Tier', value: 'Bronze' },
        { trait_type: 'Rarity', value: 'Common' },
        { trait_type: 'Points', value: 25 }
      ]
    }
  },
  {
    id: '4',
    name: 'DeFi Explorer',
    description: 'Participate in decentralized finance protocols',
    category: AchievementCategory.DEFI,
    tier: AchievementTier.GOLD,
    icon: '💰',
    requirements: 'Interact with 3 DeFi protocols',
    pointsRequired: 100,
    isUnlocked: false,
    rarity: AchievementRarity.RARE,
    metadata: {
      attributes: [
        { trait_type: 'Category', value: 'DeFi' },
        { trait_type: 'Tier', value: 'Gold' },
        { trait_type: 'Rarity', value: 'Rare' },
        { trait_type: 'Points', value: 100 }
      ]
    }
  },
  {
    id: '5',
    name: 'Social Butterfly',
    description: 'Connect with 10 other users in the ecosystem',
    category: AchievementCategory.SOCIAL,
    tier: AchievementTier.SILVER,
    icon: '🦋',
    requirements: 'Connect with 10 users',
    pointsRequired: 75,
    isUnlocked: false,
    rarity: AchievementRarity.UNCOMMON,
    metadata: {
      attributes: [
        { trait_type: 'Category', value: 'Social' },
        { trait_type: 'Tier', value: 'Silver' },
        { trait_type: 'Rarity', value: 'Uncommon' },
        { trait_type: 'Points', value: 75 }
      ]
    }
  },
  {
    id: '6',
    name: 'Gaming Champion',
    description: 'Win 5 games in Aptos-based gaming platforms',
    category: AchievementCategory.GAMING,
    tier: AchievementTier.GOLD,
    icon: '🏆',
    requirements: 'Win 5 games',
    pointsRequired: 150,
    isUnlocked: false,
    rarity: AchievementRarity.RARE,
    metadata: {
      attributes: [
        { trait_type: 'Category', value: 'Gaming' },
        { trait_type: 'Tier', value: 'Gold' },
        { trait_type: 'Rarity', value: 'Rare' },
        { trait_type: 'Points', value: 150 }
      ]
    }
  },
  {
    id: '7',
    name: 'Diamond Hands',
    description: 'Hold assets for over 100 days without selling',
    category: AchievementCategory.TRADING,
    tier: AchievementTier.DIAMOND,
    icon: '💎',
    requirements: 'Hold assets for 100+ days',
    pointsRequired: 500,
    isUnlocked: false,
    rarity: AchievementRarity.LEGENDARY,
    metadata: {
      attributes: [
        { trait_type: 'Category', value: 'Trading' },
        { trait_type: 'Tier', value: 'Diamond' },
        { trait_type: 'Rarity', value: 'Legendary' },
        { trait_type: 'Points', value: 500 }
      ]
    }
  },
  {
    id: '8',
    name: 'Early Adopter',
    description: 'One of the first 1000 users on the platform',
    category: AchievementCategory.SPECIAL,
    tier: AchievementTier.PLATINUM,
    icon: '⭐',
    requirements: 'Be among first 1000 users',
    pointsRequired: 250,
    isUnlocked: true,
    unlockedAt: new Date('2024-01-01'),
    rarity: AchievementRarity.EPIC,
    metadata: {
      attributes: [
        { trait_type: 'Category', value: 'Special' },
        { trait_type: 'Tier', value: 'Platinum' },
        { trait_type: 'Rarity', value: 'Epic' },
        { trait_type: 'Points', value: 250 },
        { trait_type: 'Limited Edition', value: 'Yes' }
      ]
    }
  }
];