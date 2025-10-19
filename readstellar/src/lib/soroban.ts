// Contract integration for Phase I
// This handles both real contract calls and local state for testing

export interface ContractResult {
  success: boolean;
  data?: any;
  error?: string;
}

// Local state for testing (will be replaced by real contract calls)
let localState = {
  totalBooks: 0,
  lastBook: '',
  globalCount: 0,
  userBooks: new Map<string, { total: number; lastBook: string }>()
};

// Load state from localStorage on initialization
const loadStateFromStorage = () => {
  // Only run in browser environment
  if (typeof window === 'undefined') return;
  
  try {
    const stored = localStorage.getItem('readstellar_state');
    if (stored) {
      const parsed = JSON.parse(stored);
      localState.globalCount = parsed.globalCount || 0;
      
      // Restore user books map
      if (parsed.userBooks) {
        localState.userBooks = new Map(Object.entries(parsed.userBooks));
      }
      
      console.log('Loaded state from localStorage:', localState);
    }
  } catch (error) {
    console.error('Error loading state from localStorage:', error);
  }
};

// Save state to localStorage
const saveStateToStorage = () => {
  // Only run in browser environment
  if (typeof window === 'undefined') return;
  
  try {
    const stateToSave = {
      globalCount: localState.globalCount,
      userBooks: Object.fromEntries(localState.userBooks)
    };
    localStorage.setItem('readstellar_state', JSON.stringify(stateToSave));
    console.log('Saved state to localStorage:', stateToSave);
  } catch (error) {
    console.error('Error saving state to localStorage:', error);
  }
};

// Initialize state from storage when first function is called
let isInitialized = false;
const initializeIfNeeded = () => {
  if (!isInitialized && typeof window !== 'undefined') {
    loadStateFromStorage();
    isInitialized = true;
  }
};

// Helper function to get or create user data
const getUserData = (userAddress: string) => {
  if (!localState.userBooks.has(userAddress)) {
    localState.userBooks.set(userAddress, { total: 0, lastBook: '' });
    saveStateToStorage(); // Save when creating new user
  }
  return localState.userBooks.get(userAddress)!;
};

export const completeBook = async (
  readerAddress: string,
  bookTitle: string,
  publicKey: string
): Promise<ContractResult> => {
  initializeIfNeeded();
  console.log('completeBook called with:', { readerAddress, bookTitle, publicKey });
  
  try {
    // Update local state
    const userData = getUserData(readerAddress);
    userData.total += 1;
    userData.lastBook = bookTitle;
    localState.globalCount += 1;
    
    // Save to localStorage
    saveStateToStorage();
    
    console.log('Updated local state:', {
      userTotal: userData.total,
      lastBook: userData.lastBook,
      globalCount: localState.globalCount
    });
    
    return {
      success: true,
      data: { result: 'Book completed successfully' }
    };
  } catch (error) {
    console.error('Error in completeBook:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

export const getTotalBooks = async (
  readerAddress: string,
  publicKey: string
): Promise<ContractResult> => {
  initializeIfNeeded();
  console.log('getTotalBooks called with:', { readerAddress, publicKey });
  
  try {
    const userData = getUserData(readerAddress);
    const total = userData.total;
    
    console.log('getTotalBooks returning:', total);
    
    return {
      success: true,
      data: { result: total }
    };
  } catch (error) {
    console.error('Error in getTotalBooks:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

export const getLastBook = async (
  readerAddress: string,
  publicKey: string
): Promise<ContractResult> => {
  initializeIfNeeded();
  console.log('getLastBook called with:', { readerAddress, publicKey });
  
  try {
    const userData = getUserData(readerAddress);
    const lastBook = userData.lastBook;
    
    console.log('getLastBook returning:', lastBook);
    
    return {
      success: true,
      data: { result: lastBook }
    };
  } catch (error) {
    console.error('Error in getLastBook:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

export const getGlobalCount = async (
  publicKey: string
): Promise<ContractResult> => {
  initializeIfNeeded();
  console.log('getGlobalCount called with:', { publicKey });
  
  try {
    const globalCount = localState.globalCount;
    
    console.log('getGlobalCount returning:', globalCount);
    
    return {
      success: true,
      data: { result: globalCount }
    };
  } catch (error) {
    console.error('Error in getGlobalCount:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Helper function to reset state (for testing)
export const resetLocalState = () => {
  localState = {
    totalBooks: 0,
    lastBook: '',
    globalCount: 0,
    userBooks: new Map()
  };
  
  // Only run in browser environment
  if (typeof window !== 'undefined') {
    localStorage.removeItem('readstellar_state');
  }
  
  console.log('Local state reset and localStorage cleared');
};