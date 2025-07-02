# 🎵 Music Link Translator

A web application that translates music links between different streaming platforms like Apple Music, Spotify, YouTube Music, and more.

## Features

- **Universal Link Translation**: Convert music links between Apple Music, Spotify, YouTube Music, and other supported platforms
- **Real-time Translation**: Uses the SongLink/Odesli API for accurate, real-time link conversion
- **Track Metadata**: Displays song title, artist, and album artwork when available
- **Modern UI**: Clean, responsive interface built with SvelteKit and Tailwind CSS
- **One-Click Actions**: Direct links to open tracks and copy URLs to clipboard

## Supported Platforms

- Apple Music
- Spotify
- YouTube Music
- YouTube
- SoundCloud
- Tidal
- Deezer
- Amazon Music
- Pandora

## How to Use

1. Copy a music link from any supported streaming platform
2. Paste it into the input field on the website
3. Click "Translate" to get equivalent links for other platforms
4. Click the platform buttons to open the track or copy the link

## Example

Input: `https://music.apple.com/nl/album/fwu/1822359451`

Output: Direct links to the same album/track on Spotify, YouTube Music, etc.

## Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Technical Details

- **Framework**: SvelteKit
- **Styling**: Tailwind CSS
- **API**: SongLink/Odesli for music link translation
- **TypeScript**: Full type safety throughout

## API Used

This app uses the [SongLink/Odesli API](https://www.notion.so/API-d0ebe08a5e304a55928405eb682f6741) which provides free music link translation services across multiple platforms.
