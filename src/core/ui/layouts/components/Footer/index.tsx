"use client";

import { memo } from 'react';
import { cn } from '@/src/core/utils/styling';
import Link from 'next/link';

type FooterProps = {
  className?: string;
};

function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("border-t border-border py-6 bg-background", className)}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2025 MatMax Wellness Studio. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-6 text-sm">
            <Link 
              href="/terms" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
            <Link 
              href="/privacy" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/contact" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer); 