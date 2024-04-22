import { type SchemaPluginOptions } from 'sanity';

import templates from './templates';
import types from './types';

export default {
  types,
  templates,
} satisfies SchemaPluginOptions;
