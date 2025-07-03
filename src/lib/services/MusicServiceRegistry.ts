import { AppleMusicService } from './AppleMusicService.js';
import { SpotifyService } from './SpotifyService.js';
import { YouTubeMusicService } from './YouTubeMusicService.js';
import { YouTubeService } from './YouTubeService.js';
import type { MusicService } from './MusicService.js';
import { TidalService } from './TidalService.js';
import { DeezerService } from './DeezerService.js';

// Import the SongLink response type and interfaces from songLinkApi
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

export interface ServiceWithUrl {
	service: MusicService;
	url: string;
}

export interface TranslatedLinks {
	services: ServiceWithUrl[];
	original: string;
	metadata?: {
		title?: string;
		artist?: string;
		thumbnail?: string;
	};
}

export class MusicServiceRegistry {
	private services: MusicService[] = [
		new AppleMusicService(),
		new SpotifyService(),
		new YouTubeMusicService(),
		new YouTubeService(),
		new TidalService(),
		new DeezerService()
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
	buildTranslatedLinksFromApiData(apiData: SongLinkApiData, originalUrl: string): TranslatedLinks {
		const services: ServiceWithUrl[] = [];

		// Extract metadata from the first entity
		const firstEntity = Object.values(apiData.entitiesByUniqueId || {})[0];
		const metadata = firstEntity
			? {
					title: firstEntity.title,
					artist: firstEntity.artistName,
					thumbnail: firstEntity.thumbnailUrl
				}
			: undefined;

		// Extract platform links using service registry
		for (const service of this.services) {
			const platformData = apiData.linksByPlatform?.[service.platformKey];

			if (platformData?.url) {
				services.push({
					service,
					url: platformData.url
				});
			}
		}

		return {
			services,
			original: originalUrl,
			metadata
		};
	}
}

// Export a singleton instance
export const musicServiceRegistry = new MusicServiceRegistry();
