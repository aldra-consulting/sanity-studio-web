import { internationalizedArray } from 'sanity-plugin-internationalized-array';

export default () =>
  internationalizedArray({
    languages: [
      { id: 'no', title: 'Norwegian' },
      { id: 'en', title: 'English' },
    ],
    defaultLanguages: ['no'],
    fieldTypes: ['string', 'text'],
  });
