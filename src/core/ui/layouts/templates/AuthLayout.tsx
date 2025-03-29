import { ReactNode } from 'react';
import { LayoutProvider } from '../providers/LayoutProvider';
import { cn } from '../../../utils/styling';
import Image from 'next/image';

type AuthLayoutProps = {
  children: ReactNode;
  title?: string;
  description?: string;
  footer?: ReactNode;
  showLogo?: boolean;
  contentClassName?: string;
};

/**
 * Authentication layout template
 * Used for sign-in, sign-up, and other authentication pages
 */
export function AuthLayout({
  children,
  title,
  description,
  footer,
  showLogo = true,
  contentClassName,
}: AuthLayoutProps) {
  return (
    <LayoutProvider>
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Left side - Branding area */}
        <div className="hidden md:flex md:w-1/2 bg-primary/10 flex-col justify-center items-center p-8">
          <div className="max-w-md text-center">
            {showLogo && (
              <div className="mb-8 flex justify-center">
                <Image 
                  src="/logo_mtmx_black-01.svg" 
                  alt="MatMax Wellness Studio" 
                  width={200} 
                  height={80}
                  style={{ objectFit: 'contain' }}
                />
              </div>
            )}
            <h1 className="text-3xl font-bold mb-4">MatMax Wellness Studio</h1>
            <p className="text-lg text-muted-foreground">
              Your journey to wellness and balance begins here. Access your personal dashboard to track progress and connect with your wellness community.
            </p>
          </div>
        </div>
        
        {/* Right side - Authentication form */}
        <div className="flex-1 flex flex-col justify-center items-center p-8">
          {/* Mobile logo - only shown on mobile */}
          <div className="md:hidden mb-8 flex justify-center">
            <Image 
              src="/logo_mtmx_black-01.svg" 
              alt="MatMax Wellness Studio" 
              width={150} 
              height={60}
              style={{ objectFit: 'contain' }}
            />
            <h1 className="text-xl font-bold mt-4">MatMax Wellness Studio</h1>
          </div>
          
          <div className={cn(
            "w-full max-w-md",
            contentClassName
          )}>
            {/* Title and description */}
            {(title || description) && (
              <div className="mb-6 text-center">
                {title && <h2 className="text-2xl font-bold">{title}</h2>}
                {description && <p className="text-muted-foreground mt-1">{description}</p>}
              </div>
            )}
            
            {/* Main content - authentication form */}
            <div className="bg-card border border-border p-6 rounded-lg shadow-sm">
              {children}
            </div>
            
            {/* Footer */}
            {footer && <div className="mt-4 text-center text-sm text-muted-foreground">{footer}</div>}
          </div>
        </div>
      </div>
    </LayoutProvider>
  );
}

export default AuthLayout; 