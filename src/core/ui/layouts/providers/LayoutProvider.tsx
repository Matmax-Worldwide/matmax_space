"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

// Define allowed module types
export type ModuleType = 
  | 'main' 
  | 'lms' 
  | 'admin' 
  | 'finance' 
  | 'payments' 
  | 'resources' 
  | 'analytics' 
  | 'support'
  | 'store'; // Add store to allowed modules
export type LayoutType = 'dashboard' | 'minimal' | 'auth' | 'marketing';

// Define types for the layout context
export type LayoutContextType = {
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
  
  // Module management
  currentModule: ModuleType;
  setCurrentModule: (module: ModuleType) => void;
  
  // Active section for contextual navigation
  activeSection: string;
  setActiveSection: (section: string) => void;
  
  // Layout configuration
  layoutType: LayoutType;
  setLayoutType: (type: LayoutType) => void;
  
  // New properties
  isSidebarOpen: boolean;
  scrollY: number;
  layoutId: string;
  route: string;
  
  // New properties for sidebar width
  sidebarExpanded: boolean;
  setSidebarExpanded: (expanded: boolean) => void;
  sidebarWidth: number;
  expandedSidebarWidth: number;
  collapsedSidebarWidth: number;
};

// Default values with meaningful constants
const EXPANDED_SIDEBAR_WIDTH = 240;
const COLLAPSED_SIDEBAR_WIDTH = 60;

// Create the context with undefined default value
const LayoutContext = createContext<LayoutContextType>({
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  isLandscape: true,
  isPortrait: false,
  viewportWidth: 1920,
  viewportHeight: 1080,
  theme: 'light',
  isSmallMobile: false,
  isLargeMobile: false,
  scrollY: 0,
  isSidebarOpen: true,
  toggleSidebar: () => {},
  layoutId: 'default',
  route: '/',
  currentModule: 'main',
  setCurrentModule: () => {},
  activeSection: 'main',
  setActiveSection: () => {},
  layoutType: 'dashboard',
  setLayoutType: () => {},
  sidebarOpen: false,
  setSidebarOpen: () => {},
  setTheme: () => {},
  sidebarExpanded: true,
  setSidebarExpanded: () => {},
  sidebarWidth: EXPANDED_SIDEBAR_WIDTH,
  expandedSidebarWidth: EXPANDED_SIDEBAR_WIDTH,
  collapsedSidebarWidth: COLLAPSED_SIDEBAR_WIDTH
});

type LayoutProviderProps = {
  children: ReactNode;
  initialModule?: ModuleType;
  initialLayoutType?: LayoutType;
};

/**
 * LayoutProvider component provides global layout state and functionality
 * to all child components in the application.
 */
export function LayoutProvider({ 
  children, 
  initialModule = 'main',
  initialLayoutType = 'dashboard'
}: LayoutProviderProps) {
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
  
  // Module state management
  const [currentModule, setCurrentModule] = useState<ModuleType>(initialModule);
  
  // Active section for contextual navigation
  const [activeSection, setActiveSection] = useState<string>('main');
  
  // Layout type
  const [layoutType, setLayoutType] = useState<LayoutType>(initialLayoutType);
  
  // Add new state for sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [layoutId, setLayoutId] = useState('default');
  const router = useRouter();
  const route = usePathname() || '/';
  
  // New properties for sidebar width
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  
  // Calculate sidebar width based on state
  const sidebarWidth = sidebarExpanded ? EXPANDED_SIDEBAR_WIDTH : COLLAPSED_SIDEBAR_WIDTH;
  
  // Handle section change when route changes
  useEffect(() => {
    // Check for any section parameter in the URL
    if (route.includes('section=')) {
      // Extract section from the URL parameter
      const sectionMatch = route.match(/section=([^&]+)/);
      if (sectionMatch && sectionMatch[1]) {
        const sectionFromUrl = sectionMatch[1].toLowerCase(); // Normalize to lowercase
        
        console.log(`Found section in URL: ${sectionFromUrl}`);
        
        setActiveSection(sectionFromUrl);
        setCurrentModule(sectionFromUrl as ModuleType);
        
        // Store in localStorage for state persistence across refreshes
        if (typeof window !== 'undefined') {
          localStorage.setItem('activeSection', sectionFromUrl);
        }
        return; // Skip further checks
      }
    }
    
    // Default section detection based on routes
    // Determine which section is active based on the current route
    if (route.startsWith('/dashboard') || route === '/') {
      setActiveSection('main');
      setCurrentModule('main');
    } else if (route.startsWith('/lms')) {
      setActiveSection('lms');
      setCurrentModule('lms');
    } else if (route.startsWith('/admin')) {
      setActiveSection('admin');
      setCurrentModule('admin');
    } else if (route.startsWith('/payments')) {
      setActiveSection('payments');
      setCurrentModule('payments');
    } else if (route.startsWith('/finance')) {
      setActiveSection('finance');
      setCurrentModule('finance');
    } else if (route.startsWith('/international')) {
      setActiveSection('main'); // International is part of the main module
      setCurrentModule('main');
    } else if (route.startsWith('/support')) {
      setActiveSection('support');
      setCurrentModule('support');
    } else if (route.startsWith('/store')) {
      setActiveSection('store');
      setCurrentModule('store');
    } else if (route.startsWith('/resources')) {
      setActiveSection('resources');
      setCurrentModule('resources');
    } else if (route.startsWith('/analytics')) {
      setActiveSection('analytics');
      setCurrentModule('analytics');
    } else if (route.startsWith('/blockchain')) {
      setActiveSection('main'); // Blockchain is part of the main module
      setCurrentModule('main');
    }

    // For mobile, default to sidebar closed on route change
    if (isMobile && route !== '/') {
      setSidebarOpen(false);
    }
  }, [route, isMobile]);
  
  // Effect to restore section from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSection = localStorage.getItem('activeSection');
      if (savedSection) {
        // Always normalize the section to lowercase
        const normalizedSection = savedSection.toLowerCase();
        console.log("Restoring section from localStorage:", normalizedSection);
        
        // Set both the active section and current module
        setActiveSection(normalizedSection);
        setCurrentModule(normalizedSection as ModuleType);
        
        // If we're on the protected page but missing the section parameter,
        // update the URL to include it for consistency
        if (typeof window !== 'undefined' && 
            window.location.pathname === '/protected' && 
            !window.location.search.includes('section=')) {
          
          console.log("Adding section parameter to URL:", normalizedSection);
          window.history.replaceState(
            null,
            '',
            `/protected?section=${normalizedSection}`
          );
        }
      }
    }
  }, []);
  
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
  
  // Add a global click handler to close any open dropdown menus
  useEffect(() => {
    // Simpler approach - just handle the close-all-dropdowns event
    const handleDropdownEvent = () => {
      // For components listening to this event
      document.dispatchEvent(new CustomEvent('close-all-dropdowns'));
    };
    
    // Add a minimal event listener for ESC key to close dropdowns
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleDropdownEvent();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
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
        currentModule,
        setCurrentModule,
        activeSection,
        setActiveSection,
        layoutType,
        setLayoutType,
        isSidebarOpen: sidebarOpen,
        layoutId,
        route,
        scrollY: 0,
        sidebarExpanded,
        setSidebarExpanded,
        sidebarWidth,
        expandedSidebarWidth: EXPANDED_SIDEBAR_WIDTH,
        collapsedSidebarWidth: COLLAPSED_SIDEBAR_WIDTH
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