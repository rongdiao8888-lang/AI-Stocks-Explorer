import { z } from "zod";

export const companyTickerSchema = z.string().trim().toUpperCase().regex(/^[A-Z][A-Z0-9.-]{0,14}$/);

export const categorySlugSchema = z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const paginationSchema = z.object({
  limit: z.number().int().min(1).max(100).default(50),
  offset: z.number().int().min(0).default(0),
});
