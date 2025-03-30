import Image from 'next/image';
import { cn } from '@/src/core/utils/styling';
import { useLayout } from '../../providers/LayoutProvider';

type LogoProps = {
  className?: string;
  alt?: string;
  darkModeInvert?: boolean;
  size?: 'default' | 'large' | 'auth';
};

/**
 * Logo component for MatMax Wellness Studio
 * Accepts className for custom styling and handles dark mode inversion
 * Size prop allows for different predefined sizes:
 * - default: Original size for protected pages (120x40)
 * - large: Slightly larger size (160x60)  
 * - auth: Very large size for auth pages (240x90)
 */
export function Logo({ 
  className, 
  alt = "MatMax Wellness Studio", 
  darkModeInvert = true,  // Default to true for consistent dark mode behavior
  size = 'default'        // Default to original size
}: LogoProps) {
  const { theme } = useLayout();
  
  // Set dimensions based on size prop
  const dimensions = {
    default: { width: 120, height: 40 },
    large: { width: 160, height: 60 },
    auth: { width: 240, height: 90 }
  }[size];
  
  return (
    <div className={cn("relative", className)}>
      <Image 
        src="/logo_mtmx_black-01.svg" 
        alt={alt}
        width={dimensions.width}
        height={dimensions.height} 
        className={cn(
          "object-contain",
          darkModeInvert ? "dark:invert" : "" // Only invert in dark mode
        )}
        priority
      />
    </div>
  );
}

export default Logo; 