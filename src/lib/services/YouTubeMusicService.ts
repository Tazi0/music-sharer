import { MusicService, type ParsedMusicUrl } from './MusicService.js';

export class YouTubeMusicService extends MusicService {
	readonly serviceName = 'YouTube Music';
	readonly domains = ['music.youtube.com'];
	readonly icon = '📺';
	readonly platformKey = 'youtubeMusic';
	readonly resultKey = 'youtubeMusic';

	parseUrl(url: string): ParsedMusicUrl {
		try {
			const urlObj = new URL(url);
			const params = new URLSearchParams(urlObj.search);

			let type = 'unknown';
			let id = '';

			if (urlObj.pathname.includes('/watch')) {
				type = 'track';
				id = params.get('v') || '';
			} else if (urlObj.pathname.includes('/playlist')) {
				type = 'playlist';
				id = params.get('list') || '';
			} else if (urlObj.pathname.includes('/browse')) {
				type = 'album';
				id = params.get('browse_id') || '';
			}

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
		return `https://music.youtube.com/search?q=${encodedQuery}`;
	}
}
