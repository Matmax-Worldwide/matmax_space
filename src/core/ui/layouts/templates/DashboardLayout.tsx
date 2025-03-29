import { ReactNode } from 'react';
import { LayoutProvider } from '../providers/LayoutProvider';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { cn } from '../../../utils/styling';

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
          <main className="flex-1 p-4 md:p-6">
            <div className={cn(
              "mx-auto",
              {
                // Max width classes
                'max-w-md': maxWidth === 'xs',
                'max-w-lg': maxWidth === 'sm',
                'max-w-2xl': maxWidth === 'md',
                'max-w-4xl': maxWidth === 'lg',
                'max-w-6xl': maxWidth === 'xl',
                'max-w-7xl': maxWidth === '2xl',
                '': maxWidth === 'full',
                
                // Padding classes
                'px-0 py-0': padding === 'none',
                'px-3 py-3': padding === 'sm',
                'px-4 py-6': padding === 'md',
                'px-4 py-8': padding === 'lg',
              },
              contentClassName
            )}>
              {children}
            </div>
          </main>
          
          {/* Footer - conditionally rendered */}
          {showFooter && (
            <footer className="py-6 px-4 border-t border-border">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
                <p>© {new Date().getFullYear()} MatMax Wellness Studio. All rights reserved.</p>
                <div className="flex space-x-4 mt-4 md:mt-0">
                  <a href="/terms" className="hover:text-foreground">Terms</a>
                  <a href="/privacy" className="hover:text-foreground">Privacy</a>
                  <a href="/contact" className="hover:text-foreground">Contact</a>
                </div>
              </div>
            </footer>
          )}
        </div>
      </div>
    </LayoutProvider>
  );
}

export default DashboardLayout; 