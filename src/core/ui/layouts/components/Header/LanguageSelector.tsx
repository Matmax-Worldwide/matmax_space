import { useState } from 'react';
import { cn } from '@/src/core/utils/styling';
import { Globe, Check } from 'lucide-react';

// Mock language data - in a real app, this would come from i18n configuration
const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
];

/**
 * Language selector component for the header
 * Handles language switching for internationalization
 */
export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  
  // Get current language details
  const current = LANGUAGES.find((lang) => lang.code === currentLanguage) 
    || LANGUAGES[0];
  
  // Handle language change
  const changeLanguage = (code: string) => {
    // In a real app, this would use the i18n API to change the language
    setCurrentLanguage(code);
    setIsOpen(false);
  };
  
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center h-6 w-6 rounded-full hover:bg-muted focus:outline-none"
        aria-label="Select language"
        title="Change language"
      >
        <Globe className="h-3 w-3 text-muted-foreground" />
      </button>
      
      {isOpen && (
        <>
          {/* Dropdown backdrop - closes dropdown when clicked */}
          <div 
            className="fixed inset-0 z-20"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Language dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-md shadow-lg z-30 py-1">
            {LANGUAGES.map((language) => {
              const isActive = language.code === currentLanguage;
              
              return (
                <button
                  key={language.code}
                  onClick={() => changeLanguage(language.code)}
                  className={cn(
                    "flex items-center w-full px-4 py-2 text-sm text-left hover:bg-muted",
                    isActive && "font-medium"
                  )}
                >
                  <span className="mr-2">{language.flag}</span>
                  <span className="flex-grow">{language.name}</span>
                  {isActive && <Check className="h-4 w-4 text-primary" />}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default LanguageSelector; 