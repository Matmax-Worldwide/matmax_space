import { useState } from 'react';
import { cn } from '@/src/core/utils/styling';
import { Globe, Check } from 'lucide-react';

// Mock language data - in a real app, this would come from i18n configuration
const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
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
        className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none"
        aria-label="Select language"
        title="Change language"
      >
        <Globe className="h-4 w-4 text-muted-foreground" />
      </button>
    </div>
  );
}

export default LanguageSelector; 