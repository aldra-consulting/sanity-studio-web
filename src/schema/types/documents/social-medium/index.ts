import { defineField, defineType, type SanityDocument } from 'sanity';

import { isDefined } from '@project/utils';

import { SocialMediumPlatform } from './enums';
import { SocialMediumPlatformToTitledListValueConverter } from './utils';

const converter = new SocialMediumPlatformToTitledListValueConverter();

export default defineType({
  name: 'socialMedium',
  type: 'document',
  title: 'Social medium',
  fields: [
    defineField({
      type: 'symbol',
      name: 'platform',
      title: 'Platform',
      options: {
        list: Object.values(SocialMediumPlatform).map(converter.convert),
      },
      validation: (rule) => [rule.required()],
    }),
    defineField({
      name: 'url',
      type: 'url',
      title: 'URL',
      validation: (rule) => [
        rule.required().error('URL is required'),
        rule.uri({ scheme: ['https'] }),
        rule.custom((url, context) => {
          if (!isDefined(url)) {
            return true;
          }

          const { platform } = context.document as SanityDocument & {
            platform?: SocialMediumPlatform;
          };

          switch (platform) {
            case SocialMediumPlatform.LINKEDIN:
              return (
                url.startsWith('https://www.linkedin.com/company/') ||
                'URL must be a valid LinkedIn URL'
              );
            case SocialMediumPlatform.X:
              return (
                url.startsWith('https://x.com/') || 'URL must be a valid X URL'
              );
            default:
              return true;
          }
        }),
      ],
    }),
  ],
  preview: {
    select: {
      platform: 'platform',
    },
    prepare({ platform }: { platform?: SocialMediumPlatform }) {
      return platform
        ? { title: converter.convert(platform).title }
        : { undefined };
    },
  },
});
