import { getStudioEnvironmentVariables } from 'sanity/cli';

import { type Environment } from '@project/types';
import { checkEnvironmentVariables } from '@project/utils';

const { NODE_ENV: ENVIRONMENT = 'development' } = process.env;

getStudioEnvironmentVariables({
  envFile: {
    mode: ENVIRONMENT,
    envDir: './env',
  },
});

const { SANITY_STUDIO_PROJECT_ID: PROJECT_ID, SANITY_STUDIO_DATASET: DATASET } =
  process.env;

export default () =>
  checkEnvironmentVariables<Environment>(
    {
      ENVIRONMENT,
      PROJECT_ID,
      DATASET,
    },
    ['ENVIRONMENT', 'PROJECT_ID', 'DATASET']
  );
