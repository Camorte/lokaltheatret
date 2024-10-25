import {defineArrayMember, defineField, defineType} from 'sanity'

export const contributors = defineType({
  title: 'Medvirkende',
  name: 'contributors',
  type: 'object',
  fields: [
    defineField({
      title: 'Skuespillere',
      name: 'actors',
      type: 'array',
      of: [
        defineArrayMember({
          title: 'Skuespiller',
          name: 'actor',
          type: 'object',
          fields: [
            defineField({
              type: 'string',
              title: 'Rolle',
              name: 'role',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  title: 'Alt. text',
                  name: 'altText',
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
            }),
          ],
        }),
      ],
    }),
    defineField({
      title: 'Kunstnerisk lag',
      name: 'aristicTeam',
      type: 'array',
      of: [
        defineArrayMember({
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
        }),
      ],
    }),
    defineField({
      title: 'Produksjonslag',
      name: 'productionTeam',
      type: 'array',
      of: [
        defineArrayMember({
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
        }),
      ],
    }),
  ],
})
