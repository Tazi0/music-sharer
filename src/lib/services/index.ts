// Export the abstract base class and interfaces
export { MusicService } from './MusicService.js';
export type { MusicMetadata, ParsedMusicUrl } from './MusicService.js';

// Export individual service classes
export { AppleMusicService } from './AppleMusicService.js';
export { SpotifyService } from './SpotifyService.js';
export { YouTubeMusicService } from './YouTubeMusicService.js';
export { YouTubeService } from './YouTubeService.js';
export { TidalService } from './TidalService.js';
export { DeezerService } from './DeezerService.js';

// Export the service registry
export { MusicServiceRegistry, musicServiceRegistry } from './MusicServiceRegistry.js';
