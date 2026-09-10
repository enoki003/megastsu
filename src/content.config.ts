import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/* 元リポジトリの Content Collections をそのまま踏襲する（title / date / description? / draft?）。 */
const schema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  description: z.string().optional(),
  draft: z.boolean().optional().default(false),
});

export const collections = {
  notes: defineCollection({ loader: glob({ base: './src/content/notes', pattern: '**/*.md' }), schema }),
  journal: defineCollection({ loader: glob({ base: './src/content/journal', pattern: '**/*.md' }), schema }),
};
