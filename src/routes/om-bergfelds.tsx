import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/bergfelds-sections";
import { useSiteContent } from "@/components/site-content-context";
import { pageHead } from "@/lib/bergfelds";
import founders from "@/assets/bergfelds-founders.jpg.asset.json";
export const Route = createFileRoute("/om-bergfelds")({
  head: () =>
    pageHead(
      "Om Bergfelds",
      "Bergfeld Försäljning AB grundades 2025 av Janne Bergkvist och Carin Riesenfeld. Glädje, service och kvalité.",
    ),
  component: About,
});
function About() {
  const content = useSiteContent();
  return (
    <>
      <PageIntro
        eyebrow="MÄNNISKORNA BAKOM DIN INKÖPSKANAL"
        title="Om Bergfelds"
        description={content.pages.about[0] ?? ""}
      />
      <section className="site-container section-space grid gap-12 lg:grid-cols-2">
        <div>
          <img src={content.images.founders || founders.url} alt="Janne Bergkvist och Carin Riesenfeld, grundarna av Bergfelds" width={480} height={640} className="w-full max-w-md rounded-lg" />
          <Button asChild className="mt-7 rounded-full">
            <Link to="/kontakta-oss">
              Kontakta Jan och Carin <ArrowRight />
            </Link>
          </Button>
        </div>
        <div>
          {content.pages.about.slice(1).map((text) => <p key={text} className="mb-5 leading-relaxed text-muted-foreground">{text}</p>)}
          <div className="flex flex-wrap gap-5 text-sm font-semibold text-primary">
            <a href="https://facebook.com/profile.php?id=61582548335301" target="_blank" rel="noreferrer">Facebook <ArrowRight className="inline size-4" /></a>
            <a href="https://instagram.com/bergfelds_denlillagrossisten/" target="_blank" rel="noreferrer">Instagram <ArrowRight className="inline size-4" /></a>
          </div>
          <div className="mt-8 grid gap-4 border-t pt-6">
            {["Glädje", "Service", "Kvalité"].map((value, i) => (
              <p
                key={value}
                className="flex items-center gap-5 border-b pb-4 text-xl font-semibold"
              >
                <span className="text-xs text-primary">0{i + 1}</span>
                {value}
              </p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
