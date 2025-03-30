"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLayout } from '../../../providers/LayoutProvider';
import { cn } from '@/src/core/utils/styling';

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  mobileMenuVisible: boolean;
  sidebarItems: {
    title: string;
    href: string;
    icon: React.ReactNode;
  }[];
  notificationCount: number;
  userProfile: {
    name: string;
    role: string;
    avatar: string;
  };
};

/**
 * Mobile Menu Component
 * This appears when the hamburger menu button is clicked on mobile
 */
export function MobileMenu({ 
  isOpen, 
  onClose, 
  mobileMenuVisible,
  sidebarItems,
  notificationCount,
  userProfile
}: MobileMenuProps) {
  if (!isOpen) return null;
  
  const router = useRouter();
  
  const handleNavigation = (href: string) => {
    router.push(href);
    onClose();
  };
  
  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 transition-opacity duration-300 ease-in-out",
        mobileMenuVisible ? "opacity-100" : "opacity-0"
      )}
    >
      {/* Backdrop overlay with blur effect */}
      <div 
        className={cn(
          "absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300",
          mobileMenuVisible ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />
      
      {/* Menu panel */}
      <div 
        className={cn(
          "absolute top-0 right-0 h-full w-[85%] max-w-[350px] bg-white dark:bg-neutral-900 shadow-2xl flex flex-col transition-all duration-300 ease-out",
          mobileMenuVisible ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
          <h2 className="font-bold text-lg">Menu</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        {/* User Profile */}
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden mr-3 transform transition-transform duration-300 hover:scale-105">
              <img 
                src={userProfile.avatar || "/images/default-avatar.jpg"}
                alt={userProfile.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium">{userProfile.name}</h3>
              <p className="text-sm text-muted-foreground">{userProfile.role}</p>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <p className="text-xs uppercase font-semibold text-muted-foreground mb-3 pl-2">Navigation</p>
            <div className="space-y-1">
              {sidebarItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleNavigation(item.href)}
                  className="flex items-center w-full p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 transform hover:scale-[1.02]"
                  style={{
                    transitionDelay: `${index * 50}ms`,
                    opacity: mobileMenuVisible ? 1 : 0,
                    transform: mobileMenuVisible ? 'translateX(0)' : 'translateX(20px)'
                  }}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Footer Links */}
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
          <div className="flex flex-col space-y-2">
            <button className="flex items-center p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 transform hover:scale-[1.02]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <span>Notifications</span>
              {notificationCount > 0 && (
                <div className="ml-auto bg-primary text-primary-foreground text-xs rounded-full h-5 min-w-[20px] flex items-center justify-center px-1 animate-pulse">
                  {notificationCount}
                </div>
              )}
            </button>
            
            <button className="flex items-center p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 transform hover:scale-[1.02]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
              <span>Settings</span>
            </button>
            
            <button className="flex items-center p-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 dark:text-red-400 transition-colors duration-200 transform hover:scale-[1.02]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu; 