import { createFileRoute } from "@tanstack/react-router";
import { CategoryGrid, PageIntro } from "@/components/bergfelds-sections";
import { useSiteContent } from "@/components/site-content-context";
import { pageHead } from "@/lib/bergfelds";
import overview from "@/assets/bergfelds-product-overview.jpg.asset.json";
export const Route = createFileRoute("/sortiment")({
  head: () =>
    pageHead(
      "Sortiment",
      "Bergfelds verksamhetsområden är Industri, VVS och Verkstad. Fråga oss om dina inköpsbehov.",
    ),
  component: Sortiment,
});
function Sortiment() {
  const content = useSiteContent();
  return (
    <>
      <PageIntro
        eyebrow="INDUSTRI – VVS – VERKSTAD"
        title="Vårt sortiment"
        description={content.pages.sortimentIntro}
      />
      <section className="site-container section-space">
        <CategoryGrid enquiry />
        <img src={content.images.overview || overview.url} alt="Bergfelds originalöversikt: kullager, VVS, kyla, infästning, tätningar, drivremmar, mark och VA, smörjmedel, tryckluft, verktyg, svets samt kap och slip" width={1280} height={720} loading="lazy" className="mt-12 h-auto w-full rounded-lg" />
        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold">Ditt behov är vår utgångspunkt.</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            Berätta vad du söker. Kontakta oss för information om specifika produkter, priser och
            tillgänglighet.
          </p>
        </div>
      </section>
    </>
  );
}
