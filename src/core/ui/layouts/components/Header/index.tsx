"use client";

import { useState, useEffect, memo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLayout, ModuleType } from '../../providers/LayoutProvider';
import { cn } from '@/src/core/utils/styling';
import { 
  Menu, 
  Globe, 
  User, 
  Settings, 
  LogOut, 
  Check, 
  ChevronDown,
  Home,
  GraduationCap,
  ShieldCheck, 
  CreditCard, 
  Landmark,
  Store
} from 'lucide-react';
import HeaderNav from './HeaderNav';
import BlockchainWallet from './BlockchainWallet';
import Logo from './Logo';

// Define navigation items directly in this file to avoid import issues
const NAV_ITEMS = [
  {
    title: 'MAIN',
    href: '/dashboard',
    section: 'main',
    icon: Home,
    color: 'from-blue-400 to-blue-500',
    children: [
      { title: 'Dashboard', href: '/dashboard' },
      { title: 'International', href: '/international' },
      { title: 'Users', href: '/users' },
      { title: 'Blockchain', href: '/blockchain' }
    ]
  },
  {
    title: 'LMS',
    href: '/lms',
    section: 'lms',
    icon: GraduationCap,
    color: 'from-green-400 to-green-500',
    children: [
      { title: 'Courses', href: '/lms/courses' },
      { title: 'Students', href: '/lms/students' }
    ]
  },
  {
    title: 'Admin',
    href: '/admin',
    section: 'admin',
    icon: ShieldCheck,
    color: 'from-purple-400 to-purple-500',
    children: [
      { title: 'Users', href: '/admin/users' },
      { title: 'Roles', href: '/admin/roles' }
    ]
  },
  {
    title: 'Payments',
    href: '/payments',
    section: 'payments',
    icon: CreditCard,
    color: 'from-amber-400 to-amber-500',
    children: [
      { title: 'Transactions', href: '/payments/transactions' },
      { title: 'Invoices', href: '/payments/invoices' }
    ]
  },
  {
    title: 'Finance',
    href: '/finance',
    section: 'finance',
    icon: Landmark,
    color: 'from-sky-400 to-sky-500'
  },
  {
    title: 'Store',
    href: '/store',
    section: 'store',
    icon: Store,
    color: 'from-pink-400 to-pink-500'
  }
];

// Define a type for navigation items
type NavItem = {
  title: string;
  href: string;
  section: string;
  icon: React.ComponentType<any>;
  color: string;
  children?: Array<{ title: string; href: string }>;
};

type HeaderProps = {
  className?: string;
  showMobileMenu?: boolean;
  transparent?: boolean;
  showWalletConnect?: boolean;
  toggleSidebar?: () => void;
  isSidebarOpen?: boolean;
};

/**
 * Application header component
 * Shows horizontal navigation with menu items and logo on the left
 * Wallet connect and language selector on the right
 */
