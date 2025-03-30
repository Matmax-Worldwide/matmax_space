"use client";

import { createClient } from "@/utils/supabase/client";
import { InfoIcon, UserIcon, BarChartIcon, CreditCardIcon, LandmarkIcon, GraduationCap, ShieldCheck, Store } from "lucide-react";
import { redirect } from "next/navigation";
import { DashboardLayout } from "@/src/core/ui/layouts/templates/DashboardLayout";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useLayout } from "@/src/core/ui/layouts/providers/LayoutProvider";
import { cn } from "@/src/core/utils/styling";

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

export default function ProtectedPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const { activeSection, setActiveSection } = useLayout();
  
  // Get section from URL params
  const sectionParam = searchParams?.get('section');
  
  // Set active section from URL when component mounts - client-side only
  useEffect(() => {
    if (sectionParam) {
      // Normalize section to lowercase for consistency
      const normalizedSection = sectionParam.toLowerCase();
      console.log("Setting active section from URL param:", normalizedSection);
      
      // Set active section from URL parameter
      setActiveSection(normalizedSection);
      
      // Also store in localStorage for persistence across refreshes
      if (typeof window !== 'undefined') {
        localStorage.setItem('activeSection', normalizedSection);
        
        // Add data attribute to body for easier debugging
        document.body.setAttribute('data-active-section', normalizedSection);
        console.log(`Section activated: ${normalizedSection}`);
      }
    } else {
      // Check if we have a saved section in localStorage
      if (typeof window !== 'undefined') {
        const savedSection = localStorage.getItem('activeSection');
        if (savedSection) {
          const normalizedSection = savedSection.toLowerCase();
          console.log("Restoring saved section:", normalizedSection);
          
          setActiveSection(normalizedSection);
          
          // Add data attribute to body for easier debugging
          document.body.setAttribute('data-active-section', normalizedSection);
          
          // Redirect to include the section parameter for URL consistency
          window.history.replaceState(
            null, 
            '', 
            `${window.location.pathname}?section=${normalizedSection}`
          );
          console.log(`Section restored: ${normalizedSection}`);
        }
      }
    }
  }, [sectionParam, setActiveSection]);
  
  // For debugging
  useEffect(() => {
    console.log("Current active section:", activeSection);
  }, [activeSection]);
  
  useEffect(() => {
    async function getUser() {
      const supabase = createClient();
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        return redirect("/sign-in");
      }
      
      setUser(user);
      setLoading(false);
    }
    
    getUser();
  }, []);
  
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="animate-pulse">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  // Get the current section theme
  const sectionTheme = SECTION_THEMES[activeSection as keyof typeof SECTION_THEMES] || SECTION_THEMES.main;

  // Render different content based on the active section
  const renderSectionContent = () => {
    // Normalize the activeSection for case-insensitive comparison
    const normalizedSection = activeSection?.toLowerCase();
    
    console.log("Rendering content for section:", normalizedSection);
    
    // Double-check that the section rendering matches the section parameter in URL
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const sectionParam = urlParams.get('section')?.toLowerCase();
      
      if (sectionParam && sectionParam !== normalizedSection) {
        console.warn(`Mismatch between activeSection (${normalizedSection}) and URL parameter (${sectionParam})`);
      }
    }
    
    // Map each section name to its content function
    switch (normalizedSection) {
      case 'main':
        console.log("Rendering main section content");
        return mainContent();
      
      case 'lms':
        console.log("Rendering LMS section content");
        return lmsContent();
      
      case 'admin':
        console.log("Rendering admin section content");
        return adminContent();
      
      case 'payments':
        console.log("Rendering payments section content");
        return paymentsContent();
      
      case 'finance':
        console.log("Rendering finance section content");
        return financeContent();
      
      case 'store':
        console.log("Rendering store section content");
        return storeContent();
      
      default:
        console.log("Rendering default (main) section content");
        return mainContent();
    }
  };

  // Separate content functions for each section
  function financeContent() {
    return (
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Finance Dashboard</h1>
            <p className="text-muted-foreground">Track your financial wellness</p>
          </div>
          <div className="flex items-center gap-2">
            <div className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md",
              sectionTheme.bgLight, sectionTheme.bgDark
            )}>
              <LandmarkIcon size={18} className={sectionTheme.iconColor} />
              <span className={cn("font-medium", sectionTheme.textLight, sectionTheme.textDark)}>
                Finance Module
              </span>
            </div>
            <div className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-md border",
              sectionTheme.borderLight, sectionTheme.borderDark
            )}>
              <span className={cn("text-xs", sectionTheme.textLight, sectionTheme.textDark)}>Active Section</span>
              <div className={cn("h-2 w-2 rounded-full", sectionTheme.bgLight, sectionTheme.textLight)}></div>
            </div>
          </div>
        </div>
        
        <div className={cn(
          "text-sm p-4 rounded-md flex gap-3 items-start border",
          sectionTheme.bgLight, sectionTheme.bgDark,
          sectionTheme.textLight, sectionTheme.textDark,
          sectionTheme.borderLight, sectionTheme.borderDark
        )}>
          <InfoIcon size="18" className="mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium mb-1">Financial Wellness Center</p>
            <p>Manage your financial wellness journey, track expenses, and plan for your future.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 bg-card border border-border rounded-lg shadow-sm p-5">
            <h2 className={cn(
              "text-lg font-semibold mb-4 flex items-center",
              sectionTheme.textLight, sectionTheme.textDark
            )}>
              <BarChartIcon size={18} className="mr-2" /> 
              Financial Reports
            </h2>
            <div className="space-y-3">
              <div className={cn(
                "p-3 rounded-md",
                sectionTheme.bgLight + "/50", sectionTheme.bgDark + "/10"
              )}>
                <h3 className={cn(
                  "font-medium",
                  sectionTheme.textLight, sectionTheme.textDark
                )}>
                  Monthly Summary
                </h3>
                <p className="text-sm text-muted-foreground">View your spending patterns</p>
              </div>
              <div className={cn(
                "p-3 rounded-md",
                sectionTheme.bgLight + "/50", sectionTheme.bgDark + "/10"
              )}>
                <h3 className={cn(
                  "font-medium",
                  sectionTheme.textLight, sectionTheme.textDark
                )}>
                  Annual Reports
                </h3>
                <p className="text-sm text-muted-foreground">Track yearly financial progress</p>
              </div>
            </div>
          </div>
          
          <div className="col-span-2 bg-card border border-border rounded-lg shadow-sm p-5">
            <h2 className={cn(
              "text-lg font-semibold mb-4",
              sectionTheme.textLight, sectionTheme.textDark
            )}>
              Financial Wellness Plan
            </h2>
            <p className="text-muted-foreground mb-4">
              Your personalized financial wellness journey includes budget planning, expense tracking, and investment guidance.
            </p>
            <div className="space-y-4">
              <div className={cn(
                "border rounded-md p-3",
                sectionTheme.borderLight, sectionTheme.borderDark,
                sectionTheme.bgLight + "/30", sectionTheme.bgDark + "/10"
              )}>
                <h3 className={cn(
                  "font-medium",
                  sectionTheme.textLight, sectionTheme.textDark
                )}>
                  Budget Analysis
                </h3>
                <p className="text-sm text-muted-foreground">Review your budget performance</p>
              </div>
              <div className={cn(
                "border rounded-md p-3",
                sectionTheme.borderLight, sectionTheme.borderDark,
                sectionTheme.bgLight + "/30", sectionTheme.bgDark + "/10"
              )}>
                <h3 className={cn(
                  "font-medium",
                  sectionTheme.textLight, sectionTheme.textDark
                )}>
                  Expense Tracking
                </h3>
                <p className="text-sm text-muted-foreground">Monitor daily expenses and transactions</p>
              </div>
              <div className={cn(
                "border rounded-md p-3",
                sectionTheme.borderLight, sectionTheme.borderDark,
                sectionTheme.bgLight + "/30", sectionTheme.bgDark + "/10"
              )}>
                <h3 className={cn(
                  "font-medium",
                  sectionTheme.textLight, sectionTheme.textDark
                )}>
                  Investment Strategy
                </h3>
                <p className="text-sm text-muted-foreground">Plan your long-term financial growth</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function lmsContent() {
    return (
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Learning Management System</h1>
            <p className="text-muted-foreground">Manage courses and student progress</p>
          </div>
          <div className="flex items-center gap-2">
            <div className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md",
              sectionTheme.bgLight, sectionTheme.bgDark
            )}>
              <GraduationCap size={18} className={sectionTheme.iconColor} />
              <span className={cn("font-medium", sectionTheme.textLight, sectionTheme.textDark)}>
                LMS Module
              </span>
            </div>
            <div className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-md border",
              sectionTheme.borderLight, sectionTheme.borderDark
            )}>
              <span className={cn("text-xs", sectionTheme.textLight, sectionTheme.textDark)}>Active Section</span>
              <div className={cn("h-2 w-2 rounded-full", sectionTheme.bgLight, sectionTheme.textLight)}></div>
            </div>
          </div>
        </div>
        
        <div className={cn(
          "text-sm p-4 rounded-md flex gap-3 items-start border",
          sectionTheme.bgLight, sectionTheme.bgDark,
          sectionTheme.textLight, sectionTheme.textDark,
          sectionTheme.borderLight, sectionTheme.borderDark
        )}>
          <InfoIcon size="18" className="mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium mb-1">Learning Management Center</p>
            <p>Manage your courses, view student progress, and access instructor resources.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 bg-card border border-border rounded-lg shadow-sm p-5">
            <h2 className={cn(
              "text-lg font-semibold mb-4 flex items-center",
              sectionTheme.textLight, sectionTheme.textDark
            )}>
              <GraduationCap size={18} className="mr-2" /> 
              Course Management
            </h2>
            <div className="space-y-3">
              <div className={cn(
                "p-3 rounded-md",
                sectionTheme.bgLight + "/50", sectionTheme.bgDark + "/10"
              )}>
                <h3 className={cn(
                  "font-medium",
                  sectionTheme.textLight, sectionTheme.textDark
                )}>
                  Active Courses
                </h3>
                <p className="text-sm text-muted-foreground">Manage your current course offerings</p>
              </div>
              <div className={cn(
                "p-3 rounded-md",
                sectionTheme.bgLight + "/50", sectionTheme.bgDark + "/10"
              )}>
                <h3 className={cn(
                  "font-medium",
                  sectionTheme.textLight, sectionTheme.textDark
                )}>
                  Student Enrollment
                </h3>
                <p className="text-sm text-muted-foreground">View and manage student enrollments</p>
              </div>
            </div>
          </div>
          
          <div className="col-span-2 bg-card border border-border rounded-lg shadow-sm p-5">
            <h2 className={cn(
              "text-lg font-semibold mb-4",
              sectionTheme.textLight, sectionTheme.textDark
            )}>
              Learning Analytics
            </h2>
            <p className="text-muted-foreground mb-4">
              Track student progress, engagement metrics, and course effectiveness.
            </p>
            <div className="space-y-4">
              <div className={cn(
                "border rounded-md p-3",
                sectionTheme.borderLight, sectionTheme.borderDark,
                sectionTheme.bgLight + "/30", sectionTheme.bgDark + "/10"
              )}>
                <h3 className={cn(
                  "font-medium",
                  sectionTheme.textLight, sectionTheme.textDark
                )}>
                  Student Progress
                </h3>
                <p className="text-sm text-muted-foreground">View completion rates and assessment scores</p>
              </div>
              <div className={cn(
                "border rounded-md p-3",
                sectionTheme.borderLight, sectionTheme.borderDark,
                sectionTheme.bgLight + "/30", sectionTheme.bgDark + "/10"
              )}>
                <h3 className={cn(
                  "font-medium",
                  sectionTheme.textLight, sectionTheme.textDark
                )}>
                  Course Engagement
                </h3>
                <p className="text-sm text-muted-foreground">Monitor student activity and participation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function adminContent() {
    return (
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Admin Dashboard</h1>
            <p className="text-muted-foreground">System administration and management</p>
          </div>
          <div className="flex items-center gap-2">
            <div className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md",
              sectionTheme.bgLight, sectionTheme.bgDark
            )}>
              <ShieldCheck size={18} className={sectionTheme.iconColor} />
              <span className={cn("font-medium", sectionTheme.textLight, sectionTheme.textDark)}>
                Admin Module
              </span>
            </div>
            <div className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-md border",
              sectionTheme.borderLight, sectionTheme.borderDark
            )}>
              <span className={cn("text-xs", sectionTheme.textLight, sectionTheme.textDark)}>Active Section</span>
              <div className={cn("h-2 w-2 rounded-full", sectionTheme.bgLight, sectionTheme.textLight)}></div>
            </div>
          </div>
        </div>
        
        <div className={cn(
          "text-sm p-4 rounded-md flex gap-3 items-start border",
          sectionTheme.bgLight, sectionTheme.bgDark,
          sectionTheme.textLight, sectionTheme.textDark,
          sectionTheme.borderLight, sectionTheme.borderDark
        )}>
          <InfoIcon size="18" className="mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium mb-1">System Administration</p>
            <p>Manage users, roles, permissions, and system settings.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 bg-card border border-border rounded-lg shadow-sm p-5">
            <h2 className={cn(
              "text-lg font-semibold mb-4 flex items-center",
              sectionTheme.textLight, sectionTheme.textDark
            )}>
              <ShieldCheck size={18} className="mr-2" /> 
              Security Controls
            </h2>
            <div className="space-y-3">
              <div className={cn(
                "p-3 rounded-md",
                sectionTheme.bgLight + "/50", sectionTheme.bgDark + "/10"
              )}>
                <h3 className={cn(
                  "font-medium",
                  sectionTheme.textLight, sectionTheme.textDark
                )}>
                  User Management
                </h3>
                <p className="text-sm text-muted-foreground">Manage users and permissions</p>
              </div>
              <div className={cn(
                "p-3 rounded-md",
                sectionTheme.bgLight + "/50", sectionTheme.bgDark + "/10"
              )}>
                <h3 className={cn(
                  "font-medium",
                  sectionTheme.textLight, sectionTheme.textDark
                )}>
                  Audit Logs
                </h3>
                <p className="text-sm text-muted-foreground">Review system activity and changes</p>
              </div>
            </div>
          </div>
          
          <div className="col-span-2 bg-card border border-border rounded-lg shadow-sm p-5">
            <h2 className={cn(
              "text-lg font-semibold mb-4",
              sectionTheme.textLight, sectionTheme.textDark
            )}>
              System Overview
            </h2>
            <p className="text-muted-foreground mb-4">
              Monitor system health and configuration.
            </p>
            <div className="space-y-4">
              <div className={cn(
                "border rounded-md p-3",
                sectionTheme.borderLight, sectionTheme.borderDark,
                sectionTheme.bgLight + "/30", sectionTheme.bgDark + "/10"
              )}>
                <h3 className={cn(
                  "font-medium",
                  sectionTheme.textLight, sectionTheme.textDark
                )}>
                  Role Management
                </h3>
                <p className="text-sm text-muted-foreground">Define and assign user roles</p>
              </div>
              <div className={cn(
                "border rounded-md p-3",
                sectionTheme.borderLight, sectionTheme.borderDark,
                sectionTheme.bgLight + "/30", sectionTheme.bgDark + "/10"
              )}>
                <h3 className={cn(
                  "font-medium",
                  sectionTheme.textLight, sectionTheme.textDark
                )}>
                  System Configuration
                </h3>
                <p className="text-sm text-muted-foreground">Adjust global settings and preferences</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function paymentsContent() {
    return (
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Payments Dashboard</h1>
            <p className="text-muted-foreground">Manage payments and transactions</p>
          </div>
          <div className="flex items-center gap-2">
            <div className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md",
              sectionTheme.bgLight, sectionTheme.bgDark
            )}>
              <CreditCardIcon size={18} className={sectionTheme.iconColor} />
              <span className={cn("font-medium", sectionTheme.textLight, sectionTheme.textDark)}>
                Payments Module
              </span>
            </div>
            <div className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-md border",
              sectionTheme.borderLight, sectionTheme.borderDark
            )}>
              <span className={cn("text-xs", sectionTheme.textLight, sectionTheme.textDark)}>Active Section</span>
              <div className={cn("h-2 w-2 rounded-full", sectionTheme.bgLight, sectionTheme.textLight)}></div>
            </div>
          </div>
        </div>
        
        <div className={cn(
          "text-sm p-4 rounded-md flex gap-3 items-start border",
          sectionTheme.bgLight, sectionTheme.bgDark,
          sectionTheme.textLight, sectionTheme.textDark,
          sectionTheme.borderLight, sectionTheme.borderDark
        )}>
          <InfoIcon size="18" className="mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium mb-1">Payment Management Center</p>
            <p>Process transactions, manage invoices, and track payment activity.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 bg-card border border-border rounded-lg shadow-sm p-5">
            <h2 className={cn(
              "text-lg font-semibold mb-4 flex items-center",
              sectionTheme.textLight, sectionTheme.textDark
            )}>
              <CreditCardIcon size={18} className="mr-2" /> 
              Transaction Management
            </h2>
            <div className="space-y-3">
              <div className={cn(
                "p-3 rounded-md",
                sectionTheme.bgLight + "/50", sectionTheme.bgDark + "/10"
              )}>
                <h3 className={cn(
                  "font-medium",
                  sectionTheme.textLight, sectionTheme.textDark
                )}>
                  Recent Transactions
                </h3>
                <p className="text-sm text-muted-foreground">View and manage payment activity</p>
              </div>
              <div className={cn(
                "p-3 rounded-md",
                sectionTheme.bgLight + "/50", sectionTheme.bgDark + "/10"
              )}>
                <h3 className={cn(
                  "font-medium",
                  sectionTheme.textLight, sectionTheme.textDark
                )}>
                  Invoices
                </h3>
                <p className="text-sm text-muted-foreground">Manage billing and invoices</p>
              </div>
            </div>
          </div>
          
          <div className="col-span-2 bg-card border border-border rounded-lg shadow-sm p-5">
            <h2 className={cn(
              "text-lg font-semibold mb-4",
              sectionTheme.textLight, sectionTheme.textDark
            )}>
              Payment Analytics
            </h2>
            <p className="text-muted-foreground mb-4">
              Track payment metrics and financial performance.
            </p>
            <div className="space-y-4">
              <div className={cn(
                "border rounded-md p-3",
                sectionTheme.borderLight, sectionTheme.borderDark,
                sectionTheme.bgLight + "/30", sectionTheme.bgDark + "/10"
              )}>
                <h3 className={cn(
                  "font-medium",
                  sectionTheme.textLight, sectionTheme.textDark
                )}>
                  Revenue Overview
                </h3>
                <p className="text-sm text-muted-foreground">View payment trends and totals</p>
              </div>
              <div className={cn(
                "border rounded-md p-3",
                sectionTheme.borderLight, sectionTheme.borderDark,
                sectionTheme.bgLight + "/30", sectionTheme.bgDark + "/10"
              )}>
                <h3 className={cn(
                  "font-medium",
                  sectionTheme.textLight, sectionTheme.textDark
                )}>
                  Transaction History
                </h3>
                <p className="text-sm text-muted-foreground">Review historical payment data</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function storeContent() {
    return (
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Store Dashboard</h1>
            <p className="text-muted-foreground">Manage your product catalog and orders</p>
          </div>
          <div className="flex items-center gap-2">
            <div className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md",
              sectionTheme.bgLight, sectionTheme.bgDark
            )}>
              <Store size={18} className={sectionTheme.iconColor} />
              <span className={cn("font-medium", sectionTheme.textLight, sectionTheme.textDark)}>
                Store Module
              </span>
            </div>
            <div className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-md border",
              sectionTheme.borderLight, sectionTheme.borderDark
            )}>
              <span className={cn("text-xs", sectionTheme.textLight, sectionTheme.textDark)}>Active Section</span>
              <div className={cn("h-2 w-2 rounded-full", sectionTheme.bgLight, sectionTheme.textLight)}></div>
            </div>
          </div>
        </div>
        
        <div className={cn(
          "text-sm p-4 rounded-md flex gap-3 items-start border",
          sectionTheme.bgLight, sectionTheme.bgDark,
          sectionTheme.textLight, sectionTheme.textDark,
          sectionTheme.borderLight, sectionTheme.borderDark
        )}>
          <InfoIcon size="18" className="mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium mb-1">Store Management Center</p>
            <p>Manage products, track inventory, and process customer orders.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 bg-card border border-border rounded-lg shadow-sm p-5">
            <h2 className={cn(
              "text-lg font-semibold mb-4 flex items-center",
              sectionTheme.textLight, sectionTheme.textDark
            )}>
              <Store size={18} className="mr-2" /> 
              Product Management
            </h2>
            <div className="space-y-3">
              <div className={cn(
                "p-3 rounded-md",
                sectionTheme.bgLight + "/50", sectionTheme.bgDark + "/10"
              )}>
                <h3 className={cn(
                  "font-medium",
                  sectionTheme.textLight, sectionTheme.textDark
                )}>
                  Product Catalog
                </h3>
                <p className="text-sm text-muted-foreground">Manage your store inventory</p>
              </div>
              <div className={cn(
                "p-3 rounded-md",
                sectionTheme.bgLight + "/50", sectionTheme.bgDark + "/10"
              )}>
                <h3 className={cn(
                  "font-medium",
                  sectionTheme.textLight, sectionTheme.textDark
                )}>
                  Sales Analytics
                </h3>
                <p className="text-sm text-muted-foreground">Track product performance</p>
              </div>
            </div>
          </div>
          
          <div className="col-span-2 bg-card border border-border rounded-lg shadow-sm p-5">
            <h2 className={cn(
              "text-lg font-semibold mb-4",
              sectionTheme.textLight, sectionTheme.textDark
            )}>
              Order Management
            </h2>
            <p className="text-muted-foreground mb-4">
              Process and track customer orders and shipments.
            </p>
            <div className="space-y-4">
              <div className={cn(
                "border rounded-md p-3",
                sectionTheme.borderLight, sectionTheme.borderDark,
                sectionTheme.bgLight + "/30", sectionTheme.bgDark + "/10"
              )}>
                <h3 className={cn(
                  "font-medium",
                  sectionTheme.textLight, sectionTheme.textDark
                )}>
                  Recent Orders
                </h3>
                <p className="text-sm text-muted-foreground">View and manage customer orders</p>
              </div>
              <div className={cn(
                "border rounded-md p-3",
                sectionTheme.borderLight, sectionTheme.borderDark,
                sectionTheme.bgLight + "/30", sectionTheme.bgDark + "/10"
              )}>
                <h3 className={cn(
                  "font-medium",
                  sectionTheme.textLight, sectionTheme.textDark
                )}>
                  Customer Management
                </h3>
                <p className="text-sm text-muted-foreground">View customer profiles and history</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function mainContent() {
    const mainTheme = SECTION_THEMES.main;
    return (
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Welcome to MatMax Wellness Studio</h1>
            <p className="text-muted-foreground">Your personal wellness dashboard</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="mt-4 md:mt-0">
              <Image 
                src="/logo_mtmx_black-01.svg" 
                alt="MatMax Wellness Studio" 
                width={120} 
                height={48}
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-md border",
              mainTheme.borderLight, mainTheme.borderDark
            )}>
              <span className={cn("text-xs", mainTheme.textLight, mainTheme.textDark)}>Active Section</span>
              <div className={cn("h-2 w-2 rounded-full", mainTheme.bgLight, mainTheme.textLight)}></div>
            </div>
          </div>
        </div>
        
        <div className={cn(
          "text-sm p-4 rounded-md flex gap-3 items-start border",
          mainTheme.bgLight, mainTheme.bgDark,
          mainTheme.textLight, mainTheme.textDark,
          mainTheme.borderLight, mainTheme.borderDark
        )}>
          <InfoIcon size="18" className="mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium mb-1">Welcome to your protected wellness dashboard</p>
            <p>This area is designed exclusively for MatMax Wellness Studio members. Here you can track your wellness journey, access personalized programs, and connect with your wellness coaches.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 bg-card border border-border rounded-lg shadow-sm p-5">
            <h2 className={cn(
              "text-lg font-semibold mb-4 flex items-center",
              mainTheme.textLight, mainTheme.textDark
            )}>
              <UserIcon size={18} className="mr-2" /> 
              Your Profile
            </h2>
            <pre className="text-xs font-mono p-3 rounded border bg-muted/30 max-h-[200px] overflow-auto">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
          
          <div className="col-span-2 bg-card border border-border rounded-lg shadow-sm p-5">
            <h2 className={cn(
              "text-lg font-semibold mb-4",
              mainTheme.textLight, mainTheme.textDark
            )}>
              Your Wellness Journey
            </h2>
            <p className="text-muted-foreground mb-4">
              Welcome to your personal MatMax Wellness Studio dashboard. This is where you'll track your progress, access your personalized programs, and connect with your wellness community.
            </p>
            <div className="space-y-4">
              <div className={cn(
                "border rounded-md p-3",
                mainTheme.borderLight, mainTheme.borderDark,
                mainTheme.bgLight + "/30", mainTheme.bgDark + "/10"
              )}>
                <h3 className={cn(
                  "font-medium",
                  mainTheme.textLight, mainTheme.textDark
                )}>
                  Program Progress
                </h3>
                <p className="text-sm text-muted-foreground">Track your wellness program milestones here</p>
              </div>
              <div className={cn(
                "border rounded-md p-3",
                mainTheme.borderLight, mainTheme.borderDark,
                mainTheme.bgLight + "/30", mainTheme.bgDark + "/10"
              )}>
                <h3 className={cn(
                  "font-medium",
                  mainTheme.textLight, mainTheme.textDark
                )}>
                  Upcoming Sessions
                </h3>
                <p className="text-sm text-muted-foreground">View your scheduled wellness sessions</p>
              </div>
              <div className={cn(
                "border rounded-md p-3",
                mainTheme.borderLight, mainTheme.borderDark,
                mainTheme.bgLight + "/30", mainTheme.bgDark + "/10"
              )}>
                <h3 className={cn(
                  "font-medium",
                  mainTheme.textLight, mainTheme.textDark
                )}>
                  Wellness Resources
                </h3>
                <p className="text-sm text-muted-foreground">Access your personalized wellness content</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      {renderSectionContent()}
    </DashboardLayout>
  );
}
