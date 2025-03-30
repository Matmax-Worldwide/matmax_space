import { DashboardLayout } from '@/src/core/ui/layouts/templates/DashboardLayout';

export default function AdminPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p>Welcome to the Admin area.</p>
      </div>
    </DashboardLayout>
  );
} 