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
            "fixed inset-0 bg-white dark:bg-neutral-900 z-50 flex flex-col transition-transform duration-300 ease-in-out",
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
                  className="mr-2 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
              )}
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
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
                <button className="flex w-full items-center px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                  <User className="w-5 h-5 mr-3 text-muted-foreground" />
                  <span className="text-base font-medium">Profile Settings</span>
                </button>
                
                <button 
                  className="flex w-full items-center justify-between px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  onClick={() => setShowLanguages(true)}
                >
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 mr-3 text-muted-foreground" />
                    <span className="text-base font-medium">Language Settings</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
                
                <button 
                  className="flex w-full items-center justify-between px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  onClick={() => setShowWalletOptions(true)}
                >
                  <div className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-3 text-muted-foreground" />
                    <span className="text-base font-medium">Wallet Options</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
                
                <button 
                  className="flex w-full items-center justify-between px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  onClick={() => setShowThemeOptions(true)}
                >
                  <div className="flex items-center">
                    {theme === 'light' ? (
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
                    )}
                    <span className="text-base font-medium">Theme Settings</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
                
                <button className="flex w-full items-center px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                  <Settings className="w-5 h-5 mr-3 text-muted-foreground" />
                  <span className="text-base font-medium">App Settings</span>
                </button>
                
                <div className="h-4"></div>
                
                <button className="flex w-full items-center px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 dark:text-red-400">
                  <LogOut className="w-5 h-5 mr-3" />
                  <span className="text-base font-medium">Sign Out</span>
                </button>
              </div>
            )}
            
            {/* Language Options */}
            {showLanguages && (
              <div className="space-y-3">
                {LANGUAGES.map((lang) => (
                  <button 
                    key={lang.code}
                    className="flex w-full items-center justify-between px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <div className="flex items-center">
                      <span className="text-xl mr-3">{lang.flag}</span>
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
                <div className="px-2 mb-2">
                  <p className="text-sm text-muted-foreground">Select a wallet to connect to the application</p>
                </div>
                
                {WALLET_OPTIONS.map((wallet) => (
                  <button 
                    key={wallet.id}
                    className="flex w-full items-center px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <span className="text-xl mr-3">{wallet.icon}</span>
                    <span className="text-base font-medium">{wallet.name}</span>
                  </button>
                ))}
              </div>
            )}
            
            {/* Theme Options */}
            {showThemeOptions && (
              <div className="space-y-3">
                {THEME_OPTIONS.map((themeOption) => (
                  <button 
                    key={themeOption.id}
                    onClick={() => handleThemeChange(themeOption.id)}
                    className={cn(
                      "flex w-full items-center justify-between px-4 py-3 rounded-lg border",
                      theme === themeOption.id 
                        ? "bg-neutral-100 dark:bg-neutral-800 border-primary" 
                        : "border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    )}
                  >
                    <div className="flex items-center">
                      <span className="text-xl mr-3">{themeOption.icon}</span>
                      <span className="text-base font-medium">{themeOption.name}</span>
                    </div>
                    {theme === themeOption.id && (
                      <Check className="h-5 w-5 text-green-500" />
                    )}
                  </button>
                ))}
                <div className="px-2 mt-2">
                  <p className="text-xs text-muted-foreground">
                    System theme will automatically switch between light and dark mode based on your device settings.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-neutral-900 rounded-lg w-full max-w-xl p-6 shadow-xl">
            {/* Header with back button when in submenus */}
            <div className="flex justify-between items-center mb-4">
              {(showLanguages || showWalletOptions || showThemeOptions) ? (
                <div className="flex items-center">
                  <button 
                    onClick={goBackToMain}
                    className="mr-2 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                  </button>
                  <h2 className="text-xl font-semibold">
                    {showLanguages ? "Language Settings" : 
                     showWalletOptions ? "Wallet Options" : 
                     showThemeOptions ? "Theme Settings" :
                     "Account Settings"}
                  </h2>
                </div>
              ) : (
                <h2 className="text-xl font-semibold">Account Settings</h2>
              )}
              <button 
                onClick={onClose} 
                className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <span className="sr-only">Close</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            {/* Main Menu Options */}
            {!showLanguages && !showWalletOptions && !showThemeOptions && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <span className="text-base">Profile Settings</span>
                </div>
                
                <div 
                  className="flex items-center justify-between p-3.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                  onClick={() => setShowLanguages(true)}
                >
                  <div className="flex items-center gap-4">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <span className="text-base">Language Settings</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </div>
                
                <div 
                  className="flex items-center justify-between p-3.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                  onClick={() => setShowWalletOptions(true)}
                >
                  <div className="flex items-center gap-4">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <span className="text-base">Wallet Options</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </div>
                
                <div 
                  className="flex items-center justify-between p-3.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                  onClick={() => setShowThemeOptions(true)}
                >
                  <div className="flex items-center gap-4">
                    {theme === 'light' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-muted-foreground">
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
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-muted-foreground">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-muted-foreground">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                        <line x1="8" y1="21" x2="16" y2="21"></line>
                        <line x1="12" y1="17" x2="12" y2="21"></line>
                      </svg>
                    )}
                    <span className="text-base">Theme Settings</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </div>
                
                <div className="flex items-center gap-4 p-3.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer">
                  <Settings className="h-5 w-5 text-muted-foreground" />
                  <span className="text-base">App Settings</span>
                </div>
                
                <hr className="border-border" />
                
                <div className="flex items-center gap-4 p-3.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-red-500 dark:text-red-400 cursor-pointer">
                  <LogOut className="h-5 w-5" />
                  <span className="text-base">Sign Out</span>
                </div>
              </div>
            )}
            
            {/* Language Options */}
            {showLanguages && (
              <div className="space-y-4">
                {LANGUAGES.map((lang) => (
                  <div 
                    key={lang.code}
                    className="flex items-center gap-4 p-3.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <span className="text-base">{lang.name}</span>
                    {lang.code === 'en' && (
                      <Check className="ml-auto h-4 w-4 text-green-500" />
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {/* Wallet Options */}
            {showWalletOptions && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground mb-2">Select a wallet to connect to the application</p>
                
                {WALLET_OPTIONS.map((wallet) => (
                  <div 
                    key={wallet.id}
                    className="flex items-center gap-4 p-3.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer border border-border"
                  >
                    <span className="text-xl">{wallet.icon}</span>
                    <span className="text-base">{wallet.name}</span>
                  </div>
                ))}
              </div>
            )}
            
            {/* Theme Options */}
            {showThemeOptions && (
              <div className="space-y-4">
                {THEME_OPTIONS.map((themeOption) => (
                  <div 
                    key={themeOption.id}
                    onClick={() => handleThemeChange(themeOption.id)}
                    className={cn(
                      "flex items-center gap-4 p-3.5 rounded-md cursor-pointer",
                      theme === themeOption.id
                        ? "bg-neutral-100 dark:bg-neutral-800"
                        : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    )}
                  >
                    <span className="text-xl">{themeOption.icon}</span>
                    <span className="text-base">{themeOption.name}</span>
                    {theme === themeOption.id && (
                      <Check className="ml-auto h-4 w-4 text-green-500" />
                    )}
                  </div>
                ))}
                <p className="text-xs text-muted-foreground mt-2">
                  System theme will automatically switch between light and dark mode based on your device settings.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default SettingsMenu; 