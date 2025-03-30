"use client";

export default function FinancePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Finance Dashboard</h1>
      
      <div className="bg-sky-50 border border-sky-200 rounded-md p-4 mb-6 flex gap-3 items-start">
        <svg className="text-sky-500 mt-0.5" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div>
          <h3 className="font-medium text-sky-800">Finance Module</h3>
          <p className="text-sky-700">This is the financial management section of MatMax Wellness Studio.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-zinc-800 border border-border rounded-lg shadow-sm p-5">
          <h2 className="text-xl font-semibold mb-4 text-sky-600">Financial Reports</h2>
          <p className="mb-2 text-muted-foreground">Track financial performance and metrics.</p>
          <div className="space-y-2">
            <div className="bg-sky-50 dark:bg-sky-900/20 p-3 rounded-md">
              <h3 className="font-medium text-sky-700 dark:text-sky-400">Monthly Summary</h3>
              <p className="text-sky-600 dark:text-sky-500 text-sm">Current month revenue: $45,850</p>
            </div>
            <div className="bg-sky-50 dark:bg-sky-900/20 p-3 rounded-md">
              <h3 className="font-medium text-sky-700 dark:text-sky-400">Quarterly Report</h3>
              <p className="text-sky-600 dark:text-sky-500 text-sm">Q2 growth: 12% year-over-year</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-zinc-800 border border-border rounded-lg shadow-sm p-5">
          <h2 className="text-xl font-semibold mb-4 text-sky-600">Budget Analysis</h2>
          <p className="mb-4 text-muted-foreground">Track spending against budget targets.</p>
          <div className="border-t border-border pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Marketing Budget</span>
              <span className="text-sm text-sky-600">68% used</span>
            </div>
            <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2 mb-4">
              <div className="bg-sky-500 h-2 rounded-full" style={{ width: '68%' }}></div>
            </div>
            
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Operations Budget</span>
              <span className="text-sm text-amber-600">82% used</span>
            </div>
            <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2 mb-4">
              <div className="bg-amber-500 h-2 rounded-full" style={{ width: '82%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 