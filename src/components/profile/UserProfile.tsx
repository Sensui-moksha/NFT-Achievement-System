import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import type { UserProfile as UserProfileType } from '@/types/achievement';
import { User, Trophy, Star, Calendar, TrendingUp } from 'lucide-react';

interface UserProfileProps {
  profile: UserProfileType;
  className?: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({ 
  profile, 
  className 
}) => {
  const completionRate = (profile.achievements.filter(a => a.isUnlocked).length / profile.achievements.length) * 100;
  const nextLevelPoints = (profile.level + 1) * 1000; // Simple leveling system
  const currentLevelProgress = (profile.totalPoints % 1000) / 10; // Progress to next level

  return (
    <Card className={`bg-gradient-to-br from-card/50 to-card border-border/50 shadow-card ${className}`}>
      <CardHeader className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl text-foreground">
              {profile.username || 'Anonymous User'}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {profile.address.slice(0, 6)}...{profile.address.slice(-4)}
            </p>
          </div>
          <Badge className="bg-gradient-to-br from-primary to-secondary text-white">
            Level {profile.level}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Level Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Level Progress</span>
            <span className="text-foreground font-medium">
              {profile.totalPoints % 1000} / 1000 XP
            </span>
          </div>
          <Progress value={currentLevelProgress} className="h-2" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Trophy className="w-4 h-4" />
              <span>Achievements</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {profile.achievements.filter(a => a.isUnlocked).length}
            </p>
            <p className="text-xs text-muted-foreground">
              of {profile.achievements.length} total
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Star className="w-4 h-4" />
              <span>Total Points</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {profile.totalPoints.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">
              Lifetime earned
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4" />
              <span>Completion</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {completionRate.toFixed(1)}%
            </p>
            <p className="text-xs text-muted-foreground">
              Overall progress
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Member Since</span>
            </div>
            <p className="text-sm font-medium text-foreground">
              {new Date(profile.joinedAt).toLocaleDateString()}
            </p>
            <p className="text-xs text-muted-foreground">
              {Math.floor((Date.now() - profile.joinedAt.getTime()) / (1000 * 60 * 60 * 24))} days ago
            </p>
          </div>
        </div>

        {/* Recent Badges */}
        {profile.badges.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Recent Badges</h4>
            <div className="flex flex-wrap gap-2">
              {profile.badges.slice(0, 6).map((badge, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs border-primary/30 text-primary"
                >
                  {badge}
                </Badge>
              ))}
              {profile.badges.length > 6 && (
                <Badge variant="outline" className="text-xs text-muted-foreground">
                  +{profile.badges.length - 6} more
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};