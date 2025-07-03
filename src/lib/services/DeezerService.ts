import { MusicService, type ParsedMusicUrl } from './MusicService.js';

export class DeezerService extends MusicService {
	readonly serviceName = 'Deezer';
	readonly domains = ['deezer.com', 'www.deezer.com'];
	readonly icon = '🔥';
	readonly platformKey = 'deezer';
	readonly resultKey = 'deezer';

	parseUrl(url: string): ParsedMusicUrl {
		try {
			const urlObj = new URL(url);
			const pathParts = urlObj.pathname.split('/').filter(Boolean);

			// Deezer URLs can have language codes like /en/, /fr/, etc.
			// Skip language codes (2-letter codes) to find the content type
			let typeIndex = 0;
			if (pathParts[0] && pathParts[0].length === 2) {
				typeIndex = 1; // Skip language code
			}

			const type = pathParts[typeIndex] || 'unknown'; // track, album, playlist, artist
			const id = pathParts[typeIndex + 1] || '';

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
		return `https://www.deezer.com/search/${encodedQuery}`;
	}
}
