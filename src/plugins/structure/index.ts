import { type PluginOptions } from 'sanity';
import { structureTool } from 'sanity/structure';

export default () =>
  structureTool({
    structure: (builder) =>
      builder
        .list()
        .title('Content')
        .items([
          ...builder
            .documentTypeListItems()
            .filter(
              (listItem) => !['language'].includes(listItem.getId() ?? '')
            )
            .map((listItem) => listItem.showIcon(false)),
          builder.divider(),
          builder
            .listItem()
            .title('Settings')
            .showIcon(false)
            .child(
              builder
                .list()
                .title('Settings')
                .showIcons(false)
                .items([
                  builder
                    .listItem()
                    .title('Languages')
                    .child(
                      builder.documentTypeList('language').title('Languages')
                    ),
                ])
            ),
        ]),
  }) as PluginOptions;
