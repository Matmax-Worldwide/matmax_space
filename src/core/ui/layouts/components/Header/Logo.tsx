import Image from 'next/image';
import { cn } from '@/src/core/utils/styling';
import { useLayout } from '../../providers/LayoutProvider';

type LogoProps = {
  className?: string;
  alt?: string;
  darkModeInvert?: boolean;
  size?: 'default' | 'large' | 'auth' | 'small';
  lightBackground?: boolean; // Whether displaying on light background
};

/**
 * Logo component for MatMax Wellness Studio
 * Accepts className for custom styling and handles dark mode inversion
 * Size prop allows for different predefined sizes:
 * - small: Compact size for mobile (90x30)
 * - default: Original size for protected pages (120x40)
 * - large: Slightly larger size (160x60)  
 * - auth: Very large size for auth pages (240x90)
 */
export function Logo({ 
  className, 
  alt = "MatMax Wellness Studio", 
  darkModeInvert = true,  // Default to true for consistent dark mode behavior
  size = 'default',       // Default to original size
  lightBackground = true  // Default to light background (will invert in dark mode)
}: LogoProps) {
  const { theme } = useLayout();
  
  // Set dimensions based on size prop
  const dimensions = {
    small: { width: 90, height: 30 },
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
          // Only invert in dark mode if on light background
          lightBackground && darkModeInvert ? "dark:invert" : "", 
          // Always invert if on dark background regardless of theme
          !lightBackground ? "invert" : ""
        )}
        priority
      />
    </div>
  );
}

export default Logo; 