import {defineArrayMember, defineField, defineType} from 'sanity'
import ColorContrastString from '../components/ColorContrastString'

export const article = defineType({
  title: 'Artikkel',
  name: 'article',
  type: 'document',
  fieldsets: [{name: 'articleColorProfile', title: 'Artikkelens fargeprofil'}],
  fields: [
    defineField({
      title: 'Tittel',
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Ingress',
      name: 'ingress',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Innhold',
      name: 'content',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
        }),
        defineArrayMember({
          type: 'image',
          fields: [
            {
              name: 'imageCaption',
              type: 'string',
              title: 'Caption',
            },
            {
              name: 'imageAlt',
              type: 'string',
              title: 'Image alt. text',
              validation: (Rule) => Rule.required(),
            },
          ],
        }),
      ],
    }),
    defineField({
      title: 'Bakgrunnsfarge',
      name: 'backgroundColor',
      type: 'color',
      fieldset: 'articleColorProfile',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Tekstfarge',
      name: 'textColor',
      type: 'color',
      fieldset: 'articleColorProfile',
      validation: (Rule) => Rule.required(),
    }),
    {
      name: 'customField',
      title: 'Custom field',
      type: 'string',
      fieldset: 'articleColorProfile',
      components: {field: ColorContrastString},
    },
  ],
})
