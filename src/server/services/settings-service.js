import "server-only";

import { getSettings } from "@/server/repositories/settings-repository";

export async function getPublicSiteSettings() {
  const settings = await getSettings();

  return {
    siteName: settings.general?.siteName || "Persuekey",
    tagline: settings.general?.tagline || "Smart shopping, better saving.",
    supportEmail: settings.general?.supportEmail || "support@persuekey.com",
    social: settings.social || {},
    seo: settings.seo || {},
    pages: settings.pages || {},
  };
}

export async function getMetadataDefaults(pageTitle, overrides = {}) {
  const settings = await getSettings();
  const title = (settings.seo?.titleTemplate || "%s | Persuekey").replace("%s", pageTitle);
  const description = overrides.description || settings.seo?.metaDescription || "";
  const openGraphTitle = overrides.openGraph?.title || overrides.title || settings.seo?.ogTitle || "";
  const openGraphDescription = overrides.openGraph?.description || description || settings.seo?.ogDescription || "";

  const verification = {};
  if (settings.seo?.googleSiteVerification) {
    verification.google = settings.seo.googleSiteVerification;
  }
  if (settings.seo?.bingSiteVerification) {
    verification.other = {
      ...(verification.other || {}),
      "msvalidate.01": settings.seo.bingSiteVerification,
    };
  }
  if (settings.seo?.yandexSiteVerification) {
    verification.other = {
      ...(verification.other || {}),
      yandex: settings.seo.yandexSiteVerification,
    };
  }

  return {
    title: overrides.title || title,
    description,
    openGraph: {
      title: openGraphTitle,
      description: openGraphDescription,
    },
    robots: settings.seo?.robots || "index,follow",
    icons: {
      icon: "/favicon.svg",
    },
    verification,
  };
}
