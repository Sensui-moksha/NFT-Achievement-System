#!/bin/bash

# Aptos Achievement System Deployment Script
# This script automates the deployment process for both smart contracts and frontend

set -e

echo "🚀 Starting Aptos Achievement System Deployment"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if aptos CLI is installed
if ! command -v aptos &> /dev/null; then
    echo -e "${RED}❌ Aptos CLI is not installed. Please install it first.${NC}"
    echo "Visit: https://github.com/aptos-labs/aptos-core/releases"
    exit 1
fi

# Check if we're in the correct directory
if [ ! -f "move/Move.toml" ]; then
    echo -e "${RED}❌ Please run this script from the project root directory${NC}"
    exit 1
fi

echo -e "${BLUE}📋 Checking prerequisites...${NC}"

# Check if wallet is initialized
if [ ! -f ".aptos/config.yaml" ]; then
    echo -e "${YELLOW}⚠️  Aptos wallet not initialized. Initializing now...${NC}"
    aptos init --network devnet
fi

# Get the account address
ACCOUNT_ADDRESS=$(aptos config show-profiles --profile default | grep account | awk '{print $2}')
echo -e "${GREEN}✅ Using account: $ACCOUNT_ADDRESS${NC}"

# Fund the account
echo -e "${BLUE}💰 Funding account...${NC}"
aptos account fund-with-faucet --account $ACCOUNT_ADDRESS || true

echo -e "${BLUE}🔨 Compiling Move contract...${NC}"
cd move

# Compile the contract
if aptos move compile --named-addresses achievement_system=$ACCOUNT_ADDRESS; then
    echo -e "${GREEN}✅ Contract compiled successfully${NC}"
else
    echo -e "${RED}❌ Contract compilation failed${NC}"
    exit 1
fi

# Test the contract
echo -e "${BLUE}🧪 Running tests...${NC}"
if aptos move test; then
    echo -e "${GREEN}✅ All tests passed${NC}"
else
    echo -e "${YELLOW}⚠️  Some tests failed, but continuing with deployment${NC}"
fi

# Deploy the contract
echo -e "${BLUE}🚀 Deploying contract to Aptos Devnet...${NC}"
if aptos move publish --named-addresses achievement_system=$ACCOUNT_ADDRESS --assume-yes; then
    echo -e "${GREEN}✅ Contract deployed successfully${NC}"
else
    echo -e "${RED}❌ Contract deployment failed${NC}"
    exit 1
fi

# Initialize the achievement system
echo -e "${BLUE}🔧 Initializing achievement system...${NC}"
if aptos move run --function-id $ACCOUNT_ADDRESS::achievement_system::initialize --assume-yes; then
    echo -e "${GREEN}✅ Achievement system initialized${NC}"
else
    echo -e "${YELLOW}⚠️  Achievement system might already be initialized${NC}"
fi

cd ..

# Update the frontend configuration
echo -e "${BLUE}⚙️  Updating frontend configuration...${NC}"
sed -i.bak "s/export const MODULE_ADDRESS = \".*\";/export const MODULE_ADDRESS = \"$ACCOUNT_ADDRESS\";/" src/lib/aptos.ts
rm -f src/lib/aptos.ts.bak

echo -e "${GREEN}✅ Configuration updated${NC}"

# Build the frontend
echo -e "${BLUE}🏗️  Building frontend...${NC}"
if npm run build; then
    echo -e "${GREEN}✅ Frontend built successfully${NC}"
else
    echo -e "${RED}❌ Frontend build failed${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo "=============================================="
echo -e "${BLUE}📝 Deployment Summary:${NC}"
echo -e "   Contract Address: ${GREEN}$ACCOUNT_ADDRESS${NC}"
echo -e "   Network: ${GREEN}Devnet${NC}"
echo -e "   Frontend: ${GREEN}Built and ready${NC}"
echo ""
echo -e "${BLUE}🔗 Next Steps:${NC}"
echo "   1. Start the development server: npm run dev"
echo "   2. Visit http://localhost:8080"
echo "   3. Connect your wallet and test the functionality"
echo ""
echo -e "${YELLOW}💡 Note: Make sure to use the same wallet address ($ACCOUNT_ADDRESS) when connecting in the frontend${NC}"