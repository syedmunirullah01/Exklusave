import TopCategoriesSection from "./TopCategoriesSection";
import FeaturedCouponsSection from "./FeaturedCouponsSection";
import HeroSection from "./HeroSection";
import TopSellingBeautyProductsSection from "./TopSellingBeautyProductsSection";
import LatestBlogsSection from "./LatestBlogsSection";
import TrendingStoresSection from "./TrendingStoresSection";
import CelebrationRibbon from "@/components/shared/CelebrationRibbon";

export default function HomePage({
  hero,
  categories,
  trendingStores,
  trendingStoresTitle,
  featuredCoupons,
  featuredCouponsTitle,
  latestStores,
  latestStoresTitle,
}) {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 sm:gap-8 lg:gap-10 px-4 pb-8 pt-3 sm:px-6 sm:pb-10 sm:pt-4 lg:px-8 lg:pb-12 lg:pt-5">
      <CelebrationRibbon />
      <HeroSection hero={hero} />
      <TopCategoriesSection initialCategories={categories} />
      <TrendingStoresSection trendingStores={trendingStores} title={trendingStoresTitle} />
      <FeaturedCouponsSection featuredCoupons={featuredCoupons} title={featuredCouponsTitle} />
      <TopSellingBeautyProductsSection />
      <LatestBlogsSection />
    </div>
  );
}
