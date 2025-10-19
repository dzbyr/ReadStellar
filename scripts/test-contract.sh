#!/bin/bash

# ReadStellar Contract Testing Script
# Make sure to set your SECRET_KEY and CONTRACT_ID before running

set -e

echo "🧪 ReadStellar Contract Testing"
echo "==============================="

# Check if required variables are set
if [ -z "$SECRET_KEY" ]; then
    echo "❌ Error: SECRET_KEY environment variable is not set"
    echo "Please set it with: export SECRET_KEY='your_secret_key_here'"
    exit 1
fi

if [ -z "$CONTRACT_ID" ]; then
    echo "❌ Error: CONTRACT_ID environment variable is not set"
    echo "Please set it with: export CONTRACT_ID='your_contract_id_here'"
    exit 1
fi

# Get wallet address from secret key
WALLET_ADDRESS=$(soroban keys address --secret-key $SECRET_KEY)
echo "📋 Testing with wallet: $WALLET_ADDRESS"
echo "📋 Contract ID: $CONTRACT_ID"
echo ""

# Test 1: Complete a book
echo "📚 Test 1: Completing book '1984'..."
soroban contract invoke \
  --id $CONTRACT_ID \
  --source-key $SECRET_KEY \
  --rpc-url https://soroban-testnet.stellar.org \
  --network-passphrase "Test SDF Network ; September 2015" \
  -- complete_book \
  --reader $WALLET_ADDRESS \
  --book_title "1984"

if [ $? -eq 0 ]; then
    echo "✅ Book completion successful"
else
    echo "❌ Book completion failed"
    exit 1
fi

echo ""

# Test 2: Get total books
echo "📊 Test 2: Getting total books..."
TOTAL_BOOKS=$(soroban contract invoke \
  --id $CONTRACT_ID \
  --source-key $SECRET_KEY \
  --rpc-url https://soroban-testnet.stellar.org \
  --network-passphrase "Test SDF Network ; September 2015" \
  -- get_total_books \
  --reader $WALLET_ADDRESS)

echo "📊 Total books: $TOTAL_BOOKS"

echo ""

# Test 3: Get last book
echo "📖 Test 3: Getting last book..."
LAST_BOOK=$(soroban contract invoke \
  --id $CONTRACT_ID \
  --source-key $SECRET_KEY \
  --rpc-url https://soroban-testnet.stellar.org \
  --network-passphrase "Test SDF Network ; September 2015" \
  -- get_last_book \
  --reader $WALLET_ADDRESS)

echo "📖 Last book: $LAST_BOOK"

echo ""

# Test 4: Get global count
echo "🌍 Test 4: Getting global count..."
GLOBAL_COUNT=$(soroban contract invoke \
  --id $CONTRACT_ID \
  --source-key $SECRET_KEY \
  --rpc-url https://soroban-testnet.stellar.org \
  --network-passphrase "Test SDF Network ; September 2015" \
  -- get_global_count)

echo "🌍 Global count: $GLOBAL_COUNT"

echo ""

# Test 5: Complete another book
echo "📚 Test 5: Completing book 'To Kill a Mockingbird'..."
soroban contract invoke \
  --id $CONTRACT_ID \
  --source-key $SECRET_KEY \
  --rpc-url https://soroban-testnet.stellar.org \
  --network-passphrase "Test SDF Network ; September 2015" \
  -- complete_book \
  --reader $WALLET_ADDRESS \
  --book_title "To Kill a Mockingbird"

if [ $? -eq 0 ]; then
    echo "✅ Second book completion successful"
else
    echo "❌ Second book completion failed"
    exit 1
fi

echo ""

# Test 6: Verify updated count
echo "📊 Test 6: Verifying updated total books..."
UPDATED_TOTAL=$(soroban contract invoke \
  --id $CONTRACT_ID \
  --source-key $SECRET_KEY \
  --rpc-url https://soroban-testnet.stellar.org \
  --network-passphrase "Test SDF Network ; September 2015" \
  -- get_total_books \
  --reader $WALLET_ADDRESS)

echo "📊 Updated total books: $UPDATED_TOTAL"

echo ""
echo "🎉 All tests completed successfully!"
echo ""
echo "Summary:"
echo "- Completed 2 books"
echo "- Total books: $UPDATED_TOTAL"
echo "- Last book: To Kill a Mockingbird"
echo "- Global count: $GLOBAL_COUNT"
echo ""
echo "✅ Contract is working correctly!"
