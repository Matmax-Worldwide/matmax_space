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
import SettingsMenu from './menus/SettingsMenu';
import ModuleMenu from './menus/ModuleMenu';
import MobileMenu from './menus/MobileMenu';

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
  
  // Open/close mobile menu with animation
  const toggleMenu = (menuType: string, open: boolean = true) => {
    if (open) {
      if (menuType === 'mobile') {
        setMobileMenuOpen(true);
        setMenuVisible(true);
      } else if (menuType === 'module') {
        setModuleMenuOpen(true);
        setModuleMenuVisible(true);
      } else if (menuType === 'settings') {
        setSettingsMenuOpen(true);
        setSettingsMenuVisible(true);
      }
      
      // Close other menus
      if (menuType !== 'mobile' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        setMenuVisible(false);
      }
      if (menuType !== 'module' && moduleMenuOpen) {
        setModuleMenuOpen(false);
        setModuleMenuVisible(false);
      }
      if (menuType !== 'settings' && settingsMenuOpen) {
        setSettingsMenuOpen(false);
        setSettingsMenuVisible(false);
      }
    } else {
      // When menu is closed, first hide with transition, then actually remove from DOM
      if (menuType === 'mobile') {
        setMenuVisible(false);
        setTimeout(() => setMobileMenuOpen(false), 300);
      } else if (menuType === 'module') {
        setModuleMenuVisible(false);
        setTimeout(() => setModuleMenuOpen(false), 300);
      } else if (menuType === 'settings') {
        setSettingsMenuVisible(false);
        setTimeout(() => setSettingsMenuOpen(false), 300);
      }
    }
  };

  return (
    <header className={cn(
      'w-full h-16 bg-white dark:bg-neutral-900 border-b border-border flex items-center justify-between px-4 z-20',
      // Use fixed position for both mobile and desktop with high z-index
      'fixed top-0 left-0 right-0 z-50',
      transparent && 'bg-transparent dark:bg-transparent border-transparent',
        className
    )}>
      {/* Container with grid layout for better alignment */}
      <div className="w-full grid grid-cols-3 items-center">
        {/* Left side - Logo and toggle */}
        <div className="flex items-center gap-2">
          {/* Hamburger menu moved to the right side, so only logo here now */}
          <Logo size={isMobileView ? "small" : "default"} darkModeInvert={true} />
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
                    toggleMenu('mobile');
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
                  toggleMenu('module');
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
                  toggleMenu('settings');
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
                  toggleMenu('settings');
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
        
      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => toggleMenu('mobile', false)} 
        mobileMenuVisible={menuVisible}
        sidebarItems={[
          {
            title: "Dashboard",
            href: "/protected?section=main",
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
          },
          {
            title: "Analytics",
            href: "/protected?section=main&page=analytics",
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
          },
          {
            title: "Courses",
            href: "/protected?section=lms",
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
          },
          {
            title: "Users",
            href: "/protected?section=admin",
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          },
          {
            title: "Transactions",
            href: "/protected?section=finance",
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
          },
        ]}
        notificationCount={3}
        userProfile={{
          name: "Albert Saco",
          role: "Administrator",
          avatar: "/images/avatar.jpg"
        }}
        currentSectionId={currentSectionData.section}
        onSectionSelect={(sectionId) => {
          setActiveSection(sectionId);
          if (typeof window !== 'undefined') {
            localStorage.setItem('activeSection', sectionId);
          }
          router.push(`/protected?section=${sectionId}`);
        }}
      />
      
      {/* Module Menu */}
      <ModuleMenu 
        isOpen={moduleMenuOpen} 
        onClose={() => toggleMenu('module', false)} 
        moduleMenuVisible={moduleMenuVisible}
        onSectionSelect={(sectionId) => {
          setActiveSection(sectionId);
          if (typeof window !== 'undefined') {
            localStorage.setItem('activeSection', sectionId);
          }
          router.push(`/protected?section=${sectionId}`);
        }}
        currentSectionId={activeSection}
      />
      
      {/* Settings Menu */}
      <SettingsMenu 
        isOpen={settingsMenuOpen} 
        onClose={() => toggleMenu('settings', false)} 
        settingsMenuVisible={settingsMenuVisible} 
      />
    </header>
  );
}

// Use memo to prevent unnecessary re-renders
export default memo(Header);
export { Header }; 