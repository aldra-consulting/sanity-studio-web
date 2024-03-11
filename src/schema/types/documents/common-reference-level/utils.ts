import { type TitledListValue } from 'sanity';

import { type CommonReferenceLevel } from '@project/enums';
import { type Converter } from '@project/types';

export class CommonReferenceLevelToTitledListValueConverter
  implements Converter<CommonReferenceLevel, TitledListValue<string>>
{
  convert = (level: CommonReferenceLevel): TitledListValue<string> => ({
    value: level,
    title: level,
  });
}
