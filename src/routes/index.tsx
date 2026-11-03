import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Phone } from "lucide-react";
import hero from "@/assets/industry.jpg";
import { Button } from "@/components/ui/button";
import { EnquiryForm } from "@/components/enquiry-form";
import { CategoryGrid, ShopInformation } from "@/components/bergfelds-sections";
import { business, pageHead } from "@/lib/bergfelds";

export const Route = createFileRoute("/")({
  head: () => pageHead("Din inköpskanal – Industri, VVS och Verkstad", "Bergfelds hjälper företagskunder med inköp inom industri, VVS och verkstad. Personlig kontakt i Ludvika."),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="hero">
        <img src={hero} alt="Illustrativ industribild med metallkomponenter" width={1536} height={1024} className="hero-photo" />
        <div className="hero-overlay" />
        <div className="site-container hero-inner">
          <div className="text-hero-foreground"><p className="mb-6 text-xs font-semibold text-hero-muted">INDUSTRI – VVS – VERKSTAD</p><h1 className="hero-title">BERGFELDS</h1><p className="mt-2 text-4xl font-medium leading-tight md:text-5xl">Din inköpskanal.</p><p className="mt-6 max-w-lg text-base leading-relaxed text-hero-muted">Vi hjälper ditt företag med inköp av produkter och förnödenheter inom industri, VVS och verkstad. En personlig kontakt, nära din verksamhet.</p><div className="mt-8 flex flex-wrap gap-3"><Button asChild className="h-12 rounded-full px-6 font-semibold"><a href={business.phoneHref}><Phone />Ring {business.phone}</a></Button><Button asChild variant="ghost" className="h-12 rounded-full px-4 text-hero-foreground hover:bg-hero-foreground/10 hover:text-hero-foreground"><Link to="/sortiment">Se vårt sortiment <ArrowRight /></Link></Button></div><p className="mt-8 text-xs text-hero-muted">Din inköpskontakt i Ludvika.</p></div>
          <EnquiryForm />
        </div>
      </section>
      <section className="section-space"><div className="site-container"><div className="mb-9 flex flex-wrap items-end justify-between gap-5"><div><p className="eyebrow">VÅRA VERKSAMHETSOMRÅDEN</p><h2 className="section-title mt-3">Vad behöver din verksamhet?</h2><p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">Tre huvudområden. En personlig inköpskontakt.</p></div><Button asChild variant="link" className="px-0"><Link to="/sortiment">Se vårt sortiment <ArrowRight /></Link></Button></div><CategoryGrid /><div className="mt-7 flex flex-wrap items-center justify-between gap-5 border-y py-6"><div><h3 className="text-lg font-bold">Hittar du inte det du söker?</h3><p className="mt-1 text-sm text-muted-foreground">Vi hjälper även till med andra produktgrupper. Berätta vad du behöver.</p></div><Button asChild variant="outline" className="h-11 rounded-full px-6"><Link to="/kontakta-oss">Kontakta oss <ArrowUpRight /></Link></Button></div></div></section>
      <section className="section-space bg-primary text-primary-foreground"><div className="site-container grid gap-10 lg:grid-cols-2 lg:gap-24"><div><p className="text-xs font-semibold text-primary-foreground/75">EN KONTAKT. PERSONLIG HJÄLP.</p><h2 className="section-title mt-4">Personlig service.<br />Från första frågan.</h2><p className="mt-5 max-w-md leading-relaxed text-primary-foreground/85">Bakom Bergfelds finns människor med erfarenhet av kund- och leverantörsrelationer. Vi hjälper dig vidare med dina inköp.</p><Button asChild variant="ghost" className="mt-6 px-0 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><Link to="/om-bergfelds">Lär känna Bergfelds <ArrowRight /></Link></Button></div><div>{[{t:"Berätta vad du söker",d:"Kontakta oss på telefon eller mejl och beskriv ditt behov."},{t:"Vi hjälper dig vidare",d:"Vi hjälper till att hitta lämpliga produkter och förnödenheter."},{t:"Vi återkommer till dig",d:"Du får information om din förfrågan och möjliga nästa steg."}].map((step, i) => <div key={step.t} className="flex gap-5 border-b border-primary-foreground/25 py-5 first:pt-0 last:border-0"><span className="pt-1 text-sm font-medium text-primary-foreground/65">0{i+1}</span><div><h3 className="text-xl font-semibold">{step.t}</h3><p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">{step.d}</p></div></div>)}</div></div></section>
      <section className="section-space bg-card"><div className="site-container"><ShopInformation /></div></section>
      <section className="section-space bg-secondary"><div className="site-container flex flex-wrap items-center justify-between gap-8"><div><p className="eyebrow">GLÄDJE · SERVICE · KVALITÉ</p><h2 className="section-title mt-3">Du som kund hos Bergfelds</h2><p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">Personligt bemötande, produktkunskap och hjälp med din verksamhets inköp.</p></div><Button asChild className="h-12 rounded-full px-7"><Link to="/du-som-kund">Läs mer <ArrowRight /></Link></Button></div></section>
    </>
  );
}
