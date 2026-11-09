import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/bergfelds-sections";
import { EnquiryForm } from "@/components/enquiry-form";
import { useSiteContent } from "@/components/site-content-context";
import { directionsUrl, phoneHref } from "@/lib/site-content";
import { business as staticBusiness, pageHead } from "@/lib/bergfelds";
export const Route = createFileRoute("/kontakta-oss")({
  validateSearch: (search: Record<string, unknown>): { kategori?: string } => {
    const category = search["kategori"];
    return typeof category === "string" && ["Industri", "VVS", "Verkstad"].includes(category)
      ? { kategori: category }
      : {};
  },
  head: () =>
    pageHead(
      "Kontakta oss",
      "Kontakta Bergfelds i Ludvika på 0240-410 210 eller order@bergfelds.se. Kontaktuppgifter till Jan Bergkvist och Carin Riesenfeld.",
    ),
  component: Contact,
});
function Contact() {
  const { kategori } = Route.useSearch();
  const content = useSiteContent();
  const business = content.business;
  return (
    <>
      <PageIntro
        eyebrow="VI HJÄLPER DIG GÄRNA"
        title="Kontakta oss"
        description={content.pages.kontaktIntro}
      />
      <section className="site-container section-space grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className="text-2xl font-bold">Bergfeld Försäljning AB</h2>
          <p className="mt-2 text-sm text-muted-foreground">Org.nr {staticBusiness.organisationNumber}</p>
          <div className="my-6 grid gap-3">
            <a
              href={phoneHref(business.phone)}
              className="flex items-center gap-3 text-lg font-semibold text-primary"
            >
              <Phone className="size-5" />
              {business.phone}
            </a>
            <a href={`mailto:${business.email}`} className="flex items-center gap-3 text-primary">
              <Mail className="size-5" />
              {business.email}
            </a>
          </div>
          <div className="grid gap-6 border-y py-6 sm:grid-cols-2">
            {[
              {
                name: "Jan Bergkvist",
                phone: "0240-410 216",
                href: "tel:+46240410216",
                email: "jan@bergfelds.se",
              },
              {
                name: "Carin Riesenfeld",
                phone: "0240-410 217",
                href: "tel:+46240410217",
                email: "carin@bergfelds.se",
              },
            ].map((person) => (
              <div key={person.name}>
                <h3 className="font-bold">{person.name}</h3>
                <a href={person.href} className="mt-3 block text-sm text-primary">
                  {person.phone}
                </a>
                <a href={`mailto:${person.email}`} className="mt-2 block text-sm text-primary">
                  {person.email}
                </a>
              </div>
            ))}
          </div>
          <div className="mt-7 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="font-bold">Postadress</h3>
              <p className="mt-3 text-sm leading-relaxed">
                Bergfeld Försäljning AB
                <br />
                {business.postalAddress}
              </p>
            </div>
            <div>
              <h3 className="font-bold">Besöksadress</h3>
              <p className="mt-3 text-sm">
                {business.visitingAddress}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Publicerad tillfällig adress. Bekräfta med oss före besöket.
              </p>
              <a
                href={directionsUrl(business.visitingAddress)}
                target="_blank"
                rel="noreferrer"
                className="mt-3 flex items-center gap-2 text-sm font-semibold text-primary"
              >
                Hitta hit <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
        <EnquiryForm key={kategori} initialCategory={kategori ?? ""} />
      </section>
      <section className="site-container pb-16">
        <iframe
          title="Karta över publicerad besöksadress för Bergfelds"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(business.visitingAddress)}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="h-80 w-full rounded-lg border"
        />
      </section>
    </>
  );
}
