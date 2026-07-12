import Link from "next/link";
import { Button } from "@/components/ui/Button";
import SectionHeader from "@/components/shared/SectionHeader";
import StoreSpotlightCard from "./StoreSpotlightCard";

const MOCK_STORES = [
  { 
    name: "Adidas", 
    logoText: "Adidas", 
    href: "/stores/adidas",
    logoImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/256px-Adidas_Logo.svg.png"
  },
  { 
    name: "Nike Store", 
    logoText: "Nike", 
    href: "/stores/nike-store",
    logoImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/256px-Logo_NIKE.svg.png"
  },
  { 
    name: "Zarina", 
    logoText: "Zarina", 
    href: "/stores/zarina",
    logoImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Zara_Logo.svg/256px-Zara_Logo.svg.png"
  },
  { 
    name: "Colleen Rothschild", 
    logoText: "Colleen", 
    href: "/stores/colleen-rothschild",
    logoImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Estee_Lauder_logo.svg/256px-Estee_Lauder_logo.svg.png"
  },
  { 
    name: "Thriftbooks", 
    logoText: "Thriftbooks", 
    href: "/stores/thriftbooks",
    logoImage: "https://www.vectorlogo.zone/logos/gitbook/gitbook-icon.svg"
  },
  { 
    name: "Fellow", 
    logoText: "Fellow", 
    href: "/stores/fellow",
    logoImage: "https://www.vectorlogo.zone/logos/fitbit/fitbit-icon.svg"
  },
  { 
    name: "XPlus Wear", 
    logoText: "XPlus", 
    href: "/stores/xplus-wear",
    logoImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/ASICS_logo.svg/256px-ASICS_logo.svg.png"
  },
  { 
    name: "Sargasso and Grey", 
    logoText: "Sargasso", 
    href: "/stores/sargasso-and-grey",
    logoImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Saks_Fifth_Avenue_logo.svg/256px-Saks_Fifth_Avenue_logo.svg.png"
  },
  { 
    name: "Gleamin", 
    logoText: "Gleamin", 
    href: "/stores/gleamin",
    logoImage: "https://www.vectorlogo.zone/logos/glamour/glamour-icon.svg"
  },
  { 
    name: "Modlily US", 
    logoText: "Modlily", 
    href: "/stores/modlily",
    logoImage: "https://www.vectorlogo.zone/logos/target/target-icon.svg"
  },
  { 
    name: "Beachwaver", 
    logoText: "Beachwaver", 
    href: "/stores/beachwaver",
    logoImage: "https://www.vectorlogo.zone/logos/beautycounter/beautycounter-icon.svg"
  },
  { 
    name: "Burst", 
    logoText: "Burst", 
    href: "/stores/burst",
    logoImage: "https://www.vectorlogo.zone/logos/unilever/unilever-icon.svg"
  },
];

export default function TrendingStoresSection({ trendingStores = [], title = "Trending Stores" }) {
  // Merge real stores with mock stores to guarantee exactly 12 items
  const displayedStores = [...trendingStores];
  for (let i = 0; i < MOCK_STORES.length; i++) {
    if (displayedStores.length >= 12) break;
    const mock = MOCK_STORES[i];
    if (!displayedStores.some(s => s.name?.toLowerCase() === mock.name.toLowerCase())) {
      displayedStores.push(mock);
    }
  }

  return (
    <section className="pt-2">
      <SectionHeader title={title} href="/stores" />
      <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 items-start">
        {displayedStores.map((store) => (
          <StoreSpotlightCard key={store.name} store={store} />
        ))}
      </div>
      <div className="mt-7 text-center">
        <Button asChild variant="primary" size="club" trailingIcon="↗" className="min-w-[220px]">
          <Link href="/stores">View All Stores</Link>
        </Button>
      </div>
    </section>
  );
}
