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
      title: 'Logo',
      name: 'logo',
      type: 'image',
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          validation: (rule) =>
            rule.custom((value, context) => {
              const parent = context?.parent as {asset?: {_ref?: string}}

              return !value && parent?.asset?._ref
                ? 'Alt text is required when an image is present'
                : true
            }),
        },
      ],
    },
    {
      title: 'Bilde',
      name: 'image',
      type: 'image',
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          validation: (rule) =>
            rule.custom((value, context) => {
              const parent = context?.parent as {asset?: {_ref?: string}}

              return !value && parent?.asset?._ref
                ? 'Alt text is required when an image is present'
                : true
            }),
        },
      ],
    },
  ],
})
