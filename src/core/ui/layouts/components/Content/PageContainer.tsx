import { ReactNode } from 'react';
import { cn } from '@/src/core/utils/styling';

type PageContainerProps = {
  className?: string;
  children: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
};

/**
 * Page container component
 * Provides consistent padding and max-width for page content
 */
export function PageContainer({ 
  className, 
  children, 
  maxWidth = '2xl',
  padding = 'md'
}: PageContainerProps) {
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
        
        // Padding classes
        'px-0 py-0': padding === 'none',
        'px-3 py-3 sm:px-4 sm:py-4': padding === 'sm',
        'px-4 py-6 sm:px-6': padding === 'md',
        'px-4 py-8 sm:px-6 sm:py-10': padding === 'lg',
      },
      className
    )}>
      {children}
    </div>
  );
}

export default PageContainer; 