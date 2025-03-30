"use client";

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/src/core/utils/styling';
import { 
  Home,
  GraduationCap,
  ShieldCheck, 
  CreditCard, 
  Landmark,
  BookOpen,
  BarChart,
  Headphones,
  ChevronDown,
  Menu,
  Store,
  Globe,
  Check,
  ArrowRight,
  User,
  Settings,
  LogOut
} from 'lucide-react';
import { useLayout } from '../../providers/LayoutProvider';
import BlockchainWallet from './BlockchainWallet';

// Simple navigation configuration
export const NAV_ITEMS = [
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

// Available languages
const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
];

export function HeaderNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { setActiveSection, setSidebarOpen, isMobile, isTablet, activeSection, currentModule } = useLayout();
  
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  
  // Check if a navigation item is active based on current section and pathname
  const isActive = (href: string, section: string) => {
    // Normalize section to lowercase for consistent comparison
    const normalizedSection = section.toLowerCase();
    const normalizedActiveSection = activeSection?.toLowerCase();
    
    // For debugging
    console.log(`Checking if active: ${normalizedSection}, activeSection: ${normalizedActiveSection}, pathname: ${pathname}`);
    
    // First, check URL parameters for section
    if (pathname.startsWith('/protected')) {
      // Get section from URL query parameter
      const sectionParam = pathname.includes('?') ? 
        new URLSearchParams(pathname.split('?')[1]).get('section')?.toLowerCase() : null;
      
      // Direct match with URL parameter section
      if (sectionParam === normalizedSection) {
        console.log(`✅ Section ${normalizedSection} is active via URL parameter`);
        return true;
      }
    }
    
    // Next, check if it matches the active section from context
    if (normalizedActiveSection === normalizedSection) {
      console.log(`✅ Section ${normalizedSection} is active via context state`);
      return true;
    }
    
    // Finally, check path-based matching as fallback
    const isPathActive = href === '/dashboard' 
      ? pathname === '/dashboard' 
      : pathname.startsWith(href);
    
    if (isPathActive) {
      console.log(`✅ Section ${normalizedSection} is active via path matching`);
    }
    
    return isPathActive;
  };
  
  // Handle navigation with simplified approach
  const navigate = (href: string, section: string) => {
    // Log for debugging
    console.log(`Navigating to section: ${section}, href: ${href}`);
    
    // Close any open UI elements
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    
    // Ensure section is lowercase for consistency
    const normalizedSection = section.toLowerCase();
    
    // Update sidebar context
    setActiveSection(normalizedSection);
    
    // Open sidebar on desktop when navigating
    if (!isMobile) {
      setSidebarOpen(true);
    }
    
    // Only perform navigation in browser environment
    if (typeof window === 'undefined') return;
    
    // Store the active section in localStorage for persistence
    localStorage.setItem('activeSection', normalizedSection);
    
    // For ALL sections, use the protected page with section parameter
    window.location.href = `/protected?section=${normalizedSection}`;
  };
  
  // Toggle dropdown menu
  const toggleDropdown = (title: string) => {
    setOpenDropdown(prev => prev === title ? null : title);
  };
  
  return (
    <nav className="flex items-center justify-center h-full">
      {/* Mobile menu toggle - should be visible in HeaderNav only for desktop */}
      {!isMobile && !isTablet && (
        <div className="flex items-center h-full space-x-2">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href, item.section);
            const hasChildren = item.children && item.children.length > 0;
            
            return (
              <div key={item.title} className="relative">
                {hasChildren ? (
                  <>
                <button
                      onClick={() => navigate(`/protected?section=${item.section.toLowerCase()}`, item.section)}
                  className={cn(
                        "flex items-center px-4 py-2 text-sm rounded-lg font-medium",
                        active 
                          ? `bg-gradient-to-r ${item.color} text-white` 
                          : "text-foreground hover:bg-muted"
                      )}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                      <span>{item.title}</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => navigate(item.href, item.section)}
                    className={cn(
                      "flex items-center px-4 py-2 text-sm rounded-lg font-medium",
                      active 
                        ? `bg-gradient-to-r ${item.color} text-white` 
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    <span>{item.title}</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
      
      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (isMobile || isTablet) && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-neutral-900 shadow-lg z-50 border-b border-neutral-200 dark:border-neutral-700">
          <div className="p-1.5">
            {/* Wallet connect */}
            <div className="mb-2 px-2 py-1 border-b border-neutral-200 dark:border-neutral-700">
              <BlockchainWallet 
                variant={currentModule as 'default' | 'admin' | 'lms' | 'finance' | 'payments'} 
              />
            </div>
            
            {/* Navigation Items */}
            <div className="mb-2 pb-2 border-b border-neutral-200 dark:border-neutral-700">
              <div className="text-xs text-muted-foreground mb-1 px-2">Navigation</div>
              {NAV_ITEMS.map((item) => (
                  <button
                    key={item.href}
                  onClick={() => {
                    console.log(`Mobile menu: navigating to section ${item.section}`);
                    // Close the mobile menu
                    setMobileMenuOpen(false);
                    
                    // Get normalized section name
                    const normalizedSection = item.section.toLowerCase();
                    
                    // Update active section state immediately for UI updates
                    setActiveSection(normalizedSection);
                    
                    // Store in localStorage
                    if (typeof window !== 'undefined') {
                      localStorage.setItem('activeSection', normalizedSection);
                    }
                    
                    // Navigate to the protected page with section parameter
                    window.location.href = `/protected?section=${normalizedSection}`;
                  }}
                    className={cn(
                    "flex items-center w-full px-3 py-1.5 text-xs rounded-md mb-0.5",
                    isActive(item.href, item.section) 
                      ? `bg-gradient-to-r ${item.color} text-white` 
                      : "text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  )}
                >
                  <item.icon className="w-3 h-3 mr-1.5" />
                    <span>{item.title}</span>
                  {isActive(item.href, item.section) && (
                    <ArrowRight className="ml-auto w-3 h-3" />
                  )}
                  </button>
              ))}
            </div>
            
            {/* Language Selector */}
            <div className="mb-2 pb-2 border-b border-neutral-200 dark:border-neutral-700">
              <div className="text-xs text-muted-foreground mb-1 px-2">Language</div>
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setSelectedLanguage(lang.code);
                    console.log(`Changed language to ${lang.code}`);
                  }}
                  className="flex w-full items-center px-3 py-1.5 text-xs hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md mb-0.5"
                >
                  <span className="mr-2">{lang.flag}</span>
                  {lang.name}
                  {lang.code === selectedLanguage && (
                    <Check className="ml-auto h-3 w-3 text-primary" />
                  )}
                </button>
                  ))}
                </div>
            
            {/* User Profile Section */}
            <div>
              <div className="text-xs text-muted-foreground mb-1 px-2">Account</div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.push('/profile');
                }}
                className="flex w-full items-center px-3 py-1.5 text-xs hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md mb-0.5"
              >
                <User className="w-3 h-3 mr-1.5" />
                <span>Your Profile</span>
              </button>
              
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.push('/settings');
                }}
                className="flex w-full items-center px-3 py-1.5 text-xs hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md mb-0.5"
              >
                <Settings className="w-3 h-3 mr-1.5" />
                <span>Settings</span>
              </button>
              
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.push('/sign-in');
                }}
                className="flex w-full items-center px-3 py-1.5 text-xs hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md mb-0.5"
              >
                <LogOut className="w-3 h-3 mr-1.5" />
                <span>Sign Out</span>
              </button>
              </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default HeaderNav; 