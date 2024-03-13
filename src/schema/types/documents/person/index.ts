import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    defineField({
      name: 'givenName',
      title: 'First name',
      type: 'string',
      validation: (rule) => [rule.required()],
    }),
    defineField({
      name: 'familyName',
      title: 'Last name',
      type: 'string',
      validation: (rule) => [rule.required()],
    }),
    defineField({
      name: 'emailAddress',
      title: 'Email address',
      type: 'string',
      validation: (rule) => [rule.required(), rule.email()],
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Phone number',
      type: 'string',
      validation: (rule) => [rule.required()],
    }),
    defineField({
      name: 'profilePhoto',
      title: 'Profile photo',
      type: 'image',
      options: {
        metadata: [],
        hotspot: true,
        storeOriginalFilename: false,
      },
    }),
  ],
  preview: {
    select: {
      givenName: 'givenName',
      familyName: 'familyName',
      profilePhoto: 'profilePhoto',
    },
    prepare({
      givenName,
      familyName,
      profilePhoto,
    }: {
      givenName?: string;
      familyName?: string;
      profilePhoto?: string;
    }) {
      return {
        title: `${givenName ?? ''} ${familyName ?? ''}`.trim(),
        media: profilePhoto,
      };
    },
  },
});
