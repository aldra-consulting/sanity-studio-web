import { type SchemaPluginOptions } from 'sanity';

import documents from './documents';
import symbol from './symbol';

export default [symbol, ...documents] as SchemaPluginOptions['types'];
