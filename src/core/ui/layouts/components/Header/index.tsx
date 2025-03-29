import { ReactNode, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { useLayout } from '../../providers/LayoutProvider';
import { cn } from '@/src/core/utils/styling';
import { Menu } from 'lucide-react';

// Import the components we need
import UserMenu from './UserMenu';
import HeaderNav from './HeaderNav';
import LanguageSelector from './LanguageSelector';
import BlockchainWallet from './BlockchainWallet';

type HeaderProps = {
  className?: string;
  showMobileMenu?: boolean;
  transparent?: boolean;
  sticky?: boolean;
  showWalletConnect?: boolean;
};

/**
 * Application header component
 * Shows horizontal navigation with menu items on the left
 * Wallet connect and language selector on the right
 * Logo is only in the sidebar as per requirements
 */
export function Header({ 
  className, 
  showMobileMenu = true,
  transparent = false,
  sticky = true,
  showWalletConnect = true,
}: HeaderProps) {
  const { toggleSidebar, isMobile, isTablet, layoutType } = useLayout();
  const pathname = usePathname();
  
  // Get current page title from the pathname
  const getPageTitle = useCallback(() => {
    if (!pathname) return '';
    
    // Remove leading slash and split by segments
    const segments = pathname.substring(1).split('/');
    
    // Return empty string for root path
    if (segments[0] === '') return '';
    
    // Get the last segment that's not empty
    const lastSegment = segments.filter(Boolean).pop() || '';
    
    // Format: convert dash-case or kebab-case to Title Case and remove extension
    return lastSegment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }, [pathname]);
  
  // Determine if we're in mobile/tablet view
  const isMobileView = isMobile || isTablet;
  
  return (
    <header className={cn(
      "w-full h-16 flex items-center justify-between px-4",
      sticky && "sticky top-0 z-40",
      transparent ? "bg-transparent" : "bg-background border-b border-border",
      className
    )}>
      <div className="flex items-center">
        {/* Mobile menu toggle - only shown on mobile/tablet */}
        {showMobileMenu && layoutType === 'dashboard' && isMobileView && (
          <button 
            onClick={toggleSidebar}
            className="mr-3 p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </button>
        )}
        
        {/* Page title on mobile, horizontal nav on desktop */}
        {isMobileView ? (
          <h1 className="text-lg font-medium">{getPageTitle()}</h1>
        ) : (
          <HeaderNav />
        )}
      </div>
      
      {/* Right-side header elements */}
      <div className="flex items-center space-x-3">
        {/* Blockchain wallet connection */}
        {showWalletConnect && layoutType !== 'auth' && <BlockchainWallet />}
        
        {/* Language selector */}
        <LanguageSelector />
        
        {/* User menu */}
        <UserMenu />
      </div>
    </header>
  );
}

export default Header; 