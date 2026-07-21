import AdminTopbar from "@/features/admin/components/AdminTopbar";
import AdminBlogsManager from "@/features/admin/components/AdminBlogsManager";

export const metadata = {
  title: "Blogs | Persuekey Admin",
};

export default function AdminBlogsPage() {
  return (
    <div>
      <AdminTopbar title="Blogs" breadcrumbTrail={["Admin", "Blogs"]} />
      <main className="p-4 sm:p-6 lg:p-8">
        <AdminBlogsManager />
      </main>
    </div>
  );
}
