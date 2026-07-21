import AdminTopbar from "@/features/admin/components/AdminTopbar";
import AdminSettingsPanel from "@/features/admin/components/AdminSettingsPanel";

export const metadata = {
  title: "Settings | Persuekey Admin",
};

export default function AdminSettingsPage() {
  return (
    <div>
      <AdminTopbar title="Settings" breadcrumbTrail={["Admin", "Settings"]} />
      <main className="p-4 sm:p-6 lg:p-8">
        <AdminSettingsPanel />
      </main>
    </div>
  );
}
