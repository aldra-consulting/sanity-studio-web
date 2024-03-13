import { defineType, defineField, defineArrayMember } from 'sanity';
import { type Value } from 'sanity-plugin-internationalized-array';

import { LanguageCode, type CommonReferenceLevel } from '@project/enums';
import { type Nullable } from '@project/types';
import { isDefined } from '@project/utils';

export default defineType({
  name: 'mission',
  type: 'document',
  title: 'Mission',
  fields: [
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
    defineField({
      name: 'brief',
      type: 'internationalizedArrayText',
      title: 'Brief',
      validation: (rule) => [
        rule.required().error('Brief is required'),
        rule.min(1).error('Brief must be provided in at least one language'),
        rule.custom<Nullable<Value[]>>((labels) => {
          const hasBlankValues = labels?.some(
            ({ value }) => (value ?? '').trim().length === 0
          );

          return hasBlankValues ? 'Briefs cannot be blank' : true;
        }),
      ],
    }),
    defineField({
      name: 'description',
      type: 'internationalizedArrayText',
      title: 'Description',
      validation: (rule) => [
        rule.required().error('Description is required'),
        rule
          .min(1)
          .error('Description must be provided in at least one language'),
        rule.custom<Nullable<Value[]>>((labels) => {
          const hasBlankValues = labels?.some(
            ({ value }) => (value ?? '').trim().length === 0
          );

          return hasBlankValues ? 'Descriptions cannot be blank' : true;
        }),
      ],
    }),
    defineField({
      name: 'client',
      type: 'reference',
      title: 'Client',
      to: { type: 'client' },
      options: {
        disableNew: true,
      },
    }),
    defineField({
      name: 'status',
      type: 'string',
      title: 'Status',
      initialValue: 'active',
      options: {
        list: [
          { value: 'active', title: 'active' },
          { value: 'concluded', title: 'concluded' },
          { value: 'cancelled', title: 'cancelled' },
        ],
      },
      validation: (rule) => [rule.required().error('Status is required')],
    }),
    defineField({
      name: 'languageRequirements',
      type: 'array',
      title: 'Language requirements',
      of: [
        defineArrayMember({
          name: 'languageRequirement',
          type: 'object',
          title: 'Language requirement',
          fields: [
            defineField({
              name: 'language',
              type: 'reference',
              to: { type: 'language' },
              title: 'Language',
              options: {
                disableNew: true,
              },
              validation: (rule) => [rule.required()],
            }),
            defineField({
              name: 'proficiency',
              type: 'reference',
              to: { type: 'commonReferenceLevel' },
              title: 'Proficiency',
              options: {
                disableNew: true,
              },
              validation: (rule) => [rule.required()],
            }),
          ],
          preview: {
            select: {
              labels: 'language.label',
              proficiency: 'proficiency.value',
            },
            prepare({
              labels,
              proficiency,
            }: {
              labels?: Value[];
              proficiency?: CommonReferenceLevel;
            }) {
              const label = labels?.find(
                ({ _key }) => _key === LanguageCode.EN.toString()
              )?.value;

              return {
                title:
                  isDefined(label) && isDefined(proficiency)
                    ? `${label} (${proficiency})`
                    : undefined,
              };
            },
          },
        }),
      ],
      validation: (rule) => [rule.unique()],
    }),
    defineField({
      name: 'awardCriteria',
      title: 'Award criteria',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'awardCriterion',
          title: 'Award criterion',
          type: 'object',
          fields: [
            defineField({
              name: 'criterion',
              title: 'Criterion',
              type: 'reference',
              to: { type: 'criterion' },
              options: {
                disableNew: true,
              },
              validation: (rule) => [rule.required()],
            }),
            defineField({
              name: 'weight',
              title: 'Weight',
              type: 'number',
              initialValue: 0,
              validation: (rule) => [
                rule.required(),
                rule.positive(),
                rule.integer(),
                rule.min(0),
                rule.max(100),
              ],
            }),
          ],
          preview: {
            select: {
              criterion: 'criterion.label',
              weight: 'weight',
            },
            prepare({
              criterion,
              weight,
            }: {
              criterion?: Value[];
              weight?: number;
            }) {
              const label =
                criterion?.find(
                  ({ _key }) => _key === LanguageCode.NO.toString()
                )?.value ?? 'Untitled';

              return {
                title:
                  isDefined(label) && isDefined(weight)
                    ? `${label} (${weight}%)`
                    : '',
              };
            },
          },
        }),
      ],
      validation: (rule) => [
        rule.required(),
        rule.unique(),
        rule.custom<{ criterion: { _ref: string } }[]>((value) => {
          const criteria =
            value?.map(({ criterion: { _ref: reference } }) => reference) ?? [];
          const hasDuplicates = new Set(criteria).size !== criteria.length;

          return hasDuplicates
            ? 'There can only be one criterion of each type'
            : true;
        }),
        rule.custom<{ weight: number }[]>((value) => {
          const sum =
            value?.reduce((previous, { weight }) => previous + weight, 0) ?? 0;

          return sum !== 100
            ? 'There sum of criteria weights must add up to 100%'
            : true;
        }),
      ],
    }),
  ],
  preview: {
    select: {
      labels: 'label',
      descriptions: 'description',
      client: 'client.label',
    },
    prepare({
      labels,
      descriptions,
      client,
    }: {
      labels?: Value[];
      descriptions?: Value[];
      client?: Value[];
    }) {
      return {
        title:
          labels?.find(({ _key }) => _key === LanguageCode.NO.toString())
            ?.value ?? 'Untitled',
        subtitle: client?.find(
          ({ _key }) => _key === LanguageCode.NO.toString()
        )?.value,
        description: descriptions?.find(
          ({ _key }) => _key === LanguageCode.NO.toString()
        )?.value,
      };
    },
  },
});
