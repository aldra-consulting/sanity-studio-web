import { defineField, defineType } from 'sanity';
import { type Value } from 'sanity-plugin-internationalized-array';

import { isDefined } from '@project/utils';

export default defineType({
  name: 'language',
  type: 'document',
  title: 'Language',
  fields: [
    defineField({
      name: 'code',
      type: 'string',
      title: 'Code',
      description: 'Language code according to IS0 639-1 standard',
      options: {
        list: [
          { value: 'en', title: 'en' },
          { value: 'no', title: 'no' },
        ],
      },
      validation: (rule) => [
        rule.required().error('Language code is required'),
        rule
          .length(2)
          .error('Language code must comply with ISO 639-1 standard'),
        rule.custom(async (code, { getClient, document: { _id: id } = {} }) => {
          if (isDefined(code) && isDefined(id)) {
            const client = getClient({ apiVersion: '2024-03-06' });
            const query =
              'count(*[_type == "language" && _id != $id && !(_id in path("drafts.**")) && code == $code])';

            const count = await client.fetch<number>(query, {
              id,
              code,
            });

            return count >= 1
              ? 'Language document must be globally unique'
              : true;
          }

          return true;
        }),
      ],
    }),
    defineField({
      name: 'label',
      type: 'internationalizedArrayString',
      title: 'Label',
    }),
  ],
  preview: {
    select: {
      code: 'code',
      labels: 'label',
    },
    prepare: ({ code, labels }: { code: string; labels: Value[] }) => {
      const label = labels.find(({ _key }) => _key === 'en')?.value?.trim();

      return {
        title: isDefined(label) ? `${label} (${code})` : 'Untitled',
      };
    },
  },
});
