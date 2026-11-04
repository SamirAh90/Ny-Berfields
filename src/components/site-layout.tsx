import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail, Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { business, navigation } from "@/lib/bergfelds";
import logo from "@/assets/bergfelds-logo.jpg.asset.json";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="site-container flex h-[72px] items-center justify-between gap-4">
        <Link
          to="/"
          aria-label="Bergfelds startsida"
          onClick={() => setOpen(false)}
          className="brand-wordmark"
        >
          <img src={logo.url} alt="Bergfelds – Industri, VVS, Verkstad" width={272} height={136} className="h-14 w-28 object-contain" />
        </Link>
        <nav aria-label="Huvudnavigation" className="hidden items-center gap-5 xl:flex">
          {navigation.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: true }}
              activeProps={{ className: "nav-link nav-active" }}
              className="nav-link"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild className="hidden rounded-full font-semibold sm:inline-flex">
            <a href={business.phoneHref}>
              <Phone />
              {business.phone}
            </a>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="hidden sm:inline-flex"
            aria-label="Mejla Bergfelds"
          >
            <a href={`mailto:${business.email}`}>
              <Mail />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Stäng meny" : "Öppna meny"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobilnavigation"
          className="site-container grid gap-1 border-t py-4 xl:hidden"
        >
          {navigation.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 font-medium hover:bg-accent"
            >
              {item.label}
            </Link>
          ))}
          <a href={business.phoneHref} className="px-3 py-3 text-primary">
            {business.phone}
          </a>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="site-container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1.3fr]">
        <div>
          <Link to="/" className="brand-wordmark">
            <img src={logo.url} alt="Bergfelds – Industri, VVS, Verkstad" width={272} height={136} className="h-20 w-40 object-contain" />
          </Link>
          <p className="mt-5 text-sm text-muted-foreground">
            Industri – VVS – Verkstad
            <br />
            Din inköpskanal i Ludvika.
          </p>
        </div>
        <div>
          <h2 className="footer-heading">Upptäck Bergfelds</h2>
          <nav aria-label="Sidfotsnavigation" className="mt-4 grid gap-2 text-sm">
            {navigation.slice(1).map((item) => (
              <Link to={item.to} key={item.to} className="hover:text-primary">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <h2 className="footer-heading">Hör av dig</h2>
          <div className="mt-4 grid gap-3 text-sm">
            <a href={business.phoneHref} className="flex items-center gap-2 hover:text-primary">
              <Phone className="size-4" />
              {business.phone}
            </a>
            <a
              href={`mailto:${business.email}`}
              className="flex items-center gap-2 hover:text-primary"
            >
              <Mail className="size-4" />
              {business.email}
            </a>
          </div>
        </div>
        <div>
          <h2 className="footer-heading">Besök oss</h2>
          <p className="mt-4 text-sm">
            {business.visitingAddress}
          </p>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Publicerad tillfällig besöksadress. Kontakta oss för aktuell adress och öppettider.
          </p>
          <a
            href={business.directions}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            Hitta hit <ArrowUpRight className="size-4" />
          </a>
        </div>
      </div>
      <div className="site-container flex flex-wrap justify-between gap-3 border-t py-5 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Bergfeld Försäljning AB</p>
        <p>Org.nr {business.organisationNumber}</p>
      </div>
    </footer>
  );
}
