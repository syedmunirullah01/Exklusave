"use client";

import { useMemo, useState } from "react";
import OfferList from "./OfferList";
import OfferTabs from "./OfferTabs";

const TAB_KEYS = ["all", "coupon", "deal"];

export default function OfferSection({ offers, store, activeTab }) {
  const filteredOffers = useMemo(() => {
    if (!activeTab || activeTab === "all") {
      return offers;
    }
    return offers.filter((offer) => offer.type?.toLowerCase() === activeTab);
  }, [activeTab, offers]);

  const currentDate = new Date();
  const monthYearStr = currentDate.toLocaleString("en-US", { month: "long", year: "numeric" });

  return (
    <div className="space-y-4">
      <h2 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-900 mb-6">
        {store.name} Promo Codes & Coupons ({monthYearStr})
      </h2>
      <OfferList offers={filteredOffers} store={store} />
    </div>
  );
}
