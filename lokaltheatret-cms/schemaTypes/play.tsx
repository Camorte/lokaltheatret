import {defineArrayMember, defineField, defineType} from 'sanity'

export const play = defineType({
  title: 'Forestilling',
  name: 'play',
  type: 'document',
  fieldsets: [{name: 'playColorProfile', title: 'Forestillingens fargeprofil'}],
  fields: [
    defineField({
      title: 'Aktiv forestilling',
      name: 'active',
      type: 'boolean',
      validation: (Rule) =>
        Rule.custom((currentValue) => {
          return currentValue === undefined ? 'Required' : true
        }),
    }),
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
      title: 'Billettsiden',
      name: 'ticketsPage',
      description: 'Lenke til hvor man kjøper billetter til forestillingen',
      type: 'url',
      hidden: ({document}) => !document?.active,
      validation: (Rule) =>
        Rule.custom((currentValue, {document}) => {
          return document?.active && (!currentValue || currentValue.length === 0)
            ? 'Required'
            : true
        }),
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
      hidden: ({document}) => !document?.active,
      validation: (Rule) =>
        Rule.custom((currentValue, {document}) => {
          return document?.active && (!currentValue || currentValue.length === 0)
            ? 'Required'
            : true
        }),
    }),
    {
      title: 'Forestillingsperiode',
      description: 'Når ble denne forestillingen fremført?',
      name: 'playPeriod',
      type: 'string',
      validation: (Rule) =>
        Rule.custom((currentValue, {document}) => {
          return !document?.active && !currentValue ? 'Required' : true
        }),
      hidden: ({document}) => document && document.active,
    },
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
      validation: (Rule) =>
        Rule.custom((currentValue, {document}) => {
          return document?.active && !currentValue ? 'Required' : true
        }),
      hidden: ({document}) => !document?.active,
    },
    {
      name: 'playColor',
      title: 'Forestillingsfarge',
      type: 'color',
      fieldset: 'playColorProfile',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Tekstfarge',
      name: 'textColor',
      type: 'color',
      fieldset: 'playColorProfile',
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
      title: 'Bildegalleri',
      name: 'imageGallery',
      type: 'array',
      of: [defineArrayMember({type: 'playImage'})],
    }),
    defineField({
      title: 'URL slug',
      name: 'slug',
      type: 'slug',
      options: {source: 'playTitle'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({title: 'Medvirkende', name: 'contributors', type: 'contributors'}),
  ],
})
