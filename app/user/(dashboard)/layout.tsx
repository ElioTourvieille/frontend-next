import SideBar from "@/components/SideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <SideBar />
      <main className="flex-1 ml-20 md:ml-64">
        {children}
      </main>
    </div>
  );
}
