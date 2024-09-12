import {defineField, defineType} from 'sanity'

export const mainBanner = defineType({
  title: 'Hovedbanner',
  name: 'mainBanner',
  type: 'document',
  fields: [
    defineField({
      title: 'Tittel',
      name: 'title',
      type: 'string',
    }),
    {
      title: 'Bilde',
      name: 'image',
      type: 'image',
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true, // <-- Defaults to false
      },
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
  ],
})
