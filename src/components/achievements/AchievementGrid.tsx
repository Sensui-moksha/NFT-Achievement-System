import React, { useState } from 'react';
import { AchievementCard } from './AchievementCard';
import { Achievement, AchievementCategory, AchievementTier } from '@/types/achievement';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Trophy } from 'lucide-react';

interface AchievementGridProps {
  achievements: Achievement[];
  onClaimAchievement?: (achievementId: string) => Promise<void>;
  isLoading?: boolean;
}

export const AchievementGrid: React.FC<AchievementGridProps> = ({
  achievements,
  onClaimAchievement,
  isLoading = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [showUnlockedOnly, setShowUnlockedOnly] = useState(false);

  const filteredAchievements = achievements.filter(achievement => {
    const matchesSearch = achievement.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      achievement.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || achievement.category === selectedCategory;
    const matchesTier = selectedTier === 'all' || achievement.tier === selectedTier;
    const matchesUnlocked = !showUnlockedOnly || achievement.isUnlocked;

    return matchesSearch && matchesCategory && matchesTier && matchesUnlocked;
  });

  const unlockedCount = achievements.filter(a => a.isUnlocked).length;
  const totalCount = achievements.length;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-foreground">Achievements</h2>
          <p className="text-muted-foreground">
            {unlockedCount} of {totalCount} achievements unlocked
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-nft-gold" />
          <Badge className="bg-gradient-primary text-white">
            {Math.round((unlockedCount / totalCount) * 100)}% Complete
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search achievements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {Object.values(AchievementCategory).map(category => (
              <SelectItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedTier} onValueChange={setSelectedTier}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tier" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tiers</SelectItem>
            {Object.values(AchievementTier).map(tier => (
              <SelectItem key={tier} value={tier}>
                {tier.charAt(0).toUpperCase() + tier.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant={showUnlockedOnly ? "default" : "outline"}
          onClick={() => setShowUnlockedOnly(!showUnlockedOnly)}
          className="whitespace-nowrap"
        >
          <Filter className="w-4 h-4 mr-2" />
          {showUnlockedOnly ? 'Show All' : 'Unlocked Only'}
        </Button>
      </div>

      {/* Achievement Grid */}
      {filteredAchievements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              onClaim={onClaimAchievement ? () => onClaimAchievement(achievement.id) : undefined}
              canClaim={!achievement.isUnlocked && achievement.pointsRequired <= 0} // Simplified logic
              isLoading={isLoading}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Trophy className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No achievements found
          </h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or search terms.
          </p>
        </div>
      )}
    </div>
  );
};