import { AppleMusicService } from './AppleMusicService.js';
import { SpotifyService } from './SpotifyService.js';
import { YouTubeMusicService } from './YouTubeMusicService.js';
import { YouTubeService } from './YouTubeService.js';
import type { MusicService } from './MusicService.js';

// Import the SongLink response type
interface SongLinkApiData {
	entitiesByUniqueId?: {
		[key: string]: {
			title?: string;
			artistName?: string;
			thumbnailUrl?: string;
		};
	};
	linksByPlatform?: {
		[key: string]: { url: string } | undefined; // Allow any platform key
	};
}

interface TranslatedLinksResult {
	original: string;
	metadata?: {
		title?: string;
		artist?: string;
		thumbnail?: string;
	};
	[key: string]: string | object | undefined; // Allow dynamic properties
}

export class MusicServiceRegistry {
	private services: MusicService[] = [
		new AppleMusicService(),
		new SpotifyService(),
		new YouTubeMusicService(),
		new YouTubeService()
	];

	/**
	 * Get all registered services
	 */
	getAllServices(): MusicService[] {
		return [...this.services];
	}

	/**
	 * Find the service that can handle a given URL
	 */
	getServiceForUrl(url: string): MusicService | null {
		return this.services.find((service) => service.canHandle(url)) || null;
	}

	/**
	 * Get a service by name
	 */
	getServiceByName(name: string): MusicService | null {
		return this.services.find((service) => service.serviceName === name) || null;
	}

	/**
	 * Check if a URL is supported by any service
	 */
	isUrlSupported(url: string): boolean {
		return this.services.some((service) => service.canHandle(url));
	}

	/**
	 * Get all supported domains
	 */
	getSupportedDomains(): string[] {
		return this.services.flatMap((service) => service.domains);
	}

	/**
	 * Register a new service
	 */
	registerService(service: MusicService): void {
		this.services.push(service);
	}

	/**
	 * Build translated links from SongLink API response data
	 */
	buildTranslatedLinksFromApiData(
		apiData: SongLinkApiData,
		originalUrl: string
	): TranslatedLinksResult {
		const result: TranslatedLinksResult = {
			original: originalUrl,
			metadata: undefined
		};

		// Extract metadata from the first entity
		const firstEntity = Object.values(apiData.entitiesByUniqueId || {})[0];
		if (firstEntity) {
			result.metadata = {
				title: firstEntity.title,
				artist: firstEntity.artistName,
				thumbnail: firstEntity.thumbnailUrl
			};
		}

		// Extract platform links using service registry
		for (const service of this.services) {
			const platformData = apiData.linksByPlatform?.[service.platformKey];

			if (platformData?.url) {
				// Dynamically set the result property using the service's resultKey
				(result as Record<string, unknown>)[service.resultKey] = platformData.url;
			}
		}

		return result;
	}
}

// Export a singleton instance
export const musicServiceRegistry = new MusicServiceRegistry();
