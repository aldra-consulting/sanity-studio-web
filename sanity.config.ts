import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { schemaTypes } from '@project/schemaTypes';
import { type Environment } from '@project/types';
import { checkEnvironmentVariables } from '@project/utils';

const environment = window.env;

checkEnvironmentVariables<Environment>(environment, [
  'ENVIRONMENT',
  'PROJECT_ID',
  'DATASET',
]);

const { PROJECT_ID: projectId, DATASET: dataset } = environment;

export default defineConfig({
  name: 'default',
  title: 'Platform',
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
