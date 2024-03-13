import { useEffect, useState } from 'react';

import groq from 'groq';
import {
  type StringInputProps,
  useClient,
  type TitledListValue,
  useFormValue,
} from 'sanity';

import { Criterion } from '@project/enums';

export default (props: StringInputProps) => {
  const id = useFormValue(['_id']);

  const client = useClient({ apiVersion: '2024-03-07' });

  const [criteria, setCriteria] = useState<Criterion[]>([]);

  useEffect(() => {
    const query = groq`*[_type == "criterion" && _id != $id].type`;

    client
      .withConfig({ perspective: 'previewDrafts' })
      .fetch<Criterion[]>(query, { id })
      .then(setCriteria)
      .catch(() => {});
  }, [id, client]);

  const isDraft = typeof id === 'string' && id.startsWith('drafts.');

  return props.renderDefault({
    ...props,
    schemaType: {
      ...props.schemaType,
      options: {
        list: Object.values(Criterion)
          .filter(
            (criterion) =>
              !criteria.includes(criterion) || criterion === props.value
          )
          .map(
            (criterion) =>
              ({
                value: criterion,
                title: criterion,
              }) satisfies TitledListValue<string>
          ),
      },
    },
    readOnly:
      !isDraft ||
      Object.values(Criterion).every((criterion) =>
        criteria.includes(criterion)
      ),
  });
};
