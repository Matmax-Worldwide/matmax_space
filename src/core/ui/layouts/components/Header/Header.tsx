import React from 'react';
import { cn } from '@/src/core/utils/styling';
import { Menu } from 'lucide-react';
import { useLayout } from '@/src/core/ui/layouts/providers/LayoutProvider';

type HeaderProps = {
  className?: string;
  toggleSidebar?: () => void;
  isSidebarOpen?: boolean;
};

export function Header({ className, toggleSidebar, isSidebarOpen }: HeaderProps) {
  const { isMobile, isSmallMobile } = useLayout();

  return (
    <header className={cn(
      "sticky top-0 z-20 w-full border-b border-border bg-background/95 backdrop-blur-sm",
      className
    )}>
      <div className="flex items-center px-4 h-14 max-w-[100vw] overflow-hidden">
        {/* Mobile Menu Toggle Button - Only visible on mobile */}
        {isMobile && toggleSidebar && (
          <button
            onClick={toggleSidebar}
            className="mr-2 p-2 rounded-md hover:bg-accent"
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        
        {/* ... rest of your header content ... */}
      </div>
    </header>
  );
} 