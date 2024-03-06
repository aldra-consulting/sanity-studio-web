import { type PluginOptions } from 'sanity';

import internationalisation from './internationalisation';
import structure from './structure';
import vision from './vision';

export default [
  structure(),
  vision(),
  internationalisation(),
] satisfies PluginOptions[];
