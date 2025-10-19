'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getStoredWallet, disconnectWallet, WalletState } from '../../src/lib/wallet';
import { completeBook, getTotalBooks, getLastBook, getGlobalCount, ContractResult, resetLocalState } from '../../src/lib/soroban';

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
      console.log('Loading reading data for:', walletState.publicKey);
      
      // Check localStorage directly for debugging
      const stored = localStorage.getItem('readstellar_state');
      console.log('Raw localStorage data:', stored);
      
      // Get total books
      const totalResult = await getTotalBooks(walletState.publicKey, walletState.publicKey);
      console.log('Total books result:', totalResult);
      if (totalResult.success) {
        const total = totalResult.data?.result || 0;
        setTotalBooks(total);
        console.log('Set total books to:', total);
      }

      // Get last book
      const lastBookResult = await getLastBook(walletState.publicKey, walletState.publicKey);
      console.log('Last book result:', lastBookResult);
      if (lastBookResult.success) {
        const lastBook = lastBookResult.data?.result || '';
        setLastBook(lastBook);
        console.log('Set last book to:', lastBook);
      }

      // Get global count
      const globalResult = await getGlobalCount(walletState.publicKey);
      console.log('Global count result:', globalResult);
      if (globalResult.success) {
        const global = globalResult.data?.result || 0;
        setGlobalCount(global);
        console.log('Set global count to:', global);
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
      console.log('Completing book:', bookTitle, 'for user:', walletState.publicKey);
      const result = await completeBook(bookTitle, bookTitle, walletState.publicKey);
      console.log('Complete book result:', result);
      
      if (result.success) {
        setMessage({ type: 'success', text: `Successfully completed "${bookTitle}"!` });
        setBookTitle('');
        
        // Immediately reload data to show updated counts
        console.log('Reloading data after book completion...');
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
        <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            📚 Complete a Book
          </h2>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200 focus-within:border-indigo-300 focus-within:bg-indigo-50 transition-colors">
              <label htmlFor="bookTitle" className="block text-lg font-bold text-gray-900 mb-4">
                📖 Book Title
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="bookTitle"
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  placeholder=""
                  className="book-title-input w-full px-4 py-4 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 placeholder-gray-700 text-lg font-semibold shadow-md"
                  disabled={isLoading}
                style={{
                  fontSize: '20px',
                  lineHeight: '1.6',
                  color: '#000000',
                  backgroundColor: '#ffffff',
                  fontWeight: '700',
                  letterSpacing: '0.025em',
                  opacity: 1,
                  caretColor: '#000000',
                  border: '3px solid #1f2937',
                  textShadow: 'none'
                } as React.CSSProperties}
                />
                {!bookTitle && (
                  <div 
                    className="absolute inset-0 flex items-center px-4 pointer-events-none"
                    style={{
                      color: '#1f2937',
                      fontSize: '20px',
                      fontWeight: '600',
                      lineHeight: '1.6'
                    }}
                  >
                    Enter the book title you completed...
                  </div>
                )}
              </div>
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

        {/* Debug Panel */}
        <div className="bg-gray-100 rounded-2xl shadow-xl p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Debug Information:
          </h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p><strong>Wallet Address:</strong> {walletState.publicKey || 'Not connected'}</p>
            <p><strong>Total Books:</strong> {totalBooks}</p>
            <p><strong>Last Book:</strong> "{lastBook || 'None'}"</p>
            <p><strong>Global Count:</strong> {globalCount}</p>
            <p><strong>Loading:</strong> {isLoading ? 'Yes' : 'No'}</p>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => {
                resetLocalState();
                loadReadingData();
              }}
              className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
            >
              Reset All Data
            </button>
            <button
              onClick={() => {
                console.log('Manual refresh triggered');
                loadReadingData();
              }}
              className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
            >
              Refresh Data
            </button>
          </div>
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
