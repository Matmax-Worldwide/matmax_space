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
  BarChart
} from 'lucide-react';

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
};

/**
 * Application sidebar navigation
 * Supports nested navigation items and permission-based visibility
 */
export function SidebarNav() {
  const pathname = usePathname();
  
  // Track expanded sections for accordion behavior
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  
  // In a real app, this would come from an auth context
  const userPermissions = ['dashboard.view', 'international.view', 'users.view', 'blockchain.view'];
  
  // Navigation items - in a real app, these might be fetched from an API
  // or filtered based on user permissions
  const navItems: NavItemType[] = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      permissions: ['dashboard.view']
    },
    {
      title: 'International',
      href: '/international',
      icon: Globe,
      permissions: ['international.view'],
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
      permissions: ['users.view']
    },
    {
      title: 'Blockchain',
      href: '/blockchain',
      icon: Wallet,
      permissions: ['blockchain.view'],
      children: [
        { title: 'Wallets', href: '/blockchain/wallets' },
        { title: 'Tokens', href: '/blockchain/tokens' },
        { title: 'Transactions', href: '/blockchain/transactions' }
      ]
    },
    {
      title: 'Finance',
      href: '/finance',
      icon: Landmark,
      permissions: ['finance.view'],
      children: [
        { title: 'Payments', href: '/finance/payments' },
        { title: 'Invoices', href: '/finance/invoices' },
        { title: 'Exchange Rates', href: '/finance/exchange-rates' }
      ]
    },
    {
      title: 'Reports',
      href: '/reports',
      icon: BarChart,
      permissions: ['reports.view']
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: Settings,
      permissions: ['settings.view']
    }
  ];
  
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
    
    navItems.forEach(item => {
      if (item.children && pathname.startsWith(item.href)) {
        setExpandedSections(prev => ({ ...prev, [item.title]: true }));
      }
    });
  }, [pathname]);
  
  return (
    <nav className="px-2">
      <ul className="space-y-1">
        {navItems.filter(hasPermission).map((item) => {
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