import {defineArrayMember, defineField, defineType} from 'sanity'

export const about = defineType({
  title: 'Om oss',
  name: 'about',
  type: 'document',
  fieldsets: [{name: 'founders', title: 'Våre grunnleggere'}],
  fields: [
    defineField({
      title: 'Tittel',
      name: 'title',
      type: 'string',
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
      name: 'aboutPageBannerImg',
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
      title: 'Innhold',
      name: 'foundersContent',
      type: 'array',
      fieldset: 'founders',
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
      title: 'Grunnleggere',
      name: 'foundersList',
      type: 'array',
      fieldset: 'founders',
      of: [
        {
          title: 'Grunnleggerne',
          type: 'object',
          fields: [
            {
              title: 'Navn',
              name: 'name',
              type: 'string',
            },
            {title: 'Rolle', name: 'role', type: 'string'},
            {title: 'Bilde', name: 'image', type: 'image'},
          ],
        },
      ],
    }),
  ],
})
