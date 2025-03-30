"use client";

export default function PaymentsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Payments Dashboard</h1>
      
      <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6 flex gap-3 items-start">
        <svg className="text-amber-500 mt-0.5" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
          <div>
          <h3 className="font-medium text-amber-800">Payments Module</h3>
          <p className="text-amber-700">This is the payments processing section of MatMax Wellness Studio.</p>
            </div>
          </div>
          
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-zinc-800 border border-border rounded-lg shadow-sm p-5">
          <h2 className="text-xl font-semibold mb-4 text-amber-600">Transaction Management</h2>
          <p className="mb-2 text-muted-foreground">Process and track payment transactions.</p>
          <div className="space-y-2">
            <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md">
              <h3 className="font-medium text-amber-700 dark:text-amber-400">Recent Transactions</h3>
              <p className="text-amber-600 dark:text-amber-500 text-sm">24 transactions today</p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md">
              <h3 className="font-medium text-amber-700 dark:text-amber-400">Pending Approvals</h3>
              <p className="text-amber-600 dark:text-amber-500 text-sm">3 transactions awaiting approval</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-zinc-800 border border-border rounded-lg shadow-sm p-5">
          <h2 className="text-xl font-semibold mb-4 text-amber-600">Payment Analytics</h2>
          <p className="mb-4 text-muted-foreground">Monitor payment metrics and performance.</p>
          <div className="border-t border-border pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Success Rate</span>
              <span className="text-sm text-green-600">98.2%</span>
            </div>
            <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2 mb-4">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '98.2%' }}></div>
            </div>
            
                  <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Monthly Volume</span>
              <span className="text-sm text-amber-600">$24,500</span>
                  </div>
            <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2 mb-4">
              <div className="bg-amber-500 h-2 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 