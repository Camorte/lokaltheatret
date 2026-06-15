import { defineField, defineType } from 'sanity';

import { parseVideoUrl } from '@/lib/video';

export const videoEmbed = defineType({
  title: 'Video',
  name: 'videoEmbed',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'Video-URL (YouTube eller Vimeo)',
      type: 'url',
      validation: (Rule) =>
        Rule.required()
          .uri({ scheme: ['http', 'https'] })
          .custom((value) =>
            !value || parseVideoUrl(value)
              ? true
              : 'Skriv inn en gyldig YouTube- eller Vimeo-URL',
          ),
    }),
    defineField({
      name: 'width',
      title: 'Bredde',
      type: 'string',
      options: {
        list: [
          { title: 'Innholdsbredde', value: 'content' },
          { title: 'Full bredde', value: 'full' },
        ],
        layout: 'radio',
      },
      initialValue: 'content',
    }),
    defineField({
      name: 'caption',
      title: 'Bildetekst',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      url: 'url',
      caption: 'caption',
    },
    prepare({ url, caption }) {
      const parsed = url ? parseVideoUrl(url) : null;
      return {
        title: caption || 'Video',
        subtitle: parsed ? `${parsed.provider} · ${parsed.id}` : 'Ugyldig URL',
      };
    },
  },
});
