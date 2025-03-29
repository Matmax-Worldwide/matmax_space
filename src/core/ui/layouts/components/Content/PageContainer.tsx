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
 * with enhanced mobile responsiveness
 */
export function PageContainer({ 
  className, 
  children, 
  maxWidth = '2xl',
  padding = 'md'
}: PageContainerProps) {
  const { isSmallMobile } = useLayout();

  return (
    <div className={cn(
      "w-full mx-auto",
      {
        // Max width classes
        'max-w-md': maxWidth === 'xs',
        'max-w-lg': maxWidth === 'sm',
        'max-w-2xl': maxWidth === 'md',
        'max-w-4xl': maxWidth === 'lg',
        'max-w-6xl': maxWidth === 'xl',
        'max-w-7xl': maxWidth === '2xl',
        '': maxWidth === 'full',
        
        // Padding classes - enhanced for mobile
        'px-0 py-0': padding === 'none',
        'px-2 py-2 xs:px-3 xs:py-3 sm:px-4 sm:py-4': padding === 'sm',
        'px-3 py-4 xs:px-4 xs:py-5 sm:px-6 sm:py-6': padding === 'md',
        'px-3 py-5 xs:px-4 xs:py-6 sm:px-6 sm:py-8 md:px-8 md:py-10': padding === 'lg',
      },
      // Additional padding adjustment for very small screens
      isSmallMobile && 'max-w-full overflow-x-hidden',
      className
    )}>
      {children}
    </div>
  );
}

export default PageContainer; 