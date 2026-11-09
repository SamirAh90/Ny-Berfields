import { describe, expect, it } from "vitest";
import { defaultSiteContent, mergeSiteContent, phoneHref } from "@/lib/site-content";

describe("mergeSiteContent", () => {
  it("returns the verified defaults when nothing is saved", () => {
    const merged = mergeSiteContent(null);
    expect(merged.business.phone).toBe("0240-410 210");
    expect(merged.business.email).toBe("order@bergfelds.se");
    expect(merged.suppliers).toContain("Milwaukee");
    expect(merged.pages.about[0]).toContain("grundades år 2025");
  });

  it("applies saved overrides", () => {
    const merged = mergeSiteContent({
      business: { phone: "0240-410 299" },
      hero: { tagline: "Allt för din verkstad." },
      suppliers: ["Bosch Professional"],
    });
    expect(merged.business.phone).toBe("0240-410 299");
    expect(merged.hero.tagline).toBe("Allt för din verkstad.");
    expect(merged.suppliers).toEqual(["Bosch Professional"]);
    // Untouched fields keep the defaults.
    expect(merged.business.email).toBe("order@bergfelds.se");
  });

  it("falls back to defaults for empty or invalid values", () => {
    const merged = mergeSiteContent({
      business: { phone: "   ", hours: [] },
      pages: { about: ["", 42] },
    });
    expect(merged.business.phone).toBe(defaultSiteContent.business.phone);
    expect(merged.business.hours).toEqual(defaultSiteContent.business.hours);
    expect(merged.pages.about).toEqual(defaultSiteContent.pages.about);
  });
});

describe("phoneHref", () => {
  it("builds a Swedish tel: link from the displayed number", () => {
    expect(phoneHref("0240-410 210")).toBe("tel:+46240410210");
  });
});
