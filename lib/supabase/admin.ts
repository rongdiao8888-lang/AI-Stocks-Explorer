import "server-only";

import { createClient } from "@supabase/supabase-js";

import { getServerSupabaseConfig } from "@/lib/supabase/config";
import type { Database } from "@/types/database";

export function createSupabaseAdminClient() {
  const { serviceRoleKey, url } = getServerSupabaseConfig();

  return createClient<Database>(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
