import Link from 'next/link';
import Image from 'next/image';
import { useLayout } from '../../providers/LayoutProvider';
import { cn } from '@/src/core/utils/styling';

/**
 * Application logo component
 * Displays a large logo aligned to the left
 */
export function Logo() {
  const { theme } = useLayout();
  
  return (
    <Link href="/" className="flex items-center">
      {/* Large MatMax logo aligned left */}
      <Image 
        src="/logo_mtmx_black-01.svg"
        alt="MatMax Wellness Studio"
        width={120}
        height={120}
        className={cn(
          "transition-opacity p-1",
          theme === 'dark' ? 'opacity-90 invert' : 'opacity-100'
        )}
      />
    </Link>
  );
}

export default Logo; 