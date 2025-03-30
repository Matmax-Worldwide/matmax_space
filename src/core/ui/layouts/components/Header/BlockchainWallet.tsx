"use client";

import { useState, useEffect, useRef } from 'react';
import { 
  Wallet, 
  ExternalLink, 
  Check, 
  X, 
  ChevronRight, 
  Copy, 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock, 
  DollarSign,
  BarChart3
} from 'lucide-react';
import { cn } from '@/src/core/utils/styling';

type BlockchainWalletProps = {
  className?: string;
  variant?: 'default' | 'admin' | 'lms' | 'finance' | 'payments';
};

// Demo token data
const tokens = [
  { symbol: 'ETH', name: 'Ethereum', balance: '1.234', value: 2947.83, change: 2.5 },
  { symbol: 'BTC', name: 'Bitcoin', balance: '0.056', value: 3295.62, change: -1.2 },
  { symbol: 'MATIC', name: 'Polygon', balance: '203.45', value: 195.31, change: 5.7 },
  { symbol: 'SOL', name: 'Solana', balance: '8.21', value: 843.29, change: 12.4 },
];

// Demo transaction history
const transactions = [
  { type: 'in', amount: '0.2 ETH', date: '2 hours ago', address: '0x71C7...976F' },
  { type: 'out', amount: '0.05 BTC', date: 'Yesterday', address: '0x82B1...441A' },
  { type: 'in', amount: '100 MATIC', date: '3 days ago', address: '0x91F3...118C' },
];

/**
 * Blockchain wallet connection button and full-height sidebar
 */
