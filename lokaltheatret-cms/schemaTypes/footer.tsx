import {defineField, defineType} from 'sanity'

export const footer = defineType({
  title: 'Footer',
  name: 'footer',
  type: 'document',
  fields: [
    defineField({
      title: 'Slagord',
      name: 'slogan',
      type: 'string',
    }),
    defineField({
      title: 'Twitter',
      name: 'twitter',
      type: 'url',
    }),
    defineField({
      title: 'Facebook',
      name: 'facebook',
      type: 'url',
    }),
    defineField({
      title: 'Instagram',
      name: 'instagram',
      type: 'url',
    }),
    defineField({
      title: 'Kontakt e-post',
      name: 'contactEmail',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
})