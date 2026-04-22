import { defineArrayMember, defineField, defineType } from 'sanity';

export const imageGalleryBlock = defineType({
  title: 'Bildegalleri',
  name: 'imageGalleryBlock',
  type: 'object',
  fields: [
    defineField({
      name: 'images',
      title: 'Bilder',
      type: 'array',
      of: [defineArrayMember({ type: 'playImage' })],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Bildegalleri',
      };
    },
  },
});
