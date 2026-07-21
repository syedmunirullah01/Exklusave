import { Suspense } from "react";
import AdminTopbar from "@/features/admin/components/AdminTopbar";
import AdminOffersManager from "@/features/admin/components/AdminOffersManager";

export const metadata = {
  title: "Coupons & Deals | Persuekey Admin",
};

export default function AdminOffersPage() {
  return (
    <div>
      <AdminTopbar title="Coupons & Deals" breadcrumbTrail={["Admin", "Coupons & Deals"]} />
      <main className="p-4 sm:p-6 lg:p-8">
        <Suspense fallback={<div className="p-8 text-center text-xs font-semibold text-zinc-500">Loading coupons & deals...</div>}>
          <AdminOffersManager />
        </Suspense>
      </main>
    </div>
  );
}
