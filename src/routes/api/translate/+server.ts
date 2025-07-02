import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return json({ error: 'URL is required' }, { status: 400 });
    }

    // Make the request to SongLink API from the server
    const apiUrl = `https://api.song.link/v1-alpha.1/links?url=${encodeURIComponent(url)}`;
    
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Music-Link-Translator/1.0'
      }
    });

    if (!response.ok) {
      return json(
        { error: `SongLink API error: ${response.status}` }, 
        { status: response.status }
      );
    }

    const data = await response.json();
    return json(data);

  } catch (error) {
    console.error('Translation error:', error);
    return json(
      { error: 'Failed to translate music URL' }, 
      { status: 500 }
    );
  }
};
