import {defineArrayMember, defineField, defineType} from 'sanity'

export const about = defineType({
  title: 'Om oss',
  name: 'about',
  type: 'document',
  fields: [
    defineField({
      title: 'Tittel',
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
  ],
})
