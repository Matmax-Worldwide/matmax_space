/**
 * Country entity representing a geographical region with specific regulations
 */
export interface Country {
  id: string;
  code: string;           // ISO country code (e.g., "US", "GB")
  name: string;           // Country name
  flag?: string | null;   // Flag emoji or URL
  isActive: boolean;      // Whether the country is active in the system
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Currency entity representing a medium of exchange
 */
export interface Currency {
  id: string;
  code: string;           // ISO currency code (e.g., "USD", "EUR")
  name: string;           // Currency name
  symbol: string;         // Currency symbol (e.g., "$", "€")
  decimalPlaces: number;  // Number of decimal places for the currency
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Relationship between Country and Currency with exchange rate information
 */
export interface CurrencyCountry {
  currencyId: string;
  countryId: string;
  isDefault: boolean;               // Whether this is the default currency for the country
  exchangeRate?: number | null;     // Exchange rate to the base currency
  lastUpdated?: Date | null;        // When the exchange rate was last updated
  currency?: Currency;              // Referenced currency
  country?: Country;                // Referenced country
}

/**
 * Language entity representing a human communication system
 */
export interface Language {
  id: string;
  code: string;           // ISO language code (e.g., "en", "es")
  name: string;           // Language name
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Relationship between Country and Language
 */
export interface LanguageCountry {
  languageId: string;
  countryId: string;
  isDefault: boolean;     // Whether this is the default language for the country
  language?: Language;    // Referenced language
  country?: Country;      // Referenced country
}

/**
 * Tax rate entity representing a country-specific taxation rate
 */
export interface TaxRate {
  id: string;
  countryId: string;
  name: string;           // Tax name (e.g., "VAT", "GST")
  rate: number;           // Tax rate as a percentage (e.g., 20.0 for 20%)
  isDefault: boolean;     // Whether this is the default tax rate for the country
  country?: Country;      // Referenced country
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Operating unit entity representing a business unit in a specific country
 */
export interface OperatingUnit {
  id: string;
  name: string;           // Operating unit name
  countryId: string;      // Country where the operating unit is located
  isHeadquarters: boolean; // Whether this is the company headquarters
  country?: Country;      // Referenced country
  createdAt: Date;
  updatedAt: Date;
} 