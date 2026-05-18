import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const notes = await getCollection('notes', ({ data }) => !data.draft);
	const journal = await getCollection('journal', ({ data }) => !data.draft);
	const posts = [
		...notes.map((post) => ({ ...post, collectionPath: 'notes' })),
		...journal.map((post) => ({ ...post, collectionPath: 'journal' })),
	].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description ?? '',
			pubDate: post.data.date,
			link: `/${post.collectionPath}/${post.slug}/`,
		})),
	});
}
