export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {/* The DashboardLayout is applied in the page.tsx, so we just need a simple wrapper here */}
      {children}
    </div>
  );
} 