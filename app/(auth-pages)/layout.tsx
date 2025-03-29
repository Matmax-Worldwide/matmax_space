export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Replace root layout content with only the children */}
      {children}
    </div>
  );
}
