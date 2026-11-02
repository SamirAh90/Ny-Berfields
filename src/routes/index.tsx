import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Verkstadsleverantören – allt för er verksamhet" },
      { name: "description", content: "Förbrukning, skydd, verktyg, maskiner och gas från en och samma leverantör." },
      { property: "og:title", content: "Verkstadsleverantören" },
      { property: "og:description", content: "En leverantör för hela verkstaden, med personlig kontakt." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const categories = [
  { t: "Förbrukning & städ", d: "Papper, rengöring, tejp och annat som går åt varje vecka." },
  { t: "Skydd & arbetskläder", d: "Handskar, skor, hörselskydd och varselplagg." },
  { t: "Handverktyg", d: "Nycklar, tänger, bits och kompletta satser." },
  { t: "Elverktyg & maskiner", d: "Borrar, slipar, sågar och kompressorer." },
  { t: "Svets & gas", d: "Svetsutrustning, gas, tillsatser och skydd." },
  { t: "Förvaring & verkstad", d: "Skåp, hyllor, lyft och fästelement." },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between px-6 py-5 md:px-12">
        <span className="font-display text-2xl tracking-tight">VERKSTADS<span className="text-primary">LEV</span></span>
        <a href="tel:0000000" className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Ring oss</a>
      </header>

      <section className="relative">
        <img src={hero} alt="Butik med verktyg och skyddsutrustning" width={1600} height={912} className="h-[70vh] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 max-w-3xl px-6 pb-16 md:px-12">
          <h1 className="font-display text-5xl leading-none md:text-7xl">Från minsta skruv till hela verkstaden.</h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">Ni berättar vad ni behöver – vi ordnar resten. En kontaktperson som känner er verksamhet.</p>
        </div>
      </section>

      <section className="px-6 py-20 md:px-12">
        <h2 className="font-display text-4xl">Ett sortiment för allt</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">Slipp hålla koll på tio leverantörer. Det ni köper ofta och det ni behöver en gång om året – vi har det eller tar fram det.</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <div key={c.t} className="rounded-lg border bg-card p-6 transition hover:border-primary">
              <h3 className="text-xl font-semibold">{c.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
            </div>
          ))}
          <div className="rounded-lg bg-primary p-6 text-primary-foreground">
            <h3 className="text-xl font-semibold">Hittar ni det inte?</h3>
            <p className="mt-2 text-sm">Skicka en bild eller ett artikelnummer, så letar vi upp rätt produkt. →</p>
          </div>
        </div>
      </section>

      <footer className="border-t px-6 py-10 text-sm text-muted-foreground md:px-12">© 2026 Verkstadsleverantören</footer>
    </div>
  );
}
