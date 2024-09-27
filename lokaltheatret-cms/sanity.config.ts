import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import structure from './structure'
import {colorInput} from '@sanity/color-input'

export default defineConfig({
  name: 'default',
  title: 'lokaltheatret',

  projectId: 'c99u49i1',
  dataset: 'production',

  plugins: [
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
