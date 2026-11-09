import { useState } from "react";
import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { ExternalLink, LogOut, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getSiteContent, saveSiteContent } from "@/lib/content.functions";
import type { SiteContent } from "@/lib/site-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/_authenticated/admin")({
  loader: () => getSiteContent(),
  head: () => ({
    meta: [{ title: "Admin | Bergfelds" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminPage,
});

function paragraphsToText(list: string[]): string {
  return list.join("\n\n");
}

function textToParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function linesToText(list: string[]): string {
  return list.join("\n");
}

function textToLines(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function Field({
  label,
  value,
  onChange,
  textarea = false,
  rows = 3,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  textarea?: boolean;
  rows?: number;
  hint?: string;
}) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      {textarea ? (
        <Textarea value={value} rows={rows} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <Input value={value} onChange={(event) => onChange(event.target.value)} />
      )}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border bg-card p-6 md:p-8">
      <h2 className="text-lg font-bold">{title}</h2>
      <div className="mt-5 grid gap-5">{children}</div>
    </section>
  );
}

function AdminPage() {
  const initial = Route.useLoaderData();
  const router = useRouter();
  const navigate = useNavigate();
  const [content, setContent] = useState<SiteContent>(initial);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  function update(patch: Partial<SiteContent>) {
    setContent((current) => ({ ...current, ...patch }));
    setStatus(null);
  }

  async function handleSave() {
    setBusy(true);
    setStatus(null);
    try {
      await saveSiteContent({ data: content });
      setStatus("Sparat! Ändringarna syns direkt på webbplatsen.");
      await router.invalidate();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Kunde inte spara. Försök igen.");
    } finally {
      setBusy(false);
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="min-h-screen bg-secondary">
      <header className="sticky top-0 z-10 border-b bg-card">
        <div className="site-container flex h-16 items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold">Bergfelds admin</p>
            <p className="text-xs text-muted-foreground">Ändra webbplatsens innehåll</p>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <a href="/" target="_blank" rel="noreferrer">
                Visa webbplatsen <ExternalLink />
              </a>
            </Button>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut /> Logga ut
            </Button>
          </div>
        </div>
      </header>

      <main className="site-container grid gap-6 py-10">
        <Section title="Kontaktuppgifter och öppettider">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Telefonnummer"
              value={content.business.phone}
              onChange={(phone) => update({ business: { ...content.business, phone } })}
            />
            <Field
              label="E-postadress"
              value={content.business.email}
              onChange={(email) => update({ business: { ...content.business, email } })}
            />
            <Field
              label="Besöksadress"
              value={content.business.visitingAddress}
              onChange={(visitingAddress) =>
                update({ business: { ...content.business, visitingAddress } })
              }
            />
            <Field
              label="Postadress"
              value={content.business.postalAddress}
              onChange={(postalAddress) =>
                update({ business: { ...content.business, postalAddress } })
              }
            />
          </div>
          <Field
            label="Öppettider"
            textarea
            rows={3}
            hint="En rad per dag, till exempel: Måndag–torsdag: 07:00–16:00"
            value={linesToText(content.business.hours)}
            onChange={(text) =>
              update({ business: { ...content.business, hours: textToLines(text) } })
            }
          />
        </Section>

        <Section title="Startsida">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Stor rubrik"
              value={content.hero.title}
              onChange={(title) => update({ hero: { ...content.hero, title } })}
            />
            <Field
              label="Underrubrik"
              value={content.hero.tagline}
              onChange={(tagline) => update({ hero: { ...content.hero, tagline } })}
            />
          </div>
          <Field
            label="Inledande text"
            textarea
            value={content.hero.intro}
            onChange={(intro) => update({ hero: { ...content.hero, intro } })}
          />
          <Field
            label="Text under kategorierna"
            textarea
            value={content.home.categoriesLead}
            onChange={(categoriesLead) => update({ home: { ...content.home, categoriesLead } })}
          />
          <Field
            label="Text i det blå serviceavsnittet"
            textarea
            value={content.home.serviceText}
            onChange={(serviceText) => update({ home: { ...content.home, serviceText } })}
          />
          <Field
            label="Text i avsnittet Om Bergfelds"
            textarea
            value={content.home.aboutTeaser}
            onChange={(aboutTeaser) => update({ home: { ...content.home, aboutTeaser } })}
          />
        </Section>

        <Section title="Sidtexter">
          <Field
            label="Sortiment – inledning"
            textarea
            value={content.pages.sortimentIntro}
            onChange={(sortimentIntro) =>
              update({ pages: { ...content.pages, sortimentIntro } })
            }
          />
          <Field
            label="Butiken – inledning"
            textarea
            value={content.pages.butikenIntro}
            onChange={(butikenIntro) => update({ pages: { ...content.pages, butikenIntro } })}
          />
          <Field
            label="Butiken – brödtext"
            textarea
            rows={4}
            hint="Separera stycken med en tom rad."
            value={paragraphsToText(content.pages.shop)}
            onChange={(text) => update({ pages: { ...content.pages, shop: textToParagraphs(text) } })}
          />
          <Field
            label="Kontakta oss – inledning"
            textarea
            value={content.pages.kontaktIntro}
            onChange={(kontaktIntro) => update({ pages: { ...content.pages, kontaktIntro } })}
          />
          <Field
            label="Du som kund – brödtext"
            textarea
            rows={6}
            hint="Separera stycken med en tom rad."
            value={paragraphsToText(content.pages.customers)}
            onChange={(text) =>
              update({ pages: { ...content.pages, customers: textToParagraphs(text) } })
            }
          />
          <Field
            label="Om Bergfelds – brödtext"
            textarea
            rows={10}
            hint="Separera stycken med en tom rad."
            value={paragraphsToText(content.pages.about)}
            onChange={(text) =>
              update({ pages: { ...content.pages, about: textToParagraphs(text) } })
            }
          />
        </Section>

        <Section title="Leverantörer">
          <Field
            label="Varumärken i det rullande bandet"
            textarea
            rows={8}
            hint="Ett varumärke per rad."
            value={linesToText(content.suppliers)}
            onChange={(text) => update({ suppliers: textToLines(text) })}
          />
        </Section>

        <Section title="Bilder">
          <p className="text-sm text-muted-foreground">
            Klistra in länken till bilden du vill använda. Lämna fältet tomt för att behålla
            standardbilden.
          </p>
          <Field
            label="Stor bild på startsidan"
            value={content.images.hero}
            onChange={(hero) => update({ images: { ...content.images, hero } })}
          />
          <Field
            label="Logotyp"
            value={content.images.logo}
            onChange={(logo) => update({ images: { ...content.images, logo } })}
          />
          <Field
            label="Bild på grundarna (Om Bergfelds)"
            value={content.images.founders}
            onChange={(founders) => update({ images: { ...content.images, founders } })}
          />
          <Field
            label="Sortimentsöversikt (Sortiment)"
            value={content.images.overview}
            onChange={(overview) => update({ images: { ...content.images, overview } })}
          />
        </Section>

        <div className="sticky bottom-4 flex items-center gap-4 rounded-2xl border bg-card p-4 shadow-lg">
          <Button onClick={handleSave} disabled={busy} className="h-11 rounded-full px-8 font-semibold">
            <Save /> {busy ? "Sparar…" : "Spara ändringar"}
          </Button>
          {status && (
            <p role="status" className="text-sm text-muted-foreground">
              {status}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
