"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/src/core/utils/styling';
import { 
  LayoutDashboard, 
  Globe, 
  Users, 
  Wallet, 
  Settings,
  ChevronDown,
  CreditCard,
  Landmark,
  BarChart,
  GraduationCap,
  ShieldCheck,
  PanelLeft,
  Store,
  BookOpen,
  Headphones,
  Home,
  LucideIcon
} from 'lucide-react';
import { useLayout } from '../../providers/LayoutProvider';

// Define types for navigation items
type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  children?: NavChild[];
};

type NavChild = {
  title: string;
  href: string;
};

// Define valid section names
type SectionName = 'main' | 'lms' | 'admin' | 'payments' | 'finance' | 'store';

// Define sidebar navigation configuration for each section
const SIDEBAR_SECTIONS: Record<SectionName, NavItem[]> = {
  main: [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: Home
    },
    {
      title: 'International',
      href: '/international',
      icon: Globe,
      children: [
        { title: 'Countries', href: '/international/countries' },
        { title: 'Languages', href: '/international/languages' }
      ]
    },
    {
      title: 'Users',
      href: '/users',
      icon: Users
    },
    {
      title: 'Blockchain',
      href: '/blockchain',
      icon: Wallet
    }
  ],
  lms: [
    {
      title: 'Courses',
      href: '/lms/courses',
      icon: BookOpen
    },
    {
      title: 'Students',
      href: '/lms/students',
      icon: Users
    },
    {
      title: 'Instructors',
      href: '/lms/instructors',
      icon: GraduationCap
    }
  ],
  admin: [
    {
      title: 'Users',
      href: '/admin/users',
      icon: Users
    },
    {
      title: 'Roles',
      href: '/admin/roles',
      icon: ShieldCheck
    },
    {
      title: 'Permissions',
      href: '/admin/permissions',
      icon: PanelLeft
    }
  ],
  payments: [
    {
      title: 'Transactions',
      href: '/payments/transactions',
      icon: CreditCard
    },
    {
      title: 'Invoices',
      href: '/payments/invoices',
      icon: CreditCard
    }
  ],
  finance: [
    {
      title: 'Reports',
      href: '/finance/reports',
      icon: BarChart
    },
    {
      title: 'Accounting',
      href: '/finance/accounting',
      icon: Landmark
    }
  ],
  store: [
    {
      title: 'Products',
      href: '/store/products',
      icon: Store
    },
    {
      title: 'Orders',
      href: '/store/orders',
      icon: CreditCard
    }
  ]
};

// Global items always shown at the top of sidebar
const GLOBAL_ITEMS: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings
  }
];

// Define section colors for consistent theming
const SECTION_COLORS: Record<SectionName, string> = {
  main: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20',
  lms: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20',
  admin: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20',
  payments: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20',
  finance: 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/20',
  store: 'text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/20'
};

