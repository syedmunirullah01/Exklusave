import Link from "next/link";
import AdminTopbar from "@/features/admin/components/AdminTopbar";
import AdminActivityChart from "@/features/admin/components/AdminActivityChart";
import { getAllStores } from "@/server/repositories/stores-repository";
import { getAllOffers } from "@/server/repositories/offers-repository";
import { getAllProducts } from "@/server/repositories/products-repository";
import { getAllCategories } from "@/server/repositories/categories-repository";

export const metadata = {
  title: "Dashboard Overview | Persuekey Admin",
};

export default async function AdminPage() {
  const [stores, offers, products, categories] = await Promise.all([
    getAllStores(),
    getAllOffers(),
    getAllProducts(),
    getAllCategories(),
  ]);

  const couponsCount = offers.filter((o) => o.type === "Coupon").length;
  const dealsCount = offers.filter((o) => o.type === "Deal").length;

  const totalOffersCount = offers.length || 1;
  const dealRatio = Math.round((dealsCount / totalOffersCount) * 100);

  const heroBannersCount = 6;

  const activeOffersList = offers.slice(0, 5);

  const categoryMetrics = [
    { name: "Fashion & Apparel", count: 8, percent: 80 },
    { name: "Beauty & Grooming", count: 5, percent: 55 },
    { name: "Electronics & Tech", count: 4, percent: 40 },
    { name: "Food & Grocery", count: 3, percent: 30 },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-zinc-950 text-zinc-900 dark:text-white pb-16 font-sans antialiased transition-colors">
      <AdminTopbar title="Dashboard Overview" breadcrumbTrail={["Admin", "Dashboard"]} />

      <main className="mx-auto max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">

        {/* 1. TOP METRIC CARDS WITH GRAPHICAL INDICATORS */}
        <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Metric 1: Total Stores */}
          <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-xs flex flex-col justify-between transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">Total Stores</span>
              <span className="rounded-md bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800">CATALOG</span>
            </div>

            <div className="my-3 flex items-center justify-between">
              <span className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">{stores.length || 14}</span>

              {/* Sparkline Curve SVG */}
              <svg className="h-8 w-20 text-emerald-600 dark:text-emerald-400" viewBox="0 0 100 40" fill="none">
                <path d="M0 30 Q 25 35, 50 20 T 100 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="100" cy="8" r="3" fill="currentColor" />
              </svg>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-800 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
              <span>Registered catalog brands</span>
            </div>
          </div>

          {/* Metric 2: Active Coupons */}
          <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-xs flex flex-col justify-between transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">Active Coupons</span>
              <span className="rounded-md bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800">VERIFIED</span>
            </div>

            <div className="my-3 flex items-center justify-between">
              <span className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">{couponsCount}</span>

              {/* Bar Graph SVG */}
              <div className="flex items-end gap-1 h-7">
                <span className="w-1.5 rounded-t bg-emerald-200 dark:bg-emerald-800 h-3" />
                <span className="w-1.5 rounded-t bg-emerald-400 dark:bg-emerald-600 h-6" />
                <span className="w-1.5 rounded-t bg-emerald-600 dark:bg-emerald-400 h-7" />
                <span className="w-1.5 rounded-t bg-emerald-300 dark:bg-emerald-700 h-4" />
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-800 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
              <span>Live promo coupon codes</span>
            </div>
          </div>

          {/* Metric 3: Active Deals */}
          <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-xs flex flex-col justify-between transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">Active Deals</span>
              <span className="rounded-md bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800">DIRECT</span>
            </div>

            <div className="my-3 flex items-center justify-between">
              <span className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">{dealsCount}</span>

              {/* Radial Donut Ring SVG */}
              <div className="relative flex h-9 w-9 items-center justify-center">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" className="text-zinc-200 dark:text-zinc-800" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#059669" strokeWidth="4" strokeDasharray="75, 100" strokeLinecap="round" />
                </svg>
                <span className="absolute text-[9px] font-bold text-emerald-700 dark:text-emerald-400">75%</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-800 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
              <span>Direct activation deals</span>
            </div>
          </div>

          {/* Metric 4: Banners & Products */}
          <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-xs flex flex-col justify-between transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">Banners & Products</span>
              <span className="rounded-md bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800">LIVE</span>
            </div>

            <div className="my-3 flex items-center justify-between">
              <span className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">{heroBannersCount} <span className="text-sm text-zinc-400 font-normal">/ {products.length || 10}</span></span>

              {/* Step Graph SVG */}
              <div className="flex items-end gap-1 h-7">
                <span className="w-1.5 rounded-t bg-zinc-200 dark:bg-zinc-800 h-2.5" />
                <span className="w-1.5 rounded-t bg-emerald-300 dark:bg-emerald-700 h-4" />
                <span className="w-1.5 rounded-t bg-emerald-500 dark:bg-emerald-500 h-5.5" />
                <span className="w-1.5 rounded-t bg-emerald-700 dark:bg-emerald-400 h-7" />
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-800 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
              <span>Active hero slider banners</span>
            </div>
          </div>

        </section>


        {/* 2. MIDDLE SECTION: GRAPHICAL ACTIVITY AREA CHART & OFFER DONUT RATIO */}
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(340px,0.8fr)]">
          
          {/* Working Interactive Graphical Activity Trend Chart */}
          <AdminActivityChart offers={offers} />

          {/* Offer Donut Ratio & Category Breakdown */}
          <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="border-b border-zinc-100 dark:border-zinc-800 pb-3.5">
                <h2 className="text-base font-bold text-zinc-900 dark:text-white">Offer Ratio & Categories</h2>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">Distribution of coupons vs deals ratio.</p>
              </div>

              {/* Donut Circle */}
              <div className="my-6 flex flex-col items-center justify-center">
                <div className="relative flex h-36 w-36 items-center justify-center">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4.5" className="text-zinc-200 dark:text-zinc-800" />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#059669"
                      strokeWidth="4.5"
                      strokeDasharray={`${dealRatio}, 100`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-2xl font-bold text-zinc-900 dark:text-white">{dealRatio}%</span>
                    <p className="text-[9px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Deals Ratio</p>
                  </div>
                </div>
              </div>

              {/* Progress bars */}
              <div className="space-y-3">
                {categoryMetrics.map((cat) => (
                  <div key={cat.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                      <span>{cat.name}</span>
                      <span className="font-mono text-xs text-zinc-600 dark:text-zinc-400">{cat.count} stores</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${cat.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/admin/categories"
              className="mt-5 text-center text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline pt-3 border-t border-zinc-100 dark:border-zinc-800 block"
            >
              View All Categories ({categories.length}) →
            </Link>
          </div>

        </section>


        {/* 3. BOTTOM SECTION: OFFERS DATA TABLE */}
        <section className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3.5">
            <div>
              <h2 className="text-base font-bold text-zinc-900 dark:text-white">Active Promo Offers Feed</h2>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">Real-time promo codes and discount deals list.</p>
            </div>
            <Link
              href="/admin/offers"
              className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 px-3.5 py-1.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition"
            >
              View All ({offers.length})
            </Link>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-zinc-800 text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  <th className="py-3 px-2">#</th>
                  <th className="py-3 px-3">Description</th>
                  <th className="py-3 px-3">Store</th>
                  <th className="py-3 px-3">Code / Tag</th>
                  <th className="py-3 px-3">Type</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 font-normal">
                {activeOffersList.map((offer, index) => (
                  <tr key={offer.id || index} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40 transition">
                    <td className="py-3.5 px-2 font-mono text-zinc-600 dark:text-zinc-400">{index + 1}</td>
                    <td className="py-3.5 px-3 font-semibold text-zinc-900 dark:text-white max-w-xs truncate">{offer.title}</td>
                    <td className="py-3.5 px-3 text-zinc-700 dark:text-zinc-300">{offer.storeName || "Store"}</td>
                    <td className="py-3.5 px-3">
                      <span className="font-mono text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200/60 dark:border-emerald-800">
                        {offer.code || "DEAL"}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase ${offer.type === 'Coupon' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300' : 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300'}`}>
                        {offer.type || 'Deal'}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <Link href="/admin/offers" className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline">
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </div>
  );
}
