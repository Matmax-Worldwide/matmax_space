"use client";

import { createClient } from "@/utils/supabase/client";
import { InfoIcon, UserIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { DashboardLayout } from "@/src/core/ui/layouts/templates/DashboardLayout";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ProtectedPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
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

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Welcome to MatMax Wellness Studio</h1>
            <p className="text-muted-foreground">Your personal wellness dashboard</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Image 
              src="/logo_mtmx_black-01.svg" 
              alt="MatMax Wellness Studio" 
              width={120} 
              height={48}
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
        
        <div className="bg-accent text-sm p-4 rounded-md text-foreground flex gap-3 items-start border border-accent/50">
          <InfoIcon size="18" className="mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium mb-1">Welcome to your protected wellness dashboard</p>
            <p>This area is designed exclusively for MatMax Wellness Studio members. Here you can track your wellness journey, access personalized programs, and connect with your wellness coaches.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 bg-card border border-border rounded-lg shadow-sm p-5">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <UserIcon size={18} className="mr-2" /> 
              Your Profile
            </h2>
            <pre className="text-xs font-mono p-3 rounded border bg-muted/30 max-h-[200px] overflow-auto">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
          
          <div className="col-span-2 bg-card border border-border rounded-lg shadow-sm p-5">
            <h2 className="text-lg font-semibold mb-4">Your Wellness Journey</h2>
            <p className="text-muted-foreground mb-4">
              Welcome to your personal MatMax Wellness Studio dashboard. This is where you'll track your progress, access your personalized programs, and connect with your wellness community.
            </p>
            <div className="space-y-4">
              <div className="border border-border rounded-md p-3">
                <h3 className="font-medium">Program Progress</h3>
                <p className="text-sm text-muted-foreground">Track your wellness program milestones here</p>
              </div>
              <div className="border border-border rounded-md p-3">
                <h3 className="font-medium">Upcoming Sessions</h3>
                <p className="text-sm text-muted-foreground">View your scheduled wellness sessions</p>
              </div>
              <div className="border border-border rounded-md p-3">
                <h3 className="font-medium">Wellness Resources</h3>
                <p className="text-sm text-muted-foreground">Access your personalized wellness content</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
