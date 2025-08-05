import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WalletButton } from "@/components/wallet/WalletButton";
import { useWallet } from "@/contexts/WalletContext";
import { Trophy, Zap, Shield, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const { connected } = useWallet();

  const features = [
    {
      icon: Trophy,
      title: "Collect Achievements",
      description: "Earn unique NFT badges for completing milestones and accomplishments"
    },
    {
      icon: Zap,
      title: "Real-time Tracking",
      description: "Monitor your progress and unlock achievements as you complete tasks"
    },
    {
      icon: Shield,
      title: "Blockchain Verified",
      description: "All achievements are minted as NFTs on the Aptos blockchain"
    },
    {
      icon: Star,
      title: "Showcase Profile",
      description: "Display your achievement collection and level progression"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-2">
            <Trophy className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Achievement System
            </h1>
          </div>
          <WalletButton />
        </header>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Earn NFT Achievements
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Complete milestones, unlock unique NFT badges, and showcase your accomplishments on the Aptos blockchain
          </p>
          {connected ? (
            <Link to="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                View Dashboard
              </Button>
            </Link>
          ) : (
            <div className="text-center">
              <p className="text-muted-foreground mb-4">Connect your wallet to get started</p>
              <WalletButton />
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gradient-to-br from-card/50 to-card border-border/50 hover:border-primary/30 transition-colors">
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
