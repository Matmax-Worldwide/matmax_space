"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
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
  Settings,
  ChevronDown,
  Menu
} from 'lucide-react';
import { useLayout } from '../../providers/LayoutProvider';

// Navigation item type definition
type NavItemType = {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: {
    title: string;
    href: string;
  }[];
  permissions?: string[]; // For permission-based visibility
  isHighlighted?: boolean; // To highlight the current module
  color?: string; // Color theme for the module
};

/**
 * HeaderNav - Modular navigation component for the MatMax Wellness Studio header
 * 
 * This component provides the primary navigation between major application modules.
 * It's designed as part of the centralized layout system described in layoutguidelines.mdc.
 * 
 * Features:
 * - Color-coded module navigation
 * - Dropdown menus for sub-sections
 * - Integration with the sidebar via useLayout
 * - Permission-based visibility control
 * - Accessibility support with ARIA attributes
 * - Responsive design with mobile-specific layout
 * 
 * Usage:
 * <HeaderNav /> - typically used within the Header component
 * 
 * Adding a new module:
 * 1. Add a new entry to the navItems array
 * 2. Specify title, href, icon, color, and children
 * 3. Add required permissions to the userPermissions array
 * 
 * @see layouts/README.md for full documentation
 */
export function HeaderNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { setSidebarOpen, isMobile, isSmallMobile, isTablet, setActiveSection, activeSection } = useLayout();
  
  // Track opened dropdown
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  // Track mobile menu open state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // In a real app, this would come from an auth context
  const userPermissions = ['admin.view', 'lms.view', 'finance.view', 'payments.view', 'main.view'];
  
  // Navigation items - complementary menu for future development sections
  const navItems: NavItemType[] = [
    {
      title: 'MAIN',
      href: '/dashboard',
      icon: Home,
      permissions: ['main.view'],
      color: 'from-blue-500 to-blue-600',
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
      icon: GraduationCap,
      permissions: ['lms.view'],
      color: 'from-green-500 to-green-600',
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
      permissions: ['admin.view'],
      color: 'from-purple-500 to-purple-600',
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
      permissions: ['payments.view'],
      color: 'from-amber-500 to-amber-600',
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
      permissions: ['finance.view'],
      color: 'from-sky-500 to-sky-600',
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
      permissions: ['resources.view'],
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      title: 'Analytics',
      href: '/analytics',
      icon: BarChart,
      permissions: ['analytics.view'],
      color: 'from-teal-500 to-teal-600'
    },
    {
      title: 'Support',
      href: '/support',
      icon: Headphones,
      permissions: ['support.view'],
      color: 'from-red-500 to-red-600'
    }
  ];
  
  // Toggle dropdown menu
  const toggleDropdown = (title: string) => {
    setOpenDropdown(prev => prev === title ? null : title);
  };
  
  // Handle navigation with sidebar opening
  const handleNavigation = (href: string, hasChildren: boolean, module?: string) => {
    // Open the sidebar when navigating to a new section (but not on mobile)
    if (!isMobile) {
      setSidebarOpen(true);
    }
    
    // Close any open dropdowns
    setOpenDropdown(null);
    
    // Set active section for contextual side menu
    if (module) {
      setActiveSection(module);
    }
    
    // On mobile with children, keep the menu open to show contextual items
    if (isMobile && hasChildren) {
      // Navigate to the main module page even on mobile
      router.push(href);
      return;
    }
    
    // Close mobile menu only when actually navigating
    if (!hasChildren) {
      setMobileMenuOpen(false);
      router.push(href);
    } else {
      // Navigate to the main module page even when it has children
      router.push(href);
    }
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdown(null);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  
  // Close mobile menu on resize to desktop
  useEffect(() => {
    if (!isMobile && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [isMobile, mobileMenuOpen]);
  
  // Check if user has permission for an item
  const hasPermission = (item: NavItemType) => {
    if (!item.permissions || item.permissions.length === 0) return true;
    return item.permissions.some(permission => userPermissions.includes(permission));
  };
  
  // Determine if we should use mobile layout
  const useMobileLayout = isMobile || isTablet;
  
  // Render mobile menu button
  const renderMobileMenuButton = () => (
    <button
      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      className="flex items-center justify-center p-2 rounded-md bg-white dark:bg-neutral-800 border border-border shadow-sm"
      aria-expanded={mobileMenuOpen}
      aria-controls="mobile-nav"
      aria-label="Toggle navigation menu"
    >
      <Menu size={20} />
      <span className="ml-2 text-sm font-medium">Menu</span>
    </button>
  );
  
  // Render mobile navigation panel
  const renderMobileNavPanel = () => (
    <div
      id="mobile-nav"
      className={cn(
        "absolute left-0 right-0 top-full mt-1 bg-white dark:bg-neutral-800 border border-border rounded-md shadow-lg z-50 transition-all duration-200 overflow-hidden",
        isSmallMobile ? "mx-2" : "mx-4",
        mobileMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
      )}
    >
      <div className="p-2 max-h-[80vh] overflow-y-auto">
        {/* Main Section Headers */}
        <div className="mb-4">
          <h3 className="px-3 py-1 text-xs uppercase text-muted-foreground font-medium">Main Sections</h3>
          <div className="grid grid-cols-2 gap-1 mt-1">
            {navItems.filter(hasPermission).map((item) => {
              // Use toLowerCase() for consistent case comparison
              const isActiveSection = activeSection.toLowerCase() === item.title.toLowerCase();
              // Determine if this item should be highlighted based on active section
              const shouldHighlight = isActiveSection;
              
              return (
                <button
                  key={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium",
                    {
                      "bg-gradient-to-r text-white": shouldHighlight,
                      [item.color || ""]: shouldHighlight,
                      "bg-white dark:bg-neutral-800 text-foreground border border-border": !shouldHighlight
                    }
                  )}
                  onClick={() => {
                    handleNavigation(item.href, true, item.title.toLowerCase());
                  }}
                >
                  <item.icon className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Active Section Contextual Items */}
        <div className="mt-4 border-t border-border pt-3">
          <h3 className="px-3 py-1 text-xs uppercase text-muted-foreground font-medium">
            {activeSection.charAt(0).toUpperCase() + activeSection.slice(1).toLowerCase()} Menu
          </h3>
          
          <div className="mt-2 space-y-1">
            {navItems.filter(hasPermission).find(item => 
              item.title.toLowerCase() === activeSection.toLowerCase())?.children?.map((child) => {
              const childPath = `${child.href}`;
              const isChildActive = pathname === childPath;
              
              return (
                <Link
                  key={childPath}
                  href={childPath}
                  onClick={() => {
                    handleNavigation(childPath, false, activeSection);
                  }}
                  className={cn(
                    "block px-3 py-2 text-sm rounded-md hover:bg-muted flex items-center",
                    isChildActive
                      ? "text-primary bg-primary/5 font-medium"
                      : "text-foreground"
                  )}
                >
                  <span className={cn(
                    "w-2 h-2 rounded-full mr-2",
                    isChildActive ? "bg-primary" : "bg-muted-foreground"
                  )}></span>
                  {child.title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
  
  // Render desktop navigation
  const renderDesktopNav = () => (
    <ul className="flex items-center space-x-2">
      {navItems.filter(hasPermission).map((item) => {
        const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
        const isOpen = openDropdown === item.title;
        // Use toLowerCase() for consistent case comparison
        const isActiveSection = activeSection.toLowerCase() === item.title.toLowerCase();
        // Determine if this item should be highlighted based on active section
        const shouldHighlight = isActiveSection;
        
        return (
          <li key={item.href} className="relative">
            {item.children ? (
              <>
                {/* Menu item with dropdown */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown(item.title);
                    // Also trigger navigation to open the sidebar and set the active section
                    handleNavigation(item.href, true, item.title.toLowerCase());
                  }}
                  className={cn(
                    "flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-all shadow-sm hover:shadow",
                    {
                      // Highlighted state based on active section
                      "bg-gradient-to-r text-white": shouldHighlight,
                      [item.color || ""]: shouldHighlight,
                      
                      // Active section or active state
                      "bg-primary/10 text-primary border-b-2 border-primary": (isActive) && !shouldHighlight,
                      
                      // Normal state
                      "bg-white dark:bg-neutral-800 text-foreground hover:bg-gray-100 dark:hover:bg-neutral-700": !isActive && !shouldHighlight,
                      
                      // Opened dropdown indicator
                      "ring-2 ring-primary/20": isOpen && !shouldHighlight
                    }
                  )}
                  aria-expanded={isOpen}
                  aria-controls={`dropdown-${item.title}`}
                >
                  <item.icon className="h-4 w-4 mr-1.5 flex-shrink-0" />
                  <span>{item.title}</span>
                  <ChevronDown
                    size={14}
                    className={cn("ml-1.5 transition-transform", isOpen ? "rotate-180" : "")}
                  />
                </button>
                
                {/* Dropdown menu */}
                {isOpen && (
                  <div
                    id={`dropdown-${item.title}`}
                    className="absolute top-full left-0 mt-1 w-48 rounded-md bg-white dark:bg-neutral-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby={`dropdown-button-${item.title}`}
                  >
                    <div className="py-1 divide-y divide-gray-100 dark:divide-neutral-700">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-700"
                          onClick={() => handleNavigation(child.href, false, item.title.toLowerCase())}
                          role="menuitem"
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Regular menu item without dropdown */
              <Link
                href={item.href}
                onClick={() => handleNavigation(item.href, false, item.title.toLowerCase())}
                className={cn(
                  "flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-all shadow-sm hover:shadow",
                  {
                    // Highlighted state based on active section
                    "bg-gradient-to-r text-white": shouldHighlight,
                    [item.color || ""]: shouldHighlight,
                    
                    // Active section or active state
                    "bg-primary/10 text-primary border-b-2 border-primary": (isActive) && !shouldHighlight,
                    
                    // Normal state
                    "bg-white dark:bg-neutral-800 text-foreground hover:bg-gray-100 dark:hover:bg-neutral-700": !isActive && !shouldHighlight
                  }
                )}
              >
                <item.icon className="h-4 w-4 mr-1.5 flex-shrink-0" />
                <span>{item.title}</span>
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
  
  return (
    <nav className="relative">
      {useMobileLayout ? (
        <>
          {renderMobileMenuButton()}
          {renderMobileNavPanel()}
        </>
      ) : (
        renderDesktopNav()
      )}
    </nav>
  );
}

export default HeaderNav; 