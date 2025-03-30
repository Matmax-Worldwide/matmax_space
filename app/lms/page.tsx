import DashboardLayout from '@/src/core/ui/layouts/templates/DashboardLayout';
import { BarChart3, BookOpen, GraduationCap, LayoutGrid, Users } from 'lucide-react';

export default function LmsPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Learning Management System</h1>
            <p className="text-muted-foreground">Manage your courses, students, and learning content</p>
          </div>
          <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-md flex items-center">
            <BookOpen className="h-4 w-4 mr-2" />
            Create New Course
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-border shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-medium mb-2">Active Courses</h2>
                <div className="text-3xl font-bold">32</div>
                <p className="text-sm text-muted-foreground mt-1">5 new this month</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-md">
                <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-border shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-medium mb-2">Enrolled Students</h2>
                <div className="text-3xl font-bold">1,247</div>
                <p className="text-sm text-muted-foreground mt-1">↑ 12% from last month</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-md">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-border shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-medium mb-2">Completion Rate</h2>
                <div className="text-3xl font-bold">78%</div>
                <p className="text-sm text-muted-foreground mt-1">↑ 5% from last month</p>
              </div>
              <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-md">
                <BarChart3 className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-border shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-medium mb-2">Certifications</h2>
                <div className="text-3xl font-bold">421</div>
                <p className="text-sm text-muted-foreground mt-1">Issued this quarter</p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-md">
                <GraduationCap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-neutral-800 rounded-lg border border-border shadow-sm">
              <div className="p-4 border-b border-border flex justify-between items-center">
                <h2 className="text-xl font-bold">Popular Courses</h2>
                <button className="text-sm text-primary hover:underline">View all</button>
              </div>
              <div className="p-4">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-muted-foreground text-sm">
                      <th className="pb-3 font-medium">Course Name</th>
                      <th className="pb-3 font-medium">Enrolled</th>
                      <th className="pb-3 font-medium">Completion</th>
                      <th className="pb-3 font-medium">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-3 pr-4">Advanced React Patterns</td>
                      <td className="py-3 pr-4">128</td>
                      <td className="py-3 pr-4">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                        <span className="text-xs text-muted-foreground">85%</span>
                      </td>
                      <td className="py-3">4.8/5</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 pr-4">JavaScript Fundamentals</td>
                      <td className="py-3 pr-4">256</td>
                      <td className="py-3 pr-4">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                        <span className="text-xs text-muted-foreground">92%</span>
                      </td>
                      <td className="py-3">4.9/5</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 pr-4">CSS Grid Mastery</td>
                      <td className="py-3 pr-4">97</td>
                      <td className="py-3 pr-4">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                        </div>
                        <span className="text-xs text-muted-foreground">72%</span>
                      </td>
                      <td className="py-3">4.5/5</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">TypeScript for Beginners</td>
                      <td className="py-3 pr-4">184</td>
                      <td className="py-3 pr-4">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '64%' }}></div>
                        </div>
                        <span className="text-xs text-muted-foreground">64%</span>
                      </td>
                      <td className="py-3">4.7/5</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-neutral-800 rounded-lg border border-border shadow-sm">
              <div className="p-4 border-b border-border">
                <h2 className="text-xl font-bold">Recent Activity</h2>
              </div>
              <div className="divide-y divide-border">
                <div className="p-4">
                  <div className="flex gap-3">
                    <div className="bg-green-100 dark:bg-green-900/30 p-1.5 rounded-md h-fit">
                      <BookOpen className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <div className="font-medium">New course published</div>
                      <p className="text-sm text-muted-foreground">Advanced React Patterns</p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-md h-fit">
                      <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium">Student enrollment</div>
                      <p className="text-sm text-muted-foreground">15 new students enrolled in "JavaScript Basics"</p>
                      <p className="text-xs text-muted-foreground mt-1">4 hours ago</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex gap-3">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-1.5 rounded-md h-fit">
                      <GraduationCap className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <div className="font-medium">Certification awarded</div>
                      <p className="text-sm text-muted-foreground">7 students completed "Web Development" course</p>
                      <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex gap-3">
                    <div className="bg-amber-100 dark:bg-amber-900/30 p-1.5 rounded-md h-fit">
                      <LayoutGrid className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <div className="font-medium">Course update</div>
                      <p className="text-sm text-muted-foreground">CSS Grid Mastery course updated with new content</p>
                      <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                    </div>
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