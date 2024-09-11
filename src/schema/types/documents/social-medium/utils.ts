import { type TitledListValue } from 'sanity';

import { type Converter } from '@project/types';

import { SocialMediumPlatform } from './enums';

export class SocialMediumPlatformToTitledListValueConverter
  implements Converter<SocialMediumPlatform, TitledListValue<string>>
{
  convert = (platform: SocialMediumPlatform): TitledListValue<string> => {
    switch (platform) {
      case SocialMediumPlatform.LINKEDIN:
        return {
          value: platform,
          title: 'LinkedIn',
        };
      case SocialMediumPlatform.X:
        return {
          value: platform,
          title: 'X',
        };
      default:
        throw new Error('Unknown social medium platform');
    }
  };
}
