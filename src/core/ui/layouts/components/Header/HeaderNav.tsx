import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  ChevronDown
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
  const { setSidebarOpen } = useLayout();
  
  // Track opened dropdown
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  // In a real app, this would come from an auth context
  const userPermissions = ['admin.view', 'lms.view', 'finance.view', 'payments.view', 'main.view'];
  
  // Navigation items - complementary menu for future development sections
  const navItems: NavItemType[] = [
    {
      title: 'MAIN',
      href: '/dashboard',
      icon: Home,
      permissions: ['main.view'],
      isHighlighted: true, // Currently in use
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
  const handleNavigation = (href: string, hasChildren: boolean) => {
    // Open the sidebar when navigating to a new section
    setSidebarOpen(true);
    
    // Close any open dropdowns
    setOpenDropdown(null);
    
    // If no children, navigate directly
    if (!hasChildren) {
      window.location.href = href;
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
  
  // Check if user has permission for an item
  const hasPermission = (item: NavItemType) => {
    if (!item.permissions || item.permissions.length === 0) return true;
    return item.permissions.some(permission => userPermissions.includes(permission));
  };
  
  return (
    <nav className="flex">
      <ul className="flex items-center space-x-2">
        {navItems.filter(hasPermission).map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          const isOpen = openDropdown === item.title;
          
          return (
            <li key={item.href} className="relative">
              {item.children ? (
                <>
                  {/* Menu item with dropdown */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown(item.title);
                      // Also trigger navigation to open the sidebar
                      handleNavigation(item.href, true);
                    }}
                    className={cn(
                      "flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-all shadow-sm hover:shadow",
                      {
                        // Highlighted state (current module)
                        "bg-gradient-to-r text-white": item.isHighlighted,
                        [item.color || ""]: item.isHighlighted,
                        
                        // Active state (non-highlighted but active)
                        "bg-primary/10 text-primary border-b-2 border-primary": isActive && !item.isHighlighted,
                        
                        // Normal state
                        "bg-white dark:bg-neutral-800 text-foreground hover:bg-gray-100 dark:hover:bg-neutral-700": !isActive && !item.isHighlighted,
                        
                        // Opened dropdown indicator
                        "ring-2 ring-primary/20": isOpen && !item.isHighlighted
                      }
                    )}
                    aria-expanded={isOpen}
                    aria-controls={`dropdown-${item.title}`}
                  >
                    <item.icon className="h-4 w-4 mr-1.5 flex-shrink-0" />
                    <span>{item.title}</span>
                    <ChevronDown 
                      size={14} 
                      className={cn(
                        "ml-1.5 transition-transform duration-200", 
                        isOpen ? "rotate-180" : ""
                      )} 
                    />
                  </button>
                  
                  {/* Dropdown menu */}
                  {isOpen && (
                    <div 
                      id={`dropdown-${item.title}`}
                      className="absolute left-0 top-full mt-1 w-56 bg-white dark:bg-neutral-800 border border-border rounded-md shadow-lg z-30 py-1 overflow-hidden"
                    >
                      <div className="py-1 border-b border-border px-3 text-xs font-medium text-muted-foreground uppercase">
                        {item.title} Module
                      </div>
                      {item.children.map((child) => {
                        const childPath = `${child.href}`;
                        const isChildActive = pathname === childPath;
                        
                        return (
                          <Link
                            key={childPath}
                            href={childPath}
                            onClick={() => {
                              setSidebarOpen(true);
                              setOpenDropdown(null);
                            }}
                            className={cn(
                              "block px-4 py-2 text-sm hover:bg-muted flex items-center",
                              isChildActive
                                ? "text-primary bg-primary/5 font-medium"
                                : "text-foreground"
                            )}
                          >
                            <span className={cn(
                              "w-1.5 h-1.5 rounded-full mr-2",
                              isChildActive ? "bg-primary" : "bg-muted-foreground"
                            )}></span>
                            {child.title}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                /* Regular menu item without dropdown */
                <Link
                  href={item.href}
                  onClick={() => handleNavigation(item.href, false)}
                  className={cn(
                    "flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-all shadow-sm hover:shadow",
                    {
                      // Highlighted state (current module)
                      "bg-gradient-to-r text-white": item.isHighlighted,
                      [item.color || ""]: item.isHighlighted,
                      
                      // Active state (non-highlighted but active)
                      "bg-primary/10 text-primary border-b-2 border-primary": isActive && !item.isHighlighted,
                      
                      // Normal state
                      "bg-white dark:bg-neutral-800 text-foreground hover:bg-gray-100 dark:hover:bg-neutral-700": !isActive && !item.isHighlighted
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
    </nav>
  );
}

export default HeaderNav; 