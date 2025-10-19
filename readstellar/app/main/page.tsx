'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getStoredWallet, disconnectWallet, WalletState } from '../../src/lib/wallet';
import { completeBook, getTotalBooks, getLastBook, getGlobalCount, ContractResult } from '../../src/lib/soroban';

export default function MainPage() {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    publicKey: null,
    error: null
  });
  const [bookTitle, setBookTitle] = useState('');
  const [totalBooks, setTotalBooks] = useState(0);
  const [lastBook, setLastBook] = useState('');
  const [globalCount, setGlobalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if wallet is connected
    const storedWallet = getStoredWallet();
    setWalletState(storedWallet);
    
    if (!storedWallet.isConnected) {
      // Redirect to home if not connected
      router.push('/');
      return;
    }

    // Load user's reading data
    loadReadingData();
  }, [router]);

  const loadReadingData = async () => {
    if (!walletState.publicKey) return;
    
    setIsLoading(true);
    try {
      // Get total books
      const totalResult = await getTotalBooks(walletState.publicKey, walletState.publicKey);
      if (totalResult.success) {
        setTotalBooks(totalResult.data?.result || 0);
      }

      // Get last book
      const lastBookResult = await getLastBook(walletState.publicKey, walletState.publicKey);
      if (lastBookResult.success) {
        setLastBook(lastBookResult.data?.result || '');
      }

      // Get global count
      const globalResult = await getGlobalCount(walletState.publicKey);
      if (globalResult.success) {
        setGlobalCount(globalResult.data?.result || 0);
      }
    } catch (error) {
      console.error('Error loading reading data:', error);
      setMessage({ type: 'error', text: 'Failed to load reading data' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteBook = async () => {
    if (!bookTitle.trim()) {
      setMessage({ type: 'error', text: 'Please enter a book title' });
      return;
    }

    if (!walletState.publicKey) {
      setMessage({ type: 'error', text: 'Wallet not connected' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const result = await completeBook(bookTitle, bookTitle, walletState.publicKey);
      
      if (result.success) {
        setMessage({ type: 'success', text: `Successfully completed "${bookTitle}"!` });
        setBookTitle('');
        // Reload data to show updated counts
        await loadReadingData();
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to complete book' });
      }
    } catch (error) {
      console.error('Error completing book:', error);
      setMessage({ type: 'error', text: 'Failed to complete book' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = () => {
    setWalletState(disconnectWallet());
    router.push('/');
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">📚 ReadStellar</h1>
            <button
              onClick={handleDisconnect}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Disconnect
            </button>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Connected Wallet:</p>
            <p className="font-mono text-sm text-gray-900">
              {walletState.publicKey ? formatAddress(walletState.publicKey) : 'Not connected'}
            </p>
          </div>
        </div>

        {/* Reading Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">
              {isLoading ? '...' : totalBooks}
            </div>
            <div className="text-sm text-gray-600">Books Read</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {isLoading ? '...' : globalCount}
            </div>
            <div className="text-sm text-gray-600">Global Total</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-lg font-semibold text-gray-800 mb-2">
              {isLoading ? '...' : (lastBook || 'None')}
            </div>
            <div className="text-sm text-gray-600">Last Book</div>
          </div>
        </div>

        {/* Book Completion Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Complete a Book
          </h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="bookTitle" className="block text-sm font-medium text-gray-700 mb-2">
                Book Title
              </label>
              <input
                type="text"
                id="bookTitle"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                placeholder="Enter the book title you completed..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                disabled={isLoading}
              />
            </div>
            
            <button
              onClick={handleCompleteBook}
              disabled={isLoading || !bookTitle.trim()}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Completing...
                </>
              ) : (
                <>
                  <span>✅</span>
                  Complete Book
                </>
              )}
            </button>
          </div>

          {/* Message Display */}
          {message && (
            <div className={`mt-4 p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-800' 
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              <p className="text-sm">{message.text}</p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            How it works:
          </h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Enter the title of a book you've completed</li>
            <li>• Click "Complete Book" to record it on the blockchain</li>
            <li>• Your reading progress is stored permanently on Stellar</li>
            <li>• View your stats and compare with the global community</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
