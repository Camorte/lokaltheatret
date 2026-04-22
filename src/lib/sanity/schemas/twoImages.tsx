import { defineField, defineType } from 'sanity';

export const twoImages = defineType({
  title: 'To bilder',
  name: 'twoImages',
  type: 'object',
  fields: [
    defineField({
      name: 'imageLeft',
      title: 'Venstre bilde',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: 'imageCaption',
          type: 'string',
          title: 'Caption',
        },
        {
          name: 'imageAlt',
          type: 'string',
          title: 'Alt. text',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'imageRight',
      title: 'Høyre bilde',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: 'imageCaption',
          type: 'string',
          title: 'Caption',
        },
        {
          name: 'imageAlt',
          type: 'string',
          title: 'Alt. text',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
  ],
  preview: {
    select: {
      media: 'imageLeft',
    },
    prepare(selection) {
      return {
        title: 'To bilder',
        media: selection.media,
      };
    },
  },
});
