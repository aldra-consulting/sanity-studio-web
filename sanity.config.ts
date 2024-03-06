import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { schemaTypes } from '@project/schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'Platform',
  projectId: 'g5uhz92f',
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
