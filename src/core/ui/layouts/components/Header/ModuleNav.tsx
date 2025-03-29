import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/src/core/utils/styling';
import { 
  LayoutDashboard, 
  Globe, 
  Users, 
  Wallet, 
  Settings,
  Shield,
  FileText,
  Activity
} from 'lucide-react';

// Module navigation item type
type ModuleNavItem = {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  color?: string;
};

/**
 * Module navigation component for header
 * Provides quick access to different modules of the application
 */
export function ModuleNav() {
  const pathname = usePathname();
  
  // Define module navigation items
  const moduleItems: ModuleNavItem[] = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
    },
    {
      title: 'International',
      href: '/international',
      icon: Globe,
      color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
    },
    {
      title: 'Users',
      href: '/users',
      icon: Users,
      color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
    },
    {
      title: 'Blockchain',
      href: '/blockchain',
      icon: Wallet,
      color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
    },
    {
      title: 'Security',
      href: '/security',
      icon: Shield,
      color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
    },
    {
      title: 'Reports',
      href: '/reports',
      icon: FileText,
      color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300'
    },
    {
      title: 'Monitoring',
      href: '/monitoring',
      icon: Activity,
      color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300'
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: Settings,
      color: 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300'
    }
  ];
  
  return (
    <div className="flex items-center space-x-2">
      {moduleItems.map((item) => {
        const isActive = pathname?.startsWith(item.href);
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center p-2 rounded-lg transition-colors",
              isActive
                ? item.color
                : "text-muted-foreground hover:bg-muted"
            )}
            title={item.title}
          >
            <item.icon className="h-5 w-5" />
          </Link>
        );
      })}
    </div>
  );
}

export default ModuleNav; 