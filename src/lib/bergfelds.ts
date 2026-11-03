export const business = {
  name: "Bergfeld Försäljning AB",
  phone: "0240-410 210",
  phoneHref: "tel:+46240410210",
  email: "order@bergfelds.se",
  organisationNumber: "559516-9508",
  visitingAddress: "Gatubacken 9, 771 42 Ludvika",
  postalAddress: "Ågårdsvägen 16, 771 94 Ludvika",
  hours: ["Måndag–torsdag: 07:00–16:00", "Fredag: 07:00–13:00", "Lördag–söndag: Stängt"],
  directions: "https://www.google.com/maps/search/?api=1&query=Gatubacken+9+771+42+Ludvika",
};

export const navigation = [
  { to: "/", label: "Startsida" },
  { to: "/sortiment", label: "Sortiment" },
  { to: "/butiken", label: "Butiken" },
  { to: "/om-bergfelds", label: "Om Bergfelds" },
  { to: "/du-som-kund", label: "Du som kund" },
  { to: "/kontakta-oss", label: "Kontakta oss" },
] as const;

export function pageHead(title: string, description: string) {
  return {
    meta: [
      { title: `${title} | Bergfelds i Ludvika` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} | Bergfelds` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}

export type Enquiry = { description: string; name: string; company: string; contact: string };

export function validateEnquiry(value: Enquiry): string | null {
  if (
    !value.description.trim() ||
    !value.name.trim() ||
    !value.company.trim() ||
    !value.contact.trim()
  ) {
    return "Fyll i alla fält så att vi kan hjälpa dig vidare.";
  }
  const contact = value.contact.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact) && !/^\+?[\d\s()\-]{6,}$/.test(contact)) {
    return "Ange en giltig e-postadress eller ett telefonnummer.";
  }
  return null;
}

export function enquiryMailto(value: Enquiry) {
  const body = `Förfrågan: ${value.description.trim()}\n\nNamn: ${value.name.trim()}\nFöretag: ${value.company.trim()}\nKontakt: ${value.contact.trim()}`;
  return `mailto:${business.email}?subject=${encodeURIComponent("Produktförfrågan till Bergfelds")}&body=${encodeURIComponent(body)}`;
}
