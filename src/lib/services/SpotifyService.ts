import { MusicService, type ParsedMusicUrl } from './MusicService.js';

export class SpotifyService extends MusicService {
	readonly serviceName = 'Spotify';
	readonly domains = ['spotify.com', 'open.spotify.com'];
	readonly icon = '🎧';
	readonly platformKey = 'spotify';
	readonly resultKey = 'spotify';

	parseUrl(url: string): ParsedMusicUrl {
		try {
			const urlObj = new URL(url);
			const pathParts = urlObj.pathname.split('/').filter(Boolean);

			const type = pathParts[0] || 'unknown';
			const id = pathParts[1] || '';

			return {
				service: this.serviceName,
				type: type as 'track' | 'album' | 'playlist' | 'artist' | 'unknown',
				id
			};
		} catch {
			return {
				service: this.serviceName,
				type: 'unknown',
				id: ''
			};
		}
	}

	generateSearchUrl(query: string): string {
		const encodedQuery = encodeURIComponent(query);
		return `https://open.spotify.com/search/${encodedQuery}`;
	}
}
