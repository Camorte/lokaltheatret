import {defineArrayMember, defineField, defineType} from 'sanity'

export const join = defineType({
  title: 'Bli med',
  name: 'join',
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
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
            {
              title: 'Alt. text',
              name: 'alt',
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bannerColor',
      title: 'Farge bak tittel',
      type: 'color',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Banner bilde',
      name: 'joinPageBannerImg',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      fields: [
        {
          title: 'Alt. text',
          name: 'alt',
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
})
