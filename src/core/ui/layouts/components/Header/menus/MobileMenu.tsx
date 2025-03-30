"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Book, LucideIcon, School, ShoppingBag, BarChart3, CreditCard, Settings, Bell, LogOut } from 'lucide-react';
import { useLayout } from '../../../providers/LayoutProvider';
import { cn } from '@/src/core/utils/styling';

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  mobileMenuVisible: boolean;
  sidebarItems?: {
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
  currentSectionId?: string;
  onSectionSelect?: (section: string) => void;
};

/**
 * Mobile Menu Component
 * This appears when the hamburger menu button is clicked on mobile
 */
export function MobileMenu({ 
  isOpen, 
  onClose, 
  mobileMenuVisible,
  notificationCount,
  userProfile,
  currentSectionId = 'main',
  onSectionSelect
}: MobileMenuProps) {
  if (!isOpen) return null;
  
  const router = useRouter();
  
  // Module sections - matching the ModuleMenu structure
  const SECTIONS = [
    {
      id: 'main',
      title: 'Main Dashboard',
      icon: BarChart3,
      color: 'from-blue-500 to-blue-700',
      bgColor: 'bg-blue-500',
      textColor: 'text-blue-500',
      description: 'Your dashboard overview and analytics.',
    },
    {
      id: 'lms',
      title: 'Learning Management',
      icon: School,
      color: 'from-green-500 to-green-700',
      bgColor: 'bg-green-500',
      textColor: 'text-green-500',
      description: 'Courses, lessons and educational content.',
    },
    {
      id: 'admin',
      title: 'Admin Panel',
      icon: Book,
      color: 'from-purple-500 to-purple-700',
      bgColor: 'bg-purple-500',
      textColor: 'text-purple-500',
      description: 'User management and system settings.',
    },
    {
      id: 'payments',
      title: 'Payments',
      icon: CreditCard,
      color: 'from-amber-500 to-amber-700',
      bgColor: 'bg-amber-500',
      textColor: 'text-amber-500',
      description: 'Transactions, billing and payment history.',
    },
    {
      id: 'finance',
      title: 'Finance',
      icon: BarChart3,
      color: 'from-red-500 to-red-700',
      bgColor: 'bg-red-500',
      textColor: 'text-red-500',
      description: 'Financial reporting and analytics.',
    },
    {
      id: 'store',
      title: 'Store',
      icon: ShoppingBag,
      color: 'from-sky-500 to-sky-700',
      bgColor: 'bg-sky-500',
      textColor: 'text-sky-500',
      description: 'Products, purchases, and marketplace.',
    },
  ];
  
  // Get current section data
  const getCurrentSectionData = () => {
    const normalizedSection = currentSectionId?.toLowerCase() || 'main';
    return SECTIONS.find(item => item.id.toLowerCase() === normalizedSection) || SECTIONS[0];
  };
  
  const currentSectionData = getCurrentSectionData();
  const Icon = currentSectionData.icon;
  
  const handleSectionClick = (sectionId: string) => {
    if (onSectionSelect) {
      onSectionSelect(sectionId);
      onClose();
    } else {
      // Fallback to direct navigation
      router.push(`/protected?section=${sectionId}`);
      onClose();
    }
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
        <div className="flex flex-col border-b border-neutral-200 dark:border-neutral-700">
          {/* Top header with close button */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <h2 className="font-bold text-lg">Menu</h2>
              <div className={cn(
                "ml-2 px-2 py-0.5 rounded-full text-xs font-semibold text-white",
                currentSectionData.bgColor
              )}>
                {currentSectionData.title}
              </div>
            </div>
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
          
          {/* Current Module Display */}
          <div className="px-4 pb-4 flex items-center">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br mr-3",
              currentSectionData.color
            )}>
              <Icon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className={cn(
                "font-medium",
                currentSectionData.textColor
              )}>
                {currentSectionData.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {currentSectionData.description}
              </p>
            </div>
          </div>
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
        
        {/* Menu Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          {/* Modules Selection */}
          <div className="p-4">
            <p className="text-xs uppercase font-semibold text-muted-foreground mb-3 pl-2">Switch Module</p>
            <div className="space-y-3">
              {SECTIONS.map((section, index) => {
                const SectionIcon = section.icon;
                const isActive = section.id.toLowerCase() === currentSectionId?.toLowerCase();
                
                return (
                  <button
                    key={section.id}
                    onClick={() => handleSectionClick(section.id)}
                    className={cn(
                      "flex items-center w-full p-3 rounded-lg border transition-all duration-200",
                      isActive
                        ? "bg-neutral-100 dark:bg-neutral-800 border-primary"
                        : "border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800/70"
                    )}
                    style={{
                      transitionDelay: `${index * 50}ms`,
                      opacity: mobileMenuVisible ? 1 : 0,
                      transform: mobileMenuVisible ? 'translateX(0)' : 'translateX(20px)'
                    }}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br mr-3 transition-transform duration-300 hover:scale-110",
                      section.color
                    )}>
                      <SectionIcon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className={cn(
                        "font-medium transition-colors duration-200",
                        isActive ? section.textColor : ""
                      )}>
                        {section.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {section.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Module-specific options */}
          <div className="p-4 pt-0">
            <p className="text-xs uppercase font-semibold text-muted-foreground mb-3 pl-2">{currentSectionData.title} Options</p>
            <div className="space-y-2">
              {currentSectionId === 'main' && (
                <>
                  <button className="flex items-center w-full p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 transform hover:scale-[1.02]">
                    <span className="mr-3">📊</span>
                    <span>Dashboard</span>
                  </button>
                  <button className="flex items-center w-full p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 transform hover:scale-[1.02]">
                    <span className="mr-3">🌐</span>
                    <span>Analytics</span>
                  </button>
                </>
              )}
              
              {currentSectionId === 'lms' && (
                <>
                  <button className="flex items-center w-full p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 transform hover:scale-[1.02]">
                    <span className="mr-3">📚</span>
                    <span>Courses</span>
                  </button>
                  <button className="flex items-center w-full p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 transform hover:scale-[1.02]">
                    <span className="mr-3">👨‍🎓</span>
                    <span>Students</span>
                  </button>
                </>
              )}
              
              {currentSectionId === 'admin' && (
                <>
                  <button className="flex items-center w-full p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 transform hover:scale-[1.02]">
                    <span className="mr-3">👥</span>
                    <span>Users</span>
                  </button>
                  <button className="flex items-center w-full p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 transform hover:scale-[1.02]">
                    <span className="mr-3">🔑</span>
                    <span>Roles</span>
                  </button>
                </>
              )}
              
              {currentSectionId === 'payments' && (
                <>
                  <button className="flex items-center w-full p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 transform hover:scale-[1.02]">
                    <span className="mr-3">💳</span>
                    <span>Transactions</span>
                  </button>
                  <button className="flex items-center w-full p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 transform hover:scale-[1.02]">
                    <span className="mr-3">📝</span>
                    <span>Invoices</span>
                  </button>
                </>
              )}
              
              {currentSectionId === 'finance' && (
                <>
                  <button className="flex items-center w-full p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 transform hover:scale-[1.02]">
                    <span className="mr-3">📈</span>
                    <span>Reports</span>
                  </button>
                  <button className="flex items-center w-full p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 transform hover:scale-[1.02]">
                    <span className="mr-3">💰</span>
                    <span>Budgets</span>
                  </button>
                </>
              )}
              
              {currentSectionId === 'store' && (
                <>
                  <button className="flex items-center w-full p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 transform hover:scale-[1.02]">
                    <span className="mr-3">🛍️</span>
                    <span>Products</span>
                  </button>
                  <button className="flex items-center w-full p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 transform hover:scale-[1.02]">
                    <span className="mr-3">📦</span>
                    <span>Orders</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Global Actions */}
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
          <p className="text-xs uppercase font-semibold text-muted-foreground mb-3 pl-2">Global Actions</p>
          <div className="flex flex-col space-y-2">
            <button className="flex items-center p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 transform hover:scale-[1.02]">
              <Bell className="h-5 w-5 mr-3 text-muted-foreground" />
              <span>Notifications</span>
              {notificationCount > 0 && (
                <div className="ml-auto bg-primary text-primary-foreground text-xs rounded-full h-5 min-w-[20px] flex items-center justify-center px-1 animate-pulse">
                  {notificationCount}
                </div>
              )}
            </button>
            
            <button className="flex items-center p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 transform hover:scale-[1.02]">
              <Settings className="h-5 w-5 mr-3 text-muted-foreground" />
              <span>Settings</span>
            </button>
            
            <button className="flex items-center p-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 dark:text-red-400 transition-colors duration-200 transform hover:scale-[1.02]">
              <LogOut className="h-5 w-5 mr-3" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu; 