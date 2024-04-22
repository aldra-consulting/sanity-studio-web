import { type DocumentPluginOptions } from 'sanity';

export default {
  newDocumentOptions: (previous, { creationContext: { schemaType } }) => {
    if (schemaType === 'bookmark.missions') {
      return [];
    }

    return previous;
  },
} satisfies DocumentPluginOptions;
