'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { connectWallet, getStoredWallet, WalletState } from '../src/lib/wallet';

export default function Home() {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    publicKey: null,
    error: null
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if wallet is already connected
    const storedWallet = getStoredWallet();
    setWalletState(storedWallet);
    
    if (storedWallet.isConnected) {
      // Redirect to main page if already connected
      router.push('/main');
    }
  }, [router]);

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    try {
      const result = await connectWallet();
      setWalletState(result);
      
      if (result.isConnected) {
        // Redirect to main page on successful connection
        router.push('/main');
      }
    } catch (error) {
      console.error('Connection error:', error);
      setWalletState({
        isConnected: false,
        publicKey: null,
        error: 'Failed to connect wallet'
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📚 ReadStellar
          </h1>
          <p className="text-gray-600">
            Track your reading progress on the Stellar blockchain
          </p>
        </div>

        <div className="mb-8">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔗</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Connect Your Wallet
          </h2>
          <p className="text-gray-600 text-sm">
            Connect your Freighter wallet to start tracking your reading journey
          </p>
        </div>

        {walletState.error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{walletState.error}</p>
          </div>
        )}

        <button
          onClick={handleConnectWallet}
          disabled={isConnecting}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {isConnecting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Connecting...
            </>
          ) : (
            <>
              <span>🔗</span>
              Connect Freighter Wallet
            </>
          )}
        </button>

        <div className="mt-6 text-xs text-gray-500">
          <p>Don't have Freighter? <a href="https://freighter.app" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Install it here</a></p>
        </div>
      </div>
    </div>
  );
}