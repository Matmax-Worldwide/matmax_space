"use client";

export default function AdminPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      
      <div className="bg-purple-50 border border-purple-200 rounded-md p-4 mb-6 flex gap-3 items-start">
        <svg className="text-purple-500 mt-0.5" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div>
          <h3 className="font-medium text-purple-800">Admin Module</h3>
          <p className="text-purple-700">This is the administration section of MatMax Wellness Studio.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-zinc-800 border border-border rounded-lg shadow-sm p-5">
          <h2 className="text-xl font-semibold mb-4 text-purple-600">User Management</h2>
          <p className="mb-2 text-muted-foreground">Manage users, roles, and permissions.</p>
          <div className="space-y-2">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-md">
              <h3 className="font-medium text-purple-700 dark:text-purple-400">Active Users</h3>
              <p className="text-purple-600 dark:text-purple-500 text-sm">128 users registered</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-md">
              <h3 className="font-medium text-purple-700 dark:text-purple-400">Security Alerts</h3>
              <p className="text-purple-600 dark:text-purple-500 text-sm">No active security alerts</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-zinc-800 border border-border rounded-lg shadow-sm p-5">
          <h2 className="text-xl font-semibold mb-4 text-purple-600">System Overview</h2>
          <p className="mb-4 text-muted-foreground">Monitor system health and activity.</p>
          <div className="border-t border-border pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">System Health</span>
              <span className="text-sm text-green-600">Healthy</span>
            </div>
            <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2 mb-4">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
            </div>
            
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Database Usage</span>
              <span className="text-sm text-yellow-600">42%</span>
            </div>
            <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2 mb-4">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '42%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 