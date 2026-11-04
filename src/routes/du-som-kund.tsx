import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/bergfelds-sections";
import { pageHead } from "@/lib/bergfelds";
import { originalContent } from "@/lib/original-content";
export const Route = createFileRoute("/du-som-kund")({
  head: () =>
    pageHead(
      "Du som kund",
      "Personligt bemötande och produktkunskap hos Bergfelds. Information för dig som företagskund.",
    ),
  component: Customers,
});
function Customers() {
  return (
    <>
      <PageIntro
        eyebrow="DIN VERKSAMHET I FOKUS"
        title="Du som kund"
        description={originalContent.customers[0] ?? ""}
      />
      <section className="site-container section-space">
        <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-muted-foreground">
          {originalContent.customers.slice(1).map((text) => <p key={text}>{text}</p>)}
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t pt-9">
          <h2 className="text-2xl font-bold">Låt oss prata om ditt behov.</h2>
          <Button asChild className="h-11 rounded-full px-6">
            <Link to="/kontakta-oss">
              Kontakta oss <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
