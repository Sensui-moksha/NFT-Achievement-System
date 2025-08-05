# Deployment Guide

This guide provides step-by-step instructions for deploying the Aptos Achievement System to Devnet and eventually to Mainnet.

## Prerequisites

Before deploying, ensure you have:

- [Aptos CLI installed](https://github.com/aptos-labs/aptos-core/releases)
- Node.js (v18+) and npm installed
- Git installed
- A funded Aptos account on Devnet

## Quick Deployment (Automated)

Use the automated deployment script:

```bash
# Make the script executable
chmod +x scripts/deploy.sh

# Run the deployment
./scripts/deploy.sh
```

This script will:
1. Check prerequisites
2. Initialize Aptos wallet (if needed)
3. Fund the account
4. Compile and test the Move contract
5. Deploy to Devnet
6. Initialize the achievement system
7. Update frontend configuration
8. Build the frontend

## Manual Deployment

### Step 1: Setup Aptos Account

1. **Initialize Aptos CLI**
   ```bash
   aptos init --network devnet
   ```
   
   This will:
   - Generate a new key pair
   - Create a `.aptos/config.yaml` file
   - Show your account address

2. **Fund your account**
   ```bash
   aptos account fund-with-faucet --account <your-account-address>
   ```

3. **Verify account balance**
   ```bash
   aptos account balance --account <your-account-address>
   ```

### Step 2: Deploy Smart Contract

1. **Navigate to Move directory**
   ```bash
   cd move
   ```

2. **Compile the contract**
   ```bash
   aptos move compile --named-addresses achievement_system=<your-account-address>
   ```

3. **Test the contract**
   ```bash
   aptos move test
   ```

4. **Deploy to Devnet**
   ```bash
   aptos move publish --named-addresses achievement_system=<your-account-address>
   ```

5. **Initialize the system**
   ```bash
   aptos move run --function-id <your-account-address>::achievement_system::initialize
   ```

### Step 3: Configure Frontend

1. **Update contract address**
   
   Edit `src/lib/aptos.ts`:
   ```typescript
   export const MODULE_ADDRESS = "<your-account-address>";
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the frontend**
   ```bash
   npm run build
   ```

### Step 4: Create Initial Achievements

Run the achievement creation script:

```bash
chmod +x scripts/create-achievements.sh
./scripts/create-achievements.sh
```

Or create them manually using the CLI:

```bash
aptos move run --function-id <your-address>::achievement_system::create_achievement \
    --args string:"achievement_id" \
           string:"Achievement Name" \
           string:"Achievement Description" \
           u8:1 \
           u8:1 \
           u8:1 \
           u64:100 \
           string:"Requirements" \
           string:"image_url"
```

## Testing the Deployment

### 1. Start Development Server

```bash
npm run dev
```

### 2. Test Wallet Connection

1. Open http://localhost:8080
2. Navigate to the Dashboard
3. Connect your wallet (use the same address you deployed with)
4. Verify the connection shows your address

### 3. Test Achievement System

1. View available achievements
2. Check if your wallet shows the correct progress
3. Try claiming an achievement (you may need to simulate progress first)

### 4. Update User Progress (Testing)

To test the claim functionality, update user progress:

```bash
aptos move run --function-id <your-address>::achievement_system::update_progress \
    --args address:<your-address> \
           string:"first_steps" \
           u64:10
```

## Deployment to Mainnet

⚠️ **Warning**: Only deploy to mainnet after thorough testing on devnet!

### Prerequisites for Mainnet

- Sufficient APT tokens for gas fees
- Thoroughly tested contract on devnet
- Security audit (recommended)
- Backup of all keys and configurations

### Mainnet Deployment Steps

1. **Switch to mainnet**
   ```bash
   aptos init --network mainnet
   ```

2. **Update Move.toml for mainnet**
   ```toml
   [addresses]
   achievement_system = "<your-mainnet-address>"
   ```

3. **Deploy to mainnet**
   ```bash
   aptos move publish --named-addresses achievement_system=<your-mainnet-address>
   ```

4. **Update frontend configuration**
   ```typescript
   export const aptosConfig = new AptosConfig({
     network: Network.MAINNET,
   });
   ```

## Frontend Deployment

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

### Deploy to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload the `dist` folder to Netlify**

### Deploy to AWS S3

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload to S3 bucket with static website hosting enabled**

## Environment Variables

For production deployments, set these environment variables:

```bash
VITE_APTOS_NETWORK=devnet  # or mainnet
VITE_MODULE_ADDRESS=<your-contract-address>
VITE_API_URL=https://fullnode.devnet.aptoslabs.com/v1  # or mainnet URL
```

## Monitoring and Maintenance

### View Contract Events

```bash
aptos account balance --account <contract-address>
```

### Check Transaction History

Use the Aptos Explorer:
- Devnet: https://explorer.aptoslabs.com/?network=devnet
- Mainnet: https://explorer.aptoslabs.com/

### Update Contract

To update the contract:

1. Make changes to the Move code
2. Increment version in `Move.toml`
3. Test thoroughly
4. Deploy the update

## Troubleshooting

### Common Issues

1. **"Account not found" error**
   - Ensure your account is funded
   - Check you're using the correct network

2. **"Module already exists" error**
   - The contract is already deployed to this address
   - Use a different address or update the existing contract

3. **"Insufficient balance" error**
   - Fund your account with more APT tokens

4. **Frontend wallet connection issues**
   - Verify the MODULE_ADDRESS is correct
   - Check that you're on the right network (devnet/mainnet)
   - Clear browser cache and try again

### Getting Help

- Check the [Aptos documentation](https://aptos.dev/)
- Join the [Aptos Discord](https://discord.gg/aptosnetwork)
- Review transaction details on the Aptos Explorer

## Security Checklist

Before mainnet deployment:

- [ ] All tests pass
- [ ] Contract has been audited
- [ ] Private keys are securely stored
- [ ] Admin functions are properly protected
- [ ] Frontend validates all user inputs
- [ ] Rate limiting is implemented where needed
- [ ] Emergency pause functionality works
- [ ] Backup and recovery procedures are documented

## Post-Deployment

After successful deployment:

1. **Monitor the system** for any issues
2. **Document the deployment** details
3. **Share the contract address** with users
4. **Set up monitoring** for events and errors
5. **Plan for maintenance** and updates

---

For additional help, refer to the main README.md or open an issue on GitHub.