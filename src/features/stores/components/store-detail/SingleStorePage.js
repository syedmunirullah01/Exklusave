"use client";

import { useState } from "react";
import Link from "next/link";
import OfferSection from "./OfferSection";
import ProductsSection from "./ProductsSection";
import StoreContent from "./StoreContent";
import StoreHeader from "./StoreHeader";
import StoreSidebar from "./StoreSidebar";

export default function SingleStorePage({ singleStore, storeTabs, offerTabs, offers = [], products = [], faqs = [], relatedStores = [] }) {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="min-h-screen bg-[var(--page-bg,#fcfdfd)]">
      {/* Breadcrumb Bar */}
      <div className="border-b border-black/5 bg-zinc-50/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1240px] items-center gap-2 px-3.5 py-2.5 text-[11px] sm:text-xs font-semibold text-zinc-500 sm:px-6 lg:px-8 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <Link href="/" className="hover:text-black transition">Home</Link>
          <span className="text-zinc-300 font-normal">/</span>
          <Link href="/stores" className="hover:text-black transition">Stores</Link>
          <span className="text-zinc-300 font-normal">/</span>
          <span className="font-bold text-black">{singleStore.name}</span>
        </div>
      </div>

      <div className="mx-auto max-w-[1240px] px-3.5 py-4 sm:px-6 sm:py-8 lg:px-8 space-y-6">
        <StoreHeader
          singleStore={singleStore}
          storeTabs={storeTabs}
          offerTabs={offerTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* Main Offers & Content First on Mobile */}
          <div className="min-w-0 flex-1 space-y-6 order-1 lg:order-2">
            <OfferSection offers={offers} store={singleStore} activeTab={activeTab} />
            <ProductsSection products={products} />
            <StoreContent singleStore={singleStore} faqs={faqs} />
          </div>

          {/* Sidebar After Offers on Mobile */}
          <div className="order-2 lg:order-1">
            <StoreSidebar singleStore={singleStore} relatedStores={relatedStores} />
          </div>
        </div>
      </div>
    </div>
  );
}
