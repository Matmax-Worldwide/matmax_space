"use client";

import { ReactNode, memo } from 'react';
import { LayoutProvider } from '../providers/LayoutProvider';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import PageContainer from '../components/Content/PageContainer';
import { cn } from '@/src/core/utils/styling';
import { useLayout } from '../providers/LayoutProvider';

type DashboardLayoutProps = {
  children: ReactNode;
  showSidebar?: boolean;
  showFooter?: boolean;
  contentClassName?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
};

/**
 * Dashboard layout template
 * Main layout for authenticated sections of the application
 * Optimized for mobile with responsive layout adaptations and performance enhancements
 */
function DashboardLayout({ children }: { children: ReactNode }) {
  const DashboardContent = () => {
    const { 
      isMobile, 
      isTablet, 
      isSidebarOpen, 
      toggleSidebar, 
      layoutId, 
      route 
    } = useLayout();
    
    return (
      <div className="flex w-full overflow-x-hidden">
        {/* Sidebar component (hidden on small devices when collapsed) */}
        <div 
          className={cn(
            "fixed inset-y-0 z-50 flex flex-col transition-transform duration-300 ease-in-out bg-sidebar border-r border-border",
            isSidebarOpen 
              ? "translate-x-0 shadow-lg"
              : "-translate-x-full md:translate-x-0 md:w-[70px]",
            isMobile ? "w-[280px]" : "w-[280px]"
          )}
        >
          {/* ... keep existing sidebar contents ... */}
        </div>
        
        {/* Main content area - add max-width to prevent overflow */}
        <div className={cn(
          "flex-1 flex flex-col min-h-screen relative transition-all duration-300 ease-in-out",
          isSidebarOpen 
            ? "ml-0 md:ml-[280px]" 
            : "ml-0 md:ml-[70px]",
        )}>
          <div className="w-full max-w-[100vw] overflow-x-hidden">
            {/* Mobile Header */}
            <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
            
            {/* Main Content */}
            <div className="flex-1 w-full max-w-full overflow-hidden">
              {children}
            </div>
          </div>
        </div>
        
        {/* Overlay for mobile sidebar */}
        {isMobile && isSidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black/50" 
            onClick={() => toggleSidebar()}
          />
        )}
      </div>
    );
  };

  return (
    <LayoutProvider>
      <DashboardContent />
    </LayoutProvider>
  );
}

// Export as default and memo for performance optimization
export default memo(DashboardLayout); 