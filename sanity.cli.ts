import path from 'path';
import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
  deployment: { autoUpdates: true, appId: 'g71mvpaee1ddv2g07nh1zzqd' },
  vite: (prev) => ({
    ...prev,
    define: {
      ...prev.define,
      'process.env.NEXT_PUBLIC_SANITY_PROJECT_ID': JSON.stringify(
        process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      ),
      'process.env.NEXT_PUBLIC_SANITY_DATASET': JSON.stringify(
        process.env.NEXT_PUBLIC_SANITY_DATASET,
      ),
    },
    resolve: {
      ...prev.resolve,
      alias: {
        ...(prev.resolve?.alias ?? {}),
        '@': path.resolve(__dirname, 'src'),
      },
    },
  }),
});
