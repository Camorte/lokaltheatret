import {defineArrayMember, defineField, defineType} from 'sanity'

export const play = defineType({
  title: 'Forestilling',
  name: 'play',
  type: 'document',
  fields: [
    defineField({
      title: 'Tittel',
      name: 'playTitle',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Banner bilde',
      name: 'playBannerImg',
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
      title: 'Logo bilde',
      name: 'playLogoImg',
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
    }),
    defineField({
      title: 'Forestillingsdatoer',
      name: 'playDates',
      type: 'array',
      of: [
        {
          title: 'Forestillingsdato',
          name: 'playDates',
          type: 'date',
          options: {
            dateFormat: 'DD-MM-YYYY',
            calendarTodayLabel: 'Today',
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    {
      title: 'Scene/Lokasjon',
      name: 'location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Varighet',
      name: 'duration',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'playColor',
      title: 'Forestillingsfarge',
      type: 'color',
      validation: (Rule) => Rule.required(),
    },
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
              name: 'imageCaption',
              type: 'string',
              title: 'Caption',
            },
            {
              name: 'imageAlt',
              type: 'string',
              title: 'Image alt. text',
              validation: (Rule) => Rule.required(),
            },
          ],
        }),
      ],
    }),
    defineField({
      title: 'URL slug',
      name: 'slug',
      type: 'slug',
      options: {source: 'playTitle'},
      validation: (Rule) => Rule.required(),
    }),
  ],
})
