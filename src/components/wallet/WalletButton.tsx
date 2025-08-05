import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Wallet, LogOut, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { useToast } from '@/hooks/use-toast';

export const WalletButton: React.FC = () => {
  const { connected, address, connect, disconnect } = useWallet();
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      toast({
        title: "Address copied",
        description: "Wallet address copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shortenAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (connected && address) {
    return (
      <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Wallet className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium">Connected</p>
                <div className="flex items-center space-x-2">
                  <p className="text-xs text-muted-foreground">
                    {shortenAddress(address)}
                  </p>
                  <button
                    onClick={handleCopyAddress}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {copied ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <Button
              onClick={disconnect}
              variant="outline"
              size="sm"
              className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Disconnect
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Button
      onClick={connect}
      className="bg-gradient-to-br from-primary to-secondary hover:opacity-90 transition-opacity"
    >
      <Wallet className="w-4 h-4 mr-2" />
      Connect Wallet
    </Button>
  );
};