// Contract configuration
// This will be updated after contract deployment

export const CONTRACT_CONFIG = {
  // Network configuration
  NETWORK: 'TESTNET',
  NETWORK_PASSPHRASE: 'Test SDF Network ; September 2015',
  RPC_URL: 'https://soroban-testnet.stellar.org',
  HORIZON_URL: 'https://horizon-testnet.stellar.org',
  
  // Function names
  FUNCTIONS: {
    COMPLETE_BOOK: 'complete_book',
    GET_TOTAL_BOOKS: 'get_total_books',
    GET_LAST_BOOK: 'get_last_book',
    GET_GLOBAL_COUNT: 'get_global_count'
  }
} as const;

// Contract ID will be set after deployment
let CONTRACT_ID = '';

// Helper function to update contract ID after deployment
export const updateContractId = (contractId: string) => {
  CONTRACT_ID = contractId;
  // In a real app, you might want to save this to localStorage or a config file
  localStorage.setItem('contract_id', contractId);
};

// Helper function to get contract ID
export const getContractId = (): string => {
  return CONTRACT_ID || localStorage.getItem('contract_id') || '';
};
