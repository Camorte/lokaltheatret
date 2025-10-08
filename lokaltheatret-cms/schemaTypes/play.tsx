import {defineArrayMember, defineField, defineType} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import ColorContrastString from '../components/ColorContrastString'

export const play = defineType({
  title: 'Forestilling',
  name: 'play',
  type: 'document',
  fieldsets: [{name: 'playColorProfile', title: 'Forestillingens fargeprofil'}],
  orderings: [orderRankOrdering],
  fields: [
    defineField({
      title: 'Aktiv forestilling',
      name: 'active',
      type: 'boolean',
      initialValue: false,
      validation: (Rule) =>
        Rule.custom((currentValue) => {
          return currentValue === undefined ? 'Required' : true
        }),
    }),
    defineField({
      title: 'Utsolgt',
      description: 'Er forestillingen helt utsolgt?',
      name: 'soldOut',
      type: 'boolean',
      initialValue: false,
      hidden: ({document}) => !document?.active,
      validation: (Rule) =>
        Rule.custom((currentValue, {document}) => {
          return document?.active && currentValue == null ? 'Required' : true
        }),
    }),
    defineField({
      title: 'Tittel',
      name: 'playTitle',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    orderRankField({type: 'play', newItemPosition: 'before'}),
    {
      title: 'Bannervideo',
      name: 'video',
      type: 'file',
      options: {
        accept: '.mp4',
      },
    },
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
      title: 'Billettinformasjon',
      name: 'ticketInfo',
      description: 'Enten en lenke til billettsiden eller en tekstbeskjed',
      type: 'object',
      hidden: ({document}) => !document?.active,
      fields: [
        defineField({
          title: 'Type',
          name: 'type',
          type: 'string',
          options: {
            list: [
              {title: 'URL/Lenke', value: 'url'},
              {title: 'Tekst', value: 'text'},
            ],
            layout: 'radio',
          },
          initialValue: 'url',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          title: 'URL til billettsiden',
          name: 'url',
          type: 'url',
          hidden: ({parent}) => parent?.type !== 'url',
          validation: (Rule) =>
            Rule.custom((currentValue, {parent}) => {
              return parent?.type === 'url' && (!currentValue || currentValue.length === 0)
                ? 'URL er påkrevd når type er URL'
                : true
            }),
        }),
        defineField({
          title: 'Tekstmelding',
          name: 'text',
          type: 'string',
          hidden: ({parent}) => parent?.type !== 'text',
          validation: (Rule) =>
            Rule.custom((currentValue, {parent}) => {
              return parent?.type === 'text' && (!currentValue || currentValue.length === 0)
                ? 'Tekst er påkrevd når type er tekst'
                : true
            }),
        }),
      ],
      validation: (Rule) =>
        Rule.custom((currentValue, {document}) => {
          return document?.active && !currentValue
            ? 'Billettinformasjon er påkrevd for aktive forestillinger'
            : true
        }),
    }),
    defineField({
      title: 'Forestillingsdatoer',
      name: 'playDates',
      type: 'array',
      of: [defineArrayMember({type: 'playDay'})],
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
      name: 'playPeriod',
      type: 'string',
      validation: (Rule) =>
        Rule.custom((currentValue, {document}) => {
          return !document?.active && !currentValue ? 'Required' : true
        }),
      hidden: ({document}) => {
        return (document && document.active) as boolean
      },
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
    {
      name: 'customField',
      title: 'Custom field',
      type: 'string',
      fieldset: 'playColorProfile',
      components: {field: ColorContrastString},
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
