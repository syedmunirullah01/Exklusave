"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

function StoreIcon() {
  return (
    <svg className="h-4 w-4 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
      <path d="M2 7h20" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg className="h-6 w-6 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export default function SubmitCouponForm() {
  const [storeQuery, setStoreQuery] = useState("");
  const [selectedStore, setSelectedStore] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [stores, setStores] = useState([]);
  const [isStoreDropdownOpen, setIsStoreDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function loadStores() {
      try {
        const res = await fetch("/api/stores");
        const json = await res.json();
        if (json.data && Array.isArray(json.data)) {
          setStores(json.data);
        }
      } catch (err) {
        console.error("Failed to load stores for submit coupon form:", err);
      }
    }
    loadStores();
  }, []);

  const filteredStores = storeQuery.trim()
    ? stores.filter((s) => s.name?.toLowerCase().includes(storeQuery.toLowerCase()))
    : stores;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const targetStore = selectedStore || storeQuery;
    if (!targetStore.trim()) {
      toast.error("Please enter or select a store.");
      return;
    }

    if (!couponCode.trim() && !description.trim()) {
      toast.error("Please provide a coupon code or offer description.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Community Contributor",
          email: email.trim() || "contributor@persuekey.com",
          subject: `Coupon Submission for ${targetStore}`,
          message: `Store: ${targetStore}\nCoupon Code: ${couponCode || "N/A"}\nDescription: ${description || "N/A"}`,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit coupon");
      }

      setSubmitted(true);
      toast.success("Coupon submitted successfully! Thank you for sharing.");
    } catch (err) {
      toast.error(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStoreQuery("");
    setSelectedStore("");
    setCouponCode("");
    setDescription("");
    setEmail("");
    setSubmitted(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12">
      
      {/* Header Section matching screenshot */}
      <div className="space-y-3 mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
          Submit a coupon
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-medium max-w-2xl leading-relaxed">
          Found a working code? Share it with the community and earn tokens for spreading the love (and savings).
        </p>
      </div>

      {/* Horizontal Divider Line */}
      <div className="h-px w-full bg-zinc-200 dark:bg-zinc-800 mb-8 sm:mb-10" />

      {/* Form Card Container matching screenshot dark/light theme */}
      <div className="rounded-3xl border border-zinc-200/80 dark:border-zinc-800/90 bg-white dark:bg-[#0c0d10] p-6 sm:p-10 shadow-xl shadow-zinc-900/5 transition-all">
        
        {submitted ? (
          <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
            <div className="h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <CheckCircleIcon />
            </div>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white">
              Coupon Submitted!
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md">
              Thank you for sharing with the community. Our team will verify and list this deal shortly.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-4 px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer"
            >
              Submit Another Coupon
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Field 1: Store */}
            <div className="space-y-2 relative">
              <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                Store
              </label>
              
              <div className="relative">
                <input
                  type="text"
                  value={selectedStore || storeQuery}
                  onChange={(e) => {
                    setStoreQuery(e.target.value);
                    setSelectedStore("");
                    setIsStoreDropdownOpen(true);
                  }}
                  onFocus={() => setIsStoreDropdownOpen(true)}
                  placeholder="Search for a store"
                  className="w-full h-12 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50/50 dark:bg-[#121318] px-4 text-sm font-medium text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition"
                />

                {/* Dropdown list */}
                {isStoreDropdownOpen && filteredStores.length > 0 && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsStoreDropdownOpen(false)}
                    />
                    <div className="absolute left-0 top-[calc(100%+6px)] z-20 w-full max-h-60 overflow-y-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#16171d] shadow-2xl p-1.5 space-y-1">
                      {filteredStores.slice(0, 10).map((s) => (
                        <button
                          key={s.slug || s.name}
                          type="button"
                          onClick={() => {
                            setSelectedStore(s.name);
                            setStoreQuery(s.name);
                            setIsStoreDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                        >
                          <StoreIcon />
                          <span>{s.name}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Field 2: Coupon code */}
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                Coupon code
              </label>
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="e.g. SAVE20"
                className="w-full h-12 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50/50 dark:bg-[#121318] px-4 text-sm font-mono font-bold text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition"
              />
            </div>

            {/* Field 3: Description */}
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. 20% off your order"
                className="w-full h-12 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50/50 dark:bg-[#121318] px-4 text-sm font-medium text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition"
              />
            </div>

            {/* Field 4: Contact Email (Optional) */}
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                Your Email <span className="text-zinc-400 font-normal lowercase">(optional, to receive rewards)</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. alex@example.com"
                className="w-full h-12 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50/50 dark:bg-[#121318] px-4 text-sm font-medium text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition"
              />
            </div>

            {/* Legal / Guidelines Disclaimer matching screenshot */}
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed pt-1">
              Please only submit publicly available coupon codes and avoid sharing private, internal or other codes provided exclusively to companies and creators. When in doubt, reach out to the merchant to get permission.
            </p>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-12 px-8 items-center justify-center rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white dark:text-zinc-950 font-black text-sm uppercase tracking-wider shadow-md shadow-emerald-500/20 transition-all cursor-pointer disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>

          </form>
        )}

      </div>

    </div>
  );
}
