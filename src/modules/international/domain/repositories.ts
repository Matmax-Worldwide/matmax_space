import { Country, Currency, Language, TaxRate, OperatingUnit } from './models';

/**
 * Filter options for country queries
 */
export interface CountryFilterOptions {
  isActive?: boolean;     // Filter by active status
  searchTerm?: string;    // Search by name or code
  codes?: string[];       // Filter by specific ISO codes
}

/**
 * Data for creating or updating a country
 */
export interface CountryInput {
  code: string;
  name: string;
  flag?: string | null;
  isActive?: boolean;
  currencies?: CountryCurrencyInput[];  // Related currencies
  languages?: CountryLanguageInput[];   // Related languages
}

/**
 * Data for associating a currency with a country
 */
export interface CountryCurrencyInput {
  currencyId: string;
  isDefault?: boolean;
  exchangeRate?: number;
}

/**
 * Data for associating a language with a country
 */
export interface CountryLanguageInput {
  languageId: string;
  isDefault?: boolean;
}

/**
 * Repository interface for country operations
 */
export interface CountryRepository {
  findAll(options?: CountryFilterOptions): Promise<Country[]>;
  findById(id: string): Promise<Country | null>;
  findByCode(code: string): Promise<Country | null>;
  create(data: CountryInput): Promise<Country>;
  update(id: string, data: Partial<CountryInput>): Promise<Country>;
  delete(id: string): Promise<boolean>;
  addCurrency(countryId: string, data: CountryCurrencyInput): Promise<void>;
  removeCurrency(countryId: string, currencyId: string): Promise<void>;
  addLanguage(countryId: string, data: CountryLanguageInput): Promise<void>;
  removeLanguage(countryId: string, languageId: string): Promise<void>;
}

/**
 * Filter options for currency queries
 */
export interface CurrencyFilterOptions {
  searchTerm?: string;    // Search by name or code
  codes?: string[];       // Filter by specific ISO codes
}

/**
 * Data for creating or updating a currency
 */
export interface CurrencyInput {
  code: string;
  name: string;
  symbol: string;
  decimalPlaces?: number;
}

/**
 * Repository interface for currency operations
 */
export interface CurrencyRepository {
  findAll(options?: CurrencyFilterOptions): Promise<Currency[]>;
  findById(id: string): Promise<Currency | null>;
  findByCode(code: string): Promise<Currency | null>;
  create(data: CurrencyInput): Promise<Currency>;
  update(id: string, data: Partial<CurrencyInput>): Promise<Currency>;
  delete(id: string): Promise<boolean>;
} 