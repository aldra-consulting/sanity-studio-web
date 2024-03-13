import { type TitledListValue } from 'sanity';

import { type Criterion } from '@project/enums';
import { type Converter } from '@project/types';

export class CriterionToTitledListValueConverter
  implements Converter<Criterion, TitledListValue<string>>
{
  convert = (criterion: Criterion): TitledListValue<string> => ({
    value: criterion,
    title: criterion,
  });
}
