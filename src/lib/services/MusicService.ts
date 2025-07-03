export interface MusicMetadata {
	title?: string;
	artist?: string;
	album?: string;
	thumbnail?: string;
	id: string;
	type: 'track' | 'album' | 'playlist' | 'artist' | 'unknown';
}

export interface ParsedMusicUrl {
	service: string;
	type: 'track' | 'album' | 'playlist' | 'artist' | 'unknown';
	id: string;
	region?: string;
}

export abstract class MusicService {
	abstract readonly serviceName: string;
	abstract readonly domains: string[];
	abstract readonly icon: string;
	abstract readonly platformKey: string;
	abstract readonly resultKey: string; // Key used in TranslatedLinksResult

	/**
	 * Check if this service can handle the given URL
	 */
	canHandle(url: string): boolean {
		try {
			const urlObj = new URL(url);
			return this.domains.some((domain) => urlObj.hostname.includes(domain));
		} catch {
			return false;
		}
	}

	/**
	 * Parse a URL from this service
	 */
	abstract parseUrl(url: string): ParsedMusicUrl;

	/**
	 * Extract metadata from a URL (simplified version)
	 */
	async extractMetadata(url: string): Promise<MusicMetadata> {
		const parsed = this.parseUrl(url);
		return {
			title: undefined,
			artist: undefined,
			album: undefined,
			thumbnail: undefined,
			id: parsed.id,
			type: parsed.type
		};
	}

	/**
	 * Generate a search URL for this service
	 */
	abstract generateSearchUrl(query: string): string;
}
