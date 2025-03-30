import { Sun, Moon } from 'lucide-react';
import { cn } from '@/src/core/utils/styling';

type SidebarFooterProps = {
  className?: string;
  collapsed?: boolean;
  theme?: 'light' | 'dark' | 'system';
  setTheme?: (theme: 'light' | 'dark' | 'system') => void;
};

/**
 * Footer component for the application sidebar
 */
export function SidebarFooter({ className, collapsed = false, theme = 'light', setTheme }: SidebarFooterProps) {
  // Toggle between light and dark theme
  const toggleTheme = () => {
    if (setTheme) {
      const newTheme = theme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    }
  };
  
  // Make sure we have a valid theme value
  const currentTheme = theme || 'light';
  const isDark = currentTheme === 'dark';
  
  return (
    <div className={cn(
      "py-2", 
      collapsed ? "flex justify-center items-center" : "px-3",
      className
    )}>
      {/* Theme Switcher - Centered in the footer */}
      <div className={cn(
        "flex items-center justify-center w-full",
        collapsed ? "flex-col" : ""
      )}>
        {!collapsed && (
          <button
            onClick={toggleTheme}
            className={cn(
              "w-full flex items-center justify-center p-2 rounded-md transition-colors",
              isDark 
                ? "bg-gray-700 text-yellow-400 hover:bg-gray-600" 
                : "bg-blue-50 text-indigo-600 hover:bg-blue-100"
            )}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
          >
            {isDark ? (
              <>
                <Sun size={18} />
                <span className="ml-2 font-medium">Light Mode</span>
              </>
            ) : (
              <>
                <Moon size={18} />
                <span className="ml-2 font-medium">Dark Mode</span>
              </>
            )}
          </button>
        )}
        
        {collapsed && (
          <button
            onClick={toggleTheme}
            className={cn(
              "p-2 rounded-md transition-colors",
              isDark 
                ? "bg-gray-700 text-yellow-400 hover:bg-gray-600" 
                : "bg-blue-50 text-indigo-600 hover:bg-blue-100"
            )}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            title={isDark ? "Light mode" : "Dark mode"}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}

export default SidebarFooter; 