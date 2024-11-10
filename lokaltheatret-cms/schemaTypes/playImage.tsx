import {defineField, defineType} from 'sanity'

export const playImage = defineType({
  title: 'Forestillingsbilde',
  name: 'playImage',
  type: 'object',
  fields: [
    defineField({
      name: 'media',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: 'imageCaption',
          type: 'string',
          title: 'Caption',
        },
        {
          title: 'Alt. text',
          name: 'altText',
          type: 'string',
          validation: (rule) =>
            rule.custom((value, context) => {
              const parent = context?.parent as {asset?: {_ref?: string}}

              return !value && parent?.asset?._ref
                ? 'Alt text is required when an image is present'
                : true
            }),
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'media.altText',
      media: 'media',
      mediaType: 'media._type',
    },
    prepare({title, media}: {title: string; media}) {
      return {
        title: title,
        media: media,
      }
    },
  },
})
