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
      // For mobile: use absolute positioning instead of fixed, to avoid creating extra space
      isMobileView ? 'absolute top-0 left-0 right-0' : 'fixed top-0 left-0 right-0',
      transparent && 'bg-transparent dark:bg-transparent border-transparent',
      className
    )}>
      {/* Container with grid layout for better alignment */}
      <div className="w-full grid grid-cols-3 items-center">
        {/* Left side - Logo and toggle */}
        <div className="flex items-center gap-2">
          {/* Hamburger menu moved to the right side, so only logo here now */}
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
              {/* Hamburger menu button */}
              {showMobileMenu && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setMobileMenuOpen(true);
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  aria-label="Toggle main menu"
                  data-menu="toggle"
                >
                  <Menu className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">Menu</span>
                </button>
              )}
              
              {/* Module switcher button for mobile */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setModuleMenuOpen(true);
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label="Switch modules"
                data-action="module-switcher"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                  <rect width="7" height="7" x="3" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="14" rx="1" />
                  <rect width="7" height="7" x="3" y="14" rx="1" />
                </svg>
                <span className={cn(
                  "text-sm font-medium",
                  currentSectionData.color.replace('from-', 'text-').split(' ')[0]
                )}>{currentSectionData.title}</span>
              </button>
              
              {/* Account settings button (icon only) for mobile - rightmost position */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setSettingsMenuOpen(true);
                }}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-border hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label="Manage account settings"
                data-action="manage-account-mobile"
              >
                <Settings className="h-5 w-5 text-muted-foreground" />
              </button>
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
      
      {/* Mobile Module Menu - Slides in from right */}
      {moduleMenuOpen && (
        <div 
          className={cn(
            "fixed inset-0 bg-white dark:bg-neutral-900 z-50 flex flex-col transition-transform duration-300 ease-in-out",
            moduleMenuVisible ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
            <h2 className="font-bold text-lg">Switch Module</h2>
            <button 
              onClick={() => setModuleMenuOpen(false)}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          {/* Module Options - Scrollable */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-3">
              {NAV_ITEMS.map((item: NavItem) => {
                const isActive = item.section.toLowerCase() === activeSection?.toLowerCase();
                return (
                  <button
                    key={item.section}
                    onClick={(e) => {
                      e.preventDefault();
                      
                      // Close the menu
                      setModuleMenuOpen(false);
                      
                      // Get section name in lowercase
                      const sectionName = item.section.toLowerCase();
                      
                      // Update active section
                      setActiveSection(sectionName);
                      
                      // Store in localStorage
                      if (typeof window !== 'undefined') {
                        localStorage.setItem('activeSection', sectionName);
                      }
                      
                      // Navigate to protected page with section parameter
                      router.push(`/protected?section=${sectionName}`);
                    }}
                    className={cn(
                      "flex w-full items-center px-4 py-3 rounded-lg",
                      isActive 
                        ? `bg-gradient-to-r ${item.color} text-white`
                        : "border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    )}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    <span className="text-base font-medium">{item.title}</span>
                    {item.children && item.children.length > 0 && (
                      <span className="ml-auto text-xs bg-white/20 rounded-full px-2 py-0.5">
                        {item.children.length} submenu{item.children.length !== 1 ? 's' : ''}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            
            {/* Current active module description */}
            <div className="mt-6 p-4 rounded-lg bg-neutral-100 dark:bg-neutral-800">
              <div className="flex items-center mb-2">
                <currentSectionData.icon className={cn(
                  "w-5 h-5 mr-2",
                  currentSectionData.color.replace('from-', 'text-').split(' ')[0]
                )} />
                <h3 className={cn(
                  "font-bold",
                  currentSectionData.color.replace('from-', 'text-').split(' ')[0]
                )}>Active: {currentSectionData.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Switch between different modules to access specific features and functionality.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Mobile Sidebar Menu - Slides in from left */}
      {isMobileView && showMobileMenu && mobileMenuOpen && (
        <div 
          className={cn(
            "fixed inset-0 bg-white dark:bg-neutral-900 z-50 flex flex-col transition-transform duration-300 ease-in-out",
            menuVisible ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
            <h2 className="font-bold text-lg">Main Menu</h2>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          {/* Menu Options - Scrollable */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-3">
              {/* If current module has children, display them */}
              {currentSectionData.children && currentSectionData.children.length > 0 && (
                <>
                  <div className="flex items-center mb-2">
                    <currentSectionData.icon className={cn(
                      "w-5 h-5 mr-2",
                      currentSectionData.color.replace('from-', 'text-').split(' ')[0]
                    )} />
                    <h3 className={cn(
                      "font-bold",
                      currentSectionData.color.replace('from-', 'text-').split(' ')[0]
                    )}>{currentSectionData.title} NAVIGATION</h3>
                  </div>
                  
                  {currentSectionData.children.map((child, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        router.push(child.href);
                      }}
                      className={cn(
                        "flex w-full items-center px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800",
                        pathname === child.href ? `bg-gradient-to-r ${currentSectionData.color} text-white` : ""
                      )}
                    >
                      <span className="text-base font-medium">{child.title}</span>
                    </button>
                  ))}
                  
                  <div className="h-4"></div>
                </>
              )}
              
              {/* Common navigation links */}
              <div className="mb-2">
                <h3 className="text-sm font-medium text-muted-foreground mb-1 px-1">Quick Access</h3>
              </div>
              
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.push('/dashboard');
                }}
                className="flex w-full items-center px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <Home className="w-5 h-5 mr-3 text-muted-foreground" />
                <span className="text-base font-medium">Dashboard</span>
              </button>
              
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.push('/profile');
                }}
                className="flex w-full items-center px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <User className="w-5 h-5 mr-3 text-muted-foreground" />
                <span className="text-base font-medium">Profile</span>
              </button>
              
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.push('/settings');
                }}
                className="flex w-full items-center px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <Settings className="w-5 h-5 mr-3 text-muted-foreground" />
                <span className="text-base font-medium">Settings</span>
              </button>
            </div>
          </div>
        </div>
      )}
      
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
  const [showThemeOptions, setShowThemeOptions] = useState(false);
  const { isMobile, isTablet, theme, setTheme } = useLayout();
  const isMobileView = isMobile || isTablet;
  
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
  
  // Theme options
  const THEME_OPTIONS = [
    { id: 'light', name: 'Light Theme', icon: '☀️' },
    { id: 'dark', name: 'Dark Theme', icon: '🌙' },
    { id: 'system', name: 'System Theme', icon: '💻' }
  ];
  
  // Function to go back to main menu
  const goBackToMain = () => {
    setShowLanguages(false);
    setShowWalletOptions(false);
    setShowThemeOptions(false);
  };
  
  // Set theme function
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme as 'light' | 'dark' | 'system');
  };
  
  // Use slide-in panel for mobile and modal for desktop
  return (
    <>
      {isMobileView ? (
        <div 
          className={cn(
            "fixed inset-0 bg-white dark:bg-neutral-900 z-50 flex flex-col transition-transform duration-300 ease-in-out",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
            <h2 className="font-bold text-lg">
              {showLanguages ? "Language Settings" : 
               showWalletOptions ? "Wallet Options" : 
               showThemeOptions ? "Theme Settings" :
               "Account Settings"}
            </h2>
            <div className="flex items-center">
              {(showLanguages || showWalletOptions || showThemeOptions) && (
                <button 
                  onClick={goBackToMain}
                  className="mr-2 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
              )}
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Settings Options - Scrollable */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Main Menu Options */}
            {!showLanguages && !showWalletOptions && !showThemeOptions && (
              <div className="space-y-3">
                <button className="flex w-full items-center px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                  <User className="w-5 h-5 mr-3 text-muted-foreground" />
                  <span className="text-base font-medium">Profile Settings</span>
                </button>
                
                <button 
                  className="flex w-full items-center justify-between px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  onClick={() => setShowLanguages(true)}
                >
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 mr-3 text-muted-foreground" />
                    <span className="text-base font-medium">Language Settings</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
                
                <button 
                  className="flex w-full items-center justify-between px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  onClick={() => setShowWalletOptions(true)}
                >
                  <div className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-3 text-muted-foreground" />
                    <span className="text-base font-medium">Wallet Options</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
                
                <button 
                  className="flex w-full items-center justify-between px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  onClick={() => setShowThemeOptions(true)}
                >
                  <div className="flex items-center">
                    {theme === 'light' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-3 text-muted-foreground">
                        <circle cx="12" cy="12" r="5"></circle>
                        <line x1="12" y1="1" x2="12" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="23"></line>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                        <line x1="1" y1="12" x2="3" y2="12"></line>
                        <line x1="21" y1="12" x2="23" y2="12"></line>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                      </svg>
                    ) : theme === 'dark' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-3 text-muted-foreground">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-3 text-muted-foreground">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                        <line x1="8" y1="21" x2="16" y2="21"></line>
                        <line x1="12" y1="17" x2="12" y2="21"></line>
                      </svg>
                    )}
                    <span className="text-base font-medium">Theme Settings</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
                
                <button className="flex w-full items-center px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                  <Settings className="w-5 h-5 mr-3 text-muted-foreground" />
                  <span className="text-base font-medium">App Settings</span>
                </button>
                
                <div className="h-4"></div>
                
                <button className="flex w-full items-center px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 dark:text-red-400">
                  <LogOut className="w-5 h-5 mr-3" />
                  <span className="text-base font-medium">Sign Out</span>
                </button>
              </div>
            )}
            
            {/* Language Options */}
            {showLanguages && (
              <div className="space-y-3">
                {LANGUAGES.map((lang) => (
                  <button 
                    key={lang.code}
                    className="flex w-full items-center justify-between px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <div className="flex items-center">
                      <span className="text-xl mr-3">{lang.flag}</span>
                      <span className="text-base font-medium">{lang.name}</span>
                    </div>
                    {lang.code === 'en' && (
                      <Check className="h-5 w-5 text-green-500" />
                    )}
                  </button>
                ))}
              </div>
            )}
            
            {/* Wallet Options */}
            {showWalletOptions && (
              <div className="space-y-3">
                <div className="px-2 mb-2">
                  <p className="text-sm text-muted-foreground">Select a wallet to connect to the application</p>
                </div>
                
                {WALLET_OPTIONS.map((wallet) => (
                  <button 
                    key={wallet.id}
                    className="flex w-full items-center px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <span className="text-xl mr-3">{wallet.icon}</span>
                    <span className="text-base font-medium">{wallet.name}</span>
                  </button>
                ))}
              </div>
            )}
            
            {/* Theme Options */}
            {showThemeOptions && (
              <div className="space-y-3">
                {THEME_OPTIONS.map((themeOption) => (
                  <button 
                    key={themeOption.id}
                    onClick={() => handleThemeChange(themeOption.id)}
                    className={cn(
                      "flex w-full items-center justify-between px-4 py-3 rounded-lg border",
                      theme === themeOption.id 
                        ? "bg-neutral-100 dark:bg-neutral-800 border-primary" 
                        : "border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    )}
                  >
                    <div className="flex items-center">
                      <span className="text-xl mr-3">{themeOption.icon}</span>
                      <span className="text-base font-medium">{themeOption.name}</span>
                    </div>
                    {theme === themeOption.id && (
                      <Check className="h-5 w-5 text-green-500" />
                    )}
                  </button>
                ))}
                <div className="px-2 mt-2">
                  <p className="text-xs text-muted-foreground">
                    System theme will automatically switch between light and dark mode based on your device settings.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-neutral-900 rounded-lg w-full max-w-xl p-6 shadow-xl">
            {/* Header with back button when in submenus */}
            <div className="flex justify-between items-center mb-4">
              {(showLanguages || showWalletOptions || showThemeOptions) ? (
                <div className="flex items-center">
                  <button 
                    onClick={goBackToMain}
                    className="mr-2 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                  </button>
                  <h2 className="text-xl font-semibold">
                    {showLanguages ? "Language Settings" : 
                     showWalletOptions ? "Wallet Options" : 
                     showThemeOptions ? "Theme Settings" :
                     "Account Settings"}
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
            {!showLanguages && !showWalletOptions && !showThemeOptions && (
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
                
                <div 
                  className="flex items-center justify-between p-3.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                  onClick={() => setShowThemeOptions(true)}
                >
                  <div className="flex items-center gap-4">
                    {theme === 'light' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-muted-foreground">
                        <circle cx="12" cy="12" r="5"></circle>
                        <line x1="12" y1="1" x2="12" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="23"></line>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                        <line x1="1" y1="12" x2="3" y2="12"></line>
                        <line x1="21" y1="12" x2="23" y2="12"></line>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                      </svg>
                    ) : theme === 'dark' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-muted-foreground">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-muted-foreground">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                        <line x1="8" y1="21" x2="16" y2="21"></line>
                        <line x1="12" y1="17" x2="12" y2="21"></line>
                      </svg>
                    )}
                    <span className="text-base">Theme Settings</span>
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
            
            {/* Theme Options */}
            {showThemeOptions && (
              <div className="space-y-4">
                {THEME_OPTIONS.map((themeOption) => (
                  <div 
                    key={themeOption.id}
                    onClick={() => handleThemeChange(themeOption.id)}
                    className={cn(
                      "flex items-center gap-4 p-3.5 rounded-md cursor-pointer",
                      theme === themeOption.id
                        ? "bg-neutral-100 dark:bg-neutral-800"
                        : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    )}
                  >
                    <span className="text-xl">{themeOption.icon}</span>
                    <span className="text-base">{themeOption.name}</span>
                    {theme === themeOption.id && (
                      <Check className="ml-auto h-4 w-4 text-green-500" />
                    )}
                  </div>
                ))}
                <p className="text-xs text-muted-foreground mt-2">
                  System theme will automatically switch between light and dark mode based on your device settings.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// Use memo to prevent unnecessary re-renders
export default memo(Header);
export { Header }; 