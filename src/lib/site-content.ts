import { business, suppliers } from "@/lib/bergfelds";
import { originalContent } from "@/lib/original-content";

// Editable site content. Defaults mirror the verified original content; the
// admin portal saves overrides to the site_content table (key "site").
export type SiteContent = {
  business: {
    phone: string;
    email: string;
    visitingAddress: string;
    postalAddress: string;
    hours: string[];
  };
  hero: {
    title: string;
    tagline: string;
    intro: string;
  };
  home: {
    categoriesLead: string;
    serviceText: string;
    aboutTeaser: string;
  };
  pages: {
    shop: string[];
    customers: string[];
    about: string[];
    sortimentIntro: string;
    butikenIntro: string;
    kontaktIntro: string;
  };
  suppliers: string[];
  images: {
    hero: string;
    logo: string;
    founders: string;
    overview: string;
  };
};

export const defaultSiteContent: SiteContent = {
  business: {
    phone: business.phone,
    email: business.email,
    visitingAddress: business.visitingAddress,
    postalAddress: business.postalAddress,
    hours: [...business.hours],
  },
  hero: {
    title: "BERGFELDS",
    tagline: "Din inköpskanal.",
    intro: originalContent.home[0],
  },
  home: {
    categoriesLead: originalContent.home[1],
    serviceText: originalContent.customers[0],
    aboutTeaser: originalContent.about[0],
  },
  pages: {
    shop: [...originalContent.shop],
    customers: [...originalContent.customers],
    about: [...originalContent.about],
    sortimentIntro:
      "Vi hjälper företagskunder med produkter och förnödenheter inom våra tre huvudområden – och kan även hjälpa till med andra produktgrupper.",
    butikenIntro: "Vi jobbar för fullt med planering och uppbyggnad av vår butik.",
    kontaktIntro: "En fråga, ett inköpsbehov eller något du inte hittar? Ring eller mejla oss.",
  },
  suppliers: [...suppliers],
  images: {
    hero: "",
    logo: "",
    founders: "",
    overview: "",
  },
};

function asString(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function asStringList(value: unknown, fallback: string[]): string[] {
  if (!Array.isArray(value)) return fallback;
  const list = value.filter((item): item is string => typeof item === "string" && !!item.trim());
  return list.length ? list : fallback;
}

// Merges a saved partial document over the defaults, dropping empty values so
// a cleared field falls back to the original text instead of rendering blank.
export function mergeSiteContent(saved: unknown): SiteContent {
  if (!saved || typeof saved !== "object") return defaultSiteContent;
  const doc = saved as Record<string, unknown>;
  const biz = (doc.business ?? {}) as Record<string, unknown>;
  const hero = (doc.hero ?? {}) as Record<string, unknown>;
  const home = (doc.home ?? {}) as Record<string, unknown>;
  const pages = (doc.pages ?? {}) as Record<string, unknown>;
  const images = (doc.images ?? {}) as Record<string, unknown>;
  return {
    business: {
      phone: asString(biz["phone"], defaultSiteContent.business.phone),
      email: asString(biz["email"], defaultSiteContent.business.email),
      visitingAddress: asString(biz["visitingAddress"], defaultSiteContent.business.visitingAddress),
      postalAddress: asString(biz["postalAddress"], defaultSiteContent.business.postalAddress),
      hours: asStringList(biz["hours"], defaultSiteContent.business.hours),
    },
    hero: {
      title: asString(hero["title"], defaultSiteContent.hero.title),
      tagline: asString(hero["tagline"], defaultSiteContent.hero.tagline),
      intro: asString(hero["intro"], defaultSiteContent.hero.intro),
    },
    home: {
      categoriesLead: asString(home["categoriesLead"], defaultSiteContent.home.categoriesLead),
      serviceText: asString(home["serviceText"], defaultSiteContent.home.serviceText),
      aboutTeaser: asString(home["aboutTeaser"], defaultSiteContent.home.aboutTeaser),
    },
    pages: {
      shop: asStringList(pages["shop"], defaultSiteContent.pages.shop),
      customers: asStringList(pages["customers"], defaultSiteContent.pages.customers),
      about: asStringList(pages["about"], defaultSiteContent.pages.about),
      sortimentIntro: asString(pages["sortimentIntro"], defaultSiteContent.pages.sortimentIntro),
      butikenIntro: asString(pages["butikenIntro"], defaultSiteContent.pages.butikenIntro),
      kontaktIntro: asString(pages["kontaktIntro"], defaultSiteContent.pages.kontaktIntro),
    },
    suppliers: asStringList(doc["suppliers"], defaultSiteContent.suppliers),
    images: {
      hero: asString(images["hero"], defaultSiteContent.images.hero),
      logo: asString(images["logo"], defaultSiteContent.images.logo),
      founders: asString(images["founders"], defaultSiteContent.images.founders),
      overview: asString(images["overview"], defaultSiteContent.images.overview),
    },
  };
}

export function phoneHref(phone: string): string {
  return `tel:+46${phone.replace(/[^\d]/g, "").replace(/^0/, "")}`;
}

export function directionsUrl(visitingAddress: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(visitingAddress)}`;
}
