import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/src/core/utils/styling';
import { useLayout } from '../../providers/LayoutProvider';

/**
 * Main navigation component for the header
 */
export function MainNav() {
  const pathname = usePathname();
  const { layoutType } = useLayout();
  
  // Define different navigation items based on layout type
  const navItems = layoutType === 'auth' 
    ? [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
      ]
    : [
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/international', label: 'International' },
        { href: '/users', label: 'Users' },
      ];
  
  return (
    <nav className="ml-6 hidden md:flex">
      <ul className="flex space-x-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "px-1 py-2 text-sm transition-colors hover:text-foreground",
                  isActive 
                    ? "text-foreground font-medium" 
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default MainNav; 