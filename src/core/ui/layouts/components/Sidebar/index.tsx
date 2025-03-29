import { ReactNode, useEffect } from 'react';
import { useLayout } from '../../providers/LayoutProvider';
import { cn } from '../../../../utils/styling';
import { X } from 'lucide-react';

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
        {/* Sidebar header with logo and close button */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          {showLogo ? <span className="font-bold text-xl">GlobalApp</span> : <h2 className="text-lg font-semibold">Menu</h2>}
          
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          )}
        </div>
        
        {/* Sidebar content */}
        <div className="flex-1 overflow-y-auto py-4">
          {children || (
            <nav className="px-2">
              <ul className="space-y-1">
                {/* Placeholder navigation items */}
                <li>
                  <a href="/dashboard" className="flex items-center px-3 py-2 text-sm rounded-md bg-primary/10 text-primary">
                    <span>Dashboard</span>
                  </a>
                </li>
                <li>
                  <a href="/international" className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800">
                    <span>International</span>
                  </a>
                </li>
                <li>
                  <a href="/blockchain" className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800">
                    <span>Blockchain</span>
                  </a>
                </li>
              </ul>
            </nav>
          )}
        </div>
        
        {/* Sidebar footer */}
        <div className="border-t border-border p-4">
          <div className="text-xs text-muted-foreground">
            <p>© 2023 GlobalApp Inc.</p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar; 