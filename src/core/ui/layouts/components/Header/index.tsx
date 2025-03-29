import { ReactNode, useCallback, useState, useEffect, memo } from 'react';
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
 * 
 * Optimized for mobile performance with:
 * - Memoized components to reduce rerenders
 * - Hardware acceleration for animations
 * - Touch-friendly interactions
 * - Accessibility improvements
 */
function Header({ 
  className, 
  showMobileMenu = true,
  transparent = false,
  sticky = true,
  showWalletConnect = true,
}: HeaderProps) {
  const { toggleSidebar, isMobile, isTablet, isSmallMobile, isLandscape, layoutType } = useLayout();
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  
  // Determine if we're in mobile/tablet view
  const isMobileView = isMobile || isTablet;
  
  // Navigation items for mobile dropdown - same as desktop navigation
  // Using useMemo would be better for performance, but keeping it simple for now
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
  
  // Get current active module from navigation items - memoized for performance
  const getCurrentModule = useCallback(() => {
    const activeModule = mobileNavItems.find(
      item => item.isHighlighted || 
      pathname === item.href || 
      pathname?.startsWith(`${item.href}/`)
    );
    
    return activeModule?.title || 'MAIN';
  }, [mobileNavItems, pathname]);
  
  // Get color for current module - memoized for performance
  const getCurrentModuleColor = useCallback(() => {
    const activeModule = mobileNavItems.find(
      item => item.isHighlighted || 
      pathname === item.href || 
      pathname?.startsWith(`${item.href}/`)
    );
    
    return activeModule?.color || 'bg-gradient-to-r from-blue-500 to-blue-600';
  }, [mobileNavItems, pathname]);
  
  // Toggle mobile navigation dropdown
  const toggleMobileNav = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setMobileNavOpen(prev => !prev);
  }, []);
  
  // Close mobile nav when clicking outside
  useEffect(() => {
    if (!mobileNavOpen) return;
    
    const handleClickOutside = () => {
      setMobileNavOpen(false);
    };
    
    // Delay adding the event listener to avoid immediate triggering
    const timeoutId = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 10);
    
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [mobileNavOpen]);
  
  // Close mobile nav when navigating
  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);
  
  // Optimize dropdown size for landscape mode
  const dropdownStyle = isLandscape && isMobileView ? {
    maxHeight: '50vh'
  } : {
    maxHeight: '70vh'
  };
  
  // Memoized dropdown menu items for performance
  const renderMobileNavItems = useCallback(() => {
    return mobileNavItems.map((item) => {
      const isActive = item.isHighlighted || 
        pathname === item.href || 
        pathname?.startsWith(`${item.href}/`);
      
      return (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-neutral-700",
            isActive ? "bg-primary/5 text-primary font-medium" : "text-foreground"
          )}
        >
          <div className={cn(
            "w-8 h-8 rounded-full mr-3 flex items-center justify-center",
            item.color
          )}>
            <item.icon className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col">
            <span>{item.title}</span>
            {isActive && (
              <span className="text-xs text-muted-foreground">Current module</span>
            )}
          </div>
          {isActive && (
            <span className="ml-auto w-2 h-2 rounded-full bg-primary"></span>
          )}
        </Link>
      );
    });
  }, [mobileNavItems, pathname]);
  
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
            className="mr-3 p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 touch-manipulation"
            aria-label="Toggle sidebar menu"
            style={{ touchAction: 'manipulation' }}
          >
            <Menu size={20} />
          </button>
        )}
        
        {/* Horizontal nav on desktop, empty space on mobile */}
        {isMobileView ? (
          <div className="flex-1">{/* No page title, just empty space */}</div>
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
                "flex items-center justify-center px-4 py-2 rounded-md text-white font-medium shadow-sm",
                "transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-primary/30",
                "will-change-transform active:scale-95 touch-manipulation",
                getCurrentModuleColor()
              )}
              aria-expanded={mobileNavOpen}
              aria-haspopup="true"
              aria-controls="mobile-module-menu"
              aria-label="Navigation modules menu"
              style={{ touchAction: 'manipulation' }}
            >
              {/* Show current module icon */}
              {mobileNavItems.map((item) => {
                if (item.title === getCurrentModule()) {
                  return (
                    <item.icon key={item.title} className="w-4 h-4 mr-2" />
                  );
                }
                return null;
              })}
              <span className="text-sm mr-1">{getCurrentModule()}</span>
              <ChevronDown 
                size={16} 
                className={cn(
                  "transition-transform duration-200 will-change-transform", 
                  mobileNavOpen && "rotate-180"
                )}
              />
            </button>
            
            {/* Mobile navigation dropdown */}
            {mobileNavOpen && (
              <div 
                id="mobile-module-menu"
                className={cn(
                  "absolute right-0 top-full mt-2 w-64 bg-white dark:bg-neutral-800 border border-border rounded-lg shadow-xl z-50 overflow-hidden",
                  "animate-in fade-in-50 slide-in-from-top-5 duration-200"
                )}
                role="menu"
              >
                <div className="py-2 border-b border-border px-4 text-xs font-medium text-muted-foreground uppercase">
                  Modules
                </div>
                <div className="overflow-y-auto py-2" style={dropdownStyle}>
                  {renderMobileNavItems()}
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

// Use memo to prevent unnecessary re-renders of the Header component
export default memo(Header);

// Also export named version for direct imports
export { Header }; 