import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Clock, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { directionsUrl, phoneHref } from "@/lib/site-content";
import { useSiteContent } from "@/components/site-content-context";
import industry from "@/assets/industry.jpg";
import plumbing from "@/assets/plumbing.jpg";
import workshop from "@/assets/workshop.jpg";

export const categories = [
  {
    title: "Industri",
    image: industry,
    description: "Produkter och förnödenheter för verksamheter inom industrin.",
  },
  {
    title: "VVS",
    image: plumbing,
    description: "Din inköpskontakt för produkter och förnödenheter inom VVS.",
  },
  {
    title: "Verkstad",
    image: workshop,
    description: "Hjälp med inköp för verkstaden och den dagliga verksamheten.",
  },
];

export function CategoryGrid({ enquiry = false }: { enquiry?: boolean }) {
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-3">
        {categories.map((category) => (
          <Link
            to={enquiry ? "/kontakta-oss" : "/sortiment"}
            search={enquiry ? { kategori: category.title } : {}}
            key={category.title}
            className="category-card group"
          >
            <div className="overflow-hidden">
              <img
                src={category.image}
                alt={`Illustrationsbild för ${category.title}, inte Bergfelds lager`}
                loading="lazy"
                width={1024}
                height={1024}
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">{category.title}</h3>
                <ArrowUpRight className="size-5 text-primary" />
              </div>
              <p className="mt-3 min-h-12 text-sm leading-relaxed text-muted-foreground">
                {category.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                {enquiry ? "Fråga oss" : "Utforska sortimentet"}
                <ArrowRight className="size-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Illustrationsbilder för våra verksamhetsområden. Kontakta oss för produkt- och
        sortimentsinformation.
      </p>
    </div>
  );
}

export function ShopInformation({ detailed = false }: { detailed?: boolean }) {
  const content = useSiteContent();
  const business = content.business;
  const shopText = content.pages.shop;
  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
      <div>
        <p className="eyebrow">BERGFELDS I LUDVIKA</p>
        <h2 className="section-title mt-3">
          Välkommen att
          <br />
          höra av dig.
        </h2>
        {(detailed ? shopText : shopText.slice(0, 1)).map((text) => (
          <p key={text} className="mt-5 max-w-lg leading-relaxed text-muted-foreground">{text}</p>
        ))}
        {detailed && <div className="mt-7 flex aspect-[4/3] items-center justify-center border border-dashed bg-secondary p-8 text-center text-sm text-muted-foreground">Genuint foto från Bergfelds butik inväntas.</div>}
        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild className="h-11 rounded-full px-6">
            <a href={directionsUrl(business.visitingAddress)} target="_blank" rel="noreferrer">
              Hitta hit <ArrowUpRight />
            </a>
          </Button>
          <Button asChild variant="outline" className="h-11 rounded-full px-6">
            <Link to={detailed ? "/kontakta-oss" : "/butiken"}>
              {detailed ? "Kontakta oss" : "Läs mer om butiken"} <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
      <div className="grid gap-7 border-t pt-7 lg:pt-0 lg:border-t-0">
        <div className="flex gap-4">
          <MapPin className="mt-1 size-6 shrink-0 text-primary" />
          <div>
            <h3 className="font-bold">Besöksadress</h3>
            <p className="mt-2">{business.visitingAddress}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Publicerad tillfällig adress. Bekräfta aktuell adress med oss innan ditt besök.
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <Clock className="mt-1 size-6 shrink-0 text-primary" />
          <div>
            <h3 className="font-bold">Publicerade öppettider</h3>
            <div className="mt-2 grid gap-1 text-sm">
              {business.hours.map((hour) => (
                <p key={hour}>{hour}</p>
              ))}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Kontakta oss för att bekräfta aktuella öppettider.
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <Phone className="mt-1 size-6 shrink-0 text-primary" />
          <div>
            <h3 className="font-bold">Vi hjälper dig gärna</h3>
            <a href={phoneHref(business.phone)} className="mt-2 block text-primary">
              {business.phone}
            </a>
            <a href={`mailto:${business.email}`} className="mt-1 block text-primary">
              {business.email}
            </a>
            {detailed && <p className="mt-3 text-sm text-muted-foreground">Övriga tider finns vi tillgängliga på; {business.email}</p>}
          </div>
        </div>
        {detailed && (
          <div>
            <h3 className="font-bold">Postadress</h3>
            <p className="mt-2 text-sm">{business.name}<br />{business.postalAddress}</p>
          </div>
        )}
        {detailed && (
          <iframe
            title={`Karta över publicerad besöksadress, ${business.visitingAddress}`}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(business.visitingAddress)}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-64 w-full rounded-lg border"
          />
        )}
      </div>
    </div>
  );
}

export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="bg-secondary py-16 md:py-20">
      <div className="site-container">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="page-title mt-4">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </section>
  );
}

export function SupplierMarquee() {
  const { suppliers } = useSiteContent();
  const loop = [...suppliers, ...suppliers];
  return (
    <section className="border-y bg-card py-12" aria-labelledby="suppliers-title">
      <div className="site-container mb-8">
        <h2 id="suppliers-title" className="text-2xl font-bold">
          Över 30 leverantörer i sortimentet
        </h2>
      </div>
      <div className="marquee-mask">
        <ul className="marquee-track">
          {loop.map((name, i) => (
            <li key={i} aria-hidden={i >= suppliers.length} className="marquee-item">
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
