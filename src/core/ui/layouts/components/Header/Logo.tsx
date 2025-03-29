import Image from 'next/image';
import { cn } from '@/src/core/utils/styling';

type LogoProps = {
  className?: string;
  alt?: string;
  darkModeInvert?: boolean;
};

/**
 * Logo component for MatMax Wellness Studio
 * Accepts className for custom styling
 */
export function Logo({ className, alt = "MatMax Wellness Studio", darkModeInvert = false }: LogoProps) {
  return (
    <div className={cn("relative", className)}>
      <Image 
        src="/logo_mtmx_black-01.svg" 
        alt={alt}
        width={120}
        height={40} 
        className={cn(
          "object-contain",
          darkModeInvert && "dark:invert"
        )}
      />
    </div>
  );
}

export default Logo; 