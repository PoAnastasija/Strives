import { useState } from 'react';

export const useYoutubeEmbed = () => {
  const [url, setUrl] = useState<string>('');
  const [embedUrl, setEmbedUrl] = useState<string>('');
  const handleAdd = () => {
    try {
      const parsed = new URL(url);
      let id = '';
      if (parsed.hostname.includes('youtube.com')) {
        id = parsed.searchParams.get('v') || '';
      } else if (parsed.hostname.includes('youtu.be')) {
        id = parsed.pathname.slice(1);
      }
      if (id) {
        setEmbedUrl(`https://www.youtube.com/embed/${id}`);
      } else {
        setEmbedUrl(url);
      }
    } catch {
      setEmbedUrl('');
    }
  };

  return {
    url,
    setUrl,
    embedUrl,
    handleAdd,
  };
};
