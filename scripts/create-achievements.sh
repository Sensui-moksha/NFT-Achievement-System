#!/bin/bash

# Script to create initial achievements in the system
# Run this after deploying the contract

set -e

ACCOUNT_ADDRESS=$(aptos config show-profiles --profile default | grep account | awk '{print $2}')

echo "🎯 Creating initial achievements..."
echo "Using account: $ACCOUNT_ADDRESS"

# Create First Steps achievement
echo "Creating 'First Steps' achievement..."
aptos move run --function-id $ACCOUNT_ADDRESS::achievement_system::create_achievement \
    --args string:"first_steps" \
           string:"First Steps" \
           string:"Complete your first transaction on the Aptos network" \
           u8:6 \
           u8:1 \
           u8:1 \
           u64:10 \
           string:"Complete 1 transaction" \
           string:"https://example.com/first-steps.png" \
    --assume-yes

# Create Trading Pioneer achievement
echo "Creating 'Trading Pioneer' achievement..."
aptos move run --function-id $ACCOUNT_ADDRESS::achievement_system::create_achievement \
    --args string:"trading_pioneer" \
           string:"Trading Pioneer" \
           string:"Execute your first DEX trade on Aptos" \
           u8:1 \
           u8:2 \
           u8:2 \
           u64:50 \
           string:"Complete 1 DEX trade" \
           string:"https://example.com/trading-pioneer.png" \
    --assume-yes

# Create NFT Collector achievement
echo "Creating 'NFT Collector' achievement..."
aptos move run --function-id $ACCOUNT_ADDRESS::achievement_system::create_achievement \
    --args string:"nft_collector" \
           string:"NFT Collector" \
           string:"Own your first NFT on the Aptos blockchain" \
           u8:5 \
           u8:1 \
           u8:1 \
           u64:25 \
           string:"Own 1 NFT" \
           string:"https://example.com/nft-collector.png" \
    --assume-yes

# Create DeFi Explorer achievement
echo "Creating 'DeFi Explorer' achievement..."
aptos move run --function-id $ACCOUNT_ADDRESS::achievement_system::create_achievement \
    --args string:"defi_explorer" \
           string:"DeFi Explorer" \
           string:"Participate in decentralized finance protocols" \
           u8:4 \
           u8:3 \
           u8:3 \
           u64:100 \
           string:"Interact with 3 DeFi protocols" \
           string:"https://example.com/defi-explorer.png" \
    --assume-yes

# Create Early Adopter achievement
echo "Creating 'Early Adopter' achievement..."
aptos move run --function-id $ACCOUNT_ADDRESS::achievement_system::create_achievement \
    --args string:"early_adopter" \
           string:"Early Adopter" \
           string:"One of the first 1000 users on the platform" \
           u8:7 \
           u8:4 \
           u8:4 \
           u64:250 \
           string:"Be among first 1000 users" \
           string:"https://example.com/early-adopter.png" \
    --assume-yes

echo "✅ All achievements created successfully!"