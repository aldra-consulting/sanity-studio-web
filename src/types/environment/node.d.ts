declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    SANITY_STUDIO_PROJECT_ID: string;
    SANITY_STUDIO_DATASET: string;
  }
}
