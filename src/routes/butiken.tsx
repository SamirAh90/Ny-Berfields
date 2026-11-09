import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, ShopInformation } from "@/components/bergfelds-sections";
import { useSiteContent } from "@/components/site-content-context";
import { pageHead } from "@/lib/bergfelds";
export const Route = createFileRoute("/butiken")({
  head: () =>
    pageHead(
      "Butiken",
      "Besöksinformation och publicerade öppettider för Bergfelds i Ludvika. Kontakta oss inför ditt besök.",
    ),
  component: Butiken,
});
function Butiken() {
  const content = useSiteContent();
  return (
    <>
      <PageIntro
        eyebrow="NÄRA DIG I LUDVIKA"
        title="Butiken"
        description={content.pages.butikenIntro}
      />
      <section className="site-container section-space">
        <ShopInformation detailed />
      </section>
    </>
  );
}
