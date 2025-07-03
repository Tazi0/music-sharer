import { MusicService, type ParsedMusicUrl } from './MusicService.js';

export class TidalService extends MusicService {
	readonly serviceName = 'Tidal';
	readonly domains = ['tidal.com'];
	readonly icon = '🌊';
	readonly platformKey = 'tidal';
	readonly resultKey = 'tidal';

	parseUrl(url: string): ParsedMusicUrl {
		try {
			const urlObj = new URL(url);
			const pathParts = urlObj.pathname.split('/').filter(Boolean);

			const type = pathParts[0] || 'unknown'; // track, album, playlist
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
		return `https://tidal.com/search?q=${encodedQuery}`;
	}
}
