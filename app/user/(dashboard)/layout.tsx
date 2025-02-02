import SideBar from "@/components/SideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <SideBar />
      <main className="flex-1 md:ml-[270px] ml-[80px]">
        {children}
      </main>
    </div>
  );
}
