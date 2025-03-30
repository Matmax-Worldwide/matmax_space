import { DashboardLayout } from '@/src/core/ui/layouts/templates/DashboardLayout';
import { 
  BarChart3, 
  TrendingUp, 
  Wallet, 
  DollarSign, 
  FileText, 
  PieChart,
  Landmark,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Calendar,
  Printer
} from 'lucide-react';

export default function FinancePage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Financial Dashboard</h1>
            <p className="text-muted-foreground">Comprehensive overview of financial performance</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-white dark:bg-neutral-800 text-foreground px-4 py-2 rounded-md border border-border shadow-sm flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Q2 2023
            </button>
            <button className="bg-white dark:bg-neutral-800 text-foreground px-4 py-2 rounded-md border border-border shadow-sm flex items-center">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </button>
            <button className="bg-gradient-to-r from-sky-500 to-sky-600 text-white px-4 py-2 rounded-md flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>
        
        {/* Financial Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-border shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-medium mb-2">Total Revenue</h2>
                <div className="text-3xl font-bold">$2.4M</div>
                <div className="flex items-center text-sm text-green-600 mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>16.5% from last quarter</span>
                </div>
              </div>
              <div className="bg-sky-100 dark:bg-sky-900/30 p-2 rounded-md">
                <TrendingUp className="h-6 w-6 text-sky-600 dark:text-sky-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-border shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-medium mb-2">Total Expenses</h2>
                <div className="text-3xl font-bold">$1.8M</div>
                <div className="flex items-center text-sm text-red-600 mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>8.2% from last quarter</span>
                </div>
              </div>
              <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-md">
                <DollarSign className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-border shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-medium mb-2">Net Profit</h2>
                <div className="text-3xl font-bold">$584K</div>
                <div className="flex items-center text-sm text-green-600 mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>10.3% from last quarter</span>
                </div>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-md">
                <Wallet className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-border shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-medium mb-2">Cash Flow</h2>
                <div className="text-3xl font-bold">$350K</div>
                <div className="flex items-center text-sm text-red-600 mt-1">
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                  <span>4.8% from last quarter</span>
                </div>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-md">
                <Landmark className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Revenue & Expense Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white dark:bg-neutral-800 rounded-lg border border-border shadow-sm p-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Revenue vs Expenses</h2>
              <div className="flex gap-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-sky-500 mr-2"></div>
                  <span className="text-sm text-muted-foreground">Revenue</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-sm text-muted-foreground">Expenses</span>
                </div>
                <select className="text-sm border border-border rounded-md px-3 py-1 bg-transparent focus:outline-none focus:ring-1 focus:ring-primary">
                  <option>Quarterly</option>
                  <option>Monthly</option>
                  <option>Yearly</option>
                </select>
              </div>
            </div>
            
            {/* Mock Chart - In a real app, use a chart library */}
            <div className="h-72 relative">
              <div className="absolute inset-0 flex items-end justify-between px-4">
                {/* Revenue Bars */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-[65%] bg-gradient-to-t from-sky-600 to-sky-400 rounded-t-md relative group">
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap transition-opacity">
                      $520K
                    </div>
                  </div>
                  <div className="mt-1 w-8 h-[50%] bg-gradient-to-t from-red-600 to-red-400 rounded-t-md relative group">
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap transition-opacity">
                      $420K
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-[80%] bg-gradient-to-t from-sky-600 to-sky-400 rounded-t-md relative group">
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap transition-opacity">
                      $680K
                    </div>
                  </div>
                  <div className="mt-1 w-8 h-[60%] bg-gradient-to-t from-red-600 to-red-400 rounded-t-md relative group">
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap transition-opacity">
                      $520K
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-[90%] bg-gradient-to-t from-sky-600 to-sky-400 rounded-t-md relative group">
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap transition-opacity">
                      $760K
                    </div>
                  </div>
                  <div className="mt-1 w-8 h-[70%] bg-gradient-to-t from-red-600 to-red-400 rounded-t-md relative group">
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap transition-opacity">
                      $600K
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-[100%] bg-gradient-to-t from-sky-600 to-sky-400 rounded-t-md relative group">
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap transition-opacity">
                      $840K
                    </div>
                  </div>
                  <div className="mt-1 w-8 h-[75%] bg-gradient-to-t from-red-600 to-red-400 rounded-t-md relative group">
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap transition-opacity">
                      $640K
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <div>Q1 2022</div>
              <div>Q2 2022</div>
              <div>Q3 2022</div>
              <div>Q4 2022</div>
            </div>
          </div>
          
          {/* Expense Breakdown */}
          <div className="lg:col-span-1 bg-white dark:bg-neutral-800 rounded-lg border border-border shadow-sm p-4">
            <h2 className="text-xl font-bold mb-4">Expense Breakdown</h2>
            
            <div className="relative h-52 mb-6">
              {/* This would be a Pie Chart in a real app */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-32 h-32 rounded-full">
                  <div className="absolute inset-0 rounded-full border-[16px] border-blue-500 rotate-0"></div>
                  <div className="absolute inset-0 rounded-full border-[16px] border-green-500 rotate-[110deg]"></div>
                  <div className="absolute inset-0 rounded-full border-[16px] border-purple-500 rotate-[220deg]"></div>
                  <div className="absolute inset-0 rounded-full border-[16px] border-amber-500 rotate-[280deg]"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white dark:bg-neutral-800"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm">Operations</span>
                </div>
                <div className="flex space-x-4">
                  <span className="text-sm font-medium">$720K</span>
                  <span className="text-sm text-muted-foreground">40%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Marketing</span>
                </div>
                <div className="flex space-x-4">
                  <span className="text-sm font-medium">$360K</span>
                  <span className="text-sm text-muted-foreground">20%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                  <span className="text-sm">Research</span>
                </div>
                <div className="flex space-x-4">
                  <span className="text-sm font-medium">$540K</span>
                  <span className="text-sm text-muted-foreground">30%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                  <span className="text-sm">Other</span>
                </div>
                <div className="flex space-x-4">
                  <span className="text-sm font-medium">$180K</span>
                  <span className="text-sm text-muted-foreground">10%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Financial Reports */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-neutral-800 rounded-lg border border-border shadow-sm">
              <div className="p-4 border-b border-border flex justify-between items-center">
                <h2 className="text-xl font-bold">Financial Reports</h2>
                <div className="flex items-center">
                  <select className="text-sm border border-border rounded-md px-3 py-1.5 mr-2 bg-transparent focus:outline-none focus:ring-1 focus:ring-primary">
                    <option>All Reports</option>
                    <option>Income Statement</option>
                    <option>Balance Sheet</option>
                    <option>Cash Flow</option>
                  </select>
                  <button className="text-sm text-primary hover:underline">View all</button>
                </div>
              </div>
              <div className="p-4">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-muted-foreground text-sm">
                      <th className="pb-3 font-medium">Report</th>
                      <th className="pb-3 font-medium">Period</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-3 pr-4">
                        <div className="flex items-center">
                          <div className="p-1.5 bg-sky-100 dark:bg-sky-900/30 rounded mr-2">
                            <FileText className="h-4 w-4 text-sky-700 dark:text-sky-400" />
                          </div>
                          <span className="font-medium">Q2 2023 Balance Sheet</span>
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-sm">Apr-Jun 2023</td>
                      <td className="py-3 pr-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          Approved
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-sm text-muted-foreground">Jul 15, 2023</td>
                      <td className="py-3 flex space-x-2">
                        <button className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/20 rounded">
                          <FileText className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 pr-4">
                        <div className="flex items-center">
                          <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded mr-2">
                            <FileText className="h-4 w-4 text-green-700 dark:text-green-400" />
                          </div>
                          <span className="font-medium">Q2 2023 Income Statement</span>
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-sm">Apr-Jun 2023</td>
                      <td className="py-3 pr-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          Approved
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-sm text-muted-foreground">Jul 10, 2023</td>
                      <td className="py-3 flex space-x-2">
                        <button className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/20 rounded">
                          <FileText className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 pr-4">
                        <div className="flex items-center">
                          <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded mr-2">
                            <FileText className="h-4 w-4 text-blue-700 dark:text-blue-400" />
                          </div>
                          <span className="font-medium">Q2 2023 Cash Flow Statement</span>
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-sm">Apr-Jun 2023</td>
                      <td className="py-3 pr-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                          Pending
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-sm text-muted-foreground">In review</td>
                      <td className="py-3 flex space-x-2">
                        <button className="p-1 text-gray-400 cursor-not-allowed">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/20 rounded">
                          <FileText className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">
                        <div className="flex items-center">
                          <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded mr-2">
                            <FileText className="h-4 w-4 text-purple-700 dark:text-purple-400" />
                          </div>
                          <span className="font-medium">Q1 2023 Tax Filing</span>
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-sm">Jan-Mar 2023</td>
                      <td className="py-3 pr-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          Completed
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-sm text-muted-foreground">Apr 15, 2023</td>
                      <td className="py-3 flex space-x-2">
                        <button className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/20 rounded">
                          <FileText className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Key Performance Indicators */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-neutral-800 rounded-lg border border-border shadow-sm p-4">
              <h2 className="text-xl font-bold mb-4">Key Financial Indicators</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Gross Profit Margin</span>
                    <span className="text-sm font-medium">72%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-neutral-700 rounded-full h-2">
                    <div className="bg-sky-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                  <div className="mt-1 text-xs text-right text-green-600">2% increase</div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Net Profit Margin</span>
                    <span className="text-sm font-medium">24%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-neutral-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '24%' }}></div>
                  </div>
                  <div className="mt-1 text-xs text-right text-green-600">1.5% increase</div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Debt-to-Equity</span>
                    <span className="text-sm font-medium">0.45</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-neutral-700 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <div className="mt-1 text-xs text-right text-green-600">0.1 decrease</div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Return on Assets</span>
                    <span className="text-sm font-medium">18%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-neutral-700 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '18%' }}></div>
                  </div>
                  <div className="mt-1 text-xs text-right text-red-600">0.5% decrease</div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Current Ratio</span>
                    <span className="text-sm font-medium">2.1</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-neutral-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                  <div className="mt-1 text-xs text-right text-green-600">0.3 increase</div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-border">
                <button className="w-full py-2 border border-dashed border-border rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center">
                  <span className="mr-2">+</span> View full financial analysis
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 