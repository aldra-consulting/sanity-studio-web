import { defineField, defineType } from 'sanity';
import { type Value } from 'sanity-plugin-internationalized-array';

import { LanguageCode } from '@project/enums';
import { type Nullable } from '@project/types';
import { isDefined } from '@project/utils';

import { LanguageSelect } from './components';
import { LanguageCodeToTitledListValueConverter } from './utils';

const converter = new LanguageCodeToTitledListValueConverter();

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
        list: Object.values(LanguageCode).map(converter.convert),
      },
      components: {
        input: LanguageSelect,
      },
      validation: (rule) => [
        rule.required().error('Language code is required'),
        rule.custom<LanguageCode>(
          (value) =>
            (isDefined(value) && Object.values(LanguageCode).includes(value)) ||
            'Language code must comply with ISO 639-1 standard'
        ),
      ],
    }),
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
  ],
  preview: {
    select: {
      labels: 'label',
    },
    prepare: ({ labels }: { code: string; labels: Value[] }) => {
      // TODO: pick language based on Studio UI, otherwise use English
      const label = labels
        .find(({ _key }) => _key === LanguageCode.EN.toString())
        ?.value?.trim();

      return {
        title: isDefined(label) ? label : 'Untitled',
      };
    },
  },
});
