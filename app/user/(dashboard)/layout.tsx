import SideBar from "@/components/SideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex container max-w-[1800px] py-12 tablet:mx-2 tablet:pt-0 tablet:px-4">
        <SideBar />
      {children}
    </div>
  );
}
