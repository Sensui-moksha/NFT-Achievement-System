import React, { useState, useEffect } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { WalletButton } from '@/components/wallet/WalletButton';
import { UserProfile } from '@/components/profile/UserProfile';
import { AchievementGrid } from '@/components/achievements/AchievementGrid';
import { mockAchievements } from '@/data/mockAchievements';
import type { UserProfile as UserProfileType } from '@/types/achievement';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { connected, address } = useWallet();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);

  useEffect(() => {
    if (connected && address) {
      // Initialize user profile with mock data
      const profile: UserProfileType = {
        address: address,
        username: `User_${address.slice(-4)}`,
        totalAchievements: mockAchievements.filter(a => a.isUnlocked).length,
        totalPoints: mockAchievements
          .filter(a => a.isUnlocked)
          .reduce((sum, a) => sum + a.pointsRequired, 0),
        level: Math.floor(mockAchievements
          .filter(a => a.isUnlocked)
          .reduce((sum, a) => sum + a.pointsRequired, 0) / 1000) + 1,
        joinedAt: new Date('2024-01-01'),
        achievements: mockAchievements,
        badges: ['Early Adopter', 'First Transaction', 'Active Trader']
      };
      setUserProfile(profile);
    }
  }, [connected, address]);

  const handleClaimAchievement = async (achievementId: string) => {
    if (!address) return;
    
    setIsLoading(true);
    try {
      // Simulate claiming process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update the achievement as claimed
      if (userProfile) {
        const updatedAchievements = userProfile.achievements.map(achievement => 
          achievement.id === achievementId 
            ? { ...achievement, isUnlocked: true, unlockedAt: new Date() }
            : achievement
        );
        
        const newPoints = updatedAchievements
          .filter(a => a.isUnlocked)
          .reduce((sum, a) => sum + a.pointsRequired, 0);
        
        setUserProfile({
          ...userProfile,
          achievements: updatedAchievements,
          totalAchievements: updatedAchievements.filter(a => a.isUnlocked).length,
          totalPoints: newPoints,
          level: Math.floor(newPoints / 1000) + 1
        });
      }

      toast({
        title: "Achievement Claimed!",
        description: "Your NFT achievement has been successfully minted.",
      });
    } catch (error) {
      toast({
        title: "Claiming Failed",
        description: "There was an error claiming your achievement. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!connected) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                Aptos Achievement System
              </h1>
              <p className="text-muted-foreground">
                Connect your wallet to view and claim your achievements
              </p>
            </div>
            <WalletButton />
          </div>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-gradient-to-br from-card/50 to-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Aptos Achievement System
            </h1>
            <WalletButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Profile Sidebar */}
          <div className="lg:col-span-1">
            <UserProfile profile={userProfile} />
          </div>

          {/* Achievements Grid */}
          <div className="lg:col-span-2">
            <AchievementGrid
              achievements={userProfile.achievements}
              onClaimAchievement={handleClaimAchievement}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;