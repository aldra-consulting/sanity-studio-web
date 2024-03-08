import { type TitledListValue } from 'sanity';

import { type LanguageCode } from '@project/enums';
import { type Converter } from '@project/types';

export class LanguageCodeToTitledListValueConverter
  implements Converter<LanguageCode, TitledListValue<string>>
{
  convert = (code: LanguageCode): TitledListValue<string> => ({
    value: code,
    title: code,
  });
}
