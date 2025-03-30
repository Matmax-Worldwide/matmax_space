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
  
  return (
    <div className={cn("relative", className)}>
      <Image 
        src="/logo_mtmx_black-01.svg" 
        alt={alt}
        width={240}
        height={90} 
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