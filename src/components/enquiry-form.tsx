import { useState } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { enquiryMailto, validateEnquiry } from "@/lib/bergfelds";
import { useSiteContent } from "@/components/site-content-context";

export function EnquiryForm({ initialCategory = "" }: { initialCategory?: string }) {
  const { business } = useSiteContent();
  const [error, setError] = useState<string | null>(null);
  const [opened, setOpened] = useState(false);
  return (
    <form
      className="enquiry-form"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const value = {
          description: String(data.get("description") ?? ""),
          name: String(data.get("name") ?? ""),
          company: String(data.get("company") ?? ""),
          contact: String(data.get("contact") ?? ""),
        };
        const problem = validateEnquiry(value);
        setError(problem);
        if (problem) return;
        window.location.href = enquiryMailto(value, business.email);
        setOpened(true);
      }}
      noValidate
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Vad söker du?</h2>
        <Mail className="size-5 text-primary" />
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Berätta vad du behöver, så hjälper vi dig vidare.
      </p>
      <label className="form-label mt-5">
        Beskriv vad du söker
        <textarea
          name="description"
          defaultValue={initialCategory}
          rows={3}
          placeholder="Vad kan vi hjälpa dig med?"
          required
          className="form-input resize-y"
        />
      </label>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <label className="form-label">
          Namn
          <input
            name="name"
            autoComplete="name"
            placeholder="Ditt namn"
            required
            className="form-input"
          />
        </label>
        <label className="form-label">
          Företag
          <input
            name="company"
            autoComplete="organization"
            placeholder="Företagsnamn"
            required
            className="form-input"
          />
        </label>
      </div>
      <label className="form-label mt-3">
        E-post eller telefon
        <input name="contact" placeholder="Så når vi dig" required className="form-input" />
      </label>
      {error && (
        <p role="alert" className="mt-3 text-sm text-destructive">
          {error}
        </p>
      )}
      <Button type="submit" className="mt-5 h-11 w-full rounded-full font-semibold">
        Skicka förfrågan <ArrowUpRight />
      </Button>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        Öppnar ditt e-postprogram med förfrågan till {business.email}. Du skickar mejlet där.
      </p>
      {opened && (
        <p role="status" className="mt-3 text-sm text-primary">
          Förfrågan är förberedd. Skicka den i ditt e-postprogram; inget har skickats från
          webbplatsen.
        </p>
      )}
    </form>
  );
}
