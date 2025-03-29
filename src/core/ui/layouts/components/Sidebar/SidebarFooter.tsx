import { useLayout } from '../../providers/LayoutProvider';
import { Info, Sun, Moon, Monitor } from 'lucide-react';
import { cn } from '@/src/core/utils/styling';

/**
 * Sidebar footer component
 * Contains application metadata and theme controls
 */
export function SidebarFooter() {
  const { theme, setTheme } = useLayout();
  
  // Application version information - in a real app, this would be pulled from environment or API
  const appVersion = 'v1.0.0';
  const environmentName = process.env.NODE_ENV === 'production' ? 'Production' : 'Development';
  
  return (
    <div className="border-t border-border p-4 space-y-3">
      {/* Theme selection controls */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Theme</span>
        <div className="flex space-x-1 bg-background rounded-md overflow-hidden border border-border">
          <button
            onClick={() => setTheme('light')}
            className={cn(
              "p-1.5",
              theme === 'light' 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:text-foreground"
            )}
            title="Light theme"
          >
            <Sun size={16} />
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={cn(
              "p-1.5",
              theme === 'dark' 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:text-foreground"
            )}
            title="Dark theme"
          >
            <Moon size={16} />
          </button>
          <button
            onClick={() => setTheme('system')}
            className={cn(
              "p-1.5",
              theme === 'system' 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:text-foreground"
            )}
            title="System theme"
          >
            <Monitor size={16} />
          </button>
        </div>
      </div>
      
      {/* Application info */}
      <div className="text-xs text-muted-foreground space-y-1">
        <div className="flex items-center">
          <Info size={12} className="mr-1.5" />
          <span>{appVersion} ({environmentName})</span>
        </div>
        <p>© {new Date().getFullYear()} MatMax Wellness Studio</p>
      </div>
    </div>
  );
}

export default SidebarFooter; 