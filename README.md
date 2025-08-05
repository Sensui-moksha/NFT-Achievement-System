# Aptos NFT Achievement System

A comprehensive full-stack NFT Achievement System built for the Aptos blockchain (Devnet). This project allows users to mint and manage NFT badges for specific accomplishments and milestones across the Aptos ecosystem.

## 🎯 Features

- **NFT Achievement Minting**: Mint unique NFT badges for accomplishments
- **Aptos Wallet Integration**: Seamless wallet connection and interaction
- **Achievement Tracking**: Track progress across multiple achievement categories
- **Custom Metadata**: Store accomplishment details, dates, and icons
- **User Profiles**: Comprehensive user profiles with level progression
- **Tier System**: Bronze, Silver, Gold, Platinum, and Diamond tiers
- **Rarity System**: Common, Uncommon, Rare, Epic, and Legendary rarities
- **Multiple Categories**: Trading, Social, Gaming, DeFi, Collection, Milestone, and Special

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and builds
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Aptos Wallet Adapter** for wallet integration
- **React Router** for navigation
- **Lucide React** for icons

### Blockchain
- **Aptos Blockchain** (Devnet)
- **Move Smart Contracts** for achievement logic
- **Aptos Token Objects** for NFT functionality

### Design System
- **Custom gradient-based theme** with crypto/NFT aesthetics
- **Dark theme** optimized for blockchain applications
- **Responsive design** for all devices
- **Smooth animations** and transitions

## 📁 Project Structure

```
├── move/                          # Move smart contracts
│   ├── sources/
│   │   └── achievement_system.move # Main achievement contract
│   └── Move.toml                  # Move project configuration
├── src/
│   ├── components/                # React components
│   │   ├── achievements/          # Achievement-related components
│   │   ├── profile/              # User profile components
│   │   ├── wallet/               # Wallet connection components
│   │   └── ui/                   # UI library components
│   ├── contexts/                 # React contexts
│   ├── data/                     # Mock data and constants
│   ├── hooks/                    # Custom React hooks
│   ├── lib/                      # Utility functions
│   ├── pages/                    # Page components
│   ├── types/                    # TypeScript type definitions
│   └── index.css                 # Global styles and design system
├── scripts/                      # Deployment and utility scripts
└── docs/                        # Documentation
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Aptos CLI** installed
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aptos-achievement-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

## 📚 Smart Contract Deployment

### Setup Aptos CLI

1. **Install Aptos CLI**
   ```bash
   # macOS
   brew install aptos
   
   # Or download from: https://github.com/aptos-labs/aptos-core/releases
   ```

2. **Initialize Aptos account**
   ```bash
   aptos init --network devnet
   ```

3. **Fund your account**
   ```bash
   aptos account fund-with-faucet --account <your-address>
   ```

### Deploy the Smart Contract

1. **Navigate to Move directory**
   ```bash
   cd move
   ```

2. **Compile the contract**
   ```bash
   aptos move compile
   ```

3. **Test the contract (optional)**
   ```bash
   aptos move test
   ```

4. **Deploy to Devnet**
   ```bash
   aptos move publish --named-addresses achievement_system=<your-address>
   ```

5. **Initialize the achievement system**
   ```bash
   aptos move run --function-id <your-address>::achievement_system::initialize
   ```

### Update Frontend Configuration

After deployment, update the contract address in `src/lib/aptos.ts`:

```typescript
export const MODULE_ADDRESS = "0x<your-deployed-address>";
```

## 🎮 Usage Guide

### For Users

1. **Connect Wallet**
   - Install Petra, Martian, or another supported Aptos wallet
   - Click "Connect Wallet" and approve the connection

2. **View Achievements**
   - Browse available achievements in different categories
   - Filter by tier, category, or completion status
   - View detailed requirements and rewards

3. **Claim Achievements**
   - Complete the required actions for an achievement
   - Click "Claim Achievement" to mint your NFT badge
   - View your collected achievements in your profile

4. **Track Progress**
   - Monitor your overall completion rate
   - View your current level and total points
   - See your achievement history and badges

### For Developers

#### Create New Achievements

Add achievements via the smart contract:

```move
public entry fun create_achievement(
    admin: &signer,
    achievement_id: String,
    name: String,
    description: String,
    category: u8,
    tier: u8,
    rarity: u8,
    points_required: u64,
    requirements: String,
    image_uri: String,
)
```

#### Update User Progress

Track user progress programmatically:

```move
public entry fun update_progress(
    user_address: address,
    achievement_id: String,
    progress: u64,
)
```

## 🧪 Testing

### Frontend Testing

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Build for production
npm run build
```

