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
            
            {/* Comets */}
            <div className="comets absolute inset-0"></div>
            
            {/* Supernovas */}
            <div className="supernova-container absolute inset-0">
              <div className="supernova supernova-1"></div>
              <div className="supernova supernova-2"></div>
              <div className="supernova supernova-3"></div>
            </div>
            
            {/* Star crossings */}
            <div className="star-crossings absolute inset-0"></div>
            
            {/* Spiral galaxy */}
            <div className="spiral-galaxy absolute inset-0"></div>
            
            {/* Distant galaxies */}
            <div className="galaxies absolute inset-0"></div>
            
            {/* Nebula overlay */}
            <div className="nebula-1 absolute inset-0 opacity-30"></div>
            <div className="nebula-2 absolute inset-0 opacity-20"></div>
            
            {/* Aurora effect */}
            <div className="aurora absolute inset-0"></div>
            
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
              0%, 100% { opacity: 0.4; filter: blur(0px); }
              50% { opacity: 1; filter: blur(0.5px); }
            }
            
            @keyframes twinkleSlow {
              0%, 100% { opacity: 0.3; filter: blur(0px); }
              50% { opacity: 0.8; filter: blur(0.8px); }
            }
            
            @keyframes twinkleFast {
              0%, 100% { opacity: 0.2; filter: blur(0px); }
              50% { opacity: 0.9; filter: blur(0.3px); }
            }
            
            @keyframes float {
              0% { transform: translateY(0px) translateX(0px) scale(1); }
              20% { transform: translateY(-25px) translateX(15px) scale(1.03); }
              40% { transform: translateY(-10px) translateX(35px) scale(0.98); }
              60% { transform: translateY(15px) translateX(25px) scale(1.02); }
              80% { transform: translateY(20px) translateX(-5px) scale(0.97); }
              100% { transform: translateY(0px) translateX(0px) scale(1); }
            }
            
            @keyframes floatSlow {
              0% { transform: translateY(0px) translateX(0px) rotate(0deg); }
              25% { transform: translateY(-30px) translateX(20px) rotate(2deg); }
              50% { transform: translateY(10px) translateX(-25px) rotate(-1deg); }
              75% { transform: translateY(20px) translateX(15px) rotate(1deg); }
              100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
            }
            
            @keyframes slowSpin {
              from { transform: rotate(0deg) scale(1); }
              to { transform: rotate(360deg) scale(1.1); }
            }
            
            @keyframes pulse {
              0%, 100% { opacity: 0.2; transform: scale(1); filter: blur(10px); }
              50% { opacity: 0.5; transform: scale(1.08); filter: blur(15px); }
            }
            
            @keyframes pulseFast {
              0%, 100% { opacity: 0.3; transform: scale(1) rotate(0deg); filter: blur(5px); }
              50% { opacity: 0.6; transform: scale(1.1) rotate(2deg); filter: blur(8px); }
            }
            
            @keyframes shooting {
              0% {
                transform: translateX(-100%) translateY(100%) rotate(45deg);
                opacity: 0;
                filter: blur(0px);
              }
              10% {
                opacity: 1;
                filter: blur(0.5px);
              }
              20% {
                opacity: 1;
                filter: blur(1px);
              }
              30% {
                opacity: 0.3;
                filter: blur(0.5px);
              }
              100% {
                transform: translateX(300%) translateY(-300%) rotate(45deg);
                opacity: 0;
                filter: blur(0px);
              }
            }
            
            @keyframes parallax {
              0% { transform: translateZ(0) translateX(0) translateY(0); }
              100% { transform: translateZ(0) translateX(-40%) translateY(10%); }
            }
            
            @keyframes parallaxSlow {
              0% { transform: translateZ(0) translateX(0) translateY(0); }
              100% { transform: translateZ(0) translateX(-20%) translateY(5%); }
            }
            
            @keyframes dust {
              0% { transform: translateZ(0) scale(1) rotate(0); opacity: 0.05; filter: blur(10px); }
              50% { opacity: 0.12; filter: blur(15px); }
              100% { transform: translateZ(0) scale(1.4) rotate(5deg); opacity: 0.05; filter: blur(10px); }
            }
            
            @keyframes nebulaPulse {
              0%, 100% { opacity: 0.2; filter: blur(30px); transform: scale(1); }
              50% { opacity: 0.4; filter: blur(40px); transform: scale(1.1); }
            }

            @keyframes waveMotion {
              0% { transform: translateY(0) scaleX(1); }
              25% { transform: translateY(10px) scaleX(1.05); }
              50% { transform: translateY(25px) scaleX(0.95); }
              75% { transform: translateY(5px) scaleX(1.02); }
              100% { transform: translateY(0) scaleX(1); }
            }
            
            /* New animations for enhanced space scene */
            @keyframes supernovaExplosion {
              0% {
                transform: scale(0.5);
                opacity: 0;
                filter: blur(2px);
              }
              5% {
                opacity: 0.1;
                filter: blur(5px);
              }
              20% {
                transform: scale(1);
                opacity: 1;
                filter: blur(15px);
              }
              100% {
                transform: scale(1.8);
                opacity: 0;
                filter: blur(30px);
              }
            }
            
            @keyframes comet {
              0% {
                transform: translateX(-5%) translateY(-5%) rotate(-35deg) scale(0.3);
                opacity: 0;
              }
              10% {
                opacity: 1;
              }
              90% {
                opacity: 1;
              }
              100% {
                transform: translateX(105%) translateY(105%) rotate(-35deg) scale(1.2);
                opacity: 0;
              }
            }
            
            @keyframes starCrossing {
              0% {
                transform: translateX(-10%) translateY(20%) scale(0.8);
                opacity: 0;
              }
              5% {
                opacity: 0.7;
              }
              95% {
                opacity: 0.7;
              }
              100% {
                transform: translateX(110%) translateY(80%) scale(0.8);
                opacity: 0;
              }
            }
            
            @keyframes auroraWave {
              0% {
                transform: translateY(0) scaleY(1) skewX(0deg);
                opacity: 0.1;
                filter: blur(30px) hue-rotate(0deg);
              }
              33% {
                transform: translateY(20px) scaleY(1.2) skewX(5deg);
                opacity: 0.2;
                filter: blur(35px) hue-rotate(120deg);
              }
              66% {
                transform: translateY(-20px) scaleY(0.8) skewX(-5deg);
                opacity: 0.15;
                filter: blur(40px) hue-rotate(240deg);
              }
              100% {
                transform: translateY(0) scaleY(1) skewX(0deg);
                opacity: 0.1;
                filter: blur(30px) hue-rotate(360deg);
              }
            }
            
            @keyframes spiralSpin {
              0% {
                transform: rotate(0deg) scale(1);
                opacity: 0.4;
                filter: blur(10px);
              }
              50% {
                transform: rotate(180deg) scale(1.1);
                opacity: 0.7;
                filter: blur(15px);
              }
              100% {
                transform: rotate(360deg) scale(1);
                opacity: 0.4;
                filter: blur(10px);
              }
            }
            
            /* Small stars with parallax */
            .stars-small {
              background-image: radial-gradient(0.8px 0.8px at 20px 30px, rgba(255, 255, 255, 0.8), rgba(0,0,0,0)),
                               radial-gradient(0.8px 0.8px at 40px 70px, rgba(255, 255, 255, 0.8), rgba(0,0,0,0)),
                               radial-gradient(0.8px 0.8px at 50px 160px, rgba(255, 255, 255, 0.8), rgba(0,0,0,0)),
                               radial-gradient(0.8px 0.8px at 90px 40px, rgba(255, 255, 255, 0.8), rgba(0,0,0,0)),
                               radial-gradient(0.8px 0.8px at 130px 80px, rgba(255, 255, 255, 0.8), rgba(0,0,0,0)),
                               radial-gradient(0.8px 0.8px at 160px 120px, rgba(255, 255, 255, 0.8), rgba(0,0,0,0)),
                               radial-gradient(0.8px 0.8px at 170px 200px, rgba(255, 255, 255, 0.8), rgba(0,0,0,0)),
                               radial-gradient(0.8px 0.8px at 200px 180px, rgba(255, 255, 255, 0.8), rgba(0,0,0,0)),
                               radial-gradient(0.8px 0.8px at 220px 60px, rgba(255, 255, 255, 0.8), rgba(0,0,0,0));
              background-repeat: repeat;
              background-size: 250px 250px;
              animation: twinkle 4s infinite alternate, parallax 30s linear infinite;
              will-change: transform, opacity, filter;
              filter: blur(0px);
            }
            
            /* Medium stars with different parallax speed */
            .stars-medium {
              background-image: radial-gradient(1.2px 1.2px at 50px 80px, rgba(255, 255, 255, 0.9), rgba(0,0,0,0)),
                               radial-gradient(1.2px 1.2px at 100px 40px, rgba(255, 255, 255, 0.9), rgba(0,0,0,0)),
                               radial-gradient(1.2px 1.2px at 150px 160px, rgba(255, 255, 255, 0.9), rgba(0,0,0,0)),
                               radial-gradient(1.2px 1.2px at 200px 10px, rgba(255, 255, 255, 0.9), rgba(0,0,0,0)),
                               radial-gradient(1.2px 1.2px at 250px 120px, rgba(255, 255, 255, 0.9), rgba(0,0,0,0)),
                               radial-gradient(1.2px 1.2px at 300px 60px, rgba(255, 255, 255, 0.9), rgba(0,0,0,0)),
                               radial-gradient(1.2px 1.2px at 350px 30px, rgba(255, 255, 255, 0.9), rgba(0,0,0,0)),
                               radial-gradient(1.2px 1.2px at 280px 200px, rgba(255, 255, 255, 0.9), rgba(0,0,0,0));
              background-repeat: repeat;
              background-size: 400px 400px;
              animation: twinkleSlow 6s infinite alternate-reverse, parallaxSlow 60s linear infinite;
              will-change: transform, opacity, filter;
              filter: blur(0px);
            }
            
            /* Large stars */
            .stars-large {
              background-image: radial-gradient(1.5px 1.5px at 100px 150px, rgba(255, 255, 255, 1), rgba(0,0,0,0)),
                               radial-gradient(1.5px 1.5px at 200px 220px, rgba(255, 255, 255, 1), rgba(0,0,0,0)),
                               radial-gradient(1.5px 1.5px at 300px 100px, rgba(255, 255, 255, 1), rgba(0,0,0,0)),
                               radial-gradient(1.5px 1.5px at 400px 200px, rgba(255, 255, 255, 1), rgba(0,0,0,0)),
                               radial-gradient(1.8px 1.8px at 500px 150px, rgba(255, 255, 255, 1), rgba(0,0,0,0)),
                               radial-gradient(1.8px 1.8px at 50px 250px, rgba(255, 255, 255, 1), rgba(0,0,0,0)),
                               radial-gradient(1.8px 1.8px at 350px 280px, rgba(255, 255, 255, 1), rgba(0,0,0,0));
              background-repeat: repeat;
              background-size: 550px 550px;
              animation: twinkleFast 5s infinite alternate;
              will-change: transform, opacity, filter;
              filter: blur(0px);
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
              width: 120px;
              height: 1px;
              background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 100%);
              border-radius: 50%;
              box-shadow: 0 0 8px 2px rgba(255, 255, 255, 0.7);
              opacity: 0;
              top: 20%;
              left: 10%;
              animation: shooting 5s infinite ease-in;
            }
            
            .shooting-stars::after {
              top: 50%;
              left: 50%;
              width: 80px;
              animation: shooting 7s 2s infinite ease-in;
            }

            /* Additional shooting stars */
            .shooting-stars::before {
              content: "";
              position: absolute;
              width: 150px;
              height: 1.5px;
              background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 100%);
              border-radius: 50%;
              box-shadow: 0 0 12px 3px rgba(255, 255, 255, 0.8);
              opacity: 0;
              top: 30%;
              left: 60%;
              animation: shooting 8s 3s infinite ease-in;
            }
            
            /* Comets with glowing tails */
            .comets {
              position: relative;
              width: 100%;
              height: 100%;
            }
            
            .comets::before,
            .comets::after {
              content: "";
              position: absolute;
              width: 200px;
              height: 2px;
              background: linear-gradient(to right, rgba(85, 168, 255, 0) 0%, rgba(85, 168, 255, 1) 30%, rgba(255, 255, 255, 1) 100%);
              border-radius: 50%;
              box-shadow: 0 0 15px 5px rgba(85, 168, 255, 0.7);
              opacity: 0;
              top: 15%;
              left: 25%;
              transform-origin: right center;
              animation: comet 12s 5s infinite ease-out;
            }
            
            .comets::after {
              top: 65%;
              left: 70%;
              width: 150px;
              height: 1.5px;
              background: linear-gradient(to right, rgba(218, 85, 255, 0) 0%, rgba(218, 85, 255, 1) 30%, rgba(255, 255, 255, 1) 100%);
              box-shadow: 0 0 15px 5px rgba(218, 85, 255, 0.7);
              animation: comet 15s 2s infinite ease-out;
            }
            
            /* Star crossings - horizontal star movement */
            .star-crossings {
              position: relative;
              width: 100%;
              height: 100%;
            }
            
            .star-crossings::before,
            .star-crossings::after {
              content: "";
              position: absolute;
              width: 2px;
              height: 2px;
              background: rgba(255, 255, 255, 1);
              border-radius: 50%;
              box-shadow: 0 0 5px 2px rgba(255, 255, 255, 0.8);
              opacity: 0;
              top: 35%;
              left: 0;
              animation: starCrossing 8s 1s infinite linear;
            }
            
            .star-crossings::after {
              top: 75%;
              width: 3px;
              height: 3px;
              box-shadow: 0 0 6px 3px rgba(255, 255, 255, 0.8);
              animation: starCrossing 15s 4s infinite linear;
            }
            
            /* Supernovas */
            .supernova-container {
              position: relative;
              width: 100%;
              height: 100%;
            }
            
            .supernova {
              position: absolute;
              border-radius: 50%;
              opacity: 0;
              will-change: transform, opacity, filter;
            }
            
            .supernova-1 {
              width: 100px;
              height: 100px;
              top: 25%;
              left: 30%;
              background: radial-gradient(circle, rgba(255, 236, 145, 1) 0%, rgba(255, 144, 89, 0.8) 40%, rgba(255, 59, 148, 0.4) 70%, rgba(41, 13, 153, 0) 100%);
              box-shadow: 0 0 40px 20px rgba(255, 236, 145, 0.5);
              filter: blur(15px);
              animation: supernovaExplosion 15s 2s infinite ease-out;
            }
            
            .supernova-2 {
              width: 80px;
              height: 80px;
              top: 60%;
              left: 65%;
              background: radial-gradient(circle, rgba(176, 255, 252, 1) 0%, rgba(86, 139, 255, 0.8) 40%, rgba(111, 59, 255, 0.4) 70%, rgba(28, 13, 153, 0) 100%);
              box-shadow: 0 0 30px 15px rgba(176, 255, 252, 0.5);
              filter: blur(12px);
              animation: supernovaExplosion 20s 8s infinite ease-out;
            }
            
            .supernova-3 {
              width: 120px;
              height: 120px;
              top: 15%;
              left: 70%;
              background: radial-gradient(circle, rgba(255, 217, 255, 1) 0%, rgba(255, 115, 221, 0.8) 40%, rgba(187, 59, 255, 0.4) 70%, rgba(60, 13, 153, 0) 100%);
              box-shadow: 0 0 50px 25px rgba(255, 217, 255, 0.5);
              filter: blur(18px);
              animation: supernovaExplosion 25s 5s infinite ease-out;
            }
            
            /* Spiral galaxy */
            .spiral-galaxy {
              position: absolute;
              top: 50%;
              left: 45%;
              width: 200px;
              height: 200px;
              border-radius: 50%;
              background: 
                conic-gradient(
                  from 0deg,
                  transparent 0deg 30deg,
                  rgba(123, 97, 255, 0.2) 40deg 50deg,
                  transparent 60deg 120deg,
                  rgba(201, 97, 255, 0.2) 130deg 140deg,
                  transparent 150deg 210deg,
                  rgba(97, 223, 255, 0.2) 220deg 230deg,
                  transparent 240deg 300deg,
                  rgba(148, 97, 255, 0.2) 310deg 320deg,
                  transparent 330deg 360deg
                ),
                radial-gradient(circle at center, rgba(246, 236, 255, 0.8) 0%, rgba(103, 97, 255, 0.5) 20%, rgba(29, 38, 113, 0) 100%);
              filter: blur(12px);
              transform-origin: center;
              opacity: 0.4;
              animation: spiralSpin 30s linear infinite;
              transform: translate(-50%, -50%);
              will-change: transform, opacity;
            }
            
            /* Galaxies */
            .galaxies {
              background-image: radial-gradient(40px 40px at 150px 150px, rgba(111, 74, 217, 0.5), rgba(0,0,0,0) 70%),
                               radial-gradient(50px 50px at 280px 320px, rgba(74, 127, 217, 0.5), rgba(0,0,0,0) 70%),
                               radial-gradient(60px 60px at 450px 150px, rgba(148, 74, 217, 0.5), rgba(0,0,0,0) 70%),
                               radial-gradient(45px 45px at 550px 220px, rgba(74, 160, 217, 0.5), rgba(0,0,0,0) 70%),
                               radial-gradient(55px 55px at 120px 400px, rgba(217, 74, 177, 0.5), rgba(0,0,0,0) 70%),
                               radial-gradient(70px 70px at 380px 420px, rgba(111, 74, 217, 0.4), rgba(0,0,0,0) 70%);
              background-repeat: repeat;
              background-size: 600px 600px;
              animation: float 40s infinite ease-in-out, pulse 15s infinite alternate;
              will-change: transform, opacity, filter;
              filter: blur(15px);
            }
            
            /* Aurora effect */
            .aurora {
              position: absolute;
              height: 300px;
              left: 0;
              right: 0;
              bottom: -50px;
              background: linear-gradient(to top, 
                rgba(0, 255, 189, 0) 0%, 
                rgba(0, 255, 189, 0.1) 20%, 
                rgba(92, 0, 255, 0.2) 60%, 
                rgba(0, 123, 255, 0.1) 80%, 
                rgba(0, 149, 255, 0) 100%);
              filter: blur(40px);
              opacity: 0.15;
              animation: auroraWave 20s infinite ease-in-out;
              will-change: transform, opacity;
            }
            
            /* Star clusters */
            .star-clusters {
              background-image: radial-gradient(80px 80px at 250px 250px, rgba(255, 255, 255, 0.2), rgba(0,0,0,0) 70%),
                               radial-gradient(100px 100px at 480px 320px, rgba(255, 255, 255, 0.15), rgba(0,0,0,0) 70%),
                               radial-gradient(90px 90px at 150px 400px, rgba(255, 255, 255, 0.1), rgba(0,0,0,0) 70%);
              background-repeat: repeat;
              background-size: 800px 800px;
              animation: pulseFast 12s infinite alternate, floatSlow 25s infinite ease-in-out;
              will-change: transform, opacity, filter;
              filter: blur(8px);
            }
            
            /* Cosmic dust */
            .cosmic-dust {
              background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
              opacity: 0.08;
              animation: dust 15s infinite alternate, waveMotion 20s infinite ease-in-out;
              will-change: transform, opacity, filter;
              filter: blur(12px);
            }
            
            /* Nebula 1 */
            .nebula-1 {
              background: 
                radial-gradient(circle at 50% 50%, rgba(111, 0, 255, 0.4), rgba(0, 0, 0, 0) 70%),
                radial-gradient(circle at 20% 80%, rgba(0, 81, 255, 0.4), rgba(0, 0, 0, 0) 70%);
              animation: nebulaPulse 15s infinite alternate, float 50s infinite ease-in-out;
              will-change: transform, opacity, filter;
              filter: blur(30px);
            }
            
            /* Nebula 2 */
            .nebula-2 {
              background: 
                radial-gradient(circle at 80% 10%, rgba(255, 0, 242, 0.4), rgba(0, 0, 0, 0) 70%),
                radial-gradient(circle at 10% 40%, rgba(0, 183, 255, 0.4), rgba(0, 0, 0, 0) 70%);
              animation: nebulaPulse 20s 5s infinite alternate-reverse, floatSlow 40s infinite ease-in-out;
              will-change: transform, opacity, filter;
              filter: blur(35px);
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