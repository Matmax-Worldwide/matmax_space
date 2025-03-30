"use client";

export default function StorePage() {
  return (
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-zinc-800 border border-border rounded-lg shadow-sm p-5">
          <h2 className="text-lg font-medium mb-3 text-pink-600">Active Products</h2>
          <p className="text-3xl font-bold">42</p>
          <p className="text-sm text-muted-foreground mt-1">+3 this month</p>
        </div>
        
        <div className="bg-white dark:bg-zinc-800 border border-border rounded-lg shadow-sm p-5">
          <h2 className="text-lg font-medium mb-3 text-pink-600">Total Orders</h2>
          <p className="text-3xl font-bold">189</p>
          <p className="text-sm text-muted-foreground mt-1">+12% from last month</p>
        </div>
        
        <div className="bg-white dark:bg-zinc-800 border border-border rounded-lg shadow-sm p-5">
          <h2 className="text-lg font-medium mb-3 text-pink-600">Avg. Order Value</h2>
          <p className="text-3xl font-bold">$78.50</p>
          <p className="text-sm text-muted-foreground mt-1">+5% from last month</p>
        </div>
        
        <div className="bg-white dark:bg-zinc-800 border border-border rounded-lg shadow-sm p-5">
          <h2 className="text-lg font-medium mb-3 text-pink-600">Monthly Revenue</h2>
          <p className="text-3xl font-bold">$14,836</p>
          <p className="text-sm text-muted-foreground mt-1">+8% from last month</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-zinc-800 border border-border rounded-lg shadow-sm p-5">
          <h2 className="text-xl font-semibold mb-4 text-pink-600">Product Management</h2>
          <p className="mb-2 text-muted-foreground">Manage your products and inventory.</p>
          <div className="space-y-2">
            <div className="bg-pink-50 dark:bg-pink-900/20 p-3 rounded-md">
              <h3 className="font-medium text-pink-700 dark:text-pink-400">Top Categories</h3>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Wellness</span>
                  <span className="text-pink-600">18 products</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Fitness</span>
                  <span className="text-pink-600">12 products</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Nutrition</span>
                  <span className="text-pink-600">8 products</span>
                </div>
              </div>
            </div>
            <div className="bg-pink-50 dark:bg-pink-900/20 p-3 rounded-md">
              <h3 className="font-medium text-pink-700 dark:text-pink-400">Low Stock Alert</h3>
              <p className="text-pink-600 dark:text-pink-500 text-sm">5 products need restocking</p>
              <button className="mt-2 text-xs text-white bg-pink-600 hover:bg-pink-700 px-2 py-1 rounded">
                View Inventory
              </button>
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
              <span className="text-sm font-medium">Customer Satisfaction</span>
              <span className="text-sm text-pink-600">4.8/5.0</span>
            </div>
            <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2 mb-4">
              <div className="bg-pink-500 h-2 rounded-full" style={{ width: '96%' }}></div>
            </div>
            
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <div className="bg-pink-50 dark:bg-pink-900/20 rounded-md p-2">
                <div className="text-sm font-medium">Pending</div>
                <div className="text-xl font-bold text-pink-600">12</div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-md p-2">
                <div className="text-sm font-medium">Processing</div>
                <div className="text-xl font-bold text-blue-600">8</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-md p-2">
                <div className="text-sm font-medium">Completed</div>
                <div className="text-xl font-bold text-green-600">169</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-zinc-800 border border-border rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex justify-between items-center">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
          <button className="text-sm text-pink-600 hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 dark:bg-neutral-800 text-left">
              <tr>
                <th className="py-3 px-4 font-medium">Order ID</th>
                <th className="py-3 px-4 font-medium">Customer</th>
                <th className="py-3 px-4 font-medium">Products</th>
                <th className="py-3 px-4 font-medium">Total</th>
                <th className="py-3 px-4 font-medium">Date</th>
                <th className="py-3 px-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="py-3 px-4">#1092</td>
                <td className="py-3 px-4">Emma Wilson</td>
                <td className="py-3 px-4">Wellness Package</td>
                <td className="py-3 px-4 font-medium">$125.00</td>
                <td className="py-3 px-4 text-muted-foreground">Today, 10:30 AM</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                    Completed
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4">#1091</td>
                <td className="py-3 px-4">Michael Brown</td>
                <td className="py-3 px-4">Fitness Starter Kit</td>
                <td className="py-3 px-4 font-medium">$89.99</td>
                <td className="py-3 px-4 text-muted-foreground">Today, 9:15 AM</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    Processing
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4">#1090</td>
                <td className="py-3 px-4">James Taylor</td>
                <td className="py-3 px-4">Nutrition Consultation</td>
                <td className="py-3 px-4 font-medium">$150.00</td>
                <td className="py-3 px-4 text-muted-foreground">Yesterday, 2:45 PM</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                    Completed
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4">#1089</td>
                <td className="py-3 px-4">Sarah Johnson</td>
                <td className="py-3 px-4">Monthly Subscription Box</td>
                <td className="py-3 px-4 font-medium">$49.99</td>
                <td className="py-3 px-4 text-muted-foreground">Yesterday, 11:20 AM</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-pink-100 text-pink-800">
                    Pending
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4">#1088</td>
                <td className="py-3 px-4">David Miller</td>
                <td className="py-3 px-4">Wellness Workshop Ticket</td>
                <td className="py-3 px-4 font-medium">$75.00</td>
                <td className="py-3 px-4 text-muted-foreground">2 days ago</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                    Completed
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


