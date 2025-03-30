"use client";

import React, { useEffect, Suspense } from 'react';
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
  <div className="space-y-8">
    <h1 className="text-2xl font-bold mb-1">Store Dashboard</h1>
    <p className="text-muted-foreground">Store functionality coming soon</p>
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
  
  // Get section from URL parameter
  const sectionParam = searchParams.get('section')?.toLowerCase();
  
  useEffect(() => {
    console.log(`Protected page loaded with section param: ${sectionParam}`);
    console.log(`Current active section: ${activeSection}`);
    
    // If section param is provided, set it as active
    if (sectionParam) {
      console.log(`Setting active section to: ${sectionParam}`);
      setActiveSection(sectionParam);
      
      // Save to localStorage for persistence
      if (typeof window !== 'undefined') {
        localStorage.setItem('activeSection', sectionParam);
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
  
  return (
    <DashboardLayout>
      <div className="w-full">
        {renderSection()}
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