function Header({ 
  className, 
  showMobileMenu = true,
  transparent = false,
  showWalletConnect = true,
  toggleSidebar,
  isSidebarOpen = false
}: HeaderProps) {
  const { isMobile, isTablet, layoutType, currentModule, activeSection, setActiveSection, theme, setTheme } = useLayout();
  const pathname = usePathname();
  const router = useRouter();
  
  const [dropdowns, setDropdowns] = useState({
    language: false,
    user: false,
    section: false
  });
  
  // Available languages
  const LANGUAGES = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  ];
  
  // Determine if we're in mobile/tablet view
  const isMobileView = isMobile || isTablet;
  
  // State for mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // State for module menu (separate from the main mobile menu)
  const [moduleMenuOpen, setModuleMenuOpen] = useState(false);
  
  // State for settings menu (separate from the main mobile menu)
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);
  
  // State for modals
  const [languageModalOpen, setLanguageModalOpen] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);

  // State for menu transitions
  const [menuVisible, setMenuVisible] = useState(false);
  const [moduleMenuVisible, setModuleMenuVisible] = useState(false);
  const [settingsMenuVisible, setSettingsMenuVisible] = useState(false);

  // Handle navigation
  const handleNavigation = (href: string) => {
    // Close all dropdowns
    setDropdowns({
      language: false,
      user: false,
      section: false
    });
    
    // Close mobile menu
    setMobileMenuOpen(false);
    
    // Close modals
    setLanguageModalOpen(false);
    setWalletModalOpen(false);
    
    // Navigate to the URL
    router.push(href);
  };
  
  // Toggle modals - make sure these close other menus
  const toggleLanguageModal = () => {
    setLanguageModalOpen(!languageModalOpen);
    setWalletModalOpen(false);
    setMobileMenuOpen(false);
    setDropdowns({
      language: false,
      user: false,
      section: false
    });
  };
  
  const toggleWalletModal = () => {
    setWalletModalOpen(!walletModalOpen);
    setLanguageModalOpen(false);
    setMobileMenuOpen(false);
    setDropdowns({
      language: false,
      user: false,
      section: false
    });
  };
  
  // Toggle specific dropdowns directly
  const toggleUserDropdown = () => {
    setDropdowns(prev => ({
      language: false,
      section: false,
      user: !prev.user
    }));
    
    // Close mobile menu
    setMobileMenuOpen(false);
  };
  
  const toggleLanguageDropdown = () => {
    setDropdowns(prev => ({
      user: false,
      section: false,
      language: !prev.language
    }));
    
    // Close mobile menu
    setMobileMenuOpen(false);
  };
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click was inside a dropdown or toggle button
      const clickedElement = event.target as Element;
      
      // More specific checking for various dropdown elements
      const isInsideDropdown = clickedElement.closest('[data-dropdown]');
      const isInsideAction = clickedElement.closest('[data-action]');
      
      // Only close dropdowns if we clicked outside both dropdowns and action buttons
      if (!isInsideDropdown && !isInsideAction) {
        setDropdowns({
          language: false,
          user: false,
          section: false
        });
        
        // Log for debugging
        console.log("Closing all dropdowns due to outside click");
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);
  
  // Close dropdowns when pathname changes
  useEffect(() => {
    setDropdowns({
      language: false,
      user: false,
      section: false
    });
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle menu open/close with transition
  useEffect(() => {
    if (mobileMenuOpen) {
      // When menu is opened, set visible after a small delay to trigger transition
      setTimeout(() => setMenuVisible(true), 10);
      
      // Close other menus if open
      if (moduleMenuOpen) setModuleMenuOpen(false);
      if (settingsMenuOpen) setSettingsMenuOpen(false);
    } else {
      // When menu is closed, first hide with transition, then actually remove from DOM
      setMenuVisible(false);
    }
  }, [mobileMenuOpen, moduleMenuOpen, settingsMenuOpen]);
  
  // Handle module menu open/close with transition
  useEffect(() => {
    if (moduleMenuOpen) {
      // When menu is opened, set visible after a small delay to trigger transition
      setTimeout(() => setModuleMenuVisible(true), 10);
      
      // Close other menus if they're open
      if (mobileMenuOpen) setMobileMenuOpen(false);
      if (settingsMenuOpen) setSettingsMenuOpen(false);
    } else {
      // When menu is closed, first hide with transition, then actually remove from DOM
      setModuleMenuVisible(false);
    }
  }, [moduleMenuOpen, mobileMenuOpen, settingsMenuOpen]);
  
  // Handle settings menu open/close with transition
  useEffect(() => {
    if (settingsMenuOpen) {
      // When menu is opened, set visible after a small delay to trigger transition
      setTimeout(() => setSettingsMenuVisible(true), 10);
      
      // Close other menus if they're open
      if (mobileMenuOpen) setMobileMenuOpen(false);
      if (moduleMenuOpen) setModuleMenuOpen(false);
    } else {
      // When menu is closed, first hide with transition, then actually remove from DOM
      setSettingsMenuVisible(false);
    }
  }, [settingsMenuOpen, mobileMenuOpen, moduleMenuOpen]);

  // Find the current active section data for color and icon
  const getCurrentSectionData = () => {
    const normalizedSection = activeSection?.toLowerCase() || 'main';
    return NAV_ITEMS.find(item => item.section.toLowerCase() === normalizedSection) || NAV_ITEMS[0];
  };
  
  // Get current section info
  const currentSectionData = getCurrentSectionData();
  
  return (
    <header className={cn(
      'w-full h-16 bg-white dark:bg-neutral-900 border-b border-border flex items-center justify-between px-4 z-20',
      transparent && 'bg-transparent dark:bg-transparent border-transparent',
      className
    )}>
      {/* Container with grid layout for better alignment */}
      <div className="w-full grid grid-cols-3 items-center">
        {/* Left side - Logo and toggle */}
        <div className="flex items-center gap-2">
          {isMobileView && showMobileMenu && (
            <button 
              onClick={toggleSidebar}
              className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors" 
              aria-label="Toggle menu"
              data-menu="toggle"
            >
              <Menu className="h-5 w-5 text-muted-foreground" />
            </button>
          )}
          <Logo size="default" darkModeInvert={true} />
        </div>
        
        {/* Center - Navigation */}
        <div className="flex justify-center">
          <HeaderNav />
        </div>
        
        {/* Right side - Actions */}
        <div className="flex justify-end items-center gap-2">
          {/* Mobile actions only shown on mobile */}
          {isMobileView && (
            <>
              {/* Vertical actions on mobile view */}
            </>
          )}
          
          {/* Desktop actions only shown on desktop */}
          {!isMobileView && (
            <div className="flex items-center space-x-2">
              {/* Single Manage Account button for desktop */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setSettingsMenuOpen(true);
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label="Manage account"
                title="Manage account"
                data-action="manage-account"
              >
                <Settings size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium">Manage Account</span>
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Settings Menu */}
      <SettingsMenu isOpen={settingsMenuOpen} onClose={() => setSettingsMenuOpen(false)} />
    </header>
  );
}

/**
 * Settings Menu Component
 * This appears when the Manage Account button is clicked
 */
function SettingsMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  
  const [showLanguages, setShowLanguages] = useState(false);
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  
  // Available languages
  const LANGUAGES = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  ];
  
  // Available wallet options
  const WALLET_OPTIONS = [
    { id: 'metamask', name: 'MetaMask', icon: '🦊' },
    { id: 'coinbase', name: 'Coinbase Wallet', icon: '💰' },
    { id: 'walletconnect', name: 'WalletConnect', icon: '🔗' },
    { id: 'phantom', name: 'Phantom', icon: '👻' }
  ];
  
  // Function to go back to main menu
  const goBackToMain = () => {
    setShowLanguages(false);
    setShowWalletOptions(false);
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-neutral-900 rounded-lg w-full max-w-xl p-6 shadow-xl">
        {/* Header with back button when in submenus */}
        <div className="flex justify-between items-center mb-4">
          {(showLanguages || showWalletOptions) ? (
            <div className="flex items-center">
              <button 
                onClick={goBackToMain}
                className="mr-2 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              <h2 className="text-xl font-semibold">
                {showLanguages ? "Language Settings" : showWalletOptions ? "Wallet Options" : "Account Settings"}
              </h2>
            </div>
          ) : (
            <h2 className="text-xl font-semibold">Account Settings</h2>
          )}
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <span className="sr-only">Close</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        
        {/* Main Menu Options */}
        {!showLanguages && !showWalletOptions && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer">
              <User className="h-5 w-5 text-muted-foreground" />
              <span className="text-base">Profile Settings</span>
            </div>
            
            <div 
              className="flex items-center justify-between p-3.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
              onClick={() => setShowLanguages(true)}
            >
              <div className="flex items-center gap-4">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <span className="text-base">Language Settings</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </div>
            
            <div 
              className="flex items-center justify-between p-3.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
              onClick={() => setShowWalletOptions(true)}
            >
              <div className="flex items-center gap-4">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <span className="text-base">Wallet Options</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </div>
            
            <div className="flex items-center gap-4 p-3.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer">
              <Settings className="h-5 w-5 text-muted-foreground" />
              <span className="text-base">App Settings</span>
            </div>
            
            <hr className="border-border" />
            
            <div className="flex items-center gap-4 p-3.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-red-500 dark:text-red-400 cursor-pointer">
              <LogOut className="h-5 w-5" />
              <span className="text-base">Sign Out</span>
            </div>
          </div>
        )}
        
        {/* Language Options */}
        {showLanguages && (
          <div className="space-y-4">
            {LANGUAGES.map((lang) => (
              <div 
                key={lang.code}
                className="flex items-center gap-4 p-3.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
              >
                <span className="text-xl">{lang.flag}</span>
                <span className="text-base">{lang.name}</span>
                {lang.code === 'en' && (
                  <Check className="ml-auto h-4 w-4 text-green-500" />
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Wallet Options */}
        {showWalletOptions && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-2">Select a wallet to connect to the application</p>
            
            {WALLET_OPTIONS.map((wallet) => (
              <div 
                key={wallet.id}
                className="flex items-center gap-4 p-3.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer border border-border"
              >
                <span className="text-xl">{wallet.icon}</span>
                <span className="text-base">{wallet.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Use memo to prevent unnecessary re-renders
export default memo(Header);
export { Header }; 