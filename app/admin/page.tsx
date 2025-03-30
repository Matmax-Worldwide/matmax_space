import { DashboardLayout } from '@/src/core/ui/layouts/templates/DashboardLayout';
import { 
  Shield, 
  Users, 
  Settings, 
  AlertTriangle, 
  BarChart3, 
  Lock, 
  Activity, 
  FileText 
} from 'lucide-react';

export default function AdminPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">System administration and user management</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-white dark:bg-neutral-800 text-foreground px-4 py-2 rounded-md border border-border shadow-sm flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Export Report
            </button>
            <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-md flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              Security Audit
            </button>
          </div>
        </div>

        {/* Alert Banner */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-md p-4 mb-6 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-amber-800 dark:text-amber-300">System Maintenance</h3>
            <p className="text-amber-700 dark:text-amber-400 text-sm">Scheduled maintenance will be performed on June 15, 2023, at 02:00 UTC. Expected downtime: 30 minutes.</p>
          </div>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-border shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-medium mb-2">Active Users</h2>
                <div className="text-3xl font-bold">1,482</div>
                <p className="text-sm text-muted-foreground mt-1">↑ 12% from last month</p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-md">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-border shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-medium mb-2">Security Alerts</h2>
                <div className="text-3xl font-bold">7</div>
                <p className="text-sm text-muted-foreground mt-1">3 require attention</p>
              </div>
              <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-md">
                <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-border shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-medium mb-2">System Health</h2>
                <div className="text-3xl font-bold">98.7%</div>
                <p className="text-sm text-muted-foreground mt-1">Uptime last 30 days</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-md">
                <Activity className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-border shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-medium mb-2">API Requests</h2>
                <div className="text-3xl font-bold">3.4M</div>
                <p className="text-sm text-muted-foreground mt-1">This month</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-md">
                <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Management Table */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-neutral-800 rounded-lg border border-border shadow-sm">
              <div className="p-4 border-b border-border flex justify-between items-center">
                <h2 className="text-xl font-bold">Recent Users</h2>
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="text-sm border border-border rounded-md px-3 py-1.5 mr-2 bg-transparent focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button className="text-sm text-primary hover:underline">View all</button>
                </div>
              </div>
              <div className="p-4">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-muted-foreground text-sm">
                      <th className="pb-3 font-medium">User</th>
                      <th className="pb-3 font-medium">Role</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Last Login</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-3 pr-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-medium mr-2">JD</div>
                          <div>
                            <div className="font-medium">John Doe</div>
                            <div className="text-xs text-muted-foreground">john.doe@example.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 pr-4">Administrator</td>
                      <td className="py-3 pr-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          Active
                        </span>
                      </td>
                      <td className="py-3 pr-4">10 minutes ago</td>
                      <td className="py-3">
                        <button className="text-sm text-blue-600 hover:underline mr-2">Edit</button>
                        <button className="text-sm text-red-600 hover:underline">Disable</button>
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 pr-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium mr-2">SJ</div>
                          <div>
                            <div className="font-medium">Sarah Johnson</div>
                            <div className="text-xs text-muted-foreground">sarah.j@example.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 pr-4">Content Manager</td>
                      <td className="py-3 pr-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          Active
                        </span>
                      </td>
                      <td className="py-3 pr-4">2 hours ago</td>
                      <td className="py-3">
                        <button className="text-sm text-blue-600 hover:underline mr-2">Edit</button>
                        <button className="text-sm text-red-600 hover:underline">Disable</button>
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 pr-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-medium mr-2">RM</div>
                          <div>
                            <div className="font-medium">Robert Miller</div>
                            <div className="text-xs text-muted-foreground">robert@example.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 pr-4">Support Agent</td>
                      <td className="py-3 pr-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                          Away
                        </span>
                      </td>
                      <td className="py-3 pr-4">1 day ago</td>
                      <td className="py-3">
                        <button className="text-sm text-blue-600 hover:underline mr-2">Edit</button>
                        <button className="text-sm text-red-600 hover:underline">Disable</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-medium mr-2">EW</div>
                          <div>
                            <div className="font-medium">Emily Wong</div>
                            <div className="text-xs text-muted-foreground">emily@example.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 pr-4">Editor</td>
                      <td className="py-3 pr-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                          Inactive
                        </span>
                      </td>
                      <td className="py-3 pr-4">2 weeks ago</td>
                      <td className="py-3">
                        <button className="text-sm text-blue-600 hover:underline mr-2">Edit</button>
                        <button className="text-sm text-green-600 hover:underline">Activate</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Activity Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-neutral-800 rounded-lg border border-border shadow-sm mb-6">
              <div className="p-4 border-b border-border">
                <h2 className="text-xl font-bold">System Activity</h2>
              </div>
              <div className="divide-y divide-border">
                <div className="p-4">
                  <div className="flex gap-3">
                    <div className="bg-red-100 dark:bg-red-900/30 p-1.5 rounded-md h-fit">
                      <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <div className="font-medium">Failed login attempt</div>
                      <p className="text-sm text-muted-foreground">Multiple attempts from IP 192.168.1.45</p>
                      <p className="text-xs text-muted-foreground mt-1">15 minutes ago</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex gap-3">
                    <div className="bg-green-100 dark:bg-green-900/30 p-1.5 rounded-md h-fit">
                      <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <div className="font-medium">New user registered</div>
                      <p className="text-sm text-muted-foreground">Emily Wong created an account</p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-md h-fit">
                      <Settings className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium">System update</div>
                      <p className="text-sm text-muted-foreground">v2.0.5 successfully deployed</p>
                      <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex gap-3">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-1.5 rounded-md h-fit">
                      <Lock className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <div className="font-medium">Permission changed</div>
                      <p className="text-sm text-muted-foreground">Admin role permissions updated</p>
                      <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="bg-white dark:bg-neutral-800 rounded-lg border border-border shadow-sm">
              <div className="p-4 border-b border-border">
                <h2 className="text-xl font-bold">Quick Actions</h2>
              </div>
              <div className="p-4 grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center justify-center p-3 border border-border rounded-md hover:bg-gray-50 dark:hover:bg-neutral-700/50 transition-colors">
                  <Users className="h-6 w-6 mb-2 text-purple-600" />
                  <span className="text-sm">Manage Users</span>
                </button>
                <button className="flex flex-col items-center justify-center p-3 border border-border rounded-md hover:bg-gray-50 dark:hover:bg-neutral-700/50 transition-colors">
                  <Shield className="h-6 w-6 mb-2 text-blue-600" />
                  <span className="text-sm">Roles & Permissions</span>
                </button>
                <button className="flex flex-col items-center justify-center p-3 border border-border rounded-md hover:bg-gray-50 dark:hover:bg-neutral-700/50 transition-colors">
                  <Settings className="h-6 w-6 mb-2 text-gray-600" />
                  <span className="text-sm">System Settings</span>
                </button>
                <button className="flex flex-col items-center justify-center p-3 border border-border rounded-md hover:bg-gray-50 dark:hover:bg-neutral-700/50 transition-colors">
                  <Activity className="h-6 w-6 mb-2 text-green-600" />
                  <span className="text-sm">View Logs</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 