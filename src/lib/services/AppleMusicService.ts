import { MusicService, type ParsedMusicUrl } from './MusicService.js';

export class AppleMusicService extends MusicService {
	readonly serviceName = 'Apple Music';
	readonly domains = ['music.apple.com'];
	readonly icon = '🎵';
	readonly platformKey = 'appleMusic';
	readonly resultKey = 'apple';

	parseUrl(url: string): ParsedMusicUrl {
		try {
			const urlObj = new URL(url);
			const pathParts = urlObj.pathname.split('/').filter(Boolean);

			const region = pathParts[0] || '';
			const type = pathParts[1] || 'unknown';
			const id = pathParts[3] || '';

			return {
				service: this.serviceName,
				type: type as 'track' | 'album' | 'playlist' | 'artist' | 'unknown',
				id,
				region
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
		return `https://music.apple.com/search?term=${encodedQuery}`;
	}
}
