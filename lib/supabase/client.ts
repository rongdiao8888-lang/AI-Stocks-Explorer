"use client";

import { createBrowserClient } from "@supabase/ssr";

import { getPublicSupabaseConfig } from "@/lib/supabase/config";
import type { Database } from "@/types/database";

export function createSupabaseBrowserClient() {
  const { anonKey, url } = getPublicSupabaseConfig();

  return createBrowserClient<Database>(url, anonKey);
}
