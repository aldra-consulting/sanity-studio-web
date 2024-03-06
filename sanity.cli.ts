import { join } from 'path';

import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: 'g5uhz92f',
    dataset: 'production',
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
  },
});
