"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const initialHeroState = {
  eyebrow: "Exclusive Daily Deals",
  titleLineOne: "Smart Shopping,",
  titleAccent: "Better Saving",
  description: "Unlock verified discounts from the world's leading brands. The smarter way to checkout.",
  searchPlaceholder: "Search stores, coupons, deals",
  searchButtonLabel: "Search Offers",
  memberCountText: "Join 126k+ members saving daily",
  slides: [],
};

function SectionField({ label, children, hint }) {
  return (
    <label className="grid gap-1.5 text-xs text-zinc-700 dark:text-zinc-300 font-semibold">
      <span>{label}</span>
      {children}
      {hint ? <span className="text-[11px] font-normal text-zinc-500 dark:text-zinc-400">{hint}</span> : null}
    </label>
  );
}

function SettingsSection({ title, description, children }) {
  return (
    <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6 shadow-xs">
      <div className="mb-5 border-b border-zinc-100 dark:border-zinc-800 pb-3.5">
        <h3 className="text-base font-bold text-zinc-900 dark:text-white">{title}</h3>
        {description ? <p className="mt-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">{description}</p> : null}
      </div>
      {children}
    </div>
  );
}

function Spinner() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" className="stroke-current opacity-25" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" className="stroke-current" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default function AdminHeroManager() {
  const [hero, setHero] = useState(initialHeroState);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadHero() {
      try {
        const response = await fetch("/api/homepage/hero", { cache: "no-store" });
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.error || "Unable to load hero settings.");
        }

        if (active) {
          setHero(payload.data);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadHero();

    return () => {
      active = false;
    };
  }, []);

  function updateHeroField(field, value) {
    setHero((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function updateHeroSlide(index, field, value) {
    setHero((current) => ({
      ...current,
      slides: current.slides.map((slide, slideIndex) => (slideIndex === index ? { ...slide, [field]: value } : slide)),
    }));
  }

  function addHeroSlide() {
    setHero((current) => ({
      ...current,
      slides: [
        ...current.slides,
        {
          id: `hero-slide-${Date.now()}`,
          image: "",
          badge: "PROMO DEAL • LIVE NOW",
          kicker: "SPECIAL OFFER",
          title: "New Promo Campaign",
          description: "Description of your promotional campaign.",
          discount: "-30% OFF",
          code: "DEAL30",
          accent: "linear-gradient(140deg, rgba(163,230,53,0.22), transparent 48%)",
        },
      ],
    }));
  }

  function removeHeroSlide(index) {
    setHero((current) => ({
      ...current,
      slides: current.slides.filter((_, slideIndex) => slideIndex !== index),
    }));
  }

  function moveHeroSlide(index, direction) {
    setHero((current) => {
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= current.slides.length) return current;

      const nextSlides = [...current.slides];
      const [movedSlide] = nextSlides.splice(index, 1);
      nextSlides.splice(nextIndex, 0, movedSlide);

      return {
        ...current,
        slides: nextSlides,
      };
    });
  }

  async function saveHero() {
    try {
      setIsSaving(true);
      const response = await fetch("/api/homepage/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hero }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "Unable to save hero settings.");
      }

      setHero(payload.data);
      toast.success("Hero settings saved successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 text-center text-xs font-semibold text-zinc-500 dark:text-zinc-400">
        Loading hero slider manager...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[1500px] mx-auto">
      
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">Homepage Hero Banners & Copy Control</h1>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5 font-medium">
            Manage the hero title, search labels, and right-side interactive slider banners.
          </p>
        </div>

        <Button
          type="button"
          onClick={saveHero}
          disabled={isSaving}
          className="rounded-xl bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition cursor-pointer"
        >
          {isSaving ? "Saving Hero..." : "Save All Hero Settings"}
        </Button>
      </div>

      <div className="grid gap-6">

        {/* 2. RIGHT SIDE SLIDER BANNERS */}
        <SettingsSection
          title="Right Side Hero Slider Banners"
          description="Manage promotional banner cards, images, discount tags, and slide ordering."
        >
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-zinc-900 dark:text-white">Active Slides ({hero.slides.length})</p>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Reorder slides or edit background URLs, titles, and promo codes.</p>
            </div>
            <Button type="button" onClick={addHeroSlide} className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2">
              + Add New Slide
            </Button>
          </div>

          <div className="space-y-6">
            {hero.slides.map((slide, index) => (
              <div key={slide.id || index} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50 p-5 shadow-2xs">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between border-b border-zinc-200/60 dark:border-zinc-800 pb-3 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-600" />
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Slide #{index + 1}: {slide.title || "Untitled Banner"}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs font-semibold dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                      onClick={() => moveHeroSlide(index, -1)}
                      disabled={index === 0}
                    >
                      Move Up
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs font-semibold dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                      onClick={() => moveHeroSlide(index, 1)}
                      disabled={index === hero.slides.length - 1}
                    >
                      Move Down
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition"
                      onClick={() => removeHeroSlide(index)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                  {/* Live Visual Card Preview */}
                  <div className="space-y-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Card Preview</span>
                    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 text-white relative">
                      <div className="relative aspect-[4/5] p-5 flex flex-col justify-between">
                        {slide.image ? (
                          <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${slide.image})` }}
                          />
                        ) : null}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                        
                        <div className="relative z-10 flex items-center justify-between">
                          <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-900 shadow-xs">
                            {slide.badge || "FEATURED DEAL"}
                          </span>
                        </div>

                        <div className="relative z-10 space-y-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">{slide.kicker || "SPECIAL OFFER"}</span>
                          <h3 className="text-xl font-black text-white leading-tight">{slide.title || "Banner Title"}</h3>
                          <p className="text-xs text-zinc-300 line-clamp-2">{slide.description || "Banner description paragraph."}</p>
                          
                          <div className="flex items-center justify-between pt-2">
                            <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-extrabold text-white shadow-xs">
                              {slide.discount || "-50% OFF"}
                            </span>
                            {slide.code && (
                              <span className="font-mono text-xs font-bold bg-zinc-900/90 text-white border border-zinc-700 px-2.5 py-1 rounded-md">
                                {slide.code}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form Inputs */}
                  <div className="grid gap-3.5 md:grid-cols-2">
                    <SectionField label="Banner Image URL" hint="Cloudinary or web image URL.">
                      <Input
                        value={slide.image || ""}
                        onChange={(e) => updateHeroSlide(index, "image", e.target.value)}
                        className="bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
                        placeholder="https://..."
                      />
                    </SectionField>
                    <SectionField label="Top Badge" hint="e.g. FLASH SALE • LIVE NOW">
                      <Input
                        value={slide.badge || ""}
                        onChange={(e) => updateHeroSlide(index, "badge", e.target.value)}
                        className="bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
                      />
                    </SectionField>
                    <SectionField label="Kicker Label" hint="e.g. MEGA SEASONAL SALE">
                      <Input
                        value={slide.kicker || ""}
                        onChange={(e) => updateHeroSlide(index, "kicker", e.target.value)}
                        className="bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
                      />
                    </SectionField>
                    <SectionField label="Discount Tag" hint="e.g. UP TO 70% OFF">
                      <Input
                        value={slide.discount || ""}
                        onChange={(e) => updateHeroSlide(index, "discount", event.target.value)}
                        className="bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
                      />
                    </SectionField>
                    <SectionField label="Promo Code" hint="Code to copy (e.g. NIKE50)">
                      <Input
                        value={slide.code || ""}
                        onChange={(e) => updateHeroSlide(index, "code", e.target.value)}
                        className="bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white font-mono"
                      />
                    </SectionField>
                    <div className="md:col-span-2">
                      <SectionField label="Banner Title">
                        <Input
                          value={slide.title || ""}
                          onChange={(e) => updateHeroSlide(index, "title", e.target.value)}
                          className="bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
                        />
                      </SectionField>
                    </div>
                    <div className="md:col-span-2">
                      <SectionField label="Slide Description">
                        <textarea
                          rows={3}
                          className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3.5 py-2 text-xs text-zinc-900 dark:text-white outline-none transition placeholder:text-zinc-400 focus:border-emerald-600"
                          value={slide.description || ""}
                          onChange={(e) => updateHeroSlide(index, "description", e.target.value)}
                        />
                      </SectionField>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SettingsSection>

      </div>
    </div>
  );
}
