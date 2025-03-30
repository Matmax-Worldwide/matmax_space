import { ReactNode } from 'react';
import { LayoutProvider } from '../providers/LayoutProvider';
import Logo from '../components/Header/Logo';
import { cn } from '@/src/core/utils/styling';
import { useLayout } from '../providers/LayoutProvider';

type AuthLayoutProps = {
  children: ReactNode;
  title?: string | ReactNode;
  description?: string | ReactNode;
  footer?: ReactNode;
  showLogo?: boolean;
  contentClassName?: string;
  imageUrl?: string;
  imageAlt?: string;
};

/**
 * Auth layout template
 * Used for all authentication related pages (sign-in, sign-up, forgot password, etc.)
 * Provides a split screen layout with branding on the left and auth form on the right
 * Responsive to adapt to different screen sizes
 */
export function AuthLayout({
  children,
  title,
  description,
  footer,
  showLogo = true,
  contentClassName,
  imageUrl,
  imageAlt = "MatMax Wellness Studio"
}: AuthLayoutProps) {
  // We need to wrap useLayout in a component inside LayoutProvider
  const AuthLayoutContent = () => {
    const { isMobile, isSmallMobile, theme } = useLayout();
    
    return (
      <div className="flex min-h-screen bg-background">
        {/* Left side - Brand showcase (hidden on mobile) */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-b from-primary/20 to-primary/5 flex-col items-center justify-center relative">
          {imageUrl ? (
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }}>
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-white p-10">
                <Logo className="w-64 h-64 mb-6" darkModeInvert={true} size="auth" />
                <h1 className="text-3xl font-bold mb-2">MatMax Wellness Studio</h1>
                <p className="text-lg max-w-md text-center opacity-90">
                  Your journey to wellness and balance begins here
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-10 text-center">
              <Logo className="w-64 h-64 mb-6" darkModeInvert={true} size="auth" />
              <h1 className="text-3xl font-bold mb-2">MatMax Wellness Studio</h1>
              <p className="text-lg max-w-md opacity-80">
                Your journey to wellness and balance begins here
              </p>
            </div>
          )}
        </div>
        
        {/* Right side - Authentication form */}
        <div className={cn(
          "flex flex-col justify-center items-center",
          isMobile ? "w-full py-6" : "w-1/2",
          isSmallMobile ? "px-4" : "px-8"
        )}>
          {/* Mobile logo - only shown on mobile */}
          {showLogo && (
            <div className="md:hidden mb-10 flex flex-col items-center">
              <Logo 
                className={isSmallMobile ? "w-48 h-48" : "w-64 h-64"} 
                darkModeInvert={true}
                size="auth"
              />
              <h1 className={cn(
                "font-bold mt-4 text-center",
                isSmallMobile ? "text-xl" : "text-2xl"
              )}>
                MatMax Wellness Studio
              </h1>
            </div>
          )}
          
          <div className={cn(
            "w-full",
            isSmallMobile ? "max-w-[330px]" : "max-w-md",
            contentClassName
          )}>
            {/* Title and description */}
            {(title || description) && (
              <div className={cn(
                "mb-6 text-center",
                isSmallMobile && "mb-4"
              )}>
                {title && <h2 className={cn(
                  "font-bold",
                  isSmallMobile ? "text-xl" : "text-2xl"
                )}>{title}</h2>}
                {description && <p className={cn(
                  "text-muted-foreground mt-1",
                  isSmallMobile && "text-sm"
                )}>{description}</p>}
              </div>
            )}
            
            {/* Main content - authentication form */}
            <div className={cn(
              "bg-card border border-border rounded-lg shadow-sm",
              isSmallMobile ? "p-4" : "p-6" 
            )}>
              {children}
            </div>
            
            {/* Footer */}
            {footer && (
              <div className={cn(
                "mt-4 text-center text-muted-foreground", 
                isSmallMobile ? "text-xs" : "text-sm"
              )}>
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <LayoutProvider>
      <AuthLayoutContent />
    </LayoutProvider>
  );
}

export default AuthLayout; 