import {defineField, defineType} from 'sanity'

export const landingPage = defineType({
  title: 'Landingsside',
  name: 'landingPage',
  type: 'document',
  fields: [
    {
      title: 'Logo',
      name: 'logo',
      type: 'image',
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
    },
    {
      title: 'Forestillinger',
      name: 'highlightedPlays',
      type: 'array',
      of: [
        {
          title: 'Forestilling',
          name: 'highlightedPlay',
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Tittel'},
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
            },
            {
              title: 'Description',
              name: 'description',
              type: 'text',
              validation: (Rule) => Rule.max(300),
            },
            {
              title: 'Forestillingsreferanse',
              name: 'playReference',
              type: 'reference',
              to: [{type: 'play'}],
            },
          ],
        },
      ],
    },
  ],
})
