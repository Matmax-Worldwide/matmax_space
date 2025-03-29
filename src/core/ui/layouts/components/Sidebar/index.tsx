import { ReactNode, useEffect } from 'react';
import { useLayout } from '../../providers/LayoutProvider';
import { cn } from '@/src/core/utils/styling';
import { X } from 'lucide-react';
import Logo from '../Header/Logo';
import SidebarNav from './SidebarNav';
import SidebarFooter from './SidebarFooter';

type SidebarProps = {
  className?: string;
  children?: ReactNode;
  showLogo?: boolean;
};

/**
 * Application sidebar component
 * Provides navigation and context-specific actions
 */
export function Sidebar({ className, children, showLogo = true }: SidebarProps) {
  const { sidebarOpen, setSidebarOpen, isMobile } = useLayout();
  
  // Close sidebar when pressing Escape key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && sidebarOpen && isMobile) {
        setSidebarOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [sidebarOpen, setSidebarOpen, isMobile]);
  
  return (
    <>
      {/* Mobile overlay for closing the sidebar */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar container */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out flex flex-col",
          isMobile 
            ? sidebarOpen ? "translate-x-0" : "-translate-x-full" 
            : "translate-x-0",
          className
        )}
      >
        {/* Sidebar header with logo aligned left */}
        <div className="flex items-center px-4 py-6 border-b border-border">
          {showLogo ? (
            <div className="flex justify-start">
              <Logo />
            </div>
          ) : (
            <h2 className="text-lg font-semibold">Menu</h2>
          )}
          
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute right-4 top-4 p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          )}
        </div>
        
        {/* Sidebar content */}
        <div className="flex-1 overflow-y-auto py-4">
          {children || <SidebarNav />}
        </div>
        
        {/* Sidebar footer */}
        <SidebarFooter />
      </aside>
    </>
  );
}

export default Sidebar; 