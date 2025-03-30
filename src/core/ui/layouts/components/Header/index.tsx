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
    <header 
      className={cn(
        "h-16 bg-background border-b border-border fixed top-0 left-0 right-0 z-[100] flex items-center",
        transparent ? "bg-transparent border-transparent" : "",
        className
      )}
    >
      <div className="w-full h-full px-4 flex items-center justify-between">
        {/* Left section with logo (desktop only) and section selector */}
        <div className="flex-1 flex items-center justify-start">
          {/* Logo - only shown on desktop */}
          {!isMobileView && (
            <div className="flex-shrink-0 mr-4">
              <Logo size="default" darkModeInvert={true} />
            </div>
          )}
          
          {/* Section button - only for mobile */}
          {isMobileView && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                
                // Toggle module menu
                setModuleMenuOpen(!moduleMenuOpen);
                
                // Close any other open elements
                setDropdowns({
                  language: false,
                  user: false,
                  section: false
                });

                // Always close main mobile menu
                setMobileMenuOpen(false);
              }}
              className={cn(
                "flex items-center py-1.5 px-2.5 text-xs rounded-md font-medium",
                `bg-gradient-to-r ${currentSectionData.color} text-white`
              )}
              aria-label="Change section"
              data-dropdown="section-toggle"
              data-action="toggle-section"
            >
              <currentSectionData.icon className="w-3.5 h-3.5 mr-1.5" />
              <span>{currentSectionData.title}</span>
            </button>
          )}
          
          {/* Section dropdown */}
          {dropdowns.section && isMobileView && (
            <div 
              className="absolute left-4 top-14 w-44 rounded-md shadow-lg bg-white dark:bg-neutral-800 ring-1 ring-black ring-opacity-5 border border-border z-[101]"
              data-dropdown="section"
              onClick={(e) => e.stopPropagation()} // Prevent clicks from reaching document
            >
              <div className="py-1">
                {NAV_ITEMS.map((item: NavItem) => (
                  <button
                    key={item.section}
                    onClick={(e) => {
                      // Stop event propagation
                      e.stopPropagation();
                      e.preventDefault();
                      
                      // Close dropdowns
                      setDropdowns(prev => ({ ...prev, section: false }));
                      
                      // Make sure mobile menu is closed
                      setMobileMenuOpen(false);
                      
                      // Get the section name in lowercase
                      const sectionName = item.section.toLowerCase();
                      
                      // Update active section in the layout context first for immediate UI update
                      setActiveSection(sectionName);
                      
                      // Store in localStorage
                      if (typeof window !== 'undefined') {
                        localStorage.setItem('activeSection', sectionName);
                      }
                      
                      // Navigate to the protected page with the section parameter
                      router.push(`/protected?section=${sectionName}`);
                    }}
                    className={cn(
                      "flex w-full items-center px-3 py-1.5 text-xs rounded-md mb-0.5",
                      item.section.toLowerCase() === activeSection?.toLowerCase() 
                        ? `bg-gradient-to-r ${item.color} text-white`
                        : "text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    )}
                  >
                    <item.icon className="w-3 h-3 mr-1.5" />
                    <span>{item.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Center section with navigation (desktop) or logo (mobile) */}
        <div className="flex-1 flex items-center justify-center">
          {/* Desktop navigation */}
          {!isMobileView && (
            <div className="h-full">
              <HeaderNav />
            </div>
          )}
          
          {/* Mobile centered logo */}
          {isMobileView && (
            <div className="flex-shrink-0">
              <Logo size="small" darkModeInvert={true} />
            </div>
          )}
        </div>
        
        {/* Right section with settings icon and hamburger menu */}
        <div className="flex-1 flex items-center justify-end">
          {/* Mobile menu toggle buttons */}
          {isMobileView && (
            <div className="flex items-center space-x-1">
              {/* Settings icon - opens settings menu */}
              <button
                onClick={(e) => {
                  // Stop propagation to avoid interference
                  e.stopPropagation();
                  e.preventDefault();
                  
                  // Always close other dropdowns and menus
                  setDropdowns({
                    language: false,
                    user: false,
                    section: false
                  });
                  setModuleMenuOpen(false);
                  setMobileMenuOpen(false);
                  
                  // Open settings menu
                  setSettingsMenuOpen(true);
                }}
                className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center"
                aria-label="Toggle settings menu"
                data-action="toggle-settings"
              >
                <Settings size={18} />
              </button>
              
              {/* Hamburger menu icon - opens navigation menu */}
              <button
                onClick={(e) => {
                  // Stop propagation to avoid interference
                  e.stopPropagation();
                  e.preventDefault();
                  
                  // Always close other dropdowns and menus
                  setDropdowns({
                    language: false,
                    user: false,
                    section: false
                  });
                  setSettingsMenuOpen(false);
                  
                  // Open module menu instead of account menu
                  setModuleMenuOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center"
                aria-label="Toggle navigation menu"
                data-action="toggle-navigation"
              >
                <Menu size={18} />
              </button>
            </div>
          )}
          
          {/* Desktop actions only shown on desktop */}
          {!isMobileView && (
            <div className="flex items-center space-x-2">
              {/* Removed hamburger menu for desktop */}
              
              {/* Wallet Connect Button */}
              {showWalletConnect && (
                <BlockchainWallet 
                  variant={currentModule as 'default' | 'admin' | 'lms' | 'finance' | 'payments'} 
                />
              )}
              
              {/* Language Selector */}
              <div className="relative">
                <button
                  type="button"
                  onClick={toggleLanguageDropdown}
                  className="flex items-center justify-center h-7 w-7 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                  aria-label="Select language"
                  title="Change language"
                  data-dropdown="language-toggle"
                >
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </button>
                
                {/* Language dropdown */}
                {dropdowns.language && (
                  <div 
                    className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-neutral-800 ring-1 ring-black ring-opacity-5 border border-border z-[101]"
                    data-dropdown="language"
                  >
                    <div className="py-1">
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setDropdowns(prev => ({ ...prev, language: false }));
                            console.log(`Changed language to ${lang.code}`);
                          }}
                          className="flex w-full items-center px-4 py-2 text-sm text-foreground hover:bg-muted/50 hover:text-primary transition-colors text-left"
                        >
                          <span className="mr-2">{lang.flag}</span>
                          {lang.name}
                          {lang.code === 'en' && (
                            <Check className="ml-auto h-4 w-4 text-primary" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={toggleUserDropdown}
                  className="h-7 w-7 flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 text-white shadow-sm hover:shadow-md transition-all"
                  aria-label="User menu"
                  title="Account menu"
                  data-dropdown="user-toggle"
                >
                  <span className="text-xs font-medium">U</span>
                </button>
                
                {/* User dropdown */}
                {dropdowns.user && (
                  <div 
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-neutral-800 ring-1 ring-black ring-opacity-5 border border-border z-[101]"
                    data-dropdown="user"
                  >
                    <div className="py-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          setDropdowns(prev => ({ ...prev, user: false }));
                          setSettingsMenuOpen(true);
                        }}
                        className="flex w-full items-center px-4 py-2 text-sm text-foreground hover:bg-muted/50 hover:text-primary transition-colors text-left"
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Manage Account
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Module Menu - Simplified menu focused on module selection */}
      {moduleMenuOpen && (
        <div 
          className={cn(
            "fixed inset-0 bg-white dark:bg-neutral-900 z-[200] flex flex-col h-screen overflow-hidden transition-all duration-300 ease-in-out",
            moduleMenuVisible ? "opacity-100" : "opacity-0 translate-x-full"
          )}
        >
          {/* Menu Header with close button */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
            <div className={cn(
              "flex items-center",
              currentSectionData.color.replace('from-', 'text-').split(' ')[0]
            )}>
              <currentSectionData.icon className="w-5 h-5 mr-2" />
              <span className="font-bold text-lg">NAVIGATION</span>
            </div>
            <button 
              onClick={() => setModuleMenuOpen(false)}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Module Menu Content - Scrollable */}
          <div className="flex-1 overflow-y-auto p-4 pb-safe">
            {/* Current Section Information */}
            <div className="mb-5">
              <div className={cn(
                "flex items-center px-2 py-3 rounded-lg bg-gradient-to-r mb-4",
                currentSectionData.color
              )}>
                <currentSectionData.icon className="w-5 h-5 mr-3 text-white" />
                <span className="text-white font-bold">{currentSectionData.title} MODULE</span>
              </div>
            </div>
            
            {/* Section items (if any) - Navigation items for current module */}
            {currentSectionData.children && currentSectionData.children.length > 0 && (
              <div className="mb-5 border-b border-neutral-200 dark:border-neutral-700 pb-5">
                <h3 className="text-xs font-medium text-muted-foreground mb-2 px-1">{currentSectionData.title} Navigation</h3>
                <div className="space-y-1">
                  {currentSectionData.children.map((child, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setModuleMenuOpen(false);
                        router.push(child.href);
                      }}
                      className="flex w-full items-center px-3 py-2.5 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
                    >
                      <span>{child.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Navigation Items - Module Selection */}
            <div className="mb-5">
              <h3 className="text-xs font-medium text-muted-foreground mb-2 px-1">Modules</h3>
              <div className="space-y-2">
                {NAV_ITEMS.map((item: NavItem) => (
                  <button
                    key={item.section}
                    onClick={(e) => {
                      // Stop event propagation
                      e.stopPropagation();
                      
                      // Close the module menu
                      setModuleMenuOpen(false);
                      
                      // Get the section name in lowercase
                      const sectionName = item.section.toLowerCase();
                      
                      // Update active section in the layout context first for immediate UI update
                      setActiveSection(sectionName);
                      
                      // Store in localStorage
                      if (typeof window !== 'undefined') {
                        localStorage.setItem('activeSection', sectionName);
                      }
                      
                      // Navigate to the protected page with the section parameter
                      router.push(`/protected?section=${sectionName}`);
                    }}
                    className={cn(
                      "flex w-full items-center px-4 py-3 text-base rounded-lg",
                      item.section.toLowerCase() === activeSection?.toLowerCase() 
                        ? `bg-gradient-to-r ${item.color} text-white` 
                        : "text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    )}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    <span>{item.title}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="mb-5 border-t border-neutral-200 dark:border-neutral-700 pt-5">
              <h3 className="text-xs font-medium text-muted-foreground mb-2 px-1">Quick Links</h3>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setModuleMenuOpen(false);
                    router.push('/dashboard');
                  }}
                  className="flex w-full items-center px-3 py-2.5 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
                >
                  <Home className="w-4 h-4 mr-2 text-neutral-500" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => {
                    setModuleMenuOpen(false);
                    router.push('/profile');
                  }}
                  className="flex w-full items-center px-3 py-2.5 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
                >
                  <User className="w-4 h-4 mr-2 text-neutral-500" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => {
                    setModuleMenuOpen(false);
                    router.push('/settings');
                  }}
                  className="flex w-full items-center px-3 py-2.5 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
                >
                  <Settings className="w-4 h-4 mr-2 text-neutral-500" />
                  <span>Settings</span>
                </button>
              </div>
            </div>
            
            {/* Add bottom safe area padding for mobile devices with notches/home indicators */}
            <div className="h-8 md:h-0"></div>
          </div>
        </div>
      )}
      
      {/* Settings Menu - for settings and tools */}
      {settingsMenuOpen && (
        <div 
          className={cn(
            "fixed inset-0 bg-white dark:bg-neutral-900 z-[200] flex flex-col h-screen overflow-hidden transition-all duration-300 ease-in-out",
            settingsMenuVisible ? "opacity-100" : "opacity-0 translate-x-full"
          )}
        >
          {/* Menu Header with close button */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center">
              <Settings className="w-5 h-5 mr-2 text-primary" />
              <span className="font-bold text-lg">SETTINGS</span>
            </div>
            <button 
              onClick={() => setSettingsMenuOpen(false)}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Settings Menu Content - Scrollable */}
          <div className="flex-1 overflow-y-auto p-4 pb-safe">
            {/* Main Settings Options */}
            <div className="mb-5">
              <h3 className="text-xs font-medium text-muted-foreground mb-2 px-1">Account</h3>
              
              {/* Profile Button */}
              <button
                onClick={() => {
                  setSettingsMenuOpen(false);
                  router.push('/profile');
                }}
                className="flex w-full items-center px-3 py-2.5 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg mb-1.5"
              >
                <User className="w-4 h-4 mr-2 text-neutral-500" />
                <span>Profile</span>
              </button>
              
              {/* Settings Button */}
              <button
                onClick={() => {
                  setSettingsMenuOpen(false);
                  router.push('/settings');
                }}
                className="flex w-full items-center px-3 py-2.5 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg mb-1.5"
              >
                <Settings className="w-4 h-4 mr-2 text-neutral-500" />
                <span>Settings</span>
              </button>
              
              {/* Sign out Button */}
              <button
                onClick={() => {
                  setSettingsMenuOpen(false);
                  router.push('/sign-in');
                }}
                className="flex w-full items-center px-3 py-2.5 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg mb-1.5"
              >
                <LogOut className="w-4 h-4 mr-2 text-neutral-500" />
                <span>Sign out</span>
              </button>
            </div>
            
            {/* Settings & Tools */}
            <div className="mb-5">
              <h3 className="text-xs font-medium text-muted-foreground mb-2 px-1">Settings & Tools</h3>
              
              {/* Language Button - Opens Modal */}
              <button
                onClick={toggleLanguageModal}
                className="flex w-full items-center px-3 py-2.5 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg mb-1.5"
              >
                <Globe className="w-4 h-4 mr-2 text-neutral-500" />
                <span>Select Language</span>
              </button>
              
              {/* Wallet Button - Opens Modal */}
              <button
                onClick={toggleWalletModal}
                className="flex w-full items-center px-3 py-2.5 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg mb-1.5"
              >
                <CreditCard className="w-4 h-4 mr-2 text-neutral-500" />
                <span>Wallet Connect</span>
              </button>
            </div>
            
            {/* Theme Options */}
            <div className="mb-5">
              <h3 className="text-xs font-medium text-muted-foreground mb-2 px-1">Theme</h3>
              
              <button
                onClick={() => {
                  setTheme('light');
                }}
                className={cn(
                  "flex w-full items-center px-3 py-2.5 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg mb-1.5",
                  theme === 'light' ? "bg-neutral-100 dark:bg-neutral-800" : ""
                )}
              >
                <svg className="w-4 h-4 mr-2 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>Light Mode</span>
                {theme === 'light' && <Check className="ml-auto h-4 w-4 text-primary" />}
              </button>
              
              <button
                onClick={() => {
                  setTheme('dark');
                }}
                className={cn(
                  "flex w-full items-center px-3 py-2.5 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg mb-1.5",
                  theme === 'dark' ? "bg-neutral-100 dark:bg-neutral-800" : ""
                )}
              >
                <svg className="w-4 h-4 mr-2 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <span>Dark Mode</span>
                {theme === 'dark' && <Check className="ml-auto h-4 w-4 text-primary" />}
              </button>
              
              <button
                onClick={() => {
                  setTheme('system');
                }}
                className={cn(
                  "flex w-full items-center px-3 py-2.5 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg mb-1.5",
                  theme === 'system' ? "bg-neutral-100 dark:bg-neutral-800" : ""
                )}
              >
                <svg className="w-4 h-4 mr-2 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>System Mode</span>
                {theme === 'system' && <Check className="ml-auto h-4 w-4 text-primary" />}
              </button>
            </div>
            
            {/* Add bottom safe area padding for mobile devices with notches/home indicators */}
            <div className="h-8 md:h-0"></div>
          </div>
        </div>
      )}
      
      {/* Full-screen mobile menu now just for account */}
      {mobileMenuOpen && (
        <div 
          className={cn(
            "fixed inset-0 bg-white dark:bg-neutral-900 z-[200] flex flex-col h-screen overflow-hidden transition-all duration-300 ease-in-out",
            menuVisible ? "opacity-100" : "opacity-0 translate-x-full"
          )}
        >
          {/* Menu Header with close button */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center">
              <User className="w-5 h-5 mr-2 text-primary" />
              <span className="font-bold text-lg">ACCOUNT</span>
            </div>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Menu Content - Scrollable */}
          <div className="flex-1 overflow-y-auto p-4 pb-safe">
            {/* Current Section Indicator */}
            <div className="mb-5">
              <div className="px-1 py-2 mb-3 flex items-center">
                <currentSectionData.icon className={cn(
                  "w-4 h-4 mr-2",
                  currentSectionData.color.replace('from-', 'text-').split(' ')[0]
                )} />
                <span className={cn(
                  "text-base font-bold tracking-wide",
                  currentSectionData.color.replace('from-', 'text-').split(' ')[0]
                )}>{currentSectionData.title} MODULE</span>
              </div>
            </div>
          
            {/* User Profile Section */}
            <div>
              <h3 className="text-xs font-medium text-muted-foreground mb-2 px-1">Account</h3>
              <div className="space-y-1.5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    setSettingsMenuOpen(true);
                  }}
                  className="flex w-full items-center px-3 py-2.5 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
                >
                  <Settings className="w-4 h-4 mr-2 text-neutral-500" />
                  <span>Manage Account</span>
                </button>
              </div>
            </div>
            
            {/* Add bottom safe area padding for mobile devices with notches/home indicators */}
            <div className="h-8 md:h-0"></div>
          </div>
        </div>
      )}
      
      {/* Language Modal */}
      {languageModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50" onClick={toggleLanguageModal}>
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6 max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Select Language</h3>
              <button onClick={toggleLanguageModal} className="text-neutral-500 hover:text-neutral-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    console.log(`Changed language to ${lang.code}`);
                    toggleLanguageModal();
                  }}
                  className="flex items-center p-3 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700"
                >
                  <span className="text-xl mr-3">{lang.flag}</span>
                  <span className="text-sm font-medium">{lang.name}</span>
                  {lang.code === 'en' && (
                    <Check className="ml-auto h-4 w-4 text-green-500" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Wallet Modal */}
      {walletModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50" onClick={toggleWalletModal}>
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6 max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Connect Wallet</h3>
              <button onClick={toggleWalletModal} className="text-neutral-500 hover:text-neutral-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="mb-4">
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                Connect your wallet to access blockchain features
              </p>
              
              <div className="bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg p-4 mb-3">
                <BlockchainWallet variant={currentModule as 'default' | 'admin' | 'lms' | 'finance' | 'payments'} />
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <button className="flex items-center p-3 border border-neutral-200 dark:border-neutral-700 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700">
                  <span className="text-sm font-medium">MetaMask</span>
                </button>
                <button className="flex items-center p-3 border border-neutral-200 dark:border-neutral-700 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700">
                  <span className="text-sm font-medium">Coinbase Wallet</span>
                </button>
                <button className="flex items-center p-3 border border-neutral-200 dark:border-neutral-700 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700">
                  <span className="text-sm font-medium">WalletConnect</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// Use memo to prevent unnecessary re-renders
export default memo(Header);
export { Header }; 