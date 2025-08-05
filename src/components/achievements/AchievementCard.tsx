import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Achievement, AchievementTier, AchievementRarity } from '@/types/achievement';
import { Trophy, Lock, Star, Calendar, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AchievementCardProps {
  achievement: Achievement;
  onClaim?: () => void;
  canClaim?: boolean;
  isLoading?: boolean;
}

const getTierColor = (tier: AchievementTier): string => {
  switch (tier) {
    case AchievementTier.BRONZE:
      return 'text-nft-bronze bg-gradient-to-r from-nft-bronze/20 to-nft-bronze/10 border-nft-bronze/30';
    case AchievementTier.SILVER:
      return 'text-nft-silver bg-gradient-to-r from-nft-silver/20 to-nft-silver/10 border-nft-silver/30';
    case AchievementTier.GOLD:
      return 'text-nft-gold bg-gradient-to-r from-nft-gold/20 to-nft-gold/10 border-nft-gold/30';
    case AchievementTier.PLATINUM:
      return 'text-primary bg-gradient-to-r from-primary/20 to-primary/10 border-primary/30';
    case AchievementTier.DIAMOND:
      return 'text-nft-secondary bg-gradient-to-r from-nft-secondary/20 to-nft-secondary/10 border-nft-secondary/30';
    default:
      return 'text-muted-foreground bg-muted/20 border-muted/30';
  }
};

const getRarityIcon = (rarity: AchievementRarity) => {
  const stars = {
    [AchievementRarity.COMMON]: 1,
    [AchievementRarity.UNCOMMON]: 2,
    [AchievementRarity.RARE]: 3,
    [AchievementRarity.EPIC]: 4,
    [AchievementRarity.LEGENDARY]: 5,
  };

  return Array.from({ length: stars[rarity] }, (_, i) => (
    <Star key={i} className="w-3 h-3 fill-current" />
  ));
};

export const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  onClaim,
  canClaim = false,
  isLoading = false
}) => {
  const tierColorClass = getTierColor(achievement.tier);
  const isUnlocked = achievement.isUnlocked;

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300 hover:scale-105 group",
      "bg-gradient-card border-border shadow-card hover:shadow-elevated",
      isUnlocked ? "ring-1 ring-primary/20" : "opacity-75",
      canClaim && "ring-2 ring-primary animate-pulse"
    )}>
      {/* Background gradient overlay */}
      <div className={cn(
        "absolute inset-0 opacity-10 transition-opacity duration-300",
        isUnlocked ? "bg-gradient-primary group-hover:opacity-20" : "bg-gradient-secondary"
      )} />
      
      <CardContent className="relative p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
              isUnlocked ? "bg-gradient-primary shadow-glow-primary" : "bg-muted"
            )}>
              {isUnlocked ? (
                <Trophy className="w-6 h-6 text-white" />
              ) : (
                <Lock className="w-6 h-6 text-muted-foreground" />
              )}
            </div>
            <div>
              <h3 className={cn(
                "font-semibold text-lg transition-colors",
                isUnlocked ? "text-foreground" : "text-muted-foreground"
              )}>
                {achievement.name}
              </h3>
              <div className="flex items-center space-x-1 text-nft-gold">
                {getRarityIcon(achievement.rarity)}
              </div>
            </div>
          </div>
          
          <Badge className={cn("text-xs font-medium", tierColorClass)}>
            {achievement.tier.toUpperCase()}
          </Badge>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {achievement.description}
        </p>

        {/* Requirements */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Requirements:</span>
            <span className="text-foreground font-medium">
              {achievement.pointsRequired} points
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {achievement.requirements}
          </p>
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Award className="w-3 h-3" />
            <span>{achievement.category.toUpperCase()}</span>
          </div>
          
          {isUnlocked && achievement.unlockedAt && (
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <span>{new Date(achievement.unlockedAt).toLocaleDateString()}</span>
            </div>
          )}
        </div>

        {/* Action button */}
        {canClaim && onClaim && (
          <Button
            onClick={onClaim}
            disabled={isLoading}
            className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            {isLoading ? "Claiming..." : "Claim Achievement"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};