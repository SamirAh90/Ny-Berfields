import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, ShopInformation } from "@/components/bergfelds-sections";
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
  return (
    <>
      <PageIntro
        eyebrow="NÄRA DIG I LUDVIKA"
        title="Butiken"
        description="Vi jobbar för fullt med planering och uppbyggnad av vår butik."
      />
      <section className="site-container section-space">
        <ShopInformation detailed />
      </section>
    </>
  );
}
