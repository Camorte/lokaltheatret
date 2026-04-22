import { defineField, defineType } from 'sanity';

export const fullWidthImage = defineType({
  title: 'Fullbredde bilde',
  name: 'fullWidthImage',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imageCaption',
      type: 'string',
      title: 'Caption',
    }),
    defineField({
      name: 'imageAlt',
      type: 'string',
      title: 'Alt. text',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      media: 'image',
    },
    prepare(selection) {
      return {
        title: 'Fullbredde bilde',
        media: selection.media,
      };
    },
  },
});
