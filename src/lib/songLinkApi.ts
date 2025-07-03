import { musicServiceRegistry } from './services/index.js';

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
 * Translate a music URL to other platforms using our server-side API
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

		// Use the service registry to build the translated links
		return musicServiceRegistry.buildTranslatedLinksFromApiData(data, url);
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
	return musicServiceRegistry.isUrlSupported(url);
}

/**
 * Extract service name from URL
 */
export function getServiceFromUrl(url: string): string {
	const service = musicServiceRegistry.getServiceForUrl(url);
	return service ? service.serviceName : 'Unknown Service';
}
