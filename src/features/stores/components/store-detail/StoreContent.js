function ShieldCheckIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function TagIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
      <circle cx="7" cy="7" r="1.5" fill="currentColor" />
    </svg>
  );
}

function ZapIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function SparklesIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  );
}

export default function StoreContent({ singleStore, faqs = [] }) {
  const storeName = singleStore.name || "Store";

  return (
    <div className="space-y-8 sm:space-y-10">
      
      {/* VIP Savings Guide Container */}
      <section id="store-info" className="scroll-mt-28 rounded-3xl border border-black/8 bg-white p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Top Header Badge & Title */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-[10px] sm:text-xs font-black uppercase tracking-wider text-emerald-600">
            <SparklesIcon className="h-3.5 w-3.5 text-emerald-500" />
            <span>PERSUEKEY SAVINGS GUIDE</span>
          </div>

          <h2 className="text-xl sm:text-3xl font-black tracking-tight text-zinc-900">
            {singleStore.introTitle || `More Information On ${storeName} Deals`}
          </h2>
        </div>

        {/* Intro Paragraphs */}
        <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-zinc-800 font-medium border-t border-black/5 pt-4">
          {singleStore.introParagraphs?.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* 4 Feature Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="rounded-2xl border border-black/6 bg-zinc-50/80 p-4 space-y-2 hover:border-emerald-500/30 hover:bg-white transition-colors shadow-2xs">
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs sm:text-sm">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
                <ShieldCheckIcon className="h-4 w-4" />
              </div>
              <span>100% Verified Offers</span>
            </div>
            <p className="text-[11px] sm:text-xs text-zinc-700 font-medium leading-normal">
              Every {storeName} promotion is tested and verified to ensure you get working savings.
            </p>
          </div>

          <div className="rounded-2xl border border-black/6 bg-zinc-50/80 p-4 space-y-2 hover:border-emerald-500/30 hover:bg-white transition-colors shadow-2xs">
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs sm:text-sm">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
                <TagIcon className="h-4 w-4" />
              </div>
              <span>Exclusive Promo Codes</span>
            </div>
            <p className="text-[11px] sm:text-xs text-zinc-700 font-medium leading-normal">
              Access hand-picked discount codes and direct deal links updated daily.
            </p>
          </div>

          <div className="rounded-2xl border border-black/6 bg-zinc-50/80 p-4 space-y-2 hover:border-emerald-500/30 hover:bg-white transition-colors shadow-2xs">
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs sm:text-sm">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
                <ZapIcon className="h-4 w-4" />
              </div>
              <span>Real-Time Updates</span>
            </div>
            <p className="text-[11px] sm:text-xs text-zinc-700 font-medium leading-normal">
              Inventory is synced instantly whenever new deals or promo campaigns drop.
            </p>
          </div>

          <div className="rounded-2xl border border-black/6 bg-zinc-50/80 p-4 space-y-2 hover:border-emerald-500/30 hover:bg-white transition-colors shadow-2xs">
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs sm:text-sm">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
                <SparklesIcon className="h-4 w-4" />
              </div>
              <span>Zero Account Required</span>
            </div>
            <p className="text-[11px] sm:text-xs text-zinc-700 font-medium leading-normal">
              100% free to use. Click to reveal coupon codes and shop directly on {storeName}.
            </p>
          </div>
        </div>

        {/* Outro text */}
        {singleStore.outro ? (
          <p className="text-xs text-zinc-600 font-medium italic pt-2 border-t border-black/5">
            {singleStore.outro}
          </p>
        ) : null}
      </section>

      {/* Step-by-Step Redeem Timeline */}
      <section className="rounded-3xl border border-black/8 bg-white p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-lg sm:text-2xl font-black tracking-tight text-zinc-900">
          How To Redeem {storeName} Coupons
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative rounded-2xl border border-black/6 bg-zinc-50/80 p-5 space-y-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-black font-black text-xs">
              01
            </span>
            <h4 className="text-sm font-extrabold text-zinc-900">Select Offer</h4>
            <p className="text-xs text-zinc-700 font-medium leading-relaxed">
              Browse our verified list above and click <strong>&quot;Show Code&quot;</strong> or <strong>&quot;Get Deal&quot;</strong>.
            </p>
          </div>

          <div className="relative rounded-2xl border border-black/6 bg-zinc-50/80 p-5 space-y-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-black font-black text-xs">
              02
            </span>
            <h4 className="text-sm font-extrabold text-zinc-900">Copy Code</h4>
            <p className="text-xs text-zinc-700 font-medium leading-relaxed">
              Copy the discount code to your clipboard and visit {storeName}&apos;s official online store.
            </p>
          </div>

          <div className="relative rounded-2xl border border-black/6 bg-zinc-50/80 p-5 space-y-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-black font-black text-xs">
              03
            </span>
            <h4 className="text-sm font-extrabold text-zinc-900">Apply & Save</h4>
            <p className="text-xs text-zinc-700 font-medium leading-relaxed">
              Paste your coupon code into the promo box during checkout to enjoy instant savings!
            </p>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Section */}
      {faqs && faqs.length > 0 ? (
        <section id="faqs" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-900">
            Frequently Asked Questions About {storeName}
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-black/8 bg-white shadow-xs overflow-hidden transition-all hover:border-emerald-500/30"
                open={index === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between p-5 text-sm font-black text-zinc-900 hover:text-emerald-600 transition-colors">
                  <span>{faq.question}</span>
                  <span className="text-zinc-400 font-black transition-transform group-open:rotate-180">↓</span>
                </summary>
                <div className="px-5 pb-5 text-xs sm:text-sm leading-relaxed text-zinc-800 font-medium border-t border-black/5 pt-3">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>
      ) : null}

    </div>
  );
}