export function SidebarNav({ collapsed = false }: { collapsed?: boolean }) {
  const pathname = usePathname();
  const { activeSection } = useLayout();
  
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  
  // Get items for the active section, defaulting to main if section is invalid
  const normalizedSection = (activeSection?.toLowerCase() || 'main') as SectionName;
  const sectionItems = SIDEBAR_SECTIONS[normalizedSection] || SIDEBAR_SECTIONS.main;
  
  // Get the current section color theme
  const sectionColor = SECTION_COLORS[normalizedSection] || SECTION_COLORS.main;
  
  // Toggle an expandable section
  const toggleItem = (title: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };
  
  // Auto-expand items based on current path
  useEffect(() => {
    const newExpandedState = { ...expandedItems };
    
    sectionItems.forEach((item: NavItem) => {
      if (item.children && pathname.startsWith(item.href)) {
        newExpandedState[item.title] = true;
      }
    });
    
    setExpandedItems(newExpandedState);
  }, [pathname, sectionItems]);
  
  // Add an effect to monitor when the activeSection changes
  useEffect(() => {
    // Set a data attribute on the body to help track section changes
    if (typeof document !== 'undefined') {
      document.body.setAttribute('data-active-section', activeSection);
    }
  }, [activeSection]);
  
  // Handle navigation by using direct window.location
  const navigate = (href: string) => {
    // Ensure we're in a browser environment before navigating
    if (typeof window === 'undefined') return;
    
    // Check if we're currently in the finance section via protected page
    const isFinanceMode = 
      pathname.startsWith('/protected') && 
      (activeSection === 'finance' || document.body.getAttribute('data-active-section') === 'finance');
    
    // Special case for finance which was previously working
    if (href === '/finance' || href.startsWith('/finance/')) {
      // Add section parameter to preserve the finance section
      window.location.href = `/protected?section=finance`;
      return;
    }
    
    // If we're in finance mode and navigating to a non-finance URL, 
    // we need to keep the section parameter
    if (isFinanceMode && !href.startsWith('/finance/')) {
      // Keep finance section for any navigation while in finance mode
      window.location.href = `${href}?section=finance`;
      return;
    }
    
    window.location.href = href;
  };
  
  // Check if an item or its children match the current path
  const isItemActive = (href: string) => 
    pathname === href || pathname.startsWith(href + '/');
  
  return (
    <div className="px-2">
      {/* Global items */}
      <ul className="space-y-1 mb-6">
        {GLOBAL_ITEMS.map((item: NavItem) => (
          <li key={item.href}>
            <button
              onClick={() => navigate(item.href)}
              className={cn(
                "flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors",
                isItemActive(item.href)
                  ? sectionColor
                  : "text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800"
              )}
              title={collapsed ? item.title : undefined}
            >
              <item.icon className={cn("h-5 w-5", collapsed ? "" : "mr-2")} />
              {!collapsed && <span>{item.title}</span>}
            </button>
          </li>
        ))}
      </ul>
      
      {/* Section title */}
      {!collapsed && (
        <div className="mb-2 px-3 py-2">
          <h2 className={cn(
            "text-xs font-semibold uppercase tracking-wider",
            sectionColor.split(' ')[0] // Use just the text color part
          )}>
            {activeSection.charAt(0).toUpperCase() + activeSection.slice(1).toLowerCase()}
          </h2>
        </div>
      )}
      
      {/* Section specific items */}
      <ul className="space-y-1">
        {sectionItems.map((item: NavItem) => {
          const isActive = isItemActive(item.href);
          const isExpanded = expandedItems[item.title];
          const hasChildren = item.children && item.children.length > 0;
          
          return (
            <li key={item.href}>
              {hasChildren && !collapsed ? (
                <>
                  {/* Expandable item with children */}
                  <button
                    onClick={() => toggleItem(item.title)}
                    className={cn(
                      "flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors",
                      isActive
                        ? sectionColor
                        : "text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    )}
                  >
                    <item.icon className="h-5 w-5 mr-2" />
                    <span>{item.title}</span>
                    <ChevronDown 
                      className={cn(
                        "ml-auto h-4 w-4 transition-transform",
                        isExpanded ? "transform rotate-180" : ""
                      )}
                    />
                  </button>
                  
                  {/* Child items */}
                  {isExpanded && item.children && (
                    <ul className="mt-1 ml-6 space-y-1">
                      {item.children.map((child: NavChild) => (
                        <li key={child.href}>
                          <button
                            onClick={() => navigate(child.href)}
                            className={cn(
                              "flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors",
                              isItemActive(child.href)
                                ? sectionColor
                                : "text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            )}
                          >
                            {child.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                // Regular item without children or collapsed state
                <button
                  onClick={() => navigate(item.href)}
                  className={cn(
                    "flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors",
                    isActive
                      ? sectionColor
                      : "text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  )}
                  title={collapsed ? item.title : undefined}
                >
                  <item.icon className={cn("h-5 w-5", collapsed ? "" : "mr-2")} />
                  {!collapsed && <span>{item.title}</span>}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SidebarNav; 