"use client";

import { useState, useEffect } from 'react';
import { useLayout, LayoutProvider } from '../providers/LayoutProvider';
import { cn } from '@/src/core/utils/styling';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import Footer from '../components/Footer';

// Dashboard Layout props
interface DashboardLayoutProps {
  children: React.ReactNode;
}

// Internal component that uses the layout context
function DashboardLayoutContent({ children }: DashboardLayoutProps) {
  const { isMobile, isTablet, viewportWidth, sidebarExpanded, setSidebarExpanded } = useLayout();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Sidebar constants
  const COLLAPSED_WIDTH = 60;
  const EXPANDED_WIDTH = 240;
  
  // Toggle sidebar and close any open dropdowns
  const toggleSidebar = () => {
    // On mobile, toggle visibility
    if (isMobile || isTablet) {
      setIsSidebarOpen(prev => !prev);
    } 
    // On desktop, toggle between expanded and collapsed
    else {
      setSidebarExpanded(!sidebarExpanded);
    }
    
    // Close any open dropdowns when toggling sidebar
    try {
      const event = new CustomEvent('close-all-dropdowns');
      document.dispatchEvent(event);
    } catch (e) {
      console.error('Error dispatching event:', e);
    }
  };

  // Close sidebar by default on mobile/tablet
  useEffect(() => {
    if (isMobile || isTablet) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [isMobile, isTablet]);

  // Listen for window resize to ensure layout stays consistent
  useEffect(() => {
    const handleResize = () => {
      // Additional resize handling if needed
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      {/* Header - Fixed position at top */}
      <Header 
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
      
      {/* Main layout container with sidebar and content */}
      {isMobile ? (
        // Mobile-specific container without the extra top padding
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar - overlay on mobile */}
          <Sidebar 
            isOpen={isSidebarOpen} 
            toggleSidebar={toggleSidebar}
            showLogo={false}
          />
          
          {/* Main content area for mobile */}
          <main className="flex-1 overflow-auto transition-all duration-300 ease-in-out w-full">
            <div className="max-w-7xl mx-auto p-4 md:p-6 min-h-[calc(100vh-64px)]">
              {children}
            </div>
            
            {/* Footer */}
            <Footer />
          </main>
        </div>
      ) : (
        // Desktop container with the padding for header space
        <div className="flex flex-1 overflow-hidden pt-[64px]">
          {/* Sidebar - Fixed on desktop */}
          <Sidebar 
            isOpen={isSidebarOpen} 
            toggleSidebar={toggleSidebar}
            showLogo={false}
          />
          
          {/* Main content area with proper margin based on sidebar state */}
          <main 
            className={cn(
              "flex-1 overflow-auto transition-all duration-300 ease-in-out",
              !isMobile && isSidebarOpen 
                ? sidebarExpanded 
                  ? "ml-[240px]" 
                  : "ml-[60px]"
                : !isMobile ? "ml-[60px]" : ""
            )}
          >
            <div className="max-w-7xl mx-auto p-4 md:p-6 min-h-[calc(100vh-64px)]">
              {children}
            </div>
            
            {/* Footer */}
            <Footer />
          </main>
        </div>
      )}
    </div>
  );
}

/**
 * DashboardLayout - Main layout for authenticated pages
 * Controls the overall structure of the application with sidebar, header and content
 */
export function DashboardLayout(props: DashboardLayoutProps) {
  return (
    <LayoutProvider initialLayoutType="dashboard">
      <DashboardLayoutContent {...props} />
    </LayoutProvider>
  );
} 