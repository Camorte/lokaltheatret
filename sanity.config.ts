import { colorInput } from '@sanity/color-input';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { presentationTool } from 'sanity/presentation';
import { structureTool } from 'sanity/structure';

import { resolve } from './src/lib/sanity/resolve';
import { schemas } from './src/lib/sanity/schemas';
import structure from './src/lib/sanity/structure';

export default defineConfig({
  basePath: '/studio',

  name: 'default',
  title: 'lokaltheatret',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  scheduledPublishing: {
    enabled: false,
  },

  plugins: [
    presentationTool({
      allowOrigins: ['http://localhost:3000', 'https://lokaltheatret.no', 'https://*.netlify.app'],
      previewUrl: {
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
      resolve,
    }),
    colorInput(),
    structureTool({
      structure,
    }),
    visionTool(),
  ],

  schema: {
    types: schemas,
  },
});
