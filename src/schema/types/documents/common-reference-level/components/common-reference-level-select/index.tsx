import { useEffect, useState } from 'react';

import groq from 'groq';
import {
  type StringInputProps,
  useClient,
  type TitledListValue,
  useFormValue,
} from 'sanity';

import { CommonReferenceLevel } from '@project/enums';

export default (props: StringInputProps) => {
  const id = useFormValue(['_id']);

  const client = useClient({ apiVersion: '2024-03-11' });

  const [commonReferenceLevels, setCommonReferenceLevels] = useState<
    CommonReferenceLevel[]
  >([]);

  useEffect(() => {
    const query = groq`*[_type == "commonReferenceLevel" && _id != $id].value`;

    client
      .withConfig({ perspective: 'previewDrafts' })
      .fetch<CommonReferenceLevel[]>(query, { id })
      .then(setCommonReferenceLevels)
      .catch(() => {});
  }, [id, client]);

  const isDraft =
    (typeof id === 'string' && id.startsWith('drafts.')) || !props.value;

  return props.renderDefault({
    ...props,
    schemaType: {
      ...props.schemaType,
      options: {
        ...props.schemaType.options,
        list: Object.values(CommonReferenceLevel)
          .filter(
            (value) =>
              !commonReferenceLevels.includes(value) || value === props.value
          )
          .map(
            (value) =>
              ({ value, title: value }) satisfies TitledListValue<string>
          ),
      },
    },
    readOnly: !isDraft,
  });
};
