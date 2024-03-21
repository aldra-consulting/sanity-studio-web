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
      name: 'roles',
      title: 'Roles',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'role',
          title: 'Role',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              type: 'internationalizedArrayString',
              title: 'Label',
              validation: (rule) => [
                rule.required().error('Label is required'),
                rule
                  .min(1)
                  .error('Label must be provided in at least one language'),
                rule.custom<Nullable<Value[]>>((labels) => {
                  const hasBlankValues = labels?.some(
                    ({ value }) => (value ?? '').trim().length === 0
                  );

                  return hasBlankValues ? 'Labels cannot be blank' : true;
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
                  .error(
                    'Description must be provided in at least one language'
                  ),
                rule.custom<Nullable<Value[]>>((labels) => {
                  const hasBlankValues = labels?.some(
                    ({ value }) => (value ?? '').trim().length === 0
                  );

                  return hasBlankValues ? 'Descriptions cannot be blank' : true;
                }),
              ],
            }),
            defineField({
              name: 'status',
              type: 'string',
              title: 'Status',
              initialValue: 'open',
              options: {
                list: [
                  { value: 'open', title: 'open' },
                  { value: 'review', title: 'review' },
                  { value: 'filled', title: 'filled' },
                ],
              },
              validation: (rule) => [rule.required()],
            }),
            defineField({
              name: 'qualificationRequirements',
              title: 'Qualification requirements',
              type: 'array',
              of: [
                defineArrayMember({
                  name: 'mandatoryRequirement',
                  title: 'Mandatory requirement',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'level',
                      title: 'Level',
                      type: 'string',
                      initialValue: 'must',
                      readOnly: true,
                      validation: (rule) => [rule.required()],
                    }),
                    defineField({
                      name: 'label',
                      type: 'string',
                      title: 'Label',
                      validation: (rule) => [rule.required()],
                    }),
                    defineField({
                      name: 'description',
                      type: 'internationalizedArrayText',
                      title: 'Description',
                      validation: (rule) => [
                        rule.required().error('Description is required'),
                        rule
                          .min(1)
                          .error(
                            'Description must be provided in at least one language'
                          ),
                        rule.custom<Nullable<Value[]>>((labels) => {
                          const hasBlankValues = labels?.some(
                            ({ value }) => (value ?? '').trim().length === 0
                          );

                          return hasBlankValues
                            ? 'Descriptions cannot be blank'
                            : true;
                        }),
                      ],
                    }),
                  ],
                  preview: {
                    select: {
                      label: 'label',
                      descriptions: 'description',
                    },
                    prepare({
                      label,
                      descriptions,
                    }: {
                      label?: string;
                      descriptions?: Value[];
                    }) {
                      return {
                        title: isDefined(label) ? `MUST: ${label}` : 'MUST',
                        subtitle: descriptions?.find(
                          ({ _key }) => _key === LanguageCode.NO.toString()
                        )?.value,
                      };
                    },
                  },
                }),
                defineArrayMember({
                  name: 'optionalRequirement',
                  title: 'Optional requirement',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'level',
                      title: 'Level',
                      type: 'string',
                      initialValue: 'should',
                      readOnly: true,
                      validation: (rule) => [rule.required()],
                    }),
                    defineField({
                      name: 'label',
                      type: 'string',
                      title: 'Label',
                      validation: (rule) => [rule.required()],
                    }),
                    defineField({
                      name: 'description',
                      type: 'internationalizedArrayText',
                      title: 'Description',
                      validation: (rule) => [
                        rule.required().error('Description is required'),
                        rule
                          .min(1)
                          .error(
                            'Description must be provided in at least one language'
                          ),
                        rule.custom<Nullable<Value[]>>((labels) => {
                          const hasBlankValues = labels?.some(
                            ({ value }) => (value ?? '').trim().length === 0
                          );

                          return hasBlankValues
                            ? 'Descriptions cannot be blank'
                            : true;
                        }),
                      ],
                    }),
                    defineField({
                      name: 'weight',
                      title: 'Weight',
                      type: 'number',
                      validation: (rule) => [
                        rule.positive(),
                        rule.integer(),
                        rule.min(0),
                        rule.max(100),
                      ],
                    }),
                  ],
                  preview: {
                    select: {
                      label: 'label',
                      descriptions: 'description',
                      weight: 'weight',
                    },
                    prepare({
                      label,
                      descriptions,
                      weight,
                    }: {
                      label?: string;
                      descriptions?: Value[];
                      weight?: number;
                    }) {
                      return {
                        title: isDefined(label)
                          ? `SHOULD: ${label}${isDefined(weight) ? ` (${weight}%)` : ''}`
                          : `SHOULD${isDefined(weight) ? ` (${weight}%)` : ''}`,
                        subtitle: descriptions?.find(
                          ({ _key }) => _key === LanguageCode.NO.toString()
                        )?.value,
                      };
                    },
                  },
                }),
              ],
              validation: (rule) => [
                rule.custom<
                  ({ level: 'must' } | { level: 'should'; weight: number })[]
                >((value) => {
                  const hasOptionalRequirements = value?.some(
                    ({ level }) => level === 'should'
                  );

                  if (hasOptionalRequirements) {
                    const sum =
                      value
                        ?.filter(
                          (
                            requirement
                          ): requirement is {
                            level: 'should';
                            weight: number;
                          } => requirement.level === 'should'
                        )
                        .map(({ weight }) => weight)
                        .reduce((previous, current) => previous + current, 0) ??
                      0;

                    return sum !== 100
                      ? 'There sum of optional requirements weights must add up to 100%'
                      : true;
                  }

                  return true;
                }),
              ],
            }),
          ],
          preview: {
            select: {
              labels: 'label',
              descriptions: 'description',
            },
            prepare({
              labels,
              descriptions,
            }: {
              labels?: Value[];
              descriptions?: Value[];
            }) {
              return {
                title: labels?.find(
                  ({ _key }) => _key === LanguageCode.NO.toString()
                )?.value,
                subtitle: descriptions?.find(
                  ({ _key }) => _key === LanguageCode.NO.toString()
                )?.value,
              };
            },
          },
        }),
      ],
      validation: (rule) => [rule.required()],
    }),
    defineField({
      name: 'details',
      title: 'Details',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'deadline',
          title: 'Deadline',
          type: 'object',
          fields: [
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              initialValue: 'deadline',
              readOnly: true,
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'datetime',
              validation: (rule) => [rule.required()],
            }),
          ],
          preview: {
            select: {
              value: 'value',
            },
            prepare({ value }: { value?: string }) {
              return {
                title: 'Deadline',
                subtitle: isDefined(value)
                  ? new Intl.DateTimeFormat('no-NB', {
                      dateStyle: 'short',
                      timeStyle: 'short',
                    }).format(new Date(value))
                  : undefined,
              };
            },
          },
        }),
        defineArrayMember({
          name: 'commencement',
          title: 'Commencement',
          type: 'object',
          fields: [
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              initialValue: 'commencement',
              readOnly: true,
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'date',
              validation: (rule) => [rule.required()],
            }),
          ],
          preview: {
            select: {
              value: 'value',
            },
            prepare({ value }: { value?: string }) {
              return {
                title: 'Commencement',
                subtitle: isDefined(value)
                  ? new Intl.DateTimeFormat('no-NB', {
                      dateStyle: 'short',
                    }).format(new Date(value))
                  : undefined,
              };
            },
          },
        }),
        defineArrayMember({
          name: 'duration',
          title: 'Duration',
          type: 'object',
          fields: [
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              initialValue: 'duration',
              readOnly: true,
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'internationalizedArrayString',
              validation: (rule) => [
                rule.required(),
                rule.min(1),
                rule.custom<Nullable<Value[]>>((labels) => {
                  const hasBlankValues = labels?.some(
                    ({ value }) => (value ?? '').trim().length === 0
                  );

                  return hasBlankValues ? 'Duration cannot be blank' : true;
                }),
              ],
            }),
          ],
          preview: {
            select: {
              value: 'value',
            },
            prepare({ value }: { value?: Value[] }) {
              return {
                title: 'Duration',
                subtitle: value?.find(
                  ({ _key }) => _key === LanguageCode.NO.toString()
                )?.value,
              };
            },
          },
        }),
        defineArrayMember({
          name: 'scope',
          title: 'Scope',
          type: 'object',
          fields: [
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              initialValue: 'scope',
              readOnly: true,
            }),
            defineField({
              name: 'value',
              title: 'Value',
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
              value: 'value',
            },
            prepare({ value }: { value?: number }) {
              return {
                title: 'Scope',
                subtitle: isDefined(value) ? `${value}%` : undefined,
              };
            },
          },
        }),
        defineArrayMember({
          name: 'location',
          title: 'Location',
          type: 'object',
          fields: [
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              initialValue: 'location',
              readOnly: true,
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'internationalizedArrayString',
              validation: (rule) => [
                rule.required(),
                rule.min(1),
                rule.custom<Nullable<Value[]>>((labels) => {
                  const hasBlankValues = labels?.some(
                    ({ value }) => (value ?? '').trim().length === 0
                  );

                  return hasBlankValues ? 'Location cannot be blank' : true;
                }),
              ],
            }),
          ],
          preview: {
            select: {
              value: 'value',
            },
            prepare({ value }: { value?: Value[] }) {
              return {
                title: 'Location',
                subtitle: value?.find(
                  ({ _key }) => _key === LanguageCode.NO.toString()
                )?.value,
              };
            },
          },
        }),
      ],
      validation: (rule) => [
        rule.unique(),
        rule.custom<
          (
            | { type: 'deadline' }
            | { type: 'commencement' }
            | { type: 'duration' }
            | { type: 'scope' }
            | { type: 'location' }
          )[]
        >((value) => {
          const types = value?.map(({ type }) => type) ?? [];
          const hasDuplicates = new Set(types).size !== types.length;

          return hasDuplicates
            ? 'There can only be one detail of each type'
            : true;
        }),
        rule.custom<
          (
            | { type: 'deadline' }
            | { type: 'commencement' }
            | { type: 'duration' }
            | { type: 'scope' }
            | { type: 'location' }
          )[]
        >((value) => {
          const types = value?.map(({ type }) => type) ?? [];

          if (!types.includes('deadline')) {
            return 'Deadline for a mission must be specified';
          }

          if (!types.includes('commencement')) {
            return 'Commencement date of a mission must be specified';
          }

          if (!types.includes('duration')) {
            return 'Duration of a mission must be specified';
          }

          if (!types.includes('scope')) {
            return 'Scope of a mission must be specified';
          }

          if (!types.includes('location')) {
            return 'Location of a mission must be specified';
          }

          return true;
        }),
      ],
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
                  ({ _key }) => _key === LanguageCode.EN.toString()
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
    defineField({
      name: 'representative',
      title: 'Representative',
      type: 'reference',
      to: { type: 'person' },
      options: {
        disableNew: true,
      },
      validation: (rule) => [rule.required()],
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
