import { getAllCategories } from "@/server/repositories/categories-repository";
import { getAllStores } from "@/server/repositories/stores-repository";
import { getMetadataDefaults } from "@/server/services/settings-service";
import CategoriesDirectoryView from "@/features/categories/components/CategoriesDirectoryView";

export async function generateMetadata() {
  return getMetadataDefaults("Categories");
}

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const [categories, stores] = await Promise.all([
    getAllCategories(),
    getAllStores(),
  ]);

  const storeCountsMap = {};
  stores.forEach((store) => {
    if (store.categorySlug) {
      storeCountsMap[store.categorySlug] = (storeCountsMap[store.categorySlug] || 0) + 1;
    }
  });

  return <CategoriesDirectoryView categories={categories} storeCountsMap={storeCountsMap} />;
}
