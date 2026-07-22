import SubmitCouponForm from "@/features/submit-coupon/SubmitCouponForm";

export const metadata = {
  title: "Submit a Coupon | Share & Earn - Persuekey",
  description: "Found a working discount code or promo offer? Share it with the Persuekey community and help everyone save on their favorite online stores.",
};

export default function SubmitCouponPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#07080a] text-zinc-900 dark:text-zinc-100 transition-colors">
      <SubmitCouponForm />
    </main>
  );
}
