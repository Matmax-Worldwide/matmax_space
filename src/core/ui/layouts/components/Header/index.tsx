import { ReactNode } from 'react';
import Link from 'next/link';
import { useLayout } from '../../providers/LayoutProvider';
import { cn } from '../../../../utils/styling';
import { Menu } from 'lucide-react';
import UserMenu from './UserMenu';

type HeaderProps = {
  className?: string;
  logo?: ReactNode;
  showMobileMenu?: boolean;
  transparent?: boolean;
  sticky?: boolean;
  showWalletConnect?: boolean;
};

/**
 * Application header component
 * Responsible for navigation, user menu, language selection, and mobile menu
 */
export function Header({ 
  className, 
  logo,
  showMobileMenu = true,
  transparent = false,
  sticky = true,
  showWalletConnect = true
}: HeaderProps) {
  const { toggleSidebar, isMobile, layoutType } = useLayout();
  
  return (
    <header className={cn(
      "w-full h-16 flex items-center justify-between px-4",
      sticky && "sticky top-0 z-40",
      transparent ? "bg-transparent" : "bg-background border-b border-border",
      className
    )}>
      <div className="flex items-center">
        {/* Mobile menu toggle - only shown on mobile when applicable */}
        {showMobileMenu && isMobile && layoutType === 'dashboard' && (
          <button 
            onClick={toggleSidebar}
            className="mr-2 p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 lg:hidden"
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </button>
        )}
        
        {/* Logo - placeholder for now */}
        <div className="flex items-center">
          {logo || <span className="font-bold text-xl">MatMax Wellness Studio</span>}
        </div>
      </div>
      
      {/* Right-side header elements */}
      <div className="flex items-center space-x-2">
        {showWalletConnect && layoutType !== 'auth' && (
          <button className="px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-sm">
            Connect Wallet
          </button>
        )}
        
        {/* User menu with logout button */}
        <UserMenu />
      </div>
    </header>
  );
}

export default Header; 