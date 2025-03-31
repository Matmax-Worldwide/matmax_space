"use client";

import React, { useEffect, Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useLayout } from '@/src/core/ui/layouts/providers/LayoutProvider';
import { createClient } from "@/utils/supabase/client";
import { InfoIcon, UserIcon, BarChartIcon, CreditCardIcon, LandmarkIcon, GraduationCap, ShieldCheck, Store } from "lucide-react";
import { redirect } from "next/navigation";
import { DashboardLayout } from "@/src/core/ui/layouts/templates/DashboardLayout";
import Image from "next/image";
import { cn } from "@/src/core/utils/styling";

// Import actual page components
import MainSection from '@/app/dashboard/page';
import LMSSection from '@/app/lms/page';
import AdminSection from '@/app/admin/page';
import PaymentsSection from '@/app/payments/page';
import FinanceSection from '@/app/finance/page';

// Create placeholder for store page since it doesn't exist yet
const StoreSection = () => (
  <div>
    <h1 className="text-2xl font-bold mb-4">Store Dashboard</h1>
    
    <div className="bg-pink-50 border border-pink-200 rounded-md p-4 mb-6 flex gap-3 items-start">
      <svg className="text-pink-500 mt-0.5" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <div>
        <h3 className="font-medium text-pink-800">Store Module</h3>
        <p className="text-pink-700">This is the e-commerce store section of MatMax Wellness Studio.</p>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-zinc-800 border border-border rounded-lg shadow-sm p-5">
        <h2 className="text-xl font-semibold mb-4 text-pink-600">Product Management</h2>
        <p className="mb-2 text-muted-foreground">Manage your products and inventory.</p>
        <div className="space-y-2">
          <div className="bg-pink-50 dark:bg-pink-900/20 p-3 rounded-md">
            <h3 className="font-medium text-pink-700 dark:text-pink-400">Active Products</h3>
            <p className="text-pink-600 dark:text-pink-500 text-sm">42 products in catalog</p>
          </div>
          <div className="bg-pink-50 dark:bg-pink-900/20 p-3 rounded-md">
            <h3 className="font-medium text-pink-700 dark:text-pink-400">Low Stock Alert</h3>
            <p className="text-pink-600 dark:text-pink-500 text-sm">5 products need restocking</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-zinc-800 border border-border rounded-lg shadow-sm p-5">
        <h2 className="text-xl font-semibold mb-4 text-pink-600">Order Management</h2>
        <p className="mb-4 text-muted-foreground">Track and process customer orders.</p>
        <div className="border-t border-border pt-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Order Fulfillment Rate</span>
            <span className="text-sm text-green-600">94.7%</span>
          </div>
          <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2 mb-4">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '94.7%' }}></div>
          </div>
          
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Average Order Value</span>
            <span className="text-sm text-pink-600">$78.50</span>
          </div>
          <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2 mb-4">
            <div className="bg-pink-500 h-2 rounded-full" style={{ width: '78%' }}></div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
      <div className="bg-white dark:bg-zinc-800 border border-border rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border">
          <p className="font-medium">Order #1092 - Wellness Package</p>
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Customer: Emma Wilson</p>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">Completed</span>
          </div>
        </div>
        <div className="p-4 border-b border-border">
          <p className="font-medium">Order #1091 - Fitness Starter Kit</p>
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Customer: Michael Brown</p>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">Processing</span>
          </div>
        </div>
        <div className="p-4">
          <p className="font-medium">Order #1090 - Nutrition Consultation</p>
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Customer: James Taylor</p>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">Completed</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Define section color themes
const SECTION_THEMES = {
  main: {
    bgLight: 'bg-blue-50',
    bgDark: 'dark:bg-blue-900/20',
    textLight: 'text-blue-700',
    textDark: 'dark:text-blue-400',
    borderLight: 'border-blue-100',
    borderDark: 'dark:border-blue-800',
    gradientFrom: 'from-blue-400',
    gradientTo: 'to-blue-500',
    iconColor: 'text-blue-500',
  },
  lms: {
    bgLight: 'bg-green-50',
    bgDark: 'dark:bg-green-900/20',
    textLight: 'text-green-700',
    textDark: 'dark:text-green-400',
    borderLight: 'border-green-100',
    borderDark: 'dark:border-green-800',
    gradientFrom: 'from-green-400',
    gradientTo: 'to-green-500',
    iconColor: 'text-green-500',
  },
  admin: {
    bgLight: 'bg-purple-50',
    bgDark: 'dark:bg-purple-900/20',
    textLight: 'text-purple-700',
    textDark: 'dark:text-purple-400',
    borderLight: 'border-purple-100',
    borderDark: 'dark:border-purple-800',
    gradientFrom: 'from-purple-400',
    gradientTo: 'to-purple-500',
    iconColor: 'text-purple-500',
  },
  payments: {
    bgLight: 'bg-amber-50',
    bgDark: 'dark:bg-amber-900/20',
    textLight: 'text-amber-700',
    textDark: 'dark:text-amber-400',
    borderLight: 'border-amber-100',
    borderDark: 'dark:border-amber-800',
    gradientFrom: 'from-amber-400',
    gradientTo: 'to-amber-500',
    iconColor: 'text-amber-500',
  },
  finance: {
    bgLight: 'bg-sky-50',
    bgDark: 'dark:bg-sky-900/20',
    textLight: 'text-sky-700',
    textDark: 'dark:text-sky-400',
    borderLight: 'border-sky-100',
    borderDark: 'dark:border-sky-800',
    gradientFrom: 'from-sky-400',
    gradientTo: 'to-sky-500',
    iconColor: 'text-sky-500',
  },
  store: {
    bgLight: 'bg-pink-50',
    bgDark: 'dark:bg-pink-900/20',
    textLight: 'text-pink-700',
    textDark: 'dark:text-pink-400',
    borderLight: 'border-pink-100',
    borderDark: 'dark:border-pink-800',
    gradientFrom: 'from-pink-400',
    gradientTo: 'to-pink-500',
    iconColor: 'text-pink-500',
  }
};

function ProtectedPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { activeSection, setActiveSection } = useLayout();
  
  // Add state for fade transition
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentContent, setCurrentContent] = useState<React.ReactNode>(null);
  
  // Get section from URL parameter
  const sectionParam = searchParams.get('section')?.toLowerCase();
  
  useEffect(() => {
    console.log(`Protected page loaded with section param: ${sectionParam}`);
    console.log(`Current active section: ${activeSection}`);
    
    // If section param is provided, set it as active
    if (sectionParam) {
      console.log(`Setting active section to: ${sectionParam}`);
      
      // Start transition if it's a different section
      if (activeSection !== sectionParam) {
        setIsTransitioning(true);
        
        // After a short delay, update the section
        setTimeout(() => {
          setActiveSection(sectionParam);
          
          // Save to localStorage for persistence
          if (typeof window !== 'undefined') {
            localStorage.setItem('activeSection', sectionParam);
          }
          
          // End transition after content has updated
          setTimeout(() => {
            setIsTransitioning(false);
          }, 200);
        }, 150);
      }
    }
    // If no section param and no active section, redirect to dashboard
    else if (!activeSection) {
      console.log('No section param and no active section, redirecting to dashboard');
      router.push('/dashboard');
    }
  }, [sectionParam, activeSection, setActiveSection, router]);
  
  // Determine which section to show based on active section
  const renderSection = () => {
    if (!activeSection) {
      return <div>Loading...</div>;
    }
    
    console.log(`Rendering section: ${activeSection}`);
    
    // Switch based on active section
    switch (activeSection) {
      case 'main':
        return <MainSection />;
      case 'lms':
        return <LMSSection />;
      case 'admin':
        return <AdminSection />;
      case 'payments':
        return <PaymentsSection />;
      case 'finance':
        return <FinanceSection />;
      case 'store':
        return <StoreSection />;
      default:
        return <MainSection />;
    }
  };
  
  // Update current content when active section changes
  useEffect(() => {
    setCurrentContent(renderSection());
  }, [activeSection]);
  
  return (
    <DashboardLayout>
      <div 
        className={cn(
          "w-full transition-opacity duration-300 ease-in-out",
          isTransitioning ? "opacity-0" : "opacity-100"
        )}
      >
        {currentContent}
      </div>
    </DashboardLayout>
  );
}

export default function ProtectedPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProtectedPageContent />
    </Suspense>
  );
}
