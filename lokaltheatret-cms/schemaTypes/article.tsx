import {defineArrayMember, defineField, defineType} from 'sanity'

export const article = defineType({
  title: 'Artikkel',
  name: 'article',
  type: 'document',
  fields: [
    defineField({
      title: 'Tittel',
      name: 'articleTitle',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Beskrivelse',
      name: 'articleDescription',
      type: 'text',
    }),
    defineField({
      title: 'Innhold',
      description: 'What is this article about?',
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
            },
          ],
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'URL slug',
      name: 'articleSlug',
      type: 'slug',
      options: {
        source: 'articleTitle',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
