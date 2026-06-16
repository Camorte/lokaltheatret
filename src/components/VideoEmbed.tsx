import { parseVideoUrl } from '@/lib/video';

type VideoEmbedProps = {
  url: string;
  title?: string;
};

export default function VideoEmbed({ url, title }: VideoEmbedProps) {
  const parsed = parseVideoUrl(url);
  if (!parsed) return null;

  return (
    <div className="relative aspect-video w-full overflow-hidden">
      <iframe
        className="absolute inset-0 h-full w-full"
        src={parsed.embedUrl}
        title={title || 'Video'}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
