import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** Localized string — Thai is the source language, EN/RU required for the URL trees. */
const L = z.object({ th: z.string(), en: z.string(), ru: z.string() });

const categories = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/categories' }),
  schema: z.object({
    order: z.number(),
    // named `slugs` (not `slug`) — the glob loader treats a `slug` data field as an entry-id override
    slugs: z.object({ th: z.string(), en: z.string(), ru: z.string() }),
    title: L,
    shortTitle: L.optional(),
    description: L,
    seo: z.object({ title: L, description: L }),
  }),
});

const tours = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/tours' }),
  schema: z.object({
    order: z.number().default(99),
    slugs: z.object({ th: z.string(), en: z.string(), ru: z.string() }),
    title: L,
    summary: L,
    categories: z.array(reference('categories')),
    badge: L.optional(),
    /** filename inside src/assets/, e.g. "view_1.jpg" */
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
  }),
});

export const collections = { categories, tours };
