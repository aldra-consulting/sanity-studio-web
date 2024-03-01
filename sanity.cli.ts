import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'g5uhz92f',
    dataset: 'production'
  },
  server: {port: 8005},
  reactStrictMode: true
})
