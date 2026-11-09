import { createContext, useContext, type ReactNode } from "react";
import { defaultSiteContent, type SiteContent } from "@/lib/site-content";

const SiteContentContext = createContext<SiteContent>(defaultSiteContent);

export function SiteContentProvider({
  content,
  children,
}: {
  content: SiteContent;
  children: ReactNode;
}) {
  return <SiteContentContext.Provider value={content}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent(): SiteContent {
  return useContext(SiteContentContext);
}
