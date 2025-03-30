import DashboardLayout from '@/src/core/ui/layouts/templates/DashboardLayout';
import { 
  CreditCard, 
  DollarSign, 
  PieChart, 
  BarChart3, 
  ArrowUpRight, 
  ArrowDownRight,
  Wallet,
  Clock,
  CheckCircle,
  XCircle,
  Filter
} from 'lucide-react';

export default function PaymentsPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Payments Dashboard</h1>
            <p className="text-muted-foreground">Track and manage transaction activity</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-white dark:bg-neutral-800 text-foreground px-4 py-2 rounded-md border border-border shadow-sm flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
            <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-md flex items-center">
              <DollarSign className="h-4 w-4 mr-2" />
              New Transaction
            </button>
          </div>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-border shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-medium mb-2">Monthly Revenue</h2>
                <div className="text-3xl font-bold">$58,647</div>
                <div className="flex items-center text-sm text-green-600 mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>8.2% from last month</span>
                </div>
              </div>
              <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-md">
                <DollarSign className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-border shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-medium mb-2">Transactions</h2>
                <div className="text-3xl font-bold">1,234</div>
                <div className="flex items-center text-sm text-green-600 mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>12.5% increase</span>
                </div>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-md">
                <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-border shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-medium mb-2">Average Purchase</h2>
                <div className="text-3xl font-bold">$47.54</div>
                <div className="flex items-center text-sm text-red-600 mt-1">
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                  <span>3.2% decrease</span>
                </div>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-md">
                <PieChart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-border shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-medium mb-2">Pending Payments</h2>
                <div className="text-3xl font-bold">$12,580</div>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>24 transactions</span>
                </div>
              </div>
              <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-md">
                <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Revenue Chart */}
        <div className="bg-white dark:bg-neutral-800 rounded-lg border border-border shadow-sm mb-6 p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Revenue Overview</h2>
            <div className="flex gap-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm text-muted-foreground">Revenue</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                <span className="text-sm text-muted-foreground">Expenses</span>
              </div>
            </div>
          </div>
          
          {/* Mock Chart - In a real app, use a chart library */}
          <div className="h-64 relative">
            <div className="absolute inset-0 flex items-end justify-between px-4">
              <div className="w-1/12 h-[70%] bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md"></div>
              <div className="w-1/12 h-[45%] bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md"></div>
              <div className="w-1/12 h-[90%] bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md"></div>
              <div className="w-1/12 h-[60%] bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md"></div>
              <div className="w-1/12 h-[85%] bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md"></div>
              <div className="w-1/12 h-[50%] bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md"></div>
              <div className="w-1/12 h-[65%] bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md"></div>
              <div className="w-1/12 h-[75%] bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md"></div>
              <div className="w-1/12 h-[40%] bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md"></div>
              <div className="w-1/12 h-[80%] bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md"></div>
              <div className="w-1/12 h-[95%] bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md"></div>
              <div className="w-1/12 h-[75%] bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md"></div>
            </div>
          </div>
          
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <div>Jan</div>
            <div>Feb</div>
            <div>Mar</div>
            <div>Apr</div>
            <div>May</div>
            <div>Jun</div>
            <div>Jul</div>
            <div>Aug</div>
            <div>Sep</div>
            <div>Oct</div>
            <div>Nov</div>
            <div>Dec</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Transactions */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-neutral-800 rounded-lg border border-border shadow-sm">
              <div className="p-4 border-b border-border flex justify-between items-center">
                <h2 className="text-xl font-bold">Recent Transactions</h2>
                <div className="flex items-center">
                  <select className="text-sm border border-border rounded-md px-3 py-1.5 mr-2 bg-transparent focus:outline-none focus:ring-1 focus:ring-primary">
                    <option>All Transactions</option>
                    <option>Completed</option>
                    <option>Pending</option>
                    <option>Failed</option>
                  </select>
                  <button className="text-sm text-primary hover:underline">View all</button>
                </div>
              </div>
              <div className="p-4">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-muted-foreground text-sm">
                      <th className="pb-3 font-medium">ID</th>
                      <th className="pb-3 font-medium">Customer</th>
                      <th className="pb-3 font-medium">Amount</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-3 pr-4 text-sm">#TRX-789</td>
                      <td className="py-3 pr-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium mr-2">JD</div>
                          <div>
                            <div className="font-medium">John Doe</div>
                            <div className="text-xs text-muted-foreground">john@example.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 pr-4 font-medium">$299.99</td>
                      <td className="py-3 pr-4 text-sm text-muted-foreground">Today, 10:45 AM</td>
                      <td className="py-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          Completed
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 pr-4 text-sm">#TRX-788</td>
                      <td className="py-3 pr-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-medium mr-2">AS</div>
                          <div>
                            <div className="font-medium">Alice Smith</div>
                            <div className="text-xs text-muted-foreground">alice@example.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 pr-4 font-medium">$149.50</td>
                      <td className="py-3 pr-4 text-sm text-muted-foreground">Today, 9:12 AM</td>
                      <td className="py-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
                          Pending
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 pr-4 text-sm">#TRX-787</td>
                      <td className="py-3 pr-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-medium mr-2">RJ</div>
                          <div>
                            <div className="font-medium">Robert Johnson</div>
                            <div className="text-xs text-muted-foreground">robert@example.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 pr-4 font-medium">$75.20</td>
                      <td className="py-3 pr-4 text-sm text-muted-foreground">Yesterday, 5:30 PM</td>
                      <td className="py-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          Completed
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 pr-4 text-sm">#TRX-786</td>
                      <td className="py-3 pr-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-medium mr-2">EW</div>
                          <div>
                            <div className="font-medium">Emily Wong</div>
                            <div className="text-xs text-muted-foreground">emily@example.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 pr-4 font-medium">$432.25</td>
                      <td className="py-3 pr-4 text-sm text-muted-foreground">Yesterday, 2:15 PM</td>
                      <td className="py-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                          Failed
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-sm">#TRX-785</td>
                      <td className="py-3 pr-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-medium mr-2">DT</div>
                          <div>
                            <div className="font-medium">David Thompson</div>
                            <div className="text-xs text-muted-foreground">david@example.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 pr-4 font-medium">$199.00</td>
                      <td className="py-3 pr-4 text-sm text-muted-foreground">Jun 12, 11:24 AM</td>
                      <td className="py-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          Completed
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Payment Methods & Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-neutral-800 rounded-lg border border-border shadow-sm mb-6">
              <div className="p-4 border-b border-border">
                <h2 className="text-xl font-bold">Payment Methods</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center p-3 border border-border rounded-md bg-gray-50 dark:bg-neutral-900">
                    <div className="mr-3 h-12 w-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900/40 rounded-md">
                      <CreditCard className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-grow">
                      <div className="font-medium">Credit Card</div>
                      <div className="text-sm text-muted-foreground">**** **** **** 4589</div>
                    </div>
                    <div className="text-sm font-medium text-blue-600">Primary</div>
                  </div>
                  
                  <div className="flex items-center p-3 border border-border rounded-md">
                    <div className="mr-3 h-12 w-12 flex items-center justify-center bg-purple-100 dark:bg-purple-900/40 rounded-md">
                      <Wallet className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="flex-grow">
                      <div className="font-medium">PayPal</div>
                      <div className="text-sm text-muted-foreground">user@example.com</div>
                    </div>
                    <button className="text-sm text-blue-600 hover:underline">Edit</button>
                  </div>
                  
                  <button className="w-full py-2 border border-dashed border-border rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center">
                    <span className="mr-2">+</span> Add payment method
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-neutral-800 rounded-lg border border-border shadow-sm">
              <div className="p-4 border-b border-border">
                <h2 className="text-xl font-bold">Transaction Summary</h2>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm">Completed</span>
                    </div>
                    <div className="font-medium">412</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-orange-600 mr-2" />
                      <span className="text-sm">Pending</span>
                    </div>
                    <div className="font-medium">24</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <XCircle className="h-4 w-4 text-red-600 mr-2" />
                      <span className="text-sm">Failed</span>
                    </div>
                    <div className="font-medium">8</div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Success rate</span>
                    <span className="text-sm font-medium">92.8%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-neutral-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '92.8%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 