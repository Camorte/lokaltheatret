import {defineType} from 'sanity'

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
      title: 'Bannervideo',
      name: 'video',
      type: 'file',
      options: {
        accept: '.mp4',
      },
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
      title: 'Banner referanse',
      description: 'Dette er forestillingen som dirigeres til når brukeren trykker på banneret',
      name: 'bannerReference',
      type: 'reference',
      validation: (Rule) => Rule.required(),
      to: [{type: 'play'}],
    },
    {
      title: 'Forestillinger',
      name: 'highlightedPlays',
      description: 'Listen av forestillinger som vises under banneret',
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
              description:
                'Dette er forestillingen som dirigeres til når brukeren trykker på kortet',
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
