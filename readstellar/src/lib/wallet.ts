import { 
  isConnected, 
  requestAccess, 
  getAddress,
  signTransaction 
} from '@stellar/freighter-api';

export interface WalletState {
  isConnected: boolean;
  publicKey: string | null;
  error: string | null;
}

export const connectWallet = async (): Promise<WalletState> => {
  try {
    // Check if Freighter is installed
    const { isConnected: freighterConnected } = await isConnected();
    
    if (!freighterConnected) {
      return {
        isConnected: false,
        publicKey: null,
        error: 'Freighter wallet is not installed. Please install it from https://freighter.app'
      };
    }

    // Request access to the wallet
    const { address, error } = await requestAccess();
    
    if (error) {
      return {
        isConnected: false,
        publicKey: null,
        error: error.message || 'Failed to connect wallet'
      };
    }

    if (address) {
      // Save to localStorage
      localStorage.setItem('wallet_public_key', address);
      
      return {
        isConnected: true,
        publicKey: address,
        error: null
      };
    }

    return {
      isConnected: false,
      publicKey: null,
      error: 'No address returned from wallet'
    };
  } catch (error) {
    console.error('Wallet connection error:', error);
    return {
      isConnected: false,
      publicKey: null,
      error: 'Failed to connect wallet'
    };
  }
};

export const disconnectWallet = (): WalletState => {
  localStorage.removeItem('wallet_public_key');
  return {
    isConnected: false,
    publicKey: null,
    error: null
  };
};

export const getStoredWallet = (): WalletState => {
  const publicKey = localStorage.getItem('wallet_public_key');
  return {
    isConnected: !!publicKey,
    publicKey,
    error: null
  };
};

export const signTransactionWithWallet = async (xdr: string, publicKey: string) => {
  try {
    const result = await signTransaction(xdr, {
      address: publicKey,
    });
    
    if (result.error) {
      throw new Error(result.error.message || 'Transaction signing failed');
    }
    
    return result.signedTxXdr;
  } catch (error) {
    console.error('Transaction signing error:', error);
    throw error;
  }
};
