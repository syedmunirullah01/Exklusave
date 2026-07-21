"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubscribe(e) {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Unable to subscribe. Please try again.");
      }
      toast.success("Subscribed successfully! Thank you.");
      setEmail("");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubscribe} className="flex w-full max-w-md flex-col sm:flex-row items-center gap-3">
      <div className="relative flex-1 w-full">
        <svg viewBox="0 0 24 24" className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className="h-13 w-full rounded-2xl border border-white/10 bg-white/8 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-emerald-500/50 focus:bg-white/12 focus:ring-2 focus:ring-emerald-500/20"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="group h-13 flex-shrink-0 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-7 text-[11px] font-black uppercase tracking-[0.18em] text-black shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 hover:shadow-emerald-500/35 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {loading ? "Subscribed..." : "Subscribe"}
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
        </svg>
      </button>
    </form>
  );
}
