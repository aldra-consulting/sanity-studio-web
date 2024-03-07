import { defineField, defineType } from 'sanity';
import { type Value } from 'sanity-plugin-internationalized-array';

import { type Nullable } from '@project/types';

export default defineType({
  name: 'client',
  type: 'document',
  title: 'Client',
  fields: [
    defineField({
      name: 'label',
      type: 'internationalizedArrayString',
      title: 'Label',
      validation: (rule) => [
        rule.required().error('Label is required'),
        rule.min(1).error('Label must be provided in at least one language'),
        rule.custom<Nullable<Value[]>>((labels) => {
          const hasBlankValues = labels?.some(
            ({ value }) => (value ?? '').trim().length === 0
          );

          return hasBlankValues ? 'Labels cannot be blank' : true;
        }),
      ],
    }),
    defineField({
      name: 'description',
      type: 'internationalizedArrayString',
      title: 'Description',
      validation: (rule) => [
        rule.required().error('Description is required'),
        rule
          .min(1)
          .error('Description must be provided in at least one language'),
        rule.custom<Nullable<Value[]>>((labels) => {
          const hasBlankValues = labels?.some(
            ({ value }) => (value ?? '').trim().length === 0
          );

          return hasBlankValues ? 'Descriptions cannot be blank' : true;
        }),
      ],
    }),
  ],
  preview: {
    select: {
      labels: 'label',
      descriptions: 'description',
    },
    prepare({
      labels,
      descriptions,
    }: {
      labels?: Value[];
      descriptions?: Value[];
    }) {
      return {
        title: labels?.find(({ _key }) => _key === 'no')?.value ?? 'Untitled',
        description: descriptions?.find(({ _key }) => _key === 'no')?.value,
      };
    },
  },
});
