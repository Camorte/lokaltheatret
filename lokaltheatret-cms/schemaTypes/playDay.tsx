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
    {title: 'Få billetter', name: 'fewTickets', type: 'boolean', initialValue: false},
  ],
  preview: {
    select: {
      title: 'playDate',
      soldOut: 'soldOut',
      fewTickets: 'fewTickets',
    },
    prepare({title, soldOut, fewTickets}: {title: string; soldOut: boolean; fewTickets: boolean}) {
      let subtitleText = soldOut ? 'Utsolgt' : 'Ikke utsolgt'
      if (fewTickets) {
        subtitleText += ' - Få billetter igjen'
      }

      return {
        title: title,
        subtitle: subtitleText,
      }
    },
  },
})
