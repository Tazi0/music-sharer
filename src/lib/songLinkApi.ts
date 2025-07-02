export interface SongLinkResponse {
	entityUniqueId: string;
	userCountry: string;
	pageUrl: string;
	linksByPlatform: {
		appleMusic?: {
			url: string;
			nativeAppUriMobile?: string;
			nativeAppUriDesktop?: string;
			entityUniqueId: string;
		};
		spotify?: {
			url: string;
			nativeAppUriMobile?: string;
			nativeAppUriDesktop?: string;
			entityUniqueId: string;
		};
		youtube?: {
			url: string;
			nativeAppUriMobile?: string;
			nativeAppUriDesktop?: string;
			entityUniqueId: string;
		};
		youtubeMusic?: {
			url: string;
			nativeAppUriMobile?: string;
			nativeAppUriDesktop?: string;
			entityUniqueId: string;
		};
		[key: string]:
			| {
					url: string;
					nativeAppUriMobile?: string;
					nativeAppUriDesktop?: string;
					entityUniqueId: string;
			  }
			| undefined;
	};
	entitiesByUniqueId: {
		[key: string]: {
			id: string;
			type: string;
			title?: string;
			artistName?: string;
			thumbnailUrl?: string;
			thumbnailWidth?: number;
			thumbnailHeight?: number;
			apiProvider: string;
			platforms: string[];
		};
	};
}

export interface TranslatedLinks {
	apple?: string;
	spotify?: string;
	youtube?: string;
	youtubeMusic?: string;
	original: string;
	metadata?: {
		title?: string;
		artist?: string;
		thumbnail?: string;
	};
}

/**
 * Translate a music URL to other platforms using SongLink/Odesli API
 */
export async function translateMusicUrl(url: string): Promise<TranslatedLinks> {
	try {
		const response = await fetch('/api/translate', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ url })
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.error || `API request failed: ${response.status}`);
		}

		const data: SongLinkResponse = await response.json();

		// Extract metadata from the first entity
		const firstEntity = Object.values(data.entitiesByUniqueId)[0];
		const metadata = firstEntity
			? {
					title: firstEntity.title,
					artist: firstEntity.artistName,
					thumbnail: firstEntity.thumbnailUrl
				}
			: undefined;

		// Build the result object
		const result: TranslatedLinks = {
			original: url,
			metadata
		};

		// Extract platform links
		if (data.linksByPlatform.appleMusic) {
			result.apple = data.linksByPlatform.appleMusic.url;
		}

		if (data.linksByPlatform.spotify) {
			result.spotify = data.linksByPlatform.spotify.url;
		}

		if (data.linksByPlatform.youtube) {
			result.youtube = data.linksByPlatform.youtube.url;
		}

		if (data.linksByPlatform.youtubeMusic) {
			result.youtubeMusic = data.linksByPlatform.youtubeMusic.url;
		}

		return result;
	} catch (error) {
		console.error('Error translating music URL:', error);
		throw new Error(
			'Failed to translate music URL. The service might be unavailable or the URL might not be supported.'
		);
	}
}

/**
 * Check if a URL is supported for translation
 */
export function isSupportedMusicUrl(url: string): boolean {
	try {
		const urlObj = new URL(url);
		const supportedDomains = [
			'music.apple.com',
			'open.spotify.com',
			'spotify.com',
			'music.youtube.com',
			'youtube.com',
			'youtu.be',
			'soundcloud.com',
			'tidal.com',
			'deezer.com',
			'music.amazon.com',
			'pandora.com'
		];

		return supportedDomains.some((domain) => urlObj.hostname.includes(domain));
	} catch {
		return false;
	}
}

/**
 * Extract service name from URL
 */
export function getServiceFromUrl(url: string): string {
	try {
		const urlObj = new URL(url);

		if (urlObj.hostname.includes('music.apple.com')) return 'Apple Music';
		if (urlObj.hostname.includes('spotify.com')) return 'Spotify';
		if (urlObj.hostname.includes('music.youtube.com')) return 'YouTube Music';
		if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be'))
			return 'YouTube';
		if (urlObj.hostname.includes('soundcloud.com')) return 'SoundCloud';
		if (urlObj.hostname.includes('tidal.com')) return 'Tidal';
		if (urlObj.hostname.includes('deezer.com')) return 'Deezer';
		if (urlObj.hostname.includes('music.amazon.com')) return 'Amazon Music';
		if (urlObj.hostname.includes('pandora.com')) return 'Pandora';

		return 'Unknown Service';
	} catch {
		return 'Unknown Service';
	}
}
