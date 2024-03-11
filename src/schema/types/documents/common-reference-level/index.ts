import { defineField, defineType } from 'sanity';

import { CommonReferenceLevel } from '@project/enums';
import { isDefined } from '@project/utils';

import { CommonReferenceLevelSelect } from './components';
import { CommonReferenceLevelToTitledListValueConverter } from './utils';

const converter = new CommonReferenceLevelToTitledListValueConverter();

export default defineType({
  name: 'commonReferenceLevel',
  type: 'document',
  title: 'Common reference level',
  fields: [
    defineField({
      name: 'value',
      type: 'string',
      title: 'Proficiency',
      description: 'Language proficiency according to the CEFR',
      options: {
        list: Object.values(CommonReferenceLevel).map(converter.convert),
      },
      components: {
        input: CommonReferenceLevelSelect,
      },
      validation: (rule) => [
        rule.required().error('Proficiency is required'),
        rule.custom<CommonReferenceLevel>(
          (value) =>
            (isDefined(value) &&
              Object.values(CommonReferenceLevel).includes(value)) ||
            'Language proficiency must be one of the common reference levels according to the CEFR'
        ),
      ],
    }),
  ],
});
