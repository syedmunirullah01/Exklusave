import AdminTopbar from "@/features/admin/components/AdminTopbar";
import AdminHomepageSectionsManager from "@/features/admin/components/AdminHomepageSectionsManager";

export const metadata = {
  title: "Homepage | Persuekey Admin",
};

export default function AdminHomepagePage() {
  return (
    <div>
      <AdminTopbar title="Homepage" breadcrumbTrail={["Admin", "Homepage"]} />
      <main className="p-4 sm:p-6 lg:p-8">
        <AdminHomepageSectionsManager />
      </main>
    </div>
  );
}
