import { ReactNode, useCallback, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLayout } from '../../providers/LayoutProvider';
import { cn } from '@/src/core/utils/styling';
import { ChevronDown, Menu } from 'lucide-react';

// Import the components we need
import UserMenu from './UserMenu';
import HeaderNav from './HeaderNav';
import LanguageSelector from './LanguageSelector';
import BlockchainWallet from './BlockchainWallet';
import Link from 'next/link';

// Navigation item for mobile dropdown
import { 
  Home,
  GraduationCap,
  ShieldCheck, 
  CreditCard, 
  Landmark,
  BookOpen,
  BarChart,
  Headphones,
} from 'lucide-react';

type HeaderProps = {
  className?: string;
  showMobileMenu?: boolean;
  transparent?: boolean;
  sticky?: boolean;
  showWalletConnect?: boolean;
};

// Navigation item type definition (simplified from HeaderNav)
type NavItemType = {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  color?: string;
  isHighlighted?: boolean;
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
  const { toggleSidebar, isMobile, isTablet, isSmallMobile, layoutType } = useLayout();
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  
  // Determine if we're in mobile/tablet view
  const isMobileView = isMobile || isTablet;
  
  // Navigation items for mobile dropdown - same as desktop navigation
  const mobileNavItems: NavItemType[] = [
    {
      title: 'MAIN',
      href: '/dashboard',
      icon: Home,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      isHighlighted: pathname === '/dashboard' || pathname?.startsWith('/dashboard/'),
    },
    {
      title: 'LMS',
      href: '/lms',
      icon: GraduationCap,
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      isHighlighted: pathname === '/lms' || pathname?.startsWith('/lms/'),
    },
    {
      title: 'Admin',
      href: '/admin',
      icon: ShieldCheck,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      isHighlighted: pathname === '/admin' || pathname?.startsWith('/admin/'),
    },
    {
      title: 'Payments',
      href: '/payments',
      icon: CreditCard,
      color: 'bg-gradient-to-r from-amber-500 to-amber-600',
      isHighlighted: pathname === '/payments' || pathname?.startsWith('/payments/'),
    },
    {
      title: 'Finance',
      href: '/finance',
      icon: Landmark,
      color: 'bg-gradient-to-r from-sky-500 to-sky-600',
      isHighlighted: pathname === '/finance' || pathname?.startsWith('/finance/'),
    },
    {
      title: 'Resources',
      href: '/resources',
      icon: BookOpen,
      color: 'bg-gradient-to-r from-indigo-500 to-indigo-600',
      isHighlighted: pathname === '/resources' || pathname?.startsWith('/resources/'),
    },
    {
      title: 'Analytics',
      href: '/analytics',
      icon: BarChart,
      color: 'bg-gradient-to-r from-teal-500 to-teal-600',
      isHighlighted: pathname === '/analytics' || pathname?.startsWith('/analytics/'),
    },
    {
      title: 'Support',
      href: '/support',
      icon: Headphones,
      color: 'bg-gradient-to-r from-red-500 to-red-600',
      isHighlighted: pathname === '/support' || pathname?.startsWith('/support/'),
    },
  ];
  
  // Mark '/protected' path as 'MAIN' module
  if (pathname === '/protected' || pathname?.startsWith('/protected/')) {
    mobileNavItems[0].isHighlighted = true;
  }
  
  // Get current active module from navigation items
  const getCurrentModule = () => {
    const activeModule = mobileNavItems.find(
      item => item.isHighlighted || 
      pathname === item.href || 
      pathname?.startsWith(`${item.href}/`)
    );
    
    return activeModule?.title || 'MAIN';
  };
  
  // Get color for current module
  const getCurrentModuleColor = () => {
    const activeModule = mobileNavItems.find(
      item => item.isHighlighted || 
      pathname === item.href || 
      pathname?.startsWith(`${item.href}/`)
    );
    
    return activeModule?.color || 'bg-gradient-to-r from-blue-500 to-blue-600';
  };
  
  // Toggle mobile navigation dropdown
  const toggleMobileNav = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMobileNavOpen(!mobileNavOpen);
  };
  
  // Close mobile nav when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setMobileNavOpen(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  
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
        
        {/* Horizontal nav on desktop, empty space on mobile */}
        {isMobileView ? (
          <div className="flex-1"></div> {/* No page title, just empty space */}
        ) : (
          <HeaderNav />
        )}
      </div>
      
      {/* Right-side header elements */}
      <div className="flex items-center justify-end space-x-3">
        {/* Mobile navigation dropdown */}
        {isMobileView && layoutType === 'dashboard' && (
          <div className="relative">
            <button
              onClick={toggleMobileNav}
              className={cn(
                "flex items-center justify-center px-3 py-2 rounded-md text-white",
                getCurrentModuleColor()
              )}
              aria-expanded={mobileNavOpen}
              aria-label="Navigation menu"
            >
              <span className="text-sm font-medium mr-1">{getCurrentModule()}</span>
              <ChevronDown 
                size={16} 
                className={cn("transition-transform", mobileNavOpen && "rotate-180")}
              />
            </button>
            
            {/* Mobile navigation dropdown */}
            {mobileNavOpen && (
              <div className="absolute right-0 top-full mt-1 w-56 bg-white dark:bg-neutral-800 border border-border rounded-md shadow-lg z-50 py-1">
                <div className="py-1 border-b border-border px-3 text-xs font-medium text-muted-foreground uppercase">
                  Modules
                </div>
                <div className="max-h-[70vh] overflow-y-auto py-1">
                  {mobileNavItems.map((item) => {
                    const isActive = item.isHighlighted || 
                      pathname === item.href || 
                      pathname?.startsWith(`${item.href}/`);
                    
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-neutral-700",
                          isActive ? "bg-primary/5 text-primary font-medium" : "text-foreground"
                        )}
                      >
                        <div className={cn(
                          "w-6 h-6 rounded-full mr-2 flex items-center justify-center",
                          item.color
                        )}>
                          <item.icon className="w-3.5 h-3.5 text-white" />
                        </div>
                        {item.title}
                        {isActive && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"></span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
        
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