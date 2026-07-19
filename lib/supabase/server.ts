import "server-only";

import { createServerClient } from "@supabase/ssr";
import type { CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

import { getPublicSupabaseConfig } from "@/lib/supabase/config";
import type { Database } from "@/types/database";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  const { anonKey, url } = getPublicSupabaseConfig();

  return createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookieValues: Array<{ name: string; options: CookieOptions; value: string }>) {
        try {
          cookieValues.forEach(({ name, options, value }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components cannot mutate cookies. Route handlers can persist them.
        }
      },
    },
  });
}
