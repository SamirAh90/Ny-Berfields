import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";
import { mergeSiteContent, type SiteContent } from "@/lib/site-content";

const CONTENT_KEY = "site";

function publicServerClient() {
  const url = process.env["SUPABASE_URL"]!;
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  const apikeyFetch: typeof fetch = (input, init) => {
    const headers = new Headers(
      typeof Request !== "undefined" && input instanceof Request ? input.headers : undefined,
    );
    if (init?.headers) new Headers(init.headers).forEach((v, k) => headers.set(k, v));
    if (headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
    headers.set("apikey", key);
    return fetch(input, { ...init, headers });
  };
  return createClient<Database>(url, key, {
    global: { fetch: apikeyFetch },
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });
}

// Public read: the site_content SELECT policy allows anon access.
export const getSiteContent = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicServerClient()
    .from("site_content")
    .select("value")
    .eq("key", CONTENT_KEY)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return mergeSiteContent(data?.value);
});

export const saveSiteContent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((value: SiteContent) => value)
  .handler(async ({ context, data }) => {
    const { data: isAdmin, error: roleError } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (roleError) throw new Error(roleError.message);
    if (!isAdmin) throw new Error("Endast administratörer kan ändra innehållet.");

    const { error } = await context.supabase.from("site_content").upsert({
      key: CONTENT_KEY,
      value: mergeSiteContent(data) as unknown as Database["public"]["Tables"]["site_content"]["Row"]["value"],
      updated_at: new Date().toISOString(),
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
