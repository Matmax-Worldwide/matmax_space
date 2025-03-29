"use client";

import { useState } from 'react';
import { DashboardLayout } from '../../../src/core/ui/layouts/templates/DashboardLayout';

// Mock country data
const MOCK_COUNTRIES = [
  { id: '1', code: 'US', name: 'United States', flag: '🇺🇸', isActive: true },
  { id: '2', code: 'CA', name: 'Canada', flag: '🇨🇦', isActive: true },
  { id: '3', code: 'GB', name: 'United Kingdom', flag: '🇬🇧', isActive: true },
  { id: '4', code: 'DE', name: 'Germany', flag: '🇩🇪', isActive: true },
  { id: '5', code: 'FR', name: 'France', flag: '🇫🇷', isActive: true },
  { id: '6', code: 'JP', name: 'Japan', flag: '🇯🇵', isActive: false },
  { id: '7', code: 'AU', name: 'Australia', flag: '🇦🇺', isActive: true },
];

export default function CountriesPage() {
  const [countries] = useState(MOCK_COUNTRIES);
  const [searchTerm, setSearchTerm] = useState('');
  const [showInactive, setShowInactive] = useState(false);
  
  // Filter countries based on search term and active status
  const filteredCountries = countries.filter(country => {
    // Filter by search term
    const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          country.code.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by active status
    const matchesStatus = showInactive ? true : country.isActive;
    
    return matchesSearch && matchesStatus;
  });
  
  return (
    <DashboardLayout>
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-2xl font-bold">Countries</h1>
          <button className="mt-2 sm:mt-0 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm">
            Add Country
          </button>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showInactive"
              checked={showInactive}
              onChange={() => setShowInactive(!showInactive)}
              className="mr-2"
            />
            <label htmlFor="showInactive" className="text-sm">
              Show Inactive
            </label>
          </div>
        </div>
        
        {/* Countries table */}
        <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3 text-left text-sm font-medium">Flag</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Code</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredCountries.map((country) => (
                  <tr key={country.id} className="hover:bg-muted/20">
                    <td className="px-4 py-3 text-left">
                      <span className="text-2xl">{country.flag}</span>
                    </td>
                    <td className="px-4 py-3 text-left font-medium">{country.code}</td>
                    <td className="px-4 py-3 text-left">{country.name}</td>
                    <td className="px-4 py-3 text-left">
                      <span className={`inline-flex px-2 py-1 text-xs rounded-full ${country.isActive ? 'bg-green-100 text-green-800' : 'bg-neutral-100 text-neutral-800'}`}>
                        {country.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-left">
                      <div className="flex space-x-2">
                        <button className="text-sm text-blue-600 hover:text-blue-800">Edit</button>
                        <button className="text-sm text-error hover:text-error/80">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {filteredCountries.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-6 text-center text-muted-foreground">
                      No countries found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 