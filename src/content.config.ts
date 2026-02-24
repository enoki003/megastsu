import { defineCollection, z } from 'astro:content';

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
		description: z.string().optional(),
	})
});

export const collections = { notes, journal };