### Smart Contract Testing

```bash
cd move
aptos move test
```

### Integration Testing

1. **Test wallet connection**
2. **Test achievement claiming**
3. **Test progress tracking**
4. **Test NFT minting**

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```bash
VITE_APTOS_NETWORK=devnet
VITE_MODULE_ADDRESS=0x<your-contract-address>
VITE_API_URL=https://fullnode.devnet.aptoslabs.com/v1
```

### Customization

#### Adding New Achievement Categories

1. Update the `AchievementCategory` enum in `src/types/achievement.ts`
2. Add the new category constant in the Move contract
3. Update the mock data in `src/data/mockAchievements.ts`

#### Modifying the Design System

Edit `src/index.css` and `tailwind.config.ts` to customize:
- Color schemes
- Gradients
- Shadows and glows
- Animations

## 📱 API Reference

### Smart Contract Functions

#### View Functions

- `get_achievement(achievement_id: String)`: Get achievement details
- `get_user_progress(user_address: address, achievement_id: String)`: Get user progress
- `get_user_achievements(user_address: address)`: Get user's achievements
- `is_achievement_claimable(user_address: address, achievement_id: String)`: Check if claimable

#### Entry Functions

- `initialize(admin: &signer)`: Initialize the system
- `create_achievement(...)`: Create new achievement
- `claim_achievement(user: &signer, achievement_id: String)`: Claim achievement NFT
- `update_progress(...)`: Update user progress

### Frontend Hooks

```typescript
// Wallet connection
import { useWallet } from '@aptos-labs/wallet-adapter-react';

// Toast notifications
import { useToast } from '@/hooks/use-toast';

// Navigation
import { useNavigate } from 'react-router-dom';
```

## 🚀 Deployment

### Frontend Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform**
   - Vercel: `vercel deploy`
   - Netlify: Upload `dist` folder
   - AWS S3: Upload `dist` folder

### Smart Contract Deployment to Mainnet

⚠️ **Warning**: Only deploy to mainnet after thorough testing!

1. **Switch to mainnet**
   ```bash
   aptos init --network mainnet
   ```

2. **Deploy contract**
   ```bash
   aptos move publish --named-addresses achievement_system=<your-mainnet-address>
   ```

3. **Update frontend configuration**
   ```typescript
   const aptosConfig = new AptosConfig({
     network: Network.MAINNET,
   });
   ```

## 🛡 Security Considerations

- All achievements are stored on-chain for transparency
- NFT minting is controlled by smart contract logic
- User progress is verified before claiming
- Admin functions are protected by access control
- Wallet connections use official Aptos adapters

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Open an issue on GitHub
- **Discussions**: Use GitHub Discussions for questions

## 🎯 Roadmap

- [ ] **Mainnet deployment**
- [ ] **Mobile app version**
- [ ] **Achievement marketplace**
- [ ] **Social features and leaderboards**
- [ ] **Integration with more Aptos dApps**
- [ ] **Advanced analytics dashboard**
- [ ] **Automated achievement detection**

## 🙏 Acknowledgments

- **Aptos Foundation** for the blockchain platform
- **Aptos Developer Community** for tools and resources
- **shadcn/ui** for the component library
- **Tailwind CSS** for styling utilities

---

Built with ❤️ for the Aptos ecosystem