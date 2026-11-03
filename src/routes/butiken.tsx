import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, ShopInformation } from "@/components/bergfelds-sections";
import { pageHead } from "@/lib/bergfelds";
export const Route = createFileRoute("/butiken")({ head: () => pageHead("Butiken", "Besöksinformation och publicerade öppettider för Bergfelds i Ludvika. Kontakta oss inför ditt besök."), component: Butiken });
function Butiken() { return <><PageIntro eyebrow="NÄRA DIG I LUDVIKA" title="Butiken" description="Vi planerar och utvecklar vår butik. Här hittar du publicerad besöksinformation – ring oss gärna inför ditt besök." /><section className="site-container section-space"><ShopInformation detailed /></section></>; }