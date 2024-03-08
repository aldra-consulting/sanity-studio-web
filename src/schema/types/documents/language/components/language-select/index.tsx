import { useEffect, useState } from 'react';

import groq from 'groq';
import {
  type StringInputProps,
  useClient,
  type TitledListValue,
  useFormValue,
} from 'sanity';

import { LanguageCode } from '@project/enums';

export default (props: StringInputProps) => {
  const id = useFormValue(['_id']);

  const client = useClient({ apiVersion: '2024-03-07' });

  const [languages, setLanguages] = useState<LanguageCode[]>([]);

  useEffect(() => {
    const query = groq`*[_type == "language" && _id != $id].code`;

    client
      .withConfig({ perspective: 'previewDrafts' })
      .fetch<LanguageCode[]>(query, { id })
      .then(setLanguages)
      .catch(() => {});
  }, [id, client]);

  const isDraft = typeof id === 'string' && id.startsWith('drafts.');

  return props.renderDefault({
    ...props,
    schemaType: {
      ...props.schemaType,
      options: {
        list: Object.values(LanguageCode)
          .filter((code) => !languages.includes(code) || code === props.value)
          .map(
            (code) =>
              ({ value: code, title: code }) satisfies TitledListValue<string>
          ),
      },
    },
    readOnly:
      !isDraft ||
      Object.values(LanguageCode).every((code) => languages.includes(code)),
  });
};
