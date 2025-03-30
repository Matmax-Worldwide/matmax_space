"use client";

import { ReactNode, useEffect, useRef, useState } from 'react';
import { useLayout } from '../../providers/LayoutProvider';
import { cn } from '@/src/core/utils/styling';
import { X, ChevronLeft, Code } from 'lucide-react';
import SidebarNav from './SidebarNav';
import SidebarFooter from './SidebarFooter';

type SidebarProps = {
  className?: string;
  children?: ReactNode;
  showLogo?: boolean;
  isOpen?: boolean;
  toggleSidebar?: () => void;
};

/**
 * Application sidebar component
 * Provides navigation and context-specific actions
 */
export function Sidebar({ className, children, showLogo = false, isOpen, toggleSidebar }: SidebarProps) {
  const { 
    sidebarOpen: contextSidebarOpen, 
    setSidebarOpen, 
    isMobile, 
    isTablet, 
    sidebarExpanded, 
    setSidebarExpanded,
    theme,
    setTheme
  } = useLayout();
  
  // Use props if provided, otherwise fall back to context
  const sidebarOpen = isOpen !== undefined ? isOpen : contextSidebarOpen;
  const handleToggleSidebar = toggleSidebar || (() => setSidebarOpen(!sidebarOpen));
  
  const sidebarRef = useRef<HTMLElement>(null);
  const [touchStartX, setTouchStartX] = useState(0);
  const isMobileDevice = isMobile || isTablet;
  
  // Toggle collapsed state (icons only) when clicking the toggle button
  const toggleCollapsed = () => {
    setSidebarExpanded(!sidebarExpanded);
  };
  
  // Toggle between light and dark theme
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  // Handle touch interactions for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!sidebarOpen) return;
    
    const currentX = e.touches[0].clientX;
    const diff = touchStartX - currentX;
    
    // Only allow dragging left to close
    if (diff > 50) {
      handleToggleSidebar();
    }
  };
  
  // Close sidebar when pressing Escape key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && sidebarOpen && isMobileDevice) {
        handleToggleSidebar();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [sidebarOpen, handleToggleSidebar, isMobileDevice]);
  
  return (
    <>
      {/* Mobile overlay for closing the sidebar */}
      {isMobileDevice && sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={handleToggleSidebar}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar container */}
      <aside
        ref={sidebarRef}
        className={cn(
          "fixed top-[64px] bottom-0 left-0 z-40 bg-card border-r border-border h-[calc(100vh-64px)]",
          "transition-all duration-300 ease-in-out",
          isMobileDevice 
            ? sidebarOpen 
              ? "translate-x-0 shadow-xl w-[280px]" 
              : "-translate-x-full w-[280px]" 
            : sidebarOpen
              ? "translate-x-0"
              : "translate-x-0",
          !isMobileDevice ? sidebarExpanded ? "w-[240px]" : "w-[60px]" : "",
          className
        )}
        onTouchStart={isMobileDevice ? handleTouchStart : undefined}
        onTouchMove={isMobileDevice ? handleTouchMove : undefined}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Sidebar header with title */}
        <div className="flex items-center h-16 px-4 border-b border-border">
          <div className="flex-1 flex items-center overflow-hidden">
            {sidebarExpanded ? (
              <h2 className="text-lg font-semibold truncate">Menu</h2>
            ) : (
              <div className="flex justify-center">
                <div className="text-muted-foreground">
                  <Code size={20} />
                </div>
              </div>
            )}
          </div>
          
          {/* Toggle button for desktop */}
          {!isMobileDevice && (
            <button
              onClick={toggleCollapsed}
              className={cn(
                "p-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-muted-foreground",
                !sidebarExpanded && "absolute right-2"
              )}
              aria-label={sidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
            >
              <ChevronLeft
                size={18}
                className={cn("transform transition-transform duration-300", 
                  !sidebarExpanded && "rotate-180"
                )}
              />
            </button>
          )}
          
          {/* Toggle button for mobile */}
          {isMobileDevice && sidebarOpen && (
            <button
              onClick={handleToggleSidebar}
              className="ml-2 p-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label="Close sidebar"
            >
              <X size={18} />
            </button>
          )}
        </div>
        
        {/* Sidebar content */}
        <div className="flex flex-col h-[calc(100%-4rem)] overflow-y-auto">
          <div className="flex-1 py-2">
            {children || <SidebarNav collapsed={!sidebarExpanded} />}
          </div>
          
          {/* Sidebar footer - Pass theme props */}
          <div className="border-t border-border">
            <SidebarFooter 
              collapsed={!sidebarExpanded} 
              theme={theme}
              setTheme={setTheme}
            />
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar; 