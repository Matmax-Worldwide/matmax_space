import { cn } from '@/src/core/utils/styling';
import Link from 'next/link';
import { ReactNode } from 'react';

type FooterProps = {
  className?: string;
  children?: ReactNode;
  showCopyright?: boolean;
  companyName?: string;
  showLinks?: boolean;
};

/**
 * Footer component for the application layout
 */
export function Footer({
  className,
  children,
  showCopyright = true,
  companyName = 'MatMax Wellness Studio',
  showLinks = true,
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn(
      "border-t border-border py-6 bg-background",
      className
    )}>
      <div className="container mx-auto px-4">
        {children ? (
          children
        ) : (
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright notice */}
            {showCopyright && (
              <div className="text-sm text-muted-foreground mb-4 md:mb-0">
                &copy; {currentYear} {companyName}. All rights reserved.
              </div>
            )}

            {/* Footer links */}
            {showLinks && (
              <div className="flex flex-wrap gap-6 text-sm">
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </footer>
  );
}

export default Footer; 