"use client";

import { ReactNode, useCallback, useState, useEffect, memo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLayout, ModuleType } from '../../providers/LayoutProvider';
import { cn } from '@/src/core/utils/styling';
import { ChevronDown, Menu, MoreHorizontal, Wallet, Globe } from 'lucide-react';

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
  toggleSidebar?: () => void;
  isSidebarOpen?: boolean;
};

// Navigation item type definition (simplified from HeaderNav)
type NavItemType = {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  color?: string;
  isHighlighted?: boolean;
  module: ModuleType;
  children?: {
    title: string;
    href: string;
  }[];
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
  toggleSidebar,
  isSidebarOpen,
}: HeaderProps) {
  const router = useRouter();
  const { isMobile, isTablet, isSmallMobile, isLandscape, layoutType, currentModule, setCurrentModule } = useLayout();
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState<string | null>(null);
  const [actionsMenuOpen, setActionsMenuOpen] = useState(false);
  
  // Determine if we're in mobile/tablet view
  const isMobileView = isMobile || isTablet;
  const isExtraSmall = isSmallMobile || (typeof window !== 'undefined' && window.innerWidth < 400);
  
  // Navigation items for mobile dropdown with children - comprehensive module system
  const mobileNavItems: NavItemType[] = [
    {
      title: 'MAIN',
      href: '/dashboard',
      icon: Home,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      isHighlighted: currentModule === 'main',
      module: 'main',
      children: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Protected', href: '/protected' },
        { title: 'Users', href: '/users' },
        { title: 'International', href: '/international/countries' }
      ]
    },
    {
      title: 'LMS',
      href: '/lms',
      icon: GraduationCap,
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      isHighlighted: currentModule === 'lms',
      module: 'lms',
      children: [
        { title: 'Courses', href: '/lms/courses' },
        { title: 'Students', href: '/lms/students' },
        { title: 'Instructors', href: '/lms/instructors' },
        { title: 'Certifications', href: '/lms/certifications' }
      ]
    },
    {
      title: 'Admin',
      href: '/admin',
      icon: ShieldCheck,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      isHighlighted: currentModule === 'admin',
      module: 'admin',
      children: [
        { title: 'Users', href: '/admin/users' },
        { title: 'Roles', href: '/admin/roles' },
        { title: 'Permissions', href: '/admin/permissions' },
        { title: 'Audit Logs', href: '/admin/audit-logs' }
      ]
    },
    {
      title: 'Payments',
      href: '/payments',
      icon: CreditCard,
      color: 'bg-gradient-to-r from-amber-500 to-amber-600',
      isHighlighted: currentModule === 'payments',
      module: 'payments',
      children: [
        { title: 'Transactions', href: '/payments/transactions' },
        { title: 'Subscriptions', href: '/payments/subscriptions' },
        { title: 'Invoices', href: '/payments/invoices' },
        { title: 'Methods', href: '/payments/methods' }
      ]
    },
    {
      title: 'Finance',
      href: '/finance',
      icon: Landmark,
      color: 'bg-gradient-to-r from-sky-500 to-sky-600',
      isHighlighted: currentModule === 'finance',
      module: 'finance',
      children: [
        { title: 'Reports', href: '/finance/reports' },
        { title: 'Accounting', href: '/finance/accounting' },
        { title: 'Budgets', href: '/finance/budgets' },
        { title: 'Taxes', href: '/finance/taxes' }
      ]
    },
    {
      title: 'Resources',
      href: '/resources',
      icon: BookOpen,
      color: 'bg-gradient-to-r from-indigo-500 to-indigo-600',
      isHighlighted: currentModule === 'resources',
      module: 'resources'
    },
    {
      title: 'Analytics',
      href: '/analytics',
      icon: BarChart,
      color: 'bg-gradient-to-r from-teal-500 to-teal-600',
      isHighlighted: currentModule === 'analytics',
      module: 'analytics'
    },
    {
      title: 'Support',
      href: '/support',
      icon: Headphones,
      color: 'bg-gradient-to-r from-red-500 to-red-600',
      isHighlighted: currentModule === 'support',
      module: 'support'
    },
  ];
  
  // Handle module change
  const handleModuleChange = (module: ModuleType, href: string) => {
    setCurrentModule(module);
    setMobileNavOpen(false);
    setSubMenuOpen(null);
    router.push(href);
  };
  
  // Toggle submenu
  const toggleSubMenu = (title: string) => {
    setSubMenuOpen(prevState => prevState === title ? null : title);
  };
  
  // Get current active module
  const getCurrentModule = useCallback(() => {
    const activeModule = mobileNavItems.find(item => item.isHighlighted);
    return activeModule || mobileNavItems[0];
  }, [mobileNavItems]);
  
  // Toggle mobile navigation dropdown
  const toggleMobileNav = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setMobileNavOpen(prev => !prev);
    setSubMenuOpen(null); // Close any open submenu when toggling the main dropdown
  }, []);
  
  // Toggle actions menu
  const toggleActionsMenu = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setActionsMenuOpen(prev => !prev);
  }, []);
  
  // Close menus when clicking outside
  useEffect(() => {
    if (!mobileNavOpen && !actionsMenuOpen) return;
    
    const handleClickOutside = () => {
      if (mobileNavOpen) setMobileNavOpen(false);
      if (actionsMenuOpen) setActionsMenuOpen(false);
      setSubMenuOpen(null);
    };
    
    // Delay adding the event listener to avoid immediate triggering
    const timeoutId = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 10);
    
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [mobileNavOpen, actionsMenuOpen]);
  
  // Close mobile nav when navigating
  useEffect(() => {
    setMobileNavOpen(false);
    setActionsMenuOpen(false);
    setSubMenuOpen(null);
  }, [pathname]);
  
  // Memoized dropdown menu items
  const renderMobileNavItems = useCallback(() => {
    return mobileNavItems.map((item) => {
      const isActive = item.isHighlighted;
      const hasChildren = item.children && item.children.length > 0;
      const isSubMenuOpen = subMenuOpen === item.title;
      
      return (
        <div key={item.href} className="border-b border-border/30 last:border-0">
          <div 
            className={cn(
              "flex items-center px-4 py-3 text-sm justify-between",
              isActive ? "bg-primary/5" : "",
              hasChildren ? "cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-700" : ""
            )}
            onClick={(e) => {
              e.stopPropagation();
              if (hasChildren) {
                toggleSubMenu(item.title);
                router.push(item.href);
              } else {
                handleModuleChange(item.module, item.href);
              }
            }}
          >
            <div className="flex items-center">
              <div className={cn(
                "w-8 h-8 rounded-full mr-3 flex items-center justify-center",
                item.color
              )}>
                <item.icon className="w-4 h-4 text-white" />
              </div>
              
              <div className="flex flex-col">
                <span className={cn(
                  "font-medium",
                  isActive ? "text-primary" : "text-foreground"
                )}>
                  {item.title}
                </span>
                {isActive && (
                  <span className="text-xs text-muted-foreground">Current module</span>
                )}
              </div>
            </div>
            
            {hasChildren && (
              <ChevronDown 
                size={16}
                className={cn(
                  "text-muted-foreground transition-transform",
                  isSubMenuOpen ? "rotate-180" : ""
                )}
              />
            )}
          </div>
          
          {/* Render submenu/children if available and open */}
          {hasChildren && isSubMenuOpen && (
            <div className="bg-gray-50 dark:bg-neutral-800/50 py-1">
              {item.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className={cn(
                    "flex items-center px-4 py-2 pl-16 text-sm hover:bg-gray-100 dark:hover:bg-neutral-700",
                    pathname === child.href ? "text-primary font-medium" : "text-muted-foreground"
                  )}
                  onClick={() => {
                    handleModuleChange(item.module, child.href);
                  }}
                >
                  <span>{child.title}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    });
  }, [mobileNavItems, subMenuOpen, pathname, handleModuleChange]);
  
  // Get the active module for the current state
  const activeModule = getCurrentModule();
  
  return (
    <header className={cn(
      "w-full h-16 bg-background border-b border-border overflow-visible",
      sticky && "sticky top-0 z-40",
      transparent && "bg-transparent border-none",
      className
    )}>
      <div className="max-w-7xl mx-auto px-4 w-full h-full flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center h-full">
          {/* Mobile menu toggle - only shown on mobile/tablet */}
          {showMobileMenu && layoutType === 'dashboard' && isMobileView && (
            <button 
              onClick={toggleSidebar}
              className="mr-2 p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center"
              aria-label="Toggle sidebar menu"
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
        
        {/* Right Section */}
        <div className="flex items-center h-full space-x-2 sm:space-x-3">
          {/* Module Dropdown - Only on mobile */}
          {isMobileView && layoutType === 'dashboard' && (
            <div className="relative h-full flex items-center">
              <button
                onClick={toggleMobileNav}
                className={cn(
                  "flex items-center justify-center px-3 py-1.5 rounded-md text-white font-medium shadow-sm h-8",
                  "transition-all duration-200",
                  activeModule?.color?.replace('bg-', '') || 'bg-gradient-to-r from-blue-500 to-blue-600'
                )}
                aria-expanded={mobileNavOpen}
                aria-label="Navigation modules menu"
              >
                {activeModule && (
                  <activeModule.icon className="w-4 h-4 mr-1.5" />
                )}
                <span className="text-xs sm:text-sm">{isExtraSmall ? activeModule?.title?.slice(0, 4) : activeModule?.title}</span>
                <ChevronDown 
                  size={14} 
                  className={cn(
                    "ml-1 transition-transform", 
                    mobileNavOpen && "rotate-180"
                  )}
                />
              </button>
              
              {/* Mobile navigation dropdown */}
              {mobileNavOpen && (
                <div 
                  className="absolute right-0 top-full mt-1 w-56 sm:w-64 bg-white dark:bg-neutral-800 border border-border rounded-lg shadow-lg z-50 overflow-hidden"
                  style={{
                    maxHeight: '70vh',
                    overflowY: 'auto',
                  }}
                >
                  <div className="py-1.5 border-b border-border px-3 text-xs font-medium text-muted-foreground uppercase">
                    Modules
                  </div>
                  <div className="overflow-y-auto divide-y divide-border/30">
                    {renderMobileNavItems()}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Regular Buttons (shown when enough space) */}
          {!isExtraSmall && (
            <>
              {/* Blockchain wallet connection */}
              {showWalletConnect && layoutType !== 'auth' && (
                <div className="h-full flex items-center">
                  <BlockchainWallet />
                </div>
              )}
              
              {/* Language selector */}
              <div className="h-full flex items-center">
                <LanguageSelector />
              </div>
            </>
          )}
          
          {/* Actions Menu Button - Shown only on small screens */}
          {isExtraSmall && layoutType !== 'auth' && (
            <div className="relative h-full flex items-center">
              <button
                onClick={toggleActionsMenu}
                className="flex items-center justify-center p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 h-8 w-8"
                aria-label="More actions"
                aria-expanded={actionsMenuOpen}
              >
                <MoreHorizontal size={20} />
              </button>
              
              {/* Actions dropdown menu */}
              {actionsMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-neutral-800 border border-border rounded-lg shadow-lg z-50 overflow-hidden">
                  <div className="py-1">
                    {showWalletConnect && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActionsMenuOpen(false);
                          // Open wallet connect dialog
                        }}
                        className="w-full flex items-center px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700"
                      >
                        <Wallet className="w-4 h-4 mr-3 text-muted-foreground" />
                        <span>Connect Wallet</span>
                      </button>
                    )}
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActionsMenuOpen(false);
                        // Open language selector
                      }}
                      className="w-full flex items-center px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700"
                    >
                      <Globe className="w-4 h-4 mr-3 text-muted-foreground" />
                      <span>Change Language</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* User menu - Always visible */}
          <div className="h-full flex items-center">
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

// Use memo to prevent unnecessary re-renders of the Header component
export default memo(Header);

// Also export named version for direct imports
export { Header }; 