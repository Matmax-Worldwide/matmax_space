import { useState, useEffect } from 'react';
import { cn } from '@/src/core/utils/styling';
import { Wallet, ExternalLink, AlertCircle } from 'lucide-react';

/**
 * Blockchain wallet connection component
 * Handles wallet connection status and displays relevant information
 */
export function BlockchainWallet() {
  // In a real app, this would use a Web3 hook like wagmi's useAccount
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [network, setNetwork] = useState('');
  const [balance, setBalance] = useState('0');
  const [open, setOpen] = useState(false);
  
  // Simulate wallet connection (in a real app, this would integrate with Web3 libraries)
  const connectWallet = async () => {
    try {
      // This is a placeholder - in a real app, you would use a library like ethers.js
      // const provider = new ethers.providers.Web3Provider(window.ethereum)
      // await provider.send("eth_requestAccounts", []);
      // const signer = provider.getSigner();
      // const address = await signer.getAddress();
      
      // Simulate successful connection
      setIsConnected(true);
      setWalletAddress('0x71C7656EC7ab88b098defB751B7401B5f6d8976F');
      setNetwork('Ethereum');
      setBalance('1.234');
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };
  
  // Simulate wallet disconnection
  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
    setNetwork('');
    setBalance('0');
    setOpen(false);
  };
  
  // Format address for display
  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  return (
    <div className="relative">
      {isConnected ? (
        // Connected wallet state
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary text-xs h-8"
          title="Connected Wallet"
          aria-label="Connected wallet account"
        >
          <Wallet className="w-4 h-4 mr-1.5" />
          <span className="ml-1 hidden sm:inline">{formatAddress(walletAddress)}</span>
        </button>
      ) : (
        // Disconnected wallet state
        <button
          onClick={connectWallet}
          className="flex items-center px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-xs h-8"
          title="Connect Wallet"
          aria-label="Connect blockchain wallet"
        >
          <Wallet className="w-4 h-4 mr-1.5" />
          <span className="ml-1 hidden xs:inline">Connect</span>
          <span className="hidden sm:inline"> Wallet</span>
        </button>
      )}
      
      {/* Wallet details dropdown */}
      {isConnected && open && (
        <>
          {/* Dropdown backdrop - closes dropdown when clicked */}
          <div 
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />
          
          <div className="absolute right-0 mt-2 w-64 bg-card rounded-lg shadow-lg z-20 border border-border overflow-hidden">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Connected Wallet</h3>
                <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                  {network}
                </span>
              </div>
              <p className="text-sm mt-1 font-mono text-muted-foreground">
                {walletAddress}
              </p>
            </div>
            
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Balance:</span>
                <span className="font-medium">{balance} ETH</span>
              </div>
            </div>
            
            <div className="p-2">
              <button
                onClick={() => {
                  // In a real app, this would open a blockchain explorer
                  window.open(`https://etherscan.io/address/${walletAddress}`, '_blank');
                }}
                className="w-full flex items-center px-3 py-2 text-sm rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View on Explorer
              </button>
              
              <button
                onClick={disconnectWallet}
                className="w-full flex items-center px-3 py-2 text-sm rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-red-500"
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                Disconnect
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default BlockchainWallet; 