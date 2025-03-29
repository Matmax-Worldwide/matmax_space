import { ReactNode } from 'react';
import { LayoutProvider } from '../providers/LayoutProvider';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import PageContainer from '../components/Content/PageContainer';
import { cn } from '@/src/core/utils/styling';

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
 */
export function DashboardLayout({
  children,
  showSidebar = true,
  showFooter = true,
  contentClassName,
  maxWidth = '2xl',
  padding = 'md'
}: DashboardLayoutProps) {
  return (
    <LayoutProvider>
      <div className="flex min-h-screen bg-background">
        {/* Sidebar - conditionally rendered */}
        {showSidebar && <Sidebar />}
        
        {/* Main content area */}
        <div className={cn(
          "flex flex-col w-full transition-all duration-300",
          showSidebar && "md:ml-64" // Offset for the sidebar
        )}>
          {/* Header */}
          <Header />
          
          {/* Main content */}
          <main className="flex-1">
            <PageContainer 
              className={contentClassName}
              maxWidth={maxWidth}
              padding={padding}
            >
              {children}
            </PageContainer>
          </main>
          
          {/* Footer - conditionally rendered */}
          {showFooter && <Footer />}
        </div>
      </div>
    </LayoutProvider>
  );
}

export default DashboardLayout; 