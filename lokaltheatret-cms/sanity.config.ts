import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import structure from './structure'
import {colorInput} from '@sanity/color-input'
import {presentationTool} from 'sanity/presentation'
import {resolve} from './resolve'

export default defineConfig({
  name: 'default',
  title: 'lokaltheatret',

  projectId: 'c99u49i1',
  dataset: 'production',

  scheduledPublishing: {
    enabled: false,
  },

  plugins: [
    presentationTool({
      allowOrigins: ['http://localhost:*', 'https://lokaltheatret.no'],
      previewUrl: {
        initial: process.env.SANITY_STUDIO_PREVIEW_ORIGIN,
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
    types: schemaTypes,
  },
})
