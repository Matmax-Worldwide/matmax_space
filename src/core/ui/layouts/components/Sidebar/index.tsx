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
 * Enhanced for better mobile experience
 */
export function Sidebar({ className, children, showLogo = true }: SidebarProps) {
  const { sidebarOpen, setSidebarOpen, isMobile, isSmallMobile } = useLayout();
  
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
  
  // Handle touch swipe to close sidebar
  useEffect(() => {
    if (typeof window === 'undefined' || !isMobile) return;
    
    let touchStartX = 0;
    const handleTouchStart = (e: Event) => {
      const touchEvent = e as unknown as TouchEvent;
      touchStartX = touchEvent.touches[0].clientX;
    };
    
    const handleTouchMove = (e: Event) => {
      if (!sidebarOpen) return;
      
      const touchEvent = e as unknown as TouchEvent;
      const touchEndX = touchEvent.touches[0].clientX;
      const diff = touchStartX - touchEndX;
      
      // If swiping left (negative diff) and beyond threshold, close the sidebar
      if (diff > 50) {
        setSidebarOpen(false);
      }
    };
    
    const sidebarElement = document.querySelector('[data-sidebar]');
    if (sidebarElement) {
      sidebarElement.addEventListener('touchstart', handleTouchStart, { passive: true });
      sidebarElement.addEventListener('touchmove', handleTouchMove, { passive: true });
      
      return () => {
        sidebarElement.removeEventListener('touchstart', handleTouchStart);
        sidebarElement.removeEventListener('touchmove', handleTouchMove);
      };
    }
  }, [isMobile, sidebarOpen, setSidebarOpen]);
  
  return (
    <>
      {/* Mobile overlay for closing the sidebar */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar container */}
      <aside
        data-sidebar
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 w-64 bg-card border-r border-border transition-all duration-300 ease-in-out flex flex-col",
          isMobile 
            ? sidebarOpen 
              ? "translate-x-0 shadow-xl" 
              : "-translate-x-full" 
            : "translate-x-0",
          // Adjust width for very small screens
          isSmallMobile && "w-[85vw]",
          className
        )}
      >
        {/* Sidebar header with logo aligned left */}
        <div className="flex items-center justify-between px-4 py-4 sm:py-6 border-b border-border">
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
              className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary/30 touch-manipulation"
              aria-label="Close sidebar"
              style={{ touchAction: 'manipulation' }}
            >
              <X size={20} />
            </button>
          )}
        </div>
        
        {/* Sidebar content */}
        <div className="flex-1 overflow-y-auto py-4 overscroll-contain">
          {children || <SidebarNav />}
        </div>
        
        {/* Sidebar footer */}
        <SidebarFooter />
      </aside>
    </>
  );
}

export default Sidebar; 