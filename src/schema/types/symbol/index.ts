import { defineType } from 'sanity';

import input from './components/input';

export default defineType({
  type: 'string',
  name: 'symbol',
  options: {
    list: [],
  },
  components: {
    input,
  },
});
