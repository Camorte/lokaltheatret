import { defineField, defineType } from 'sanity';

export const articleReference = defineType({
  title: 'Artikkelreferanse',
  name: 'articleReference',
  type: 'object',
  fields: [
    defineField({
      name: 'article',
      title: 'Artikkel',
      type: 'reference',
      to: [{ type: 'article' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Egendefinert tittel',
      description: 'Valgfritt — overstyrer artikkelens tittel på knappen',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      customTitle: 'title',
      articleTitle: 'article.title',
    },
    prepare({ customTitle, articleTitle }) {
      return {
        title: customTitle || articleTitle || 'Artikkelreferanse',
      };
    },
  },
});
