import { join } from 'path';

import { defineCliConfig } from 'sanity/cli';

import env from '@project/env';

const { PROJECT_ID: projectId, DATASET: dataset } = env();

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  server: {
    port: 8005,
  },
  reactStrictMode: true,
  vite: {
    resolve: {
      alias: {
        '@project': join(__dirname, 'src'),
      },
    },
    define: {
      'window.env': env(),
    },
  },
});
