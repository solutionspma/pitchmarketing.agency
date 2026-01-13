import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-pitch-black">
      <AdminSidebar />
      <div className="flex flex-col flex-1">
        <AdminTopbar />
        <main className="p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
