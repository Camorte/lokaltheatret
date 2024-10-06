import {defineType} from 'sanity'

export const contributors = defineType({
  title: 'Medvirkende',
  name: 'contributors',
  type: 'object',
  fields: [
    {
      title: 'Skuespillere',
      name: 'actors',
      type: 'array',
      of: [
        {
          title: 'Skuespiller',
          name: 'actor',
          type: 'object',
          fields: [
            {type: 'string', title: 'Rolle', name: 'role', validation: (Rule) => Rule.required()},
            {
              title: 'Navn(ene)',
              name: 'names',
              type: 'array',
              of: [
                {
                  type: 'string',
                  title: 'Navn',
                  name: 'name',
                  validation: (Rule) => Rule.required(),
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: 'Kunstnerisk lag',
      name: 'aristicTeam',
      type: 'array',
      of: [
        {
          title: 'Kunstner',
          name: 'artist',
          type: 'object',
          fields: [
            {type: 'string', title: 'Rolle', name: 'role', validation: (Rule) => Rule.required()},
            {
              title: 'Navn(ene)',
              name: 'names',
              type: 'array',
              of: [
                {
                  type: 'string',
                  title: 'Navn',
                  name: 'name',
                  validation: (Rule) => Rule.required(),
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: 'Produksjonslag',
      name: 'productionTeam',
      type: 'array',
      of: [
        {
          title: 'Produsent',
          name: 'producer',
          type: 'object',
          fields: [
            {type: 'string', title: 'Rolle', name: 'role', validation: (Rule) => Rule.required()},
            {
              title: 'Navn(ene)',
              name: 'names',
              type: 'array',
              of: [
                {
                  type: 'string',
                  title: 'Navn',
                  name: 'name',
                  validation: (Rule) => Rule.required(),
                },
              ],
            },
          ],
        },
      ],
    },
  ],
})
