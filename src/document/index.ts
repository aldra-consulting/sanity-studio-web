import { type DocumentPluginOptions } from 'sanity';

export default {
  actions: (previous, { schemaType }) => {
    if (schemaType === 'bookmark.missions') {
      return [];
    }

    return previous;
  },
  newDocumentOptions: (previous, { creationContext: { schemaType } }) => {
    if (schemaType === 'bookmark.missions') {
      return [];
    }

    return previous;
  },
} satisfies DocumentPluginOptions;
