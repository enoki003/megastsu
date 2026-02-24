import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
		}),
});

const base = z.object({
	title: z.string(),
	date: z.coerce.date(),
	draft: z.boolean().default(false),
})

const notes = defineCollection({
	type: 'content',
	schema:base.extend({
		description: z.string().optional(),
	})
});

const journal = defineCollection({
	type: 'content',
	schema:base.extend({
	})
});

export const collections = { blog, notes, journal };
