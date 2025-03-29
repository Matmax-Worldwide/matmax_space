export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {/* The DashboardLayout component is applied in the page.tsx, so we just need a simple wrapper here */}
      {children}
    </div>
  );
} 