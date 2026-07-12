import { getMetadataDefaults } from "@/server/services/settings-service";
import { getPublicSiteSettings } from "@/server/services/settings-service";

export async function generateMetadata() {
  return getMetadataDefaults("Contact Us");
}

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const settings = await getPublicSiteSettings();

  return (
    <div className="mx-auto w-full max-w-[1240px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-12">
        <h1 className="text-5xl font-black uppercase tracking-[-0.05em] text-white sm:text-6xl">Contact Us</h1>
        <div className="mt-4 h-1.5 w-20 rounded-full bg-[var(--accent)]" />
        <p className="mt-6 max-w-2xl text-base leading-7 text-white/50">
          Have questions, partner requests, or feedback? Get in touch with our team directly.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:items-start">
        <div className="space-y-6">
          <div className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-6">
            <h3 className="text-lg font-black uppercase tracking-wider text-white">General Support</h3>
            <p className="mt-2 text-sm text-white/50">
              For promo codes, deals queries, or user account support.
            </p>
            <p className="mt-4 text-base font-bold text-[var(--accent)]">{settings.supportEmail || "support@exklusave.com"}</p>
          </div>

          <div className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-6">
            <h3 className="text-lg font-black uppercase tracking-wider text-white">Partnership Enquiries</h3>
            <p className="mt-2 text-sm text-white/50">
              For merchant listing requests, API integrations, and promo partnerships.
            </p>
            <p className="mt-4 text-base font-bold text-[var(--accent)]">partners@exklusave.com</p>
          </div>
        </div>

        <form className="space-y-6 rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/70">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 text-sm text-white outline-none focus:border-[var(--accent)]/50"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/70">Email Address</label>
              <input
                type="email"
                placeholder="john@example.com"
                className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 text-sm text-white outline-none focus:border-[var(--accent)]/50"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-white/70">Subject</label>
            <input
              type="text"
              placeholder="How can we help you?"
              className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 text-sm text-white outline-none focus:border-[var(--accent)]/50"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-white/70">Message</label>
            <textarea
              rows={6}
              placeholder="Tell us details of your request..."
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-4 text-sm text-white outline-none focus:border-[var(--accent)]/50"
              required
            />
          </div>

          <button
            type="submit"
            className="h-12 w-full rounded-xl bg-[var(--accent)] text-xs font-black uppercase tracking-[0.2em] text-black hover:scale-[1.01] transition-transform"
          >
            Submit Message
          </button>
        </form>
      </div>
    </div>
  );
}
