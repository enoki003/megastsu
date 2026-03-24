import { getCollection, type CollectionKey } from "astro:content";

const sortEntries = <T extends { data: { date: Date } }>(entries: T[]) => {
  return [...entries].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
};

export const getPostListing = async (collection: CollectionKey) => {
  const all = await getCollection(collection, ({ data }) => !data.draft);
  return sortEntries(all);
};