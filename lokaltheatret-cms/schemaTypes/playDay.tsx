import {defineType} from 'sanity'

export const playDay = defineType({
  title: 'Forestillingsdag',
  name: 'playDay',
  type: 'object',
  fields: [
    {
      title: 'Forestillingsdato',
      name: 'playDate',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15,
        calendarTodayLabel: 'Today',
      },
      validation: (Rule) => Rule.required(),
    },
    {title: 'Utsolgt', name: 'soldOut', type: 'boolean', initialValue: false},
  ],
  preview: {
    select: {
      title: 'playDate',
      subtitle: 'soldOut',
    },
    prepare({title, subtitle}: {title: string; subtitle: boolean}) {
      const subtitleText = subtitle ? 'Utsolgt' : 'Ikke utsolgt'

      return {
        title: title,
        subtitle: subtitleText,
      }
    },
  },
})
