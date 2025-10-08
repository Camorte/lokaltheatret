import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'c99u49i1',
    dataset: 'production',
  },
  deployment: {autoUpdates: true, appId: 'lokaltheatret'},
})
