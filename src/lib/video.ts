export type VideoProvider = 'youtube' | 'vimeo';

export type ParsedVideo = {
  provider: VideoProvider;
  id: string;
  embedUrl: string;
};

function youtube(id: string): ParsedVideo {
  return {
    provider: 'youtube',
    id,
    embedUrl: `https://www.youtube-nocookie.com/embed/${id}`,
  };
}

function vimeo(id: string): ParsedVideo {
  return {
    provider: 'vimeo',
    id,
    embedUrl: `https://player.vimeo.com/video/${id}`,
  };
}

export function parseVideoUrl(url: string): ParsedVideo | null {
  if (!url) return null;

  let parsed: URL;
  try {
    parsed = new URL(url.trim());
  } catch {
    return null;
  }

  const host = parsed.hostname.replace(/^www\./, '').replace(/^m\./, '');

  if (host === 'youtu.be') {
    const id = parsed.pathname.slice(1).split('/')[0];
    return id ? youtube(id) : null;
  }

  if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
    const vParam = parsed.searchParams.get('v');
    if (vParam) return youtube(vParam);
    const match = parsed.pathname.match(/^\/(?:embed|shorts|v)\/([^/?]+)/);
    if (match) return youtube(match[1]);
    return null;
  }

  if (host === 'vimeo.com') {
    const match = parsed.pathname.match(/\/(\d+)/);
    return match ? vimeo(match[1]) : null;
  }

  if (host === 'player.vimeo.com') {
    const match = parsed.pathname.match(/\/video\/(\d+)/);
    return match ? vimeo(match[1]) : null;
  }

  return null;
}
