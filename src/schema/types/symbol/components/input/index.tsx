import { useState, useEffect, type ComponentType } from 'react';

import groq from 'groq';
import { useClient, useFormValue, type StringInputProps } from 'sanity';

export default ((props) => {
  const { renderDefault, schemaType, value, id: property } = props;

  const client = useClient({ apiVersion: '2024-09-11' });

  const id = useFormValue(['_id']);
  const type = useFormValue(['_type']);

  const [values, setValues] = useState<unknown[]>([]);

  useEffect(() => {
    const query = groq`array::compact(*[_type == $type && _id != $id][$property])`;

    client
      .withConfig({ perspective: 'previewDrafts' })
      .fetch<unknown[]>(query, { id, type, property })
      .then(setValues)
      .catch(() => {});
  }, [client, id, type, property]);

  const list = schemaType.options?.list?.filter((element) => {
    if (typeof element === 'string') {
      return element !== value;
    }

    return !values.includes(element.value) || element.value === value;
  });

  return renderDefault({
    ...props,
    schemaType: {
      ...schemaType,
      options: {
        list,
      },
    },
  });
}) satisfies ComponentType<StringInputProps>;
