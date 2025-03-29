import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

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
  isSmallMobile: boolean;
  isLargeMobile: boolean;
  isPortrait: boolean;
  isLandscape: boolean;
  
  // Viewport dimensions
  viewportWidth: number;
  viewportHeight: number;
  
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
  
  // Responsive state with precise breakpoints
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  const [isLargeMobile, setIsLargeMobile] = useState(false);
  const [isPortrait, setIsPortrait] = useState(true);
  const [isLandscape, setIsLandscape] = useState(false);
  
  // Viewport dimensions
  const [viewportWidth, setViewportWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  
  // Layout type
  const [layoutType, setLayoutType] = useState<'dashboard' | 'minimal' | 'auth' | 'marketing'>('dashboard');
  
  // Memoized resize handler for better performance
  const handleResize = useCallback(() => {
    // Skip on server to avoid hydration issues
    if (typeof window === 'undefined') return;
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Update viewport dimensions
    setViewportWidth(width);
    setViewportHeight(height);
    
    // Update orientation state
    setIsPortrait(height >= width);
    setIsLandscape(width > height);
    
    // Enhanced mobile breakpoints with more specific detection
    setIsSmallMobile(width < 480); // Extra small devices
    setIsLargeMobile(width >= 480 && width < 768); // Medium mobile devices
    setIsMobile(width < 768); // All mobile devices
    setIsTablet(width >= 768 && width < 1024); // Tablet devices
    setIsDesktop(width >= 1024); // Desktop devices
    
    // Auto-close sidebar on small screens
    if (width < 768) {
      setSidebarOpen(false);
    }
  }, []);
  
  // Effect for handling window resize and detecting screen size
  useEffect(() => {
    // Skip on server to avoid hydration issues
    if (typeof window === 'undefined') return;
    
    // Initial check
    handleResize();
    
    // Throttled resize handler for better performance
    let resizeTimer: ReturnType<typeof setTimeout>;
    const throttledResize = () => {
      if (!resizeTimer) {
        resizeTimer = setTimeout(() => {
          resizeTimer = null as any;
          handleResize();
        }, 100); // Throttle resize events to avoid excessive updates
      }
    };
    
    // Add event listeners with passive option for better performance
    window.addEventListener('resize', throttledResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });
    
    // Media query for prefers-reduced-motion
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = reducedMotionQuery.matches;
    
    // If user prefers reduced motion, apply immediate changes without transitions
    if (prefersReducedMotion) {
      document.documentElement.classList.add('no-transitions');
    }
    
    // Clean up event listeners
    return () => {
      window.removeEventListener('resize', throttledResize);
      window.removeEventListener('orientationchange', handleResize);
      clearTimeout(resizeTimer);
    };
  }, [handleResize]);
  
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
      
      // Listen for system theme changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleThemeChange = (e: MediaQueryListEvent) => {
        root.classList.remove('light', 'dark');
        root.classList.add(e.matches ? 'dark' : 'light');
      };
      
      mediaQuery.addEventListener('change', handleThemeChange);
      return () => mediaQuery.removeEventListener('change', handleThemeChange);
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
        isSmallMobile,
        isLargeMobile,
        isPortrait,
        isLandscape,
        viewportWidth,
        viewportHeight,
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