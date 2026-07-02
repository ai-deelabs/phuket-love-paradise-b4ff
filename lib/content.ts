// Build-time content loader for the JSON collections in content/.
// Server-only (uses fs); every page is statically generated so this never
// runs in the browser.
import 'server-only';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { z } from 'zod';

const L = z.object({ th: z.string(), en: z.string(), ru: z.string() });
const Slugs = z.object({ th: z.string(), en: z.string(), ru: z.string() });

const categorySchema = z.object({
  order: z.number(),
  slugs: Slugs,
  title: L,
  shortTitle: L.optional(),
  description: L,
  seo: z.object({ title: L, description: L }),
});

const tourSchema = z.object({
  order: z.number().default(99),
  slugs: Slugs,
  title: L,
  summary: L,
  categories: z.array(z.string()).transform((ids) => ids.map((id) => ({ id }))),
  badge: L.optional(),
  hero: z.string(),
  gallery: z.array(z.string()).default([]),
  durationLabel: L,
  durationDays: z.number().default(1),
  halfDay: z.boolean().default(false),
  operatingDays: L.optional(),
  meta: z.array(z.object({ icon: z.string(), text: L })).default([]),
  highlights: z.array(z.object({ icon: z.string().default('circle-check'), text: L })).default([]),
  priceFrom: z.number(),
  priceUnit: z.enum(['person', 'vehicle', 'group']).default('person'),
  variants: z
    .array(
      z.object({
        id: z.string(),
        group: L.optional(),
        label: L,
        adult: z.number(),
        child: z.number().nullable().default(null),
        childLabel: L.optional(),
        adultLabel: L.optional(),
        unit: z.enum(['person', 'vehicle']).default('person'),
      }),
    )
    .min(1),
  itinerary: z.array(z.object({ time: z.string(), text: L })).default([]),
  includes: z.array(L).default([]),
  excludes: z.array(L).default([]),
  parkFees: L.optional(),
  notes: z.array(z.object({ heading: L.optional(), text: L })).default([]),
  seo: z.object({ title: L, description: L }),
  featured: z.boolean().default(false),
});

export type CategoryData = z.output<typeof categorySchema>;
export type TourData = z.output<typeof tourSchema>;
export type Variant = TourData['variants'][number];

/** A content entry: file id plus its validated data. */
export interface Entry<T> {
  id: string;
  data: T;
}
export type Category = Entry<CategoryData>;
export type Tour = Entry<TourData>;

function load<T>(dir: string, schema: z.ZodType<T, z.ZodTypeDef, unknown>): Entry<T>[] {
  const base = join(process.cwd(), 'content', dir);
  return readdirSync(base)
    .filter((f) => f.endsWith('.json'))
    .map((f) => ({
      id: f.replace(/\.json$/, ''),
      data: schema.parse(JSON.parse(readFileSync(join(base, f), 'utf8'))),
    }));
}

let categoriesCache: Category[] | null = null;
let toursCache: Tour[] | null = null;

export function getCategories(): Category[] {
  categoriesCache ??= load('categories', categorySchema).sort((a, b) => a.data.order - b.data.order);
  return categoriesCache;
}

export function getTours(): Tour[] {
  toursCache ??= load('tours', tourSchema).sort((a, b) => a.data.order - b.data.order);
  return toursCache;
}

export const getCategory = (id: string) => getCategories().find((c) => c.id === id);
export const getTour = (id: string) => getTours().find((t) => t.id === id);

export const toursInCategory = (categoryId: string) =>
  getTours().filter((tour) => tour.data.categories.some((c) => c.id === categoryId));
