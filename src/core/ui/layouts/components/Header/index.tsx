"use client";

import { ReactNode, useCallback, useState, useEffect, memo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLayout, ModuleType } from '../../providers/LayoutProvider';
import { cn } from '@/src/core/utils/styling';
import { ChevronDown, Menu, MoreHorizontal, Wallet, Globe, Check, ExternalLink, AlertCircle, User, Settings, LogOut } from 'lucide-react';

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
  sidebarWidth?: number;
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
  sidebarWidth = 0
}: HeaderProps) {
  const router = useRouter();
  const { isMobile, isTablet, isSmallMobile, isLandscape, layoutType, currentModule, setCurrentModule } = useLayout();
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState<string | null>(null);
  const [actionsMenuOpen, setActionsMenuOpen] = useState(false);
  const [open, setOpen] = useState({ language: false, wallet: false, user: false });
  
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
  
  // Import from LanguageSelector component
  const LANGUAGES = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
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
    <header className="w-full h-16 bg-background border-b border-border sticky top-0 z-[100]">
      <div className="w-full h-full flex items-center relative">
        {/* Left Section - with proper spacing to align with sidebar */}
        <div className={cn(
          "flex items-center h-full",
          isMobile ? "pl-4" : sidebarWidth ? `pl-4 md:pl-[${sidebarWidth + 16}px]` : "pl-4"
        )}>
          {/* Mobile menu toggle - only shown on mobile/tablet */}
          {showMobileMenu && layoutType === 'dashboard' && isMobileView && (
            <button 
              onClick={toggleSidebar}
              className="mr-3 p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center flex-shrink-0"
              aria-label="Toggle sidebar menu"
            >
              <Menu size={20} />
            </button>
          )}
          
          {/* Horizontal nav on desktop, empty space on mobile */}
          {isMobileView ? (
            <div className="flex-1">{/* No page title, just empty space */}</div>
          ) : (
            <div className="overflow-hidden">
              <HeaderNav />
            </div>
          )}
        </div>
        
        {/* Right Section - fixed positioning with proper padding */}
        <div className="flex items-center h-full space-x-3 absolute right-4">
          {/* Module Dropdown - Only on mobile */}
          {isMobileView && layoutType === 'dashboard' && (
            <div className="h-full flex items-center">
              <button
                onClick={toggleMobileNav}
                className={cn(
                  "flex items-center justify-center px-3 py-1.5 rounded-md text-white font-medium shadow-sm h-8 flex-shrink-0",
                  "transition-all duration-200",
                  activeModule?.color?.replace('bg-', '') || 'bg-gradient-to-r from-blue-500 to-blue-600'
                )}
              >
                {activeModule && (
                  <activeModule.icon className="w-4 h-4 mr-1.5" />
                )}
                <span className="text-xs sm:text-sm">{isExtraSmall ? activeModule?.title?.slice(0, 4) : activeModule?.title}</span>
                <ChevronDown 
                  size={14}
                  className={cn("ml-1 transition-transform", mobileNavOpen && "rotate-180")}
                />
              </button>
            </div>
          )}
          
          {/* Regular Buttons (shown when enough space) */}
          {!isExtraSmall && (
            <>
              {/* Blockchain wallet connection */}
              {showWalletConnect && layoutType !== 'auth' && (
                <div className="h-full flex items-center">
                  <button
                    onClick={() => setOpen({ ...open, wallet: !open.wallet, language: false, user: false })}
                    className="flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 text-white text-xs h-8 shadow-sm flex-shrink-0 hover:shadow-md transition-shadow"
                    title="Connect Wallet"
                    aria-label="Connect blockchain wallet"
                  >
                    <Wallet className="w-4 h-4 mr-1.5" />
                    <span className="ml-1 hidden xs:inline">Connect</span>
                    <span className="hidden sm:inline"> Wallet</span>
                  </button>
                </div>
              )}
              
              {/* Language selector */}
              <div className="h-full flex items-center flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setOpen({ ...open, language: !open.language, wallet: false, user: false })}
                  className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none"
                  aria-label="Select language"
                  title="Change language"
                >
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </>
          )}
          
          {/* Actions Menu Button - Shown only on small screens */}
          {isExtraSmall && layoutType !== 'auth' && (
            <div className="h-full flex items-center flex-shrink-0">
              <button
                onClick={toggleActionsMenu}
                className="flex items-center justify-center p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 h-8 w-8"
                aria-label="More actions"
              >
                <MoreHorizontal size={20} />
              </button>
            </div>
          )}
          
          {/* User menu - Always visible */}
          <div className="h-full flex items-center flex-shrink-0">
            <button 
              onClick={() => setOpen({ ...open, user: !open.user, wallet: false, language: false })}
              className="h-8 w-8 flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 text-white shadow-sm hover:shadow-md transition-shadow"
              aria-label="User menu"
              title="Account menu"
            >
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium">
                U
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Dropdowns container - positioned absolutely to prevent layout shifts */}
      <div className="absolute top-full left-0 w-full">
        {/* Module Navigation Dropdown */}
        {mobileNavOpen && (
          <div 
            className="absolute right-3 md:right-4 top-1 w-56 sm:w-64 bg-white dark:bg-neutral-800 border border-border rounded-lg shadow-lg z-50 overflow-hidden"
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
        
        {/* Actions Dropdown Menu */}
        {actionsMenuOpen && (
          <div className="absolute right-3 md:right-4 top-1 w-48 bg-white dark:bg-neutral-800 border border-border rounded-lg shadow-lg z-50 overflow-hidden">
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
        
        {/* Language selector dropdown */}
        {!isExtraSmall && open.language && (
          <div className="absolute right-[48px] md:right-[60px] top-1 w-48 bg-card border border-border rounded-md shadow-lg z-30 py-1">
            {LANGUAGES.map((language) => {
              const isActive = language.code === 'en';
              
              return (
                <button
                  key={language.code}
                  onClick={() => {
                    setOpen({ ...open, language: false });
                  }}
                  className={cn(
                    "flex items-center w-full px-4 py-2 text-sm text-left hover:bg-muted",
                    isActive && "font-medium"
                  )}
                >
                  <span className="mr-2">{language.flag}</span>
                  <span className="flex-grow">{language.name}</span>
                  {isActive && <Check className="h-4 w-4 text-primary" />}
                </button>
              );
            })}
          </div>
        )}
        
        {/* Wallet details dropdown */}
        {!isExtraSmall && open.wallet && (
          <div className="absolute right-[90px] md:right-[110px] top-1 w-64 bg-card rounded-lg shadow-lg z-20 border border-border overflow-hidden">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Connected Wallet</h3>
                <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                  Ethereum
                </span>
              </div>
              <p className="text-sm mt-1 font-mono text-muted-foreground">
                0x71C7656EC7ab88b098defB751B7401B5f6d8976F
              </p>
            </div>
            
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Balance:</span>
                <span className="font-medium">1.234 ETH</span>
              </div>
            </div>
            
            <div className="p-2">
              <button
                onClick={() => {
                  setOpen({ ...open, wallet: false });
                }}
                className="w-full flex items-center px-3 py-2 text-sm rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View on Explorer
              </button>
              
              <button
                onClick={() => {
                  setOpen({ ...open, wallet: false });
                }}
                className="w-full flex items-center px-3 py-2 text-sm rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-red-500"
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                Disconnect
              </button>
            </div>
          </div>
        )}
        
        {/* User menu dropdown */}
        {open.user && (
          <div className="absolute right-3 md:right-4 top-1 w-56 rounded-md shadow-lg bg-card border border-border overflow-hidden z-50">
            <div className="p-2">
              <div className="px-4 py-2 text-sm border-b border-border">
                <p className="font-medium">Account</p>
                <p className="text-muted-foreground truncate">user@example.com</p>
              </div>
              
              <div className="mt-2">
                <button 
                  className="w-full flex items-center px-4 py-2 text-sm hover:bg-muted rounded-md"
                  onClick={() => {
                    setOpen({ ...open, user: false });
                  }}
                >
                  <User size={16} className="mr-2" />
                  Profile
                </button>
                
                <button 
                  className="w-full flex items-center px-4 py-2 text-sm hover:bg-muted rounded-md"
                  onClick={() => {
                    setOpen({ ...open, user: false });
                  }}
                >
                  <Settings size={16} className="mr-2" />
                  Settings
                </button>
                
                <button 
                  className="w-full flex items-center px-4 py-2 text-sm hover:bg-muted rounded-md text-error"
                  onClick={() => {
                    setOpen({ ...open, user: false });
                  }}
                >
                  <LogOut size={16} className="mr-2" />
                  Sign out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Overlay for dropdowns - outside main layout flow */}
      {(mobileNavOpen || actionsMenuOpen) && (
        <div 
          className="fixed inset-0 bg-transparent" 
          style={{ zIndex: 40 }}
          onClick={() => {
            setMobileNavOpen(false);
            setActionsMenuOpen(false);
          }}
        />
      )}
    </header>
  );
}

// Use memo to prevent unnecessary re-renders of the Header component
export default memo(Header);

// Also export named version for direct imports
export { Header }; 