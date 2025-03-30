export default function LmsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Learning Management Dashboard</h1>
      <p className="mb-6">Welcome to the LMS dashboard. Select an option from the menu to manage your learning content.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-border">
          <h2 className="text-lg font-medium mb-2">Active Courses</h2>
          <div className="text-3xl font-bold">12</div>
          <p className="text-sm text-muted-foreground mt-1">3 new this month</p>
        </div>
        
        <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-border">
          <h2 className="text-lg font-medium mb-2">Enrolled Students</h2>
          <div className="text-3xl font-bold">247</div>
          <p className="text-sm text-muted-foreground mt-1">↑ 12% from last month</p>
        </div>
        
        <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-border">
          <h2 className="text-lg font-medium mb-2">Completion Rate</h2>
          <div className="text-3xl font-bold">78%</div>
          <p className="text-sm text-muted-foreground mt-1">↑ 5% from last month</p>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="bg-white dark:bg-neutral-800 rounded-lg border border-border">
          <div className="p-4 border-b border-border">
            <div className="font-medium">New course published</div>
            <p className="text-sm text-muted-foreground">Advanced React Patterns - 2 hours ago</p>
          </div>
          <div className="p-4 border-b border-border">
            <div className="font-medium">Student enrollment</div>
            <p className="text-sm text-muted-foreground">15 new students enrolled in "JavaScript Basics" - 4 hours ago</p>
          </div>
          <div className="p-4">
            <div className="font-medium">Certification awarded</div>
            <p className="text-sm text-muted-foreground">7 students completed "Web Development" course - Yesterday</p>
          </div>
        </div>
      </div>
    </div>
  );
} 