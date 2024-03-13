import { defineField, defineType } from 'sanity';
import { type Value } from 'sanity-plugin-internationalized-array';

import { Criterion, LanguageCode } from '@project/enums';
import { type Nullable } from '@project/types';
import { isDefined } from '@project/utils';

import { CriterionSelect } from './components';
import { CriterionToTitledListValueConverter } from './utils';

const converter = new CriterionToTitledListValueConverter();

export default defineType({
  name: 'criterion',
  type: 'document',
  title: 'Criterion',
  fields: [
    defineField({
      name: 'type',
      type: 'string',
      title: 'Type',
      options: {
        list: Object.values(Criterion).map(converter.convert),
      },
      components: {
        input: CriterionSelect,
      },
      validation: (rule) => [
        rule.required().error('Criterion type is required'),
        rule.custom<Criterion>(
          (value) =>
            (isDefined(value) && Object.values(Criterion).includes(value)) ||
            'Criterion type must be one of the predefined values'
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
