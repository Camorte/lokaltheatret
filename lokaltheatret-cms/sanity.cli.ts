import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'c99u49i1',
    dataset: 'production',
  },
  autoUpdates: true,
  studioHost: 'lokaltheatret',
})
