#!/bin/bash

# ReadStellar Contract Deployment Script
# Make sure to set your SECRET_KEY environment variable before running

set -e

echo "🚀 ReadStellar Contract Deployment"
echo "=================================="

# Check if SECRET_KEY is set
if [ -z "$SECRET_KEY" ]; then
    echo "❌ Error: SECRET_KEY environment variable is not set"
    echo "Please set it with: export SECRET_KEY='your_secret_key_here'"
    exit 1
fi

# Check if soroban CLI is installed
if ! command -v soroban &> /dev/null; then
    echo "❌ Error: soroban CLI is not installed"
    echo "Install it with: cargo install --locked soroban-cli"
    exit 1
fi

echo "📦 Building contract..."
cd contracts/reading_tracker
cargo build --target wasm32-unknown-unknown --release

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build successful"

echo "🚀 Deploying contract to testnet..."
CONTRACT_ID=$(soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/reading_tracker.wasm \
  --source-key $SECRET_KEY \
  --rpc-url https://soroban-testnet.stellar.org \
  --network-passphrase "Test SDF Network ; September 2015")

if [ $? -ne 0 ]; then
    echo "❌ Deployment failed"
    exit 1
fi

echo "✅ Contract deployed successfully!"
echo "📋 Contract ID: $CONTRACT_ID"

# Update contract config
echo "📝 Updating contract configuration..."
cd ../..
CONFIG_FILE="src/lib/contract-config.ts"

# Create backup
cp $CONFIG_FILE $CONFIG_FILE.backup

# Update the contract ID
sed -i "s/CONTRACT_ID: '',/CONTRACT_ID: '$CONTRACT_ID',/" $CONFIG_FILE

echo "✅ Contract configuration updated"
echo ""
echo "🎉 Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Test the contract with: npm run dev"
echo "2. Open http://localhost:3000"
echo "3. Connect your Freighter wallet"
echo "4. Try completing a book!"
echo ""
echo "Contract ID saved to: $CONFIG_FILE"
echo "Backup created at: $CONFIG_FILE.backup"
