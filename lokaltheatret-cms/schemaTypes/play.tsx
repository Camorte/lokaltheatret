import {defineArrayMember, defineField, defineType} from 'sanity'

export const play = defineType({
  title: 'Forestilling',
  name: 'play',
  type: 'document',
  fieldsets: [
    {
      name: 'playDatePeriod',
      title: 'Forestillingsperiode',
      options: {columns: 2},
    },
  ],
  fields: [
    defineField({
      title: 'Tittel',
      name: 'playTitle',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Bildetittel',
      name: 'playImgTitle',
      type: 'image',
      validation: (Rule) => Rule.required(),
    }),
    {
      title: 'Første forestilling',
      name: 'playStartDate',
      type: 'date',
      fieldset: 'playDatePeriod',
      options: {
        dateFormat: 'DD-MM-YYYY',
        calendarTodayLabel: 'Today',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Siste forestillings',
      name: 'playEndDate',
      type: 'date',
      fieldset: 'playDatePeriod',
      options: {
        dateFormat: 'DD-MM-YYYY',
        calendarTodayLabel: 'Today',
      },
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
