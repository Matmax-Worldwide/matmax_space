import { useState, useEffect } from 'react';
import Link from 'next/link';
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
  Home
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
  section?: 'global' | 'contextual'; // Identifies if this is a global or contextual item
};

/**
 * Application sidebar navigation
 * Supports nested navigation items, permission-based visibility, and context-aware navigation
 */
export function SidebarNav() {
  const pathname = usePathname();
  const { activeSection } = useLayout();
  
  // Track expanded sections for accordion behavior
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  
  // In a real app, this would come from an auth context
  const userPermissions = [
    'dashboard.view', 'international.view', 'users.view', 'blockchain.view',
    'admin.view', 'lms.view', 'finance.view', 'payments.view', 'store.view',
    'resources.view', 'analytics.view', 'support.view'
  ];
  
  // Global navigation items that are always visible
  const globalNavItems: NavItemType[] = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      permissions: ['dashboard.view'],
      section: 'global'
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: Settings,
      permissions: ['settings.view'],
      section: 'global'
    }
  ];
  
  // Context-aware navigation items based on active section
  const contextualNavItems: Record<string, NavItemType[]> = {
    main: [
      {
        title: 'International',
        href: '/international',
        icon: Globe,
        permissions: ['international.view'],
        section: 'contextual',
        children: [
          { title: 'Countries', href: '/international/countries' },
          { title: 'Currencies', href: '/international/currencies' },
          { title: 'Languages', href: '/international/languages' },
          { title: 'Tax Rates', href: '/international/tax-rates' }
        ]
      },
      {
        title: 'Users',
        href: '/users',
        icon: Users,
        permissions: ['users.view'],
        section: 'contextual'
      },
      {
        title: 'Blockchain',
        href: '/blockchain',
        icon: Wallet,
        permissions: ['blockchain.view'],
        section: 'contextual',
        children: [
          { title: 'Wallets', href: '/blockchain/wallets' },
          { title: 'Tokens', href: '/blockchain/tokens' },
          { title: 'Transactions', href: '/blockchain/transactions' }
        ]
      }
    ],
    lms: [
      {
        title: 'Courses',
        href: '/lms/courses',
        icon: BookOpen,
        permissions: ['lms.view'],
        section: 'contextual'
      },
      {
        title: 'Students',
        href: '/lms/students',
        icon: Users,
        permissions: ['lms.view'],
        section: 'contextual'
      },
      {
        title: 'Instructors',
        href: '/lms/instructors',
        icon: GraduationCap,
        permissions: ['lms.view'],
        section: 'contextual'
      },
      {
        title: 'Certifications',
        href: '/lms/certifications',
        icon: PanelLeft,
        permissions: ['lms.view'],
        section: 'contextual'
      }
    ],
    finance: [
      {
        title: 'Reports',
        href: '/finance/reports',
        icon: BarChart,
        permissions: ['finance.view'],
        section: 'contextual'
      },
      {
        title: 'Accounting',
        href: '/finance/accounting',
        icon: Landmark,
        permissions: ['finance.view'],
        section: 'contextual'
      },
      {
        title: 'Budgets',
        href: '/finance/budgets',
        icon: CreditCard,
        permissions: ['finance.view'],
        section: 'contextual'
      },
      {
        title: 'Taxes',
        href: '/finance/taxes',
        icon: Wallet,
        permissions: ['finance.view'],
        section: 'contextual'
      }
    ],
    admin: [
      {
        title: 'Users',
        href: '/admin/users',
        icon: Users,
        permissions: ['admin.view'],
        section: 'contextual'
      },
      {
        title: 'Roles',
        href: '/admin/roles',
        icon: ShieldCheck,
        permissions: ['admin.view'],
        section: 'contextual'
      },
      {
        title: 'Permissions',
        href: '/admin/permissions',
        icon: PanelLeft,
        permissions: ['admin.view'],
        section: 'contextual'
      },
      {
        title: 'Audit Logs',
        href: '/admin/audit-logs',
        icon: BarChart,
        permissions: ['admin.view'],
        section: 'contextual'
      }
    ],
    store: [
      {
        title: 'Products',
        href: '/store/products',
        icon: Store,
        permissions: ['store.view'],
        section: 'contextual'
      },
      {
        title: 'Orders',
        href: '/store/orders',
        icon: CreditCard,
        permissions: ['store.view'],
        section: 'contextual'
      },
      {
        title: 'Customers',
        href: '/store/customers',
        icon: Users,
        permissions: ['store.view'],
        section: 'contextual'
      }
    ],
    support: [
      {
        title: 'Tickets',
        href: '/support/tickets',
        icon: Headphones,
        permissions: ['support.view'],
        section: 'contextual'
      },
      {
        title: 'Knowledge Base',
        href: '/support/knowledge-base',
        icon: BookOpen,
        permissions: ['support.view'],
        section: 'contextual'
      }
    ]
  };
  
  // Get the current active section items or default to main
  const activeContextualItems = contextualNavItems[activeSection.toLowerCase()] || contextualNavItems['main'];
  
  // Combine global and contextual navigation items
  const combinedNavItems = [...globalNavItems, ...activeContextualItems];
  
  // Toggle section expansion
  const toggleSection = (title: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };
  
  // Check if user has permission for an item
  const hasPermission = (item: NavItemType) => {
    if (!item.permissions || item.permissions.length === 0) return true;
    return item.permissions.some(permission => userPermissions.includes(permission));
  };
  
  // Auto-expand section based on current path
  useEffect(() => {
    if (!pathname) return;
    
    combinedNavItems.forEach(item => {
      if (item.children && pathname.startsWith(item.href)) {
        setExpandedSections(prev => ({ ...prev, [item.title]: true }));
      }
    });
  }, [pathname, combinedNavItems]);
  
  return (
    <nav className="px-2">
      {/* Render Global Section Heading */}
      <div className="mb-2 px-3 py-2">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Global
        </h2>
      </div>
      
      {/* Render Global Navigation Items */}
      <ul className="space-y-1 mb-6">
        {globalNavItems.filter(hasPermission).map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          const isExpanded = expandedSections[item.title];
          
          return (
            <li key={item.href} className="select-none">
              {item.children ? (
                <>
                  {/* Section with children - acts as an accordion */}
                  <button
                    onClick={() => toggleSection(item.title)}
                    className={cn(
                      "flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    )}
                  >
                    <item.icon className="h-5 w-5 mr-2" />
                    <span>{item.title}</span>
                    <span className="ml-auto">
                      <ChevronDown 
                        size={16} 
                        className={cn(
                          "transition-transform duration-200", 
                          isExpanded ? "rotate-180" : ""
                        )} 
                      />
                    </span>
                  </button>
                  
                  {/* Child items */}
                  {isExpanded && (
                    <ul className="mt-1 ml-6 space-y-1">
                      {item.children.map((child) => {
                        const childPath = `${child.href}`;
                        const isChildActive = pathname === childPath;
                        
                        return (
                          <li key={childPath}>
                            <Link
                              href={childPath}
                              className={cn(
                                "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                                isChildActive
                                  ? "bg-primary/10 text-primary"
                                  : "text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800"
                              )}
                            >
                              {child.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </>
              ) : (
                /* Single navigation item without children */
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  )}
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  <span>{item.title}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
      
      {/* Render Contextual Section Heading */}
      <div className="mb-2 px-3 py-2">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {activeSection.charAt(0).toUpperCase() + activeSection.slice(1).toLowerCase()}
        </h2>
      </div>
      
      {/* Render Contextual Navigation Items */}
      <ul className="space-y-1">
        {activeContextualItems.filter(hasPermission).map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          const isExpanded = expandedSections[item.title];
          
          return (
            <li key={item.href} className="select-none">
              {item.children ? (
                <>
                  {/* Section with children - acts as an accordion */}
                  <button
                    onClick={() => toggleSection(item.title)}
                    className={cn(
                      "flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    )}
                  >
                    <item.icon className="h-5 w-5 mr-2" />
                    <span>{item.title}</span>
                    <span className="ml-auto">
                      <ChevronDown 
                        size={16} 
                        className={cn(
                          "transition-transform duration-200", 
                          isExpanded ? "rotate-180" : ""
                        )} 
                      />
                    </span>
                  </button>
                  
                  {/* Child items */}
                  {isExpanded && (
                    <ul className="mt-1 ml-6 space-y-1">
                      {item.children.map((child) => {
                        const childPath = `${child.href}`;
                        const isChildActive = pathname === childPath;
                        
                        return (
                          <li key={childPath}>
                            <Link
                              href={childPath}
                              className={cn(
                                "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                                isChildActive
                                  ? "bg-primary/10 text-primary"
                                  : "text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800"
                              )}
                            >
                              {child.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </>
              ) : (
                /* Single navigation item without children */
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  )}
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  <span>{item.title}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default SidebarNav; 