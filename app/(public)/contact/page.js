"use client";

import { useState } from "react";
import Link from "next/link";

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function HandshakeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l1.71 1.71" />
      <path d="m2 2 20 20" />
      <path d="M8.35 8.35 6 11l2 2 .88-.88" />
      <path d="M5 15a5.31 5.31 0 0 1-.12-3.4" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
  );
}

const contactCards = [
  {
    icon: <MailIcon />,
    label: "General Support",
    title: "Got a Question?",
    description: "For promo code issues, deal queries, or account support. We reply within 24 hours.",
    email: "support@persuekey.com",
    color: "from-emerald-500/15 to-teal-500/10",
    border: "border-emerald-500/20",
    iconBg: "bg-emerald-500/15 text-emerald-500",
  },
  {
    icon: <HandshakeIcon />,
    label: "Partnerships",
    title: "Work With Us",
    description: "Merchant listings, affiliate integrations, sponsored placements and brand collaborations.",
    email: "partners@persuekey.com",
    color: "from-violet-500/15 to-purple-500/10",
    border: "border-violet-500/20",
    iconBg: "bg-violet-500/15 text-violet-400",
  },
  {
    icon: <ShieldIcon />,
    label: "Trust & Safety",
    title: "Report an Issue",
    description: "Found an expired coupon, fraudulent offer, or a security concern? Let us know immediately.",
    email: "trust@persuekey.com",
    color: "from-amber-500/15 to-orange-500/10",
    border: "border-amber-500/20",
    iconBg: "bg-amber-500/15 text-amber-400",
  },
];

const faqs = [
  { q: "How quickly do you respond?", a: "Our team typically responds within 24 hours on weekdays." },
  { q: "Can I submit a store for listing?", a: "Yes! Reach out via the partnership email and our team will review your request." },
  { q: "How do I report a broken coupon?", a: "Use the contact form above or email trust@persuekey.com with the coupon details." },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Unable to send your message. Please try again.");
      }
      setSent(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative overflow-hidden bg-zinc-950 pb-20 pt-20">
        {/* Glow */}
        <div className="pointer-events-none absolute -top-20 left-1/2 h-64 w-[700px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

        <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-1.5 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-emerald-400">We're Here to Help</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] text-white leading-[1.05]">
            Get in{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-white/45 max-w-xl mx-auto leading-relaxed">
            Have questions, partnership requests, or feedback? Our team is ready to help you out.
          </p>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid gap-5 sm:grid-cols-3 -mt-8 relative z-10">
          {contactCards.map((card) => (
            <a
              key={card.label}
              href={`mailto:${card.email}`}
              className={`group relative overflow-hidden rounded-3xl border bg-gradient-to-br ${card.color} ${card.border} p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
            >
              <div className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${card.iconBg} mb-4`}>
                {card.icon}
              </div>
              <div className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{card.label}</div>
              <h3 className="text-lg font-black text-zinc-900 mb-2">{card.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed mb-4">{card.description}</p>
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-600 group-hover:gap-3 transition-all">
                <span>{card.email}</span>
                <ArrowIcon />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Form + FAQ */}
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-start">

          {/* Form */}
          <div className="relative">
            <div className="mb-8">
              <h2 className="text-3xl font-black tracking-tight text-zinc-900">Send Us a Message</h2>
              <p className="mt-2 text-sm text-zinc-400">Fill out the form and we'll get back to you within 24 hours.</p>
            </div>

            {errorMsg && (
              <div className="mb-4 rounded-xl bg-rose-50 border border-rose-200/60 p-4 text-xs font-semibold text-rose-600">
                {errorMsg}
              </div>
            )}

            {sent ? (
              <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-emerald-500/30 bg-emerald-50 py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 text-3xl">✓</div>
                <h3 className="text-xl font-black text-zinc-900">Message Sent!</h3>
                <p className="text-sm text-zinc-500 max-w-xs">Thank you for reaching out. We'll reply to your email within 24 hours.</p>
                <button onClick={() => setSent(false)} className="mt-2 rounded-xl border border-zinc-200 px-5 py-2 text-xs font-bold text-zinc-500 hover:border-emerald-500/40 hover:text-emerald-600 transition-colors cursor-pointer">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-[0.15em] text-zinc-500">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="h-13 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 text-sm font-medium text-zinc-900 outline-none transition-all placeholder:text-zinc-350 focus:border-emerald-500/50 focus:bg-white focus:ring-3 focus:ring-emerald-500/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-[0.15em] text-zinc-500">Email Address</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-13 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 text-sm font-medium text-zinc-900 outline-none transition-all placeholder:text-zinc-350 focus:border-emerald-500/50 focus:bg-white focus:ring-3 focus:ring-emerald-500/10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-[0.15em] text-zinc-500">Subject</label>
                  <input
                    type="text"
                    placeholder="How can we help you?"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    className="h-13 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 text-sm font-medium text-zinc-900 outline-none transition-all placeholder:text-zinc-350 focus:border-emerald-500/50 focus:bg-white focus:ring-3 focus:ring-emerald-500/10"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-[0.15em] text-zinc-500">Message</label>
                  <textarea
                    rows={6}
                    placeholder="Tell us the details of your request..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm font-medium text-zinc-900 outline-none transition-all placeholder:text-zinc-350 focus:border-emerald-500/50 focus:bg-white focus:ring-3 focus:ring-emerald-500/10 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group inline-flex h-13 w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.01] hover:shadow-emerald-600/35 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowIcon />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* FAQ */}
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-black tracking-tight text-zinc-900">FAQs</h2>
              <p className="mt-2 text-sm text-zinc-400">Quick answers to common questions.</p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden cursor-pointer ${openFaq === i ? "border-emerald-500/30 bg-emerald-50/60" : "border-zinc-200 bg-white hover:border-zinc-300"}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div className="flex items-center justify-between gap-4 px-5 py-4">
                    <span className="text-sm font-bold text-zinc-900">{faq.q}</span>
                    <span className={`text-xl font-light transition-transform duration-200 text-zinc-400 shrink-0 ${openFaq === i ? "rotate-45 text-emerald-600" : ""}`}>+</span>
                  </div>
                  {openFaq === i && (
                    <div className="px-5 pb-4 text-sm text-zinc-500 leading-relaxed border-t border-emerald-500/15 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Info */}
            <div className="mt-8 rounded-3xl border border-zinc-100 bg-zinc-50 p-6 space-y-4">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">Response Times</h4>
              {[
                { label: "General Support", time: "Within 24 hrs", dot: "bg-emerald-400" },
                { label: "Partnership", time: "Within 48 hrs", dot: "bg-violet-400" },
                { label: "Trust & Safety", time: "Within 12 hrs", dot: "bg-amber-400" },
              ].map((r) => (
                <div key={r.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className={`h-2 w-2 rounded-full ${r.dot}`} />
                    <span className="text-sm font-semibold text-zinc-600">{r.label}</span>
                  </div>
                  <span className="text-xs font-bold text-zinc-400">{r.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
