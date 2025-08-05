import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WalletState {
  connected: boolean;
  address: string | null;
  balance: number;
}

interface WalletContextValue extends WalletState {
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextValue | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [wallet, setWallet] = useState<WalletState>({
    connected: false,
    address: null,
    balance: 0,
  });

  const connect = async () => {
    // Simulate wallet connection
    setWallet({
      connected: true,
      address: '0x1234567890abcdef1234567890abcdef12345678',
      balance: 100.5,
    });
  };

  const disconnect = () => {
    setWallet({
      connected: false,
      address: null,
      balance: 0,
    });
  };

  return (
    <WalletContext.Provider
      value={{
        ...wallet,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};