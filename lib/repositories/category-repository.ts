import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { categorySlugSchema } from "@/lib/validation/identifiers";
import { throwOnRepositoryError } from "@/lib/repositories/errors";
import type { AICategory } from "@/types/category";

const categoryColumns = "id, name, slug, description, icon_name";

type CategoryRecord = {
  description: string;
  icon_name: string;
  id: string;
  name: string;
  slug: string;
};

function mapCategory(category: CategoryRecord): AICategory {
  return {
    description: category.description,
    iconName: category.icon_name,
    id: category.id,
    name: category.name,
    slug: category.slug,
  };
}

export async function listActiveCategories(): Promise<AICategory[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("ai_categories")
    .select(categoryColumns)
    .eq("is_active", true)
    .order("display_order", { ascending: true })
    .overrideTypes<CategoryRecord[], { merge: false }>();

  throwOnRepositoryError(error, "Unable to retrieve AI categories.");
  return (data ?? []).map(mapCategory);
}

export async function getActiveCategoryBySlug(slug: string): Promise<AICategory | null> {
  const normalizedSlug = categorySlugSchema.parse(slug);
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("ai_categories")
    .select(categoryColumns)
    .eq("slug", normalizedSlug)
    .eq("is_active", true)
    .maybeSingle()
    .overrideTypes<CategoryRecord | null, { merge: false }>();

  throwOnRepositoryError(error, "Unable to retrieve the AI category.");
  return data ? mapCategory(data) : null;
}
