import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'bookmark.missions',
  title: 'Bookmark',
  type: 'document',
  fields: [
    defineField({
      name: 'person',
      title: 'Person',
      type: 'reference',
      to: { type: 'person' },
      readOnly: true,
      options: { disableNew: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'missions',
      title: 'Missions',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'mission',
          title: 'Mission',
          type: 'reference',
          to: { type: 'mission' },
          readOnly: true,
          options: { disableNew: true },
        }),
      ],
      readOnly: true,
      validation: (rule) => rule.unique(),
    }),
  ],
  preview: {
    select: {
      personGivenName: 'person.givenName',
      personFamilyName: 'person.familyName',
      missions: 'missions',
    },
    prepare({
      personGivenName,
      personFamilyName,
      missions = [],
    }: {
      personGivenName?: string;
      personFamilyName?: string;
      missions?: unknown[];
    }) {
      return {
        title:
          `Bookmarks / ${personGivenName?.trim() ?? ''} ${personFamilyName?.trim() ?? ''}`.trim(),
        subtitle:
          missions.length === 1
            ? `${missions.length} mission bookmarked`
            : `${missions.length} missions bookmarked`,
      };
    },
  },
});
