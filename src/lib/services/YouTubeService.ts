import { MusicService, type ParsedMusicUrl } from './MusicService.js';

export class YouTubeService extends MusicService {
	readonly serviceName = 'YouTube';
	readonly domains = ['youtube.com', 'youtu.be'];
	readonly icon = '📹';
	readonly platformKey = 'youtube';
	readonly resultKey = 'youtube';

	parseUrl(url: string): ParsedMusicUrl {
		try {
			const urlObj = new URL(url);
			let id = '';

			if (urlObj.hostname.includes('youtu.be')) {
				// Handle youtu.be short URLs
				id = urlObj.pathname.slice(1);
			} else {
				// Handle youtube.com URLs
				const params = new URLSearchParams(urlObj.search);
				id = params.get('v') || '';
			}

			return {
				service: this.serviceName,
				type: 'track',
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
		return `https://www.youtube.com/results?search_query=${encodedQuery}`;
	}
}
