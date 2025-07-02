export interface MusicTrack {
	title?: string;
	artist?: string;
	album?: string;
	trackId?: string;
	albumId?: string;
	service: 'apple' | 'spotify' | 'youtube';
	originalUrl: string;
}

export interface ParsedMusicUrl {
	service: 'apple' | 'spotify' | 'youtube' | 'unknown';
	type: 'track' | 'album' | 'playlist' | 'artist' | 'unknown';
	id: string;
	region?: string;
}

export interface MusicMetadata {
	service: string;
	type: string;
	id: string;
	title?: string;
	artist?: string;
	album?: string;
}

/**
 * Parse a music URL and extract service information
 */
export function parseMusicUrl(url: string): ParsedMusicUrl {
	try {
		const urlObj = new URL(url);

		// Apple Music
		if (urlObj.hostname.includes('music.apple.com')) {
			const pathParts = urlObj.pathname.split('/').filter(Boolean);
			const region = pathParts[0];
			const type = pathParts[1];
			const id = pathParts[3] || '';

			return {
				service: 'apple',
				type: type as 'track' | 'album' | 'playlist' | 'artist' | 'unknown',
				id,
				region
			};
		}

		// Spotify
		if (urlObj.hostname.includes('spotify.com') || urlObj.hostname.includes('open.spotify.com')) {
			const pathParts = urlObj.pathname.split('/').filter(Boolean);
			const type = pathParts[0];
			const id = pathParts[1] || '';

			return {
				service: 'spotify',
				type: type as 'track' | 'album' | 'playlist' | 'artist' | 'unknown',
				id
			};
		}

		// YouTube Music
		if (urlObj.hostname.includes('music.youtube.com')) {
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
				service: 'youtube',
				type: type as 'track' | 'album' | 'playlist' | 'artist' | 'unknown',
				id
			};
		}

		return {
			service: 'unknown',
			type: 'unknown',
			id: ''
		};
	} catch {
		return {
			service: 'unknown',
			type: 'unknown',
			id: ''
		};
	}
}

/**
 * Generate search query from parsed URL information
 */
export function generateSearchQuery(parsed: ParsedMusicUrl, metadata?: MusicMetadata): string {
	if (metadata?.title && metadata?.artist) {
		return `${metadata.artist} ${metadata.title}`;
	}

	// Fallback to basic search based on ID
	return parsed.id;
}

/**
 * Generate platform-specific URLs for search results
 */
export function generatePlatformUrls(searchQuery: string) {
	const encodedQuery = encodeURIComponent(searchQuery);

	return {
		apple: `https://music.apple.com/search?term=${encodedQuery}`,
		spotify: `https://open.spotify.com/search/${encodedQuery}`,
		youtube: `https://music.youtube.com/search?q=${encodedQuery}`
	};
}

/**
 * Extract metadata from Apple Music URL (simplified version)
 */
export function extractAppleMusicMetadata(url: string): Promise<MusicMetadata> {
	// In a real implementation, you'd use the Apple Music API
	// For now, we'll extract what we can from the URL
	const parsed = parseMusicUrl(url);
	return Promise.resolve({
		service: 'apple',
		type: parsed.type,
		id: parsed.id
	});
}

/**
 * Extract metadata from Spotify URL (simplified version)
 */
export function extractSpotifyMetadata(url: string): Promise<MusicMetadata> {
	// In a real implementation, you'd use the Spotify Web API
	// For now, we'll extract what we can from the URL
	const parsed = parseMusicUrl(url);
	return Promise.resolve({
		service: 'spotify',
		type: parsed.type,
		id: parsed.id
	});
}

/**
 * Extract metadata from YouTube Music URL (simplified version)
 */
export function extractYouTubeMetadata(url: string): Promise<MusicMetadata> {
	// In a real implementation, you'd use the YouTube Data API
	// For now, we'll extract what we can from the URL
	const parsed = parseMusicUrl(url);
	return Promise.resolve({
		service: 'youtube',
		type: parsed.type,
		id: parsed.id
	});
}
