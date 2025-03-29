import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define types for the layout context
type LayoutContextType = {
  // Sidebar state
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  
  // Theme state
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  
  // Responsive state
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  
  // Layout configuration
  layoutType: 'dashboard' | 'minimal' | 'auth' | 'marketing';
  setLayoutType: (type: 'dashboard' | 'minimal' | 'auth' | 'marketing') => void;
};

// Create the context with undefined default value
const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

/**
 * LayoutProvider component provides global layout state and functionality
 * to all child components in the application.
 */
export function LayoutProvider({ children }: { children: ReactNode }) {
  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  // Theme state (with system preference detection)
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  
  // Responsive state
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  
  // Layout type
  const [layoutType, setLayoutType] = useState<'dashboard' | 'minimal' | 'auth' | 'marketing'>('dashboard');
  
  // Effect for handling window resize and detecting screen size
  useEffect(() => {
    // Skip on server to avoid hydration issues
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsDesktop(width >= 1024);
      
      // Auto-close sidebar on small screens
      if (width < 768) {
        setSidebarOpen(false);
      }
    };
    
    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Effect for applying theme to document
  useEffect(() => {
    // Skip on server to avoid hydration issues
    if (typeof window === 'undefined') return;
    
    const root = window.document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    
    // Apply appropriate theme
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
    
    // Save preference to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  // Effect for loading saved theme from localStorage
  useEffect(() => {
    // Skip on server to avoid hydration issues
    if (typeof window === 'undefined') return;
    
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);
  
  // Provide context to children
  return (
    <LayoutContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        toggleSidebar,
        theme,
        setTheme,
        isMobile,
        isTablet,
        isDesktop,
        layoutType,
        setLayoutType
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

/**
 * Custom hook to access layout context
 * Throws an error if used outside of LayoutProvider
 */
export function useLayout() {
  const context = useContext(LayoutContext);
  
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  
  return context;
} 