export default function BlockchainWallet({ className, variant = 'default' }: BlockchainWalletProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('tokens');
  const sidebarRef = useRef<HTMLDivElement>(null);
  
  // Map variant to button gradient colors
  const getWalletButtonColor = () => {
    switch(variant) {
      case 'admin': return 'from-purple-500 to-purple-600';
      case 'lms': return 'from-green-500 to-green-600';
      case 'finance': return 'from-sky-500 to-sky-600';
      case 'payments': return 'from-amber-500 to-amber-600';
      default: return 'from-indigo-500 to-violet-600';
    }
  };
  
  const walletButtonColor = getWalletButtonColor();
  
  const toggleWallet = () => {
    if (!isConnected) {
      // Show connection panel
      setIsOpen(true);
    } else {
      // Toggle wallet sidebar
      setIsOpen(!isOpen);
    }
    
    // Custom event to close other dropdowns
    document.dispatchEvent(new CustomEvent('close-all-dropdowns'));
  };
  
  const connectWallet = () => {
    // Mock connection for demo purposes
    setIsConnected(true);
  };
  
  const disconnectWallet = () => {
    setIsConnected(false);
    setIsOpen(false);
  };
  
  // Close when clicking outside with more reliable detection
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      // Add event listeners with a slight delay to avoid immediate triggering
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        document.addEventListener('keydown', handleEscKey);
        // Prevent scrolling on body when wallet sidebar is open
        document.body.style.overflow = 'hidden';
      }, 10);
      
      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('mousedown', handleOutsideClick);
        document.removeEventListener('keydown', handleEscKey);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  // Listen for global dropdown close events
  useEffect(() => {
    const handleCloseAllDropdowns = () => {
      setIsOpen(false);
    };
    
    document.addEventListener('close-all-dropdowns', handleCloseAllDropdowns);
    return () => {
      document.removeEventListener('close-all-dropdowns', handleCloseAllDropdowns);
    };
  }, []);
  
  // Format address for display
  const formatAddress = (address: string) => {
    return address.length > 10 ? `${address.slice(0, 6)}...${address.slice(-4)}` : address;
  };
  
  return (
    <>
      {/* Wallet Button */}
      <div className={cn("relative", className)}>
        <button 
          onClick={toggleWallet}
          className={cn(
            "flex items-center px-3 py-1.5 rounded-full text-white text-xs h-8 shadow-sm flex-shrink-0 hover:shadow-md transition-all duration-200",
            `bg-gradient-to-r ${walletButtonColor}`,
            isOpen && "ring-2 ring-white/20" // Add highlight when dropdown is open
          )}
          type="button"
          title={isConnected ? "Open Wallet" : "Connect Wallet"}
          aria-label={isConnected ? "Manage blockchain wallet" : "Connect blockchain wallet"}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <Wallet className="w-4 h-4 mr-1.5" />
          <span className="ml-1 hidden xs:inline">
            {isConnected ? "Wallet" : "Connect"}
          </span>
          <span className="hidden sm:inline"> {isConnected ? "" : "Wallet"}</span>
        </button>
      </div>
      
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]" 
          aria-hidden="true"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Full-height sidebar */}
      <div 
        ref={sidebarRef}
        className={cn(
          "fixed top-0 right-0 h-full bg-white dark:bg-neutral-900 shadow-xl z-[201] w-full sm:w-96 max-w-full transition-transform duration-300 ease-in-out transform",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="border-b border-border p-4 flex items-center justify-between sticky top-0 bg-white dark:bg-neutral-900 z-10">
          <div className="flex items-center">
            <Wallet className="w-5 h-5 mr-2 text-indigo-500" />
            <h2 className="text-lg font-semibold">
              {isConnected ? "My Wallet" : "Connect Wallet"}
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            type="button"
            aria-label="Close wallet panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Content - Changes based on connection state */}
        {!isConnected ? (
          /* Connect wallet view */
          <div className="p-6 flex flex-col gap-6">
            <div className="text-center">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-8 h-8 text-indigo-500" />
              </div>
              <h3 className="text-lg font-semibold mb-1">Connect Your Wallet</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Choose one of the available wallet providers below to connect to MatMax Wellness Studio.
              </p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  connectWallet();
                }}
                className="w-full flex items-center justify-between p-4 border border-border rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                type="button"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center rounded-full mr-3">
                    <Wallet className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">MetaMask</div>
                    <div className="text-xs text-muted-foreground">Connect to your MetaMask wallet</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
              
              <button
                className="w-full flex items-center justify-between p-4 border border-border rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                type="button"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center rounded-full mr-3">
                    <Wallet className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">WalletConnect</div>
                    <div className="text-xs text-muted-foreground">Scan with WalletConnect to connect</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
              
              <button
                className="w-full flex items-center justify-between p-4 border border-border rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                type="button"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center rounded-full mr-3">
                    <Wallet className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Coinbase Wallet</div>
                    <div className="text-xs text-muted-foreground">Connect to your Coinbase wallet</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="mt-auto pt-4 text-center text-sm text-muted-foreground">
              <p>By connecting your wallet, you agree to our</p>
              <p><a href="/terms" className="text-indigo-500 hover:underline">Terms of Service</a> and <a href="/privacy" className="text-indigo-500 hover:underline">Privacy Policy</a></p>
            </div>
          </div>
        ) : (
          /* Connected wallet view */
          <div className="flex flex-col h-[calc(100%-57px)]">
            {/* Wallet Address */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Connected Account</span>
                <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Connected</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-mono">0x71C7...976F</p>
                <button 
                  className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  title="Copy address"
                  aria-label="Copy wallet address"
                  type="button"
                >
                  <Copy className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
            
            {/* Balance Summary */}
            <div className="p-4 border-b border-border">
              <h3 className="text-xl font-bold mb-1">$7,282.05</h3>
              <div className="flex items-center text-sm">
                <span className="text-green-500 flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                  3.2%
                </span>
                <span className="text-muted-foreground ml-2">Past 24h</span>
              </div>
            </div>
            
            {/* Navigation Tabs */}
            <div className="p-2 border-b border-border grid grid-cols-3 gap-2">
              <button
                onClick={() => setActiveTab('tokens')}
                className={cn(
                  "p-2 text-sm rounded-md transition-colors text-center",
                  activeTab === 'tokens' 
                    ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 font-medium" 
                    : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                )}
                type="button"
              >
                <Wallet className="w-4 h-4 mx-auto mb-1" />
                Tokens
              </button>
              <button
                onClick={() => setActiveTab('activity')}
                className={cn(
                  "p-2 text-sm rounded-md transition-colors text-center",
                  activeTab === 'activity' 
                    ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 font-medium" 
                    : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                )}
                type="button"
              >
                <Clock className="w-4 h-4 mx-auto mb-1" />
                Activity
              </button>
              <button
                onClick={() => setActiveTab('earnings')}
                className={cn(
                  "p-2 text-sm rounded-md transition-colors text-center",
                  activeTab === 'earnings' 
                    ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 font-medium" 
                    : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                )}
                type="button"
              >
                <DollarSign className="w-4 h-4 mx-auto mb-1" />
                Earnings
              </button>
            </div>
            
            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto">
              {activeTab === 'tokens' && (
                <div className="p-4 space-y-4">
                  {tokens.map((token) => (
                    <div key={token.symbol} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                      <div className="flex items-center">
                        <div className={cn(
                          "w-10 h-10 flex items-center justify-center rounded-full mr-3",
                          token.symbol === 'ETH' ? "bg-blue-100 dark:bg-blue-900/30" :
                          token.symbol === 'BTC' ? "bg-amber-100 dark:bg-amber-900/30" :
                          token.symbol === 'MATIC' ? "bg-purple-100 dark:bg-purple-900/30" :
                          "bg-green-100 dark:bg-green-900/30"
                        )}>
                          <span className="font-bold text-sm">{token.symbol}</span>
                        </div>
                        <div>
                          <div className="font-medium">{token.name}</div>
                          <div className="text-sm text-muted-foreground">{token.balance} {token.symbol}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${token.value.toLocaleString()}</div>
                        <div className={cn(
                          "text-sm",
                          token.change > 0 ? "text-green-500" : "text-red-500"
                        )}>
                          {token.change > 0 ? "+" : ""}{token.change}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {activeTab === 'activity' && (
                <div className="p-4 space-y-4">
                  {transactions.map((tx, i) => (
                    <div key={i} className="p-3 border border-border rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className={cn(
                            "p-1.5 rounded-full mr-2",
                            tx.type === 'in' ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"
                          )}>
                            {tx.type === 'in' ? (
                              <ArrowDownRight className={cn("w-4 h-4", tx.type === 'in' ? "text-green-600" : "text-red-600")} />
                            ) : (
                              <ArrowUpRight className={cn("w-4 h-4", tx.type === 'in' ? "text-green-600" : "text-red-600")} />
                            )}
                          </div>
                          <div className="font-medium">
                            {tx.type === 'in' ? 'Received' : 'Sent'} {tx.amount}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">{tx.date}</div>
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <span className="mr-1">From:</span>
                        <span className="font-mono">{tx.address}</span>
                        <button className="p-1 ml-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md">
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {activeTab === 'earnings' && (
                <div className="p-4 space-y-4">
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                    <div className="text-center mb-4">
                      <BarChart3 className="w-10 h-10 text-indigo-600 mx-auto mb-2" />
                      <h3 className="text-lg font-bold">Total Earnings</h3>
                      <p className="text-xl font-bold mt-1">$1,248.32</p>
                      <p className="text-sm text-muted-foreground">From wellness program rewards and token staking</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="bg-white dark:bg-neutral-800 p-3 rounded-lg text-center">
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Rewards</h4>
                        <p className="text-lg font-bold">$876.54</p>
                      </div>
                      <div className="bg-white dark:bg-neutral-800 p-3 rounded-lg text-center">
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Staking</h4>
                        <p className="text-lg font-bold">$371.78</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-border rounded-lg overflow-hidden">
                    <div className="p-3 border-b border-border bg-neutral-50 dark:bg-neutral-800/50">
                      <h3 className="font-medium">Earning History</h3>
                    </div>
                    <div className="divide-y divide-border">
                      <div className="p-3 flex items-center justify-between">
                        <div>
                          <div className="font-medium">Program Completion Reward</div>
                          <div className="text-sm text-muted-foreground">Jun 12, 2023</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-green-600">+$250.00</div>
                          <div className="text-xs text-muted-foreground">25 MMWT tokens</div>
                        </div>
                      </div>
                      <div className="p-3 flex items-center justify-between">
                        <div>
                          <div className="font-medium">Staking Rewards</div>
                          <div className="text-sm text-muted-foreground">Jun 1, 2023</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-green-600">+$85.45</div>
                          <div className="text-xs text-muted-foreground">8.5 MMWT tokens</div>
                        </div>
                      </div>
                      <div className="p-3 flex items-center justify-between">
                        <div>
                          <div className="font-medium">Referral Bonus</div>
                          <div className="text-sm text-muted-foreground">May 28, 2023</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-green-600">+$100.00</div>
                          <div className="text-xs text-muted-foreground">10 MMWT tokens</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Footer Actions */}
            <div className="p-4 border-t border-border mt-auto">
              <div className="grid grid-cols-2 gap-3">
                <button
                  className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                  type="button"
                >
                  Send
                </button>
                <button
                  className="py-2 px-4 bg-white dark:bg-neutral-800 border border-border hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                  type="button"
                >
                  Receive
                </button>
                <button
                  className="py-2 px-4 bg-white dark:bg-neutral-800 border border-border hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-lg transition-colors col-span-2"
                  onClick={disconnectWallet}
                  type="button"
                >
                  Disconnect Wallet
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
} 