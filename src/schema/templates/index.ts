import { type SchemaPluginOptions } from 'sanity';

export default ((previous) => {
  const exclusions = ['bookmark.missions'];

  return previous.filter(({ id }) => !exclusions.includes(id));
}) satisfies SchemaPluginOptions['templates'];
