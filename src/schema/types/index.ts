import { type SchemaPluginOptions } from 'sanity';

import documents from './documents';

export default [...documents] as SchemaPluginOptions['types'];
