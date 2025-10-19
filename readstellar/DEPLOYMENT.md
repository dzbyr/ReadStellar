# 🚀 ReadStellar Deployment Guide

## Prerequisites

1. **Install Soroban CLI** (if not already installed):
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   source ~/.cargo/env
   cargo install --locked soroban-cli
   ```

2. **Create Stellar Testnet Account**:
   - Go to [Stellar Laboratory](https://laboratory.stellar.org/#account-creator?network=testnet)
   - Create a new account and fund it with testnet XLM
   - Save the secret key securely

3. **Install Freighter Wallet**:
   - Download from [freighter.app](https://freighter.app)
   - Create a testnet account in Freighter

## Contract Deployment

### Step 1: Build the Contract

```bash
cd contracts/reading_tracker
cargo build --target wasm32-unknown-unknown --release
```

### Step 2: Deploy to Testnet

```bash
# Set your secret key (replace with your actual secret key)
export SECRET_KEY="your_secret_key_here"

# Deploy the contract
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/reading_tracker.wasm \
  --source-key $SECRET_KEY \
  --rpc-url https://soroban-testnet.stellar.org \
  --network-passphrase "Test SDF Network ; September 2015"
```

### Step 3: Update Contract ID

After deployment, you'll get a contract ID (starts with 'C'). Update the contract configuration:

```bash
# Copy the contract ID and update src/lib/contract-config.ts
# Replace the empty CONTRACT_ID with your deployed contract ID
```

### Step 4: Test the Contract

```bash
# Test complete_book function
soroban contract invoke \
  --id YOUR_CONTRACT_ID \
  --source-key $SECRET_KEY \
  --rpc-url https://soroban-testnet.stellar.org \
  --network-passphrase "Test SDF Network ; September 2015" \
  -- complete_book \
  --reader YOUR_WALLET_ADDRESS \
  --book_title "1984"

# Test get_total_books function
soroban contract invoke \
  --id YOUR_CONTRACT_ID \
  --source-key $SECRET_KEY \
  --rpc-url https://soroban-testnet.stellar.org \
  --network-passphrase "Test SDF Network ; September 2015" \
  -- get_total_books \
  --reader YOUR_WALLET_ADDRESS
```

## Frontend Deployment

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Update Contract Configuration

Edit `src/lib/contract-config.ts` and set your deployed contract ID:

```typescript
export const CONTRACT_CONFIG = {
  CONTRACT_ID: 'YOUR_DEPLOYED_CONTRACT_ID_HERE',
  // ... rest of config
};
```

### Step 3: Run Development Server

```bash
npm run dev
```

### Step 4: Test the Application

1. Open http://localhost:3000
2. Connect your Freighter wallet
3. Enter a book title and click "Complete Book"
4. Verify the transaction in Freighter
5. Check that the counter updates

## Troubleshooting

### Common Issues:

1. **"Contract ID not set" error**:
   - Make sure you've updated the CONTRACT_ID in contract-config.ts

2. **Wallet connection fails**:
   - Ensure Freighter is installed and unlocked
   - Check that you're on the testnet network

3. **Transaction fails**:
   - Verify your account has enough XLM for fees
   - Check that the contract is deployed correctly

4. **Build errors**:
   - Make sure Rust and Soroban CLI are properly installed
   - Try `cargo clean` and rebuild

### Getting Help:

- Check the [Soroban Documentation](https://soroban.stellar.org/docs)
- Join the [Stellar Discord](https://discord.gg/stellar)
- Review the [Freighter Documentation](https://freighter.app/docs)

## Next Steps

Once Phase I is working correctly:

1. Test all functions thoroughly
2. Document any issues found
3. Get approval to proceed to Phase II
4. Plan the database integration and badge system

---

**Remember**: This is Phase I - keep it simple and focused on the core functionality!
