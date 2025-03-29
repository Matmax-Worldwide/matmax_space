import Image from 'next/image';
import { cn } from '@/src/core/utils/styling';
import { useLayout } from '../../providers/LayoutProvider';

type LogoProps = {
  className?: string;
  alt?: string;
  darkModeInvert?: boolean;
};

/**
 * Logo component for MatMax Wellness Studio
 * Accepts className for custom styling and handles dark mode inversion
 */
export function Logo({ 
  className, 
  alt = "MatMax Wellness Studio", 
  darkModeInvert = true  // Default to true for consistent dark mode behavior
}: LogoProps) {
  const { theme } = useLayout();
  const isDarkMode = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  return (
    <div className={cn("relative", className)}>
      <Image 
        src="/logo_mtmx_black-01.svg" 
        alt={alt}
        width={120}
        height={40} 
        className={cn(
          "object-contain",
          (darkModeInvert && isDarkMode) ? "invert" : "", // Apply inversion directly based on theme
          darkModeInvert && "dark:invert" // Also keep the CSS class for system preference changes
        )}
      />
    </div>
  );
}

export default Logo; 