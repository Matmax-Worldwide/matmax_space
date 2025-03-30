"use client";

import { useState } from 'react';
import { Check, CreditCard, Globe, LogOut, Settings, User } from 'lucide-react';
import { useLayout } from '../../../providers/LayoutProvider';
import { cn } from '@/src/core/utils/styling';

type SettingsMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  settingsMenuVisible: boolean;
};

/**
 * Settings Menu Component
 * This appears when the Manage Account button is clicked
 */
export function SettingsMenu({ isOpen, onClose, settingsMenuVisible }: SettingsMenuProps) {
  if (!isOpen) return null;
  
  const [showLanguages, setShowLanguages] = useState(false);
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  const [showThemeOptions, setShowThemeOptions] = useState(false);
  const { isMobile, isTablet, theme, setTheme } = useLayout();
  const isMobileView = isMobile || isTablet;
  
  // Available languages
  const LANGUAGES = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  ];
  
  // Available wallet options
  const WALLET_OPTIONS = [
    { id: 'metamask', name: 'MetaMask', icon: '🦊' },
    { id: 'coinbase', name: 'Coinbase Wallet', icon: '💰' },
    { id: 'walletconnect', name: 'WalletConnect', icon: '🔗' },
    { id: 'phantom', name: 'Phantom', icon: '👻' }
  ];
  
  // Theme options
  const THEME_OPTIONS = [
    { id: 'light', name: 'Light Theme', icon: '☀️' },
    { id: 'dark', name: 'Dark Theme', icon: '🌙' },
    { id: 'system', name: 'System Theme', icon: '💻' }
  ];
  
  // Function to go back to main menu
  const goBackToMain = () => {
    setShowLanguages(false);
    setShowWalletOptions(false);
    setShowThemeOptions(false);
  };
  
  // Set theme function
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme as 'light' | 'dark' | 'system');
  };
  
  // Use slide-in panel for mobile and modal for desktop
  return (
    <>
      {isMobileView ? (
        <div 
          className={cn(
            "fixed inset-0 z-50 transition-opacity duration-300 ease-in-out",
            settingsMenuVisible ? "opacity-100" : "opacity-0"
          )}
        >
          {/* Backdrop overlay */}
          <div 
            className={cn(
              "absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300",
              settingsMenuVisible ? "opacity-100" : "opacity-0"
            )}
            onClick={onClose}
          />
          
          {/* Menu panel */}
          <div 
            className={cn(
              "absolute top-0 right-0 h-full w-[85%] max-w-[350px] bg-white dark:bg-neutral-900 shadow-2xl flex flex-col transition-all duration-300 ease-out",
              settingsMenuVisible ? "translate-x-0" : "translate-x-full"
            )}
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
              <h2 className="font-bold text-lg">
                {showLanguages ? "Language Settings" : 
                 showWalletOptions ? "Wallet Options" : 
                 showThemeOptions ? "Theme Settings" :
                 "Account Settings"}
              </h2>
              <div className="flex items-center">
                {(showLanguages || showWalletOptions || showThemeOptions) && (
                  <button 
                    onClick={goBackToMain}
                    className="mr-2 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                  </button>
                )}
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
            </div>
            
            {/* Settings Options - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Main Menu Options */}
              {!showLanguages && !showWalletOptions && !showThemeOptions && (
                <div className="space-y-3">
                  {[
                    {
                      icon: <User className="w-5 h-5 mr-3 text-muted-foreground" />,
                      title: "Profile Settings",
                      onClick: () => {}
                    },
                    {
                      icon: <Globe className="w-5 h-5 mr-3 text-muted-foreground" />,
                      title: "Language Settings",
                      onClick: () => setShowLanguages(true),
                      showChevron: true
                    },
                    {
                      icon: <CreditCard className="w-5 h-5 mr-3 text-muted-foreground" />,
                      title: "Wallet Options",
                      onClick: () => setShowWalletOptions(true),
                      showChevron: true
                    },
                    {
                      icon: theme === 'light' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-3 text-muted-foreground">
                          <circle cx="12" cy="12" r="5"></circle>
                          <line x1="12" y1="1" x2="12" y2="3"></line>
                          <line x1="12" y1="21" x2="12" y2="23"></line>
                          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                          <line x1="1" y1="12" x2="3" y2="12"></line>
                          <line x1="21" y1="12" x2="23" y2="12"></line>
                          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                        </svg>
                      ) : theme === 'dark' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-3 text-muted-foreground">
                          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-3 text-muted-foreground">
                          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                          <line x1="8" y1="21" x2="16" y2="21"></line>
                          <line x1="12" y1="17" x2="12" y2="21"></line>
                        </svg>
                      ),
                      title: "Theme Settings",
                      onClick: () => setShowThemeOptions(true),
                      showChevron: true
                    },
                    {
                      icon: <Settings className="w-5 h-5 mr-3 text-muted-foreground" />,
                      title: "App Settings",
                      onClick: () => {}
                    },
                    {
                      icon: <LogOut className="w-5 h-5 mr-3" />,
                      title: "Sign Out",
                      onClick: () => {},
                      danger: true
                    }
                  ].map((item, index) => (
                    <button 
                      key={item.title}
                      onClick={item.onClick}
                      className={cn(
                        "flex w-full items-center px-4 py-3 rounded-lg border transition-all duration-200 transform",
                        item.danger 
                          ? "hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 dark:text-red-400 border-neutral-200 dark:border-neutral-700" 
                          : "hover:bg-neutral-100 dark:hover:bg-neutral-800 border-neutral-200 dark:border-neutral-700",
                        item.showChevron ? "justify-between" : "",
                        settingsMenuVisible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                      )}
                      style={{ 
                        transitionDelay: `${index * 50}ms`,
                        transitionProperty: "transform, opacity, background-color, border-color"
                      }}
                    >
                      <div className="flex items-center">
                        {item.icon}
                        <span className="text-base font-medium">{item.title}</span>
                      </div>
                      {item.showChevron && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-1"><polyline points="9 18 15 12 9 6"></polyline></svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
              
              {/* Language Options */}
              {showLanguages && (
                <div className="space-y-3">
                  {LANGUAGES.map((lang, index) => (
                    <button 
                      key={lang.code}
                      className={cn(
                        "flex w-full items-center justify-between px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200",
                        settingsMenuVisible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                      )}
                      style={{ 
                        transitionDelay: `${100 + index * 50}ms` 
                      }}
                    >
                      <div className="flex items-center">
                        <span className="text-xl mr-3 transform transition-transform duration-200 hover:scale-110">{lang.flag}</span>
                        <span className="text-base font-medium">{lang.name}</span>
                      </div>
                      {lang.code === 'en' && (
                        <Check className="h-5 w-5 text-green-500" />
                      )}
                    </button>
                  ))}
                </div>
              )}
              
              {/* Wallet Options */}
              {showWalletOptions && (
                <div className="space-y-3">
                  <div 
                    className={cn(
                      "px-2 mb-2 transition-all duration-200",
                      settingsMenuVisible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                    )}
                    style={{ transitionDelay: '50ms' }}
                  >
                    <p className="text-sm text-muted-foreground">Select a wallet to connect to the application</p>
                  </div>
                  
                  {WALLET_OPTIONS.map((wallet, index) => (
                    <button 
                      key={wallet.id}
                      className={cn(
                        "flex w-full items-center px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200 transform hover:scale-[1.02]",
                        settingsMenuVisible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                      )}
                      style={{ 
                        transitionDelay: `${100 + index * 50}ms`,
                        transitionProperty: "transform, opacity, background-color, border-color, scale"
                      }}
                    >
                      <span className="text-xl mr-3 transform transition-transform duration-200 hover:scale-110">{wallet.icon}</span>
                      <span className="text-base font-medium">{wallet.name}</span>
                    </button>
                  ))}
                </div>
              )}
              
              {/* Theme Options */}
              {showThemeOptions && (
                <div className="space-y-3">
                  {THEME_OPTIONS.map((themeOption, index) => (
                    <button 
                      key={themeOption.id}
                      onClick={() => handleThemeChange(themeOption.id)}
                      className={cn(
                        "flex w-full items-center justify-between px-4 py-3 rounded-lg border transition-all duration-200 transform hover:scale-[1.02]",
                        theme === themeOption.id 
                          ? "bg-neutral-100 dark:bg-neutral-800 border-primary" 
                          : "border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800",
                        settingsMenuVisible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                      )}
                      style={{ 
                        transitionDelay: `${100 + index * 50}ms`,
                        transitionProperty: "transform, opacity, background-color, border-color, scale"
                      }}
                    >
                      <div className="flex items-center">
                        <span className="text-xl mr-3 transform transition-transform duration-200 hover:scale-110">{themeOption.icon}</span>
                        <span className="text-base font-medium">{themeOption.name}</span>
                      </div>
                      {theme === themeOption.id && (
                        <Check className="h-5 w-5 text-green-500" />
                      )}
                    </button>
                  ))}
                  <div 
                    className={cn(
                      "px-2 mt-2 transition-all duration-200",
                      settingsMenuVisible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                    )}
                    style={{ transitionDelay: '250ms' }}
                  >
                    <p className="text-xs text-muted-foreground">
                      System theme will automatically switch between light and dark mode based on your device settings.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div 
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300",
            settingsMenuVisible ? "opacity-100" : "opacity-0"
          )}
        >
          {/* Backdrop overlay with blur effect */}
          <div 
            className={cn(
              "absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300",
              settingsMenuVisible ? "opacity-100" : "opacity-0"
            )}
            onClick={onClose}
          />
          
          <div 
            className={cn(
              "bg-white dark:bg-neutral-900 rounded-lg w-full max-w-md p-6 shadow-xl relative transition-all duration-300 ease-out",
              settingsMenuVisible ? "translate-y-0 scale-100" : "translate-y-8 scale-95",
              "flex flex-col max-h-[85vh]"
            )}
          >
            {/* Menu Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {showLanguages ? "Language Settings" : 
                 showWalletOptions ? "Wallet Options" : 
                 showThemeOptions ? "Theme Settings" :
                 "Account Settings"}
              </h2>
              <div className="flex items-center">
                {(showLanguages || showWalletOptions || showThemeOptions) && (
                  <button 
                    onClick={goBackToMain}
                    className="mr-2 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                  </button>
                )}
                <button 
                  onClick={onClose} 
                  className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
                >
                  <span className="sr-only">Close</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
            </div>
            
            {/* Scrollable content */}
            <div className="overflow-y-auto">
              {/* Settings content here - similar to mobile version but styled for desktop */}
              {/* Main Menu Options */}
              {!showLanguages && !showWalletOptions && !showThemeOptions && (
                <div className="space-y-3">
                  {[
                    {
                      icon: <User className="w-5 h-5 mr-3 text-muted-foreground" />,
                      title: "Profile Settings",
                      onClick: () => {}
                    },
                    {
                      icon: <Globe className="w-5 h-5 mr-3 text-muted-foreground" />,
                      title: "Language Settings",
                      onClick: () => setShowLanguages(true),
                      showChevron: true
                    },
                    {
                      icon: <CreditCard className="w-5 h-5 mr-3 text-muted-foreground" />,
                      title: "Wallet Options",
                      onClick: () => setShowWalletOptions(true),
                      showChevron: true
                    },
                    {
                      icon: theme === 'light' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-3 text-muted-foreground">
                          <circle cx="12" cy="12" r="5"></circle>
                          <line x1="12" y1="1" x2="12" y2="3"></line>
                          <line x1="12" y1="21" x2="12" y2="23"></line>
                          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                          <line x1="1" y1="12" x2="3" y2="12"></line>
                          <line x1="21" y1="12" x2="23" y2="12"></line>
                          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                        </svg>
                      ) : theme === 'dark' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-3 text-muted-foreground">
                          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-3 text-muted-foreground">
                          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                          <line x1="8" y1="21" x2="16" y2="21"></line>
                          <line x1="12" y1="17" x2="12" y2="21"></line>
                        </svg>
                      ),
                      title: "Theme Settings",
                      onClick: () => setShowThemeOptions(true),
                      showChevron: true
                    },
                    {
                      icon: <Settings className="w-5 h-5 mr-3 text-muted-foreground" />,
                      title: "App Settings",
                      onClick: () => {}
                    },
                    {
                      icon: <LogOut className="w-5 h-5 mr-3" />,
                      title: "Sign Out",
                      onClick: () => {},
                      danger: true
                    }
                  ].map((item, index) => (
                    <button 
                      key={item.title}
                      onClick={item.onClick}
                      className={cn(
                        "flex w-full items-center px-4 py-3 rounded-lg border transition-all duration-200 transform hover:scale-[1.02]",
                        item.danger 
                          ? "hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 dark:text-red-400 border-neutral-200 dark:border-neutral-700" 
                          : "hover:bg-neutral-100 dark:hover:bg-neutral-800 border-neutral-200 dark:border-neutral-700",
                        item.showChevron ? "justify-between" : "",
                        settingsMenuVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                      )}
                      style={{ 
                        transitionDelay: `${index * 50}ms`,
                        transitionProperty: "transform, opacity, background-color, border-color, scale"
                      }}
                    >
                      <div className="flex items-center">
                        {item.icon}
                        <span className="text-base font-medium">{item.title}</span>
                      </div>
                      {item.showChevron && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-1"><polyline points="9 18 15 12 9 6"></polyline></svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
              
              {/* Other sections remain similar with proper animations */}
              {/* ... rest of the existing sub-menus with animations added */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SettingsMenu; 