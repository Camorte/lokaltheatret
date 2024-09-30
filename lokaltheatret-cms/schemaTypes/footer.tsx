import {defineField, defineType} from 'sanity'

export const footer = defineType({
  title: 'Footer',
  name: 'footer',
  type: 'document',
  fieldsets: [{name: 'socialMedia', title: 'Sosiale medier'}],
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
      fieldset: 'socialMedia',
    }),
    defineField({
      title: 'Facebook',
      name: 'facebook',
      type: 'url',
      fieldset: 'socialMedia',
    }),
    defineField({
      title: 'Instagram',
      name: 'instagram',
      type: 'url',
      fieldset: 'socialMedia',
    }),
    defineField({
      title: 'Kontakt e-post',
      name: 'contactEmail',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
