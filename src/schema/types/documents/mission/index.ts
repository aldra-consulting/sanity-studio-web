import { defineField, defineType } from 'sanity';
import { type Value } from 'sanity-plugin-internationalized-array';

import { LanguageCode } from '@project/enums';
import { type Nullable } from '@project/types';

export default defineType({
  name: 'mission',
  type: 'document',
  title: 'Mission',
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
      name: 'brief',
      type: 'internationalizedArrayText',
      title: 'Brief',
      validation: (rule) => [
        rule.required().error('Brief is required'),
        rule.min(1).error('Brief must be provided in at least one language'),
        rule.custom<Nullable<Value[]>>((labels) => {
          const hasBlankValues = labels?.some(
            ({ value }) => (value ?? '').trim().length === 0
          );

          return hasBlankValues ? 'Briefs cannot be blank' : true;
        }),
      ],
    }),
    defineField({
      name: 'description',
      type: 'internationalizedArrayText',
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
    defineField({
      name: 'client',
      type: 'reference',
      title: 'Client',
      to: { type: 'client' },
    }),
    defineField({
      name: 'status',
      type: 'string',
      title: 'Status',
      initialValue: 'active',
      options: {
        list: [
          { value: 'active', title: 'active' },
          { value: 'concluded', title: 'concluded' },
          { value: 'cancelled', title: 'cancelled' },
        ],
      },
      validation: (rule) => [rule.required().error('Status is required')],
    }),
  ],
  preview: {
    select: {
      labels: 'label',
      descriptions: 'description',
      client: 'client.label',
    },
    prepare({
      labels,
      descriptions,
      client,
    }: {
      labels?: Value[];
      descriptions?: Value[];
      client?: Value[];
    }) {
      return {
        title:
          labels?.find(({ _key }) => _key === LanguageCode.NO.toString())
            ?.value ?? 'Untitled',
        subtitle: client?.find(
          ({ _key }) => _key === LanguageCode.NO.toString()
        )?.value,
        description: descriptions?.find(
          ({ _key }) => _key === LanguageCode.NO.toString()
        )?.value,
      };
    },
  },
});
