import { ReactNode } from 'react';
import { cn } from '@/src/core/utils/styling';
import { useLayout } from '../../providers/LayoutProvider';

type PageContainerProps = {
  className?: string;
  children: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
};

/**
 * Page container component
 * Provides consistent padding and max-width for page content
 * with enhanced mobile responsiveness and performance optimizations
 */
export function PageContainer({ 
  className, 
  children, 
  maxWidth = '2xl',
  padding = 'md'
}: PageContainerProps) {
  const { isSmallMobile, isLargeMobile, isPortrait, isLandscape, viewportWidth } = useLayout();

  // Calculate reasonable content width based on screen size & orientation
  const getOptimalContentMaxWidth = () => {
    // Don't constrain when set to full
    if (maxWidth === 'full') return '';
    
    // For landscape orientation on mobile, use a percentage-based width instead of fixed
    if (isLandscape && (isSmallMobile || isLargeMobile)) {
      return 'max-w-[90%]';
    }
    
    // For portrait and non-mobile, use standard size classes
    return {
      'xs': 'max-w-md',
      'sm': 'max-w-lg',
      'md': 'max-w-2xl',
      'lg': 'max-w-4xl',
      'xl': 'max-w-6xl',
      '2xl': 'max-w-7xl',
    }[maxWidth] || 'max-w-7xl';
  };
  
  // Dynamically determine padding based on screen size and orientation
  const getResponsivePadding = () => {
    if (padding === 'none') return 'px-0 py-0';
    
    if (isSmallMobile) {
      // Extra small screens need tighter padding
      switch(padding) {
        case 'sm': return 'px-2 py-2';
        case 'md': return 'px-3 py-3';
        case 'lg': return 'px-3 py-4';
        default: return 'px-3 py-3';
      }
    }
    
    // Standard responsive padding
    switch(padding) {
      case 'sm': return 'px-2 py-2 xs:px-3 xs:py-3 sm:px-4 sm:py-4';
      case 'md': return 'px-3 py-4 xs:px-4 xs:py-5 sm:px-6 sm:py-6';
      case 'lg': return 'px-3 py-5 xs:px-4 xs:py-6 sm:px-6 sm:py-8 md:px-8 md:py-10';
      default: return 'px-3 py-4 sm:px-6 sm:py-6';
    }
  };

  return (
    <div className={cn(
      "w-full mx-auto will-change-contents",
      getOptimalContentMaxWidth(),
      getResponsivePadding(),
      // Additional optimizations for very small screens
      isSmallMobile && 'overflow-x-hidden',
      // Reduce motion on mobile for better performance
      (isSmallMobile || isLargeMobile) && 'motion-reduce:transition-none',
      className
    )}>
      {children}
    </div>
  );
}

export default PageContainer; 