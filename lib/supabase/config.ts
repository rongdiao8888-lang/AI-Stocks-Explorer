import { z } from "zod";

const publicSupabaseConfigSchema = z.object({
  url: z.string().url(),
  anonKey: z.string().min(1),
});

const serverSupabaseConfigSchema = publicSupabaseConfigSchema.extend({
  serviceRoleKey: z.string().min(1),
});

function getPublicSupabaseConfigInput() {
  return {
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  };
}

export function hasPublicSupabaseConfig() {
  return publicSupabaseConfigSchema.safeParse(getPublicSupabaseConfigInput()).success;
}

export function getPublicSupabaseConfig() {
  const result = publicSupabaseConfigSchema.safeParse(getPublicSupabaseConfigInput());

  if (!result.success) {
    throw new Error("Supabase public environment variables are not configured.");
  }

  return result.data;
}

export function getServerSupabaseConfig() {
  const result = serverSupabaseConfigSchema.safeParse({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  });

  if (!result.success) {
    throw new Error("Supabase server environment variables are not configured.");
  }

  return result.data;
}
