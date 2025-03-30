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
function DashboardLayout({
  children,
  showSidebar = true,
  showFooter = true,
  contentClassName,
  maxWidth = '2xl',
  padding = 'md'
}: DashboardLayoutProps) {
  return (
    <LayoutProvider>
      <DashboardLayoutContent
        showSidebar={showSidebar}
        showFooter={showFooter}
        contentClassName={contentClassName}
        maxWidth={maxWidth}
        padding={padding}
      >
        {children}
      </DashboardLayoutContent>
    </LayoutProvider>
  );
}

// Separate component to use the useLayout hook
const DashboardLayoutContent = ({
  children,
  showSidebar,
  showFooter,
  contentClassName,
  maxWidth,
  padding
}: DashboardLayoutProps) => {
  const { isMobile, isLandscape, isPortrait, viewportHeight } = useLayout();
  
  // Handle specially small viewport heights in landscape mode
  const isCompactLayout = isLandscape && viewportHeight < 600;
  
  return (
    <div 
      className={cn(
        "flex min-h-screen bg-background will-change-contents",
        // For small screens in landscape, use a more compact layout
        isCompactLayout && "overflow-auto"
      )}
    >
      {/* Sidebar - conditionally rendered */}
      {showSidebar && <Sidebar />}
      
      {/* Main content area */}
      <div 
        className={cn(
          "flex flex-col w-full transition-all duration-300",
          showSidebar && "md:ml-64", // Offset for the sidebar
          // Use hardware acceleration for smoother transitions
          "will-change-transform backface-visibility-hidden"
        )}
      >
        {/* Header with sticky positioning */}
        <Header />
        
        {/* Main content with flex grow */}
        <main 
          className={cn(
            "flex-1",
            // Optimize main container for smaller screens
            isCompactLayout ? "overflow-auto" : ""
          )}
        >
          <PageContainer 
            className={contentClassName}
            maxWidth={maxWidth}
            padding={padding}
          >
            {children}
          </PageContainer>
        </main>
        
        {/* Footer - conditionally rendered and optimized for mobile */}
        {showFooter && <Footer className={isCompactLayout ? "py-3" : ""} />}
      </div>
    </div>
  );
};

// Use memo for performance optimization
export default memo(DashboardLayout);

// Also export as named component
export { DashboardLayout }; 