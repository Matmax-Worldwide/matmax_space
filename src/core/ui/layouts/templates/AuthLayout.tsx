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
        {/* Left side - Brand showcase with animated space background (hidden on mobile) */}
        <div className="hidden md:flex md:w-1/2 flex-col items-center justify-center relative overflow-hidden">
          {/* Space background base */}
          <div className="absolute inset-0 bg-black">
            {/* Stars layer - small dots with parallax effect */}
            <div className="stars-small absolute inset-0"></div>
            
            {/* Stars layer - medium dots with different parallax speed */}
            <div className="stars-medium absolute inset-0"></div>
            
            {/* Stars layer - large dots with different parallax speed */}
            <div className="stars-large absolute inset-0"></div>
            
            {/* Shooting stars */}
            <div className="shooting-stars absolute inset-0"></div>
            
            {/* Distant galaxies */}
            <div className="galaxies absolute inset-0"></div>
            
            {/* Nebula overlay */}
            <div className="nebula-1 absolute inset-0 opacity-30"></div>
            <div className="nebula-2 absolute inset-0 opacity-20"></div>
            
            {/* Distant star clusters */}
            <div className="star-clusters absolute inset-0"></div>
            
            {/* Subtle cosmic dust */}
            <div className="cosmic-dust absolute inset-0"></div>
            
            {/* Gradient overlay to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-purple-900/40 to-blue-900/50"></div>
          </div>
          
          {/* Content overlay */}
          <div className="relative z-10 flex flex-col items-center justify-center p-10 text-center">
            <Logo 
              className="w-64 h-64 mb-6" 
              darkModeInvert={true} 
              size="auth" 
              lightBackground={false} 
            />
            <h1 className="text-3xl font-bold mb-2 text-white">MatMax Wellness Studio</h1>
            <p className="text-lg max-w-md text-white opacity-90">
              Your journey to wellness and balance begins here
            </p>
          </div>
          
          {/* Add a CSS module for the animations directly in the component */}
          <style jsx global>{`
            /* Star animations */
            @keyframes twinkle {
              0%, 100% { opacity: 0.5; }
              50% { opacity: 1; }
            }
            
            @keyframes twinkleSlow {
              0%, 100% { opacity: 0.3; }
              50% { opacity: 0.8; }
            }
            
            @keyframes twinkleFast {
              0%, 100% { opacity: 0.2; }
              50% { opacity: 0.9; }
            }
            
            @keyframes float {
              0% { transform: translateY(0px) translateX(0px); }
              25% { transform: translateY(-15px) translateX(15px); }
              50% { transform: translateY(0px) translateX(25px); }
              75% { transform: translateY(10px) translateX(5px); }
              100% { transform: translateY(0px) translateX(0px); }
            }
            
            @keyframes floatSlow {
              0% { transform: translateY(0px) translateX(0px); }
              33% { transform: translateY(-20px) translateX(10px); }
              66% { transform: translateY(10px) translateX(-15px); }
              100% { transform: translateY(0px) translateX(0px); }
            }
            
            @keyframes slowSpin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            
            @keyframes pulse {
              0%, 100% { opacity: 0.2; transform: scale(1); }
              50% { opacity: 0.5; transform: scale(1.05); }
            }
            
            @keyframes pulseFast {
              0%, 100% { opacity: 0.3; transform: scale(1); }
              50% { opacity: 0.6; transform: scale(1.08); }
            }
            
            @keyframes shooting {
              0% {
                transform: translateX(-100%) translateY(100%) rotate(45deg);
                opacity: 1;
              }
              20% {
                opacity: 1;
              }
              30% {
                opacity: 0.3;
              }
              70% {
                opacity: 0.3;
              }
              100% {
                transform: translateX(200%) translateY(-200%) rotate(45deg);
                opacity: 0;
              }
            }
            
            @keyframes parallax {
              0% { transform: translateZ(0) translateX(0) translateY(0); }
              100% { transform: translateZ(0) translateX(-30%) translateY(5%); }
            }
            
            @keyframes parallaxSlow {
              0% { transform: translateZ(0) translateX(0) translateY(0); }
              100% { transform: translateZ(0) translateX(-15%) translateY(2%); }
            }
            
            @keyframes dust {
              0% { transform: translateZ(0) scale(1) rotate(0); opacity: 0.2; }
              50% { opacity: 0.4; }
              100% { transform: translateZ(0) scale(1.2) rotate(5deg); opacity: 0.2; }
            }
            
            /* Small stars with parallax */
            .stars-small {
              background-image: radial-gradient(1px 1px at 20px 30px, white, rgba(0,0,0,0)),
                               radial-gradient(1px 1px at 40px 70px, white, rgba(0,0,0,0)),
                               radial-gradient(1px 1px at 50px 160px, white, rgba(0,0,0,0)),
                               radial-gradient(1px 1px at 90px 40px, white, rgba(0,0,0,0)),
                               radial-gradient(1px 1px at 130px 80px, white, rgba(0,0,0,0)),
                               radial-gradient(1px 1px at 160px 120px, white, rgba(0,0,0,0)),
                               radial-gradient(1px 1px at 170px 200px, white, rgba(0,0,0,0)),
                               radial-gradient(1px 1px at 200px 180px, white, rgba(0,0,0,0)),
                               radial-gradient(1px 1px at 220px 60px, white, rgba(0,0,0,0));
              background-repeat: repeat;
              background-size: 250px 250px;
              animation: twinkle 4s infinite alternate, parallax 50s linear infinite;
              will-change: transform;
            }
            
            /* Medium stars with different parallax speed */
            .stars-medium {
              background-image: radial-gradient(1.5px 1.5px at 50px 80px, white, rgba(0,0,0,0)),
                               radial-gradient(1.5px 1.5px at 100px 40px, white, rgba(0,0,0,0)),
                               radial-gradient(1.5px 1.5px at 150px 160px, white, rgba(0,0,0,0)),
                               radial-gradient(1.5px 1.5px at 200px 10px, white, rgba(0,0,0,0)),
                               radial-gradient(1.5px 1.5px at 250px 120px, white, rgba(0,0,0,0)),
                               radial-gradient(1.5px 1.5px at 300px 60px, white, rgba(0,0,0,0)),
                               radial-gradient(1.5px 1.5px at 350px 30px, white, rgba(0,0,0,0)),
                               radial-gradient(1.5px 1.5px at 280px 200px, white, rgba(0,0,0,0));
              background-repeat: repeat;
              background-size: 400px 400px;
              animation: twinkleSlow 6s infinite alternate-reverse, parallaxSlow 80s linear infinite;
              will-change: transform;
            }
            
            /* Large stars */
            .stars-large {
              background-image: radial-gradient(2px 2px at 100px 150px, white, rgba(0,0,0,0)),
                               radial-gradient(2px 2px at 200px 220px, white, rgba(0,0,0,0)),
                               radial-gradient(2px 2px at 300px 100px, white, rgba(0,0,0,0)),
                               radial-gradient(2px 2px at 400px 200px, white, rgba(0,0,0,0)),
                               radial-gradient(2.5px 2.5px at 500px 150px, white, rgba(0,0,0,0)),
                               radial-gradient(2.5px 2.5px at 50px 250px, white, rgba(0,0,0,0)),
                               radial-gradient(2.5px 2.5px at 350px 280px, white, rgba(0,0,0,0));
              background-repeat: repeat;
              background-size: 550px 550px;
              animation: twinkleFast 8s infinite alternate;
            }
            
            /* Shooting stars */
            .shooting-stars {
              position: relative;
              width: 100%;
              height: 100%;
            }
            
            .shooting-stars::before,
            .shooting-stars::after {
              content: "";
              position: absolute;
              width: 100px;
              height: 1px;
              background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 100%);
              border-radius: 50%;
              box-shadow: 0 0 5px 1px white;
              opacity: 0;
              top: 20%;
              left: 10%;
              animation: shooting 8s infinite ease-in;
            }
            
            .shooting-stars::after {
              top: 50%;
              left: 50%;
              width: 80px;
              animation: shooting 6s 3s infinite ease-in;
            }
            
            /* Galaxies */
            .galaxies {
              background-image: radial-gradient(30px 30px at 150px 150px, rgba(111, 74, 217, 0.4), rgba(0,0,0,0)),
                               radial-gradient(40px 40px at 280px 320px, rgba(74, 127, 217, 0.4), rgba(0,0,0,0)),
                               radial-gradient(50px 50px at 450px 150px, rgba(148, 74, 217, 0.4), rgba(0,0,0,0)),
                               radial-gradient(35px 35px at 550px 220px, rgba(74, 160, 217, 0.4), rgba(0,0,0,0)),
                               radial-gradient(45px 45px at 120px 400px, rgba(217, 74, 177, 0.4), rgba(0,0,0,0)),
                               radial-gradient(60px 60px at 380px 420px, rgba(111, 74, 217, 0.3), rgba(0,0,0,0));
              background-repeat: repeat;
              background-size: 600px 600px;
              animation: float 50s infinite ease-in-out, pulse 20s infinite alternate;
              will-change: transform, opacity;
            }
            
            /* Star clusters */
            .star-clusters {
              background-image: radial-gradient(60px 60px at 250px 250px, rgba(255, 255, 255, 0.2), rgba(0,0,0,0)),
                               radial-gradient(80px 80px at 480px 320px, rgba(255, 255, 255, 0.15), rgba(0,0,0,0)),
                               radial-gradient(70px 70px at 150px 400px, rgba(255, 255, 255, 0.1), rgba(0,0,0,0));
              background-repeat: repeat;
              background-size: 800px 800px;
              animation: pulseFast 15s infinite alternate, floatSlow 30s infinite ease-in-out;
              will-change: transform, opacity;
            }
            
            /* Cosmic dust */
            .cosmic-dust {
              background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
              opacity: 0.05;
              animation: dust 20s infinite alternate;
              will-change: transform, opacity;
            }
            
            /* Nebula 1 */
            .nebula-1 {
              background: 
                radial-gradient(circle at 50% 50%, rgba(111, 0, 255, 0.3), rgba(0, 0, 0, 0) 70%),
                radial-gradient(circle at 20% 80%, rgba(0, 81, 255, 0.3), rgba(0, 0, 0, 0) 70%);
              animation: pulse 15s infinite alternate, float 60s infinite ease-in-out;
              will-change: transform, opacity;
            }
            
            /* Nebula 2 */
            .nebula-2 {
              background: 
                radial-gradient(circle at 80% 10%, rgba(255, 0, 242, 0.3), rgba(0, 0, 0, 0) 70%),
                radial-gradient(circle at 10% 40%, rgba(0, 183, 255, 0.3), rgba(0, 0, 0, 0) 70%);
              animation: pulse 20s 5s infinite alternate-reverse, floatSlow 50s infinite ease-in-out;
              will-change: transform, opacity;
            }
          `}</style>
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