"use client";

import Link from 'next/link';
import { Book, LucideIcon, School, ShoppingBag, BarChart3, CreditCard } from 'lucide-react';
import { useLayout } from '../../../providers/LayoutProvider';
import { cn } from '@/src/core/utils/styling';

type ModuleMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  moduleMenuVisible: boolean;
  onSectionSelect: (section: string) => void;
  currentSectionId: string;
};

/**
 * Module Menu Component
 * This appears when the Modules button is clicked
 */
export function ModuleMenu({ 
  isOpen, 
  onClose, 
  moduleMenuVisible, 
  onSectionSelect, 
  currentSectionId 
}: ModuleMenuProps) {
  if (!isOpen) return null;
  
  const { isMobile, isTablet } = useLayout();
  const isMobileView = isMobile || isTablet;
  
  // Module sections
  const SECTIONS = [
    {
      id: 'main',
      title: 'Main Dashboard',
      icon: BarChart3,
      color: 'from-blue-500 to-blue-700',
      textColor: 'text-blue-500',
      description: 'Your dashboard overview and analytics.',
    },
    {
      id: 'lms',
      title: 'Learning Management',
      icon: School,
      color: 'from-green-500 to-green-700',
      textColor: 'text-green-500',
      description: 'Courses, lessons and educational content.',
    },
    {
      id: 'admin',
      title: 'Admin Panel',
      icon: Book,
      color: 'from-purple-500 to-purple-700',
      textColor: 'text-purple-500',
      description: 'User management and system settings.',
    },
    {
      id: 'payments',
      title: 'Payments',
      icon: CreditCard,
      color: 'from-amber-500 to-amber-700',
      textColor: 'text-amber-500',
      description: 'Transactions, billing and payment history.',
    },
    {
      id: 'finance',
      title: 'Finance',
      icon: BarChart3,
      color: 'from-red-500 to-red-700',
      textColor: 'text-red-500',
      description: 'Financial reporting and analytics.',
    },
    {
      id: 'store',
      title: 'Store',
      icon: ShoppingBag,
      color: 'from-sky-500 to-sky-700',
      textColor: 'text-sky-500',
      description: 'Products, purchases, and marketplace.',
    },
  ];
  
  const handleSectionClick = (sectionId: string) => {
    onSectionSelect(sectionId);
    onClose();
  };
  
  return (
    <>
      {isMobileView ? (
        <div 
          className={cn(
            "fixed inset-0 z-50 transition-opacity duration-300 ease-in-out",
            moduleMenuVisible ? "opacity-100" : "opacity-0"
          )}
        >
          {/* Backdrop overlay */}
          <div 
            className={cn(
              "absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300",
              moduleMenuVisible ? "opacity-100" : "opacity-0"
            )}
            onClick={onClose}
          />
          
          {/* Menu panel */}
          <div 
            className={cn(
              "absolute top-0 right-0 h-full w-[85%] max-w-[350px] bg-white dark:bg-neutral-900 shadow-2xl flex flex-col transition-all duration-300 ease-out",
              moduleMenuVisible ? "translate-x-0" : "translate-x-full"
            )}
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
              <h2 className="font-bold text-lg">Modules</h2>
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
            
            {/* Module Sections - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {SECTIONS.map((section, index) => {
                  const Icon = section.icon;
                  const isActive = section.id.toLowerCase() === currentSectionId.toLowerCase();
                  
                  return (
                    <button
                      key={section.id}
                      onClick={() => handleSectionClick(section.id)}
                      className={cn(
                        "flex flex-col w-full p-4 rounded-lg border transition-all duration-200",
                        isActive
                          ? "bg-neutral-100 dark:bg-neutral-800 border-primary"
                          : "border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800/70"
                      )}
                      style={{
                        transitionDelay: `${index * 50}ms`,
                        opacity: moduleMenuVisible ? 1 : 0,
                        transform: moduleMenuVisible ? 'translateY(0)' : 'translateY(20px)'
                      }}
                    >
                      <div className="flex items-center mb-2">
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br mr-3 transition-transform duration-300 hover:scale-110",
                          section.color
                        )}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <h3 className={cn(
                          "font-semibold text-lg transition-colors duration-200",
                          isActive ? section.textColor : ""
                        )}>
                          {section.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground pl-12">
                        {section.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div 
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300",
            moduleMenuVisible ? "opacity-100" : "opacity-0"
          )}
        >
          {/* Backdrop overlay with blur effect */}
          <div 
            className={cn(
              "absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300",
              moduleMenuVisible ? "opacity-100" : "opacity-0"
            )}
            onClick={onClose}
          />
          
          <div 
            className={cn(
              "bg-white dark:bg-neutral-900 rounded-lg w-full max-w-2xl p-6 shadow-xl relative transition-all duration-300 ease-out",
              moduleMenuVisible ? "translate-y-0 scale-100" : "translate-y-8 scale-95"
            )}
          >
            {/* Menu Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Select Module</h2>
              <button 
                onClick={onClose} 
                className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
              >
                <span className="sr-only">Close</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            {/* Module Grid */}
            <div className="grid grid-cols-2 gap-4">
              {SECTIONS.map((section, index) => {
                const Icon = section.icon;
                const isActive = section.id.toLowerCase() === currentSectionId.toLowerCase();
                
                return (
                  <button 
                    key={section.id}
                    onClick={() => handleSectionClick(section.id)}
                    className={cn(
                      "flex flex-col p-4 rounded-lg border transition-all duration-200 hover:shadow-md",
                      isActive 
                        ? "bg-neutral-100 dark:bg-neutral-800 border-primary" 
                        : "border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800/70"
                    )}
                    style={{
                      transitionDelay: `${index * 50}ms`,
                      opacity: moduleMenuVisible ? 1 : 0,
                      transform: moduleMenuVisible ? 'translateY(0)' : 'translateY(10px)'
                    }}
                  >
                    <div className="flex items-center mb-2">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br mr-3 transition-transform duration-300 hover:scale-110",
                        section.color
                      )}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className={cn(
                        "font-semibold transition-colors duration-200",
                        isActive ? section.textColor : ""
                      )}>
                        {section.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {section.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModuleMenu; 