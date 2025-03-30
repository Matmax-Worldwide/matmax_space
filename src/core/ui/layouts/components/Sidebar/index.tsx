"use client";

import { ReactNode, useEffect, useRef, useState } from 'react';
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
 * Enhanced for better mobile experience with improved performance
 */
export function Sidebar({ className, children, showLogo = true }: SidebarProps) {
  const { sidebarOpen, setSidebarOpen, isMobile, isSmallMobile, isLandscape, viewportHeight } = useLayout();
  const sidebarRef = useRef<HTMLElement>(null);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchDiffX, setTouchDiffX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  // Accessibility improvement: trap focus in sidebar when open on mobile
  useEffect(() => {
    if (!isMobile || !sidebarOpen || !sidebarRef.current) return;
    
    // Focus the first focusable element in the sidebar
    const focusableElements = sidebarRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length > 0) {
      (focusableElements[0] as HTMLElement).focus();
    }
  }, [sidebarOpen, isMobile]);
  
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
  
  // Handle touch interactions with improved accuracy and performance
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setIsDragging(true);
    setTouchDiffX(0);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentX = e.touches[0].clientX;
    const diff = touchStartX - currentX;
    
    // Only allow dragging left to close
    if (diff < 0) return;
    
    // Limit the drag distance
    const maxDrag = 100;
    const boundedDiff = Math.min(diff, maxDrag);
    
    setTouchDiffX(boundedDiff);
    
    // Apply real-time transform during drag for smoother feeling
    if (sidebarRef.current) {
      // Use hardware acceleration for smoother performance
      sidebarRef.current.style.transform = `translateX(-${boundedDiff}px)`;
      sidebarRef.current.style.transition = 'none';
    }
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
    
    // Reset styles
    if (sidebarRef.current) {
      sidebarRef.current.style.transform = '';
      sidebarRef.current.style.transition = '';
    }
    
    // If dragged more than 50px, close the sidebar
    if (touchDiffX > 50) {
      setSidebarOpen(false);
    }
  };
  
  // Determine optimal sidebar height for landscape mode on mobile
  const sidebarStyle = isLandscape && isMobile
    ? { maxHeight: `${viewportHeight}px`, overflowY: 'auto' as const }
    : {};
  
  return (
    <>
      {/* Mobile overlay for closing the sidebar */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 will-change-opacity"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar container */}
      <aside
        ref={sidebarRef}
        data-sidebar
        style={sidebarStyle}
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 w-64 bg-card border-r border-border transition-all duration-300 ease-in-out flex flex-col",
          "will-change-transform backface-visibility-hidden",
          isMobile 
            ? sidebarOpen 
              ? "translate-x-0 shadow-xl" 
              : "-translate-x-full" 
            : "translate-x-0",
          // Adjust width for very small screens
          isSmallMobile && "w-[85vw]",
          className
        )}
        onTouchStart={isMobile && sidebarOpen ? handleTouchStart : undefined}
        onTouchMove={isMobile && sidebarOpen ? handleTouchMove : undefined}
        onTouchEnd={isMobile && sidebarOpen ? handleTouchEnd : undefined}
        onTouchCancel={isMobile && sidebarOpen ? handleTouchEnd : undefined}
        role="dialog"
        aria-modal={isMobile ? "true" : "false"}
        aria-label="Navigation menu"
      >
        {/* Sidebar header with logo aligned left */}
        <div className="flex items-center justify-between px-4 py-4 sm:py-6 border-b border-border">
          {showLogo ? (
            <div className="flex justify-start">
              <Logo darkModeInvert={true} />
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