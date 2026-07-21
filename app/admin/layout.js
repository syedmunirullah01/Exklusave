import AdminSidebar from "@/features/admin/components/AdminSidebar";
import { AdminThemeProvider } from "@/features/admin/components/AdminThemeProvider";

export default function AdminLayout({ children }) {
  return (
    <AdminThemeProvider>
      <div className="min-h-screen lg:flex transition-colors">
        <AdminSidebar />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </AdminThemeProvider>
  );
}
