<script lang="ts">
	import ServiceCard from '$lib/components/ServiceCard.svelte';
	import {
		translateMusicUrl,
		isSupportedMusicUrl,
		getServiceFromUrl,
		type TranslatedLinks
	} from '$lib/songLinkApi.js';

	let inputUrl = '';
	let isLoading = false;
	let translatedLinks: TranslatedLinks | null = null;
	let error = '';

	async function handleTranslate() {
		if (!inputUrl.trim()) {
			error = 'Please enter a music URL';
			return;
		}

		const url = inputUrl.trim();

		if (!isSupportedMusicUrl(url)) {
			error =
				'URL not supported. Please enter a valid music URL from Apple Music, Spotify, YouTube Music, or other supported platforms.';
			return;
		}

		isLoading = true;
		error = '';
		translatedLinks = null;

		try {
			const result = await translateMusicUrl(url);
			translatedLinks = result;
		} catch (err) {
			error =
				err instanceof Error ? err.message : 'Failed to translate the music URL. Please try again.';
			console.error(err);
		} finally {
			isLoading = false;
		}
	}

	function clearResults() {
		translatedLinks = null;
		error = '';
		inputUrl = '';
	}
</script>

<div class="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
	<div class="mx-auto max-w-4xl">
		<!-- Header -->
		<div class="mb-8 pt-8 text-center">
			<h1 class="mb-2 text-4xl font-bold text-gray-800">🎵 Music Link Translator</h1>
			<p class="text-gray-600">
				Convert music links between Apple Music, Spotify, and YouTube Music
			</p>
		</div>

		<!-- Input Section -->
		<div class="mb-6 rounded-xl bg-white p-6 shadow-lg">
			<div class="flex flex-col gap-4 sm:flex-row">
				<input
					bind:value={inputUrl}
					placeholder="Paste your music link here (Apple Music, Spotify, YouTube Music, etc.)..."
					class="flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-purple-500"
					on:keydown={(e) => e.key === 'Enter' && handleTranslate()}
				/>
				<div class="flex gap-2">
					<button
						on:click={handleTranslate}
						disabled={isLoading}
						class="rounded-lg bg-purple-600 px-6 py-3 text-white transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
					>
						{isLoading ? 'Translating...' : 'Translate'}
					</button>
					{#if translatedLinks}
						<button
							on:click={clearResults}
							class="rounded-lg bg-gray-500 px-4 py-3 text-white transition-colors hover:bg-gray-600"
						>
							Clear
						</button>
					{/if}
				</div>
			</div>

			{#if error}
				<div class="mt-4 rounded border border-red-400 bg-red-100 p-3 text-red-700">
					{error}
				</div>
			{/if}
		</div>

		<!-- Results Section -->
		{#if translatedLinks}
			<!-- Metadata Display -->
			{#if translatedLinks.metadata?.title || translatedLinks.metadata?.artist}
				<div class="mb-6 rounded-xl bg-white p-6 shadow-lg">
					<h2 class="mb-4 text-2xl font-semibold text-gray-800">Track Information</h2>
					<div class="flex items-center gap-4">
						{#if translatedLinks.metadata.thumbnail}
							<img
								src={translatedLinks.metadata.thumbnail}
								alt="Album artwork"
								class="h-16 w-16 rounded-lg object-cover"
							/>
						{/if}
						<div>
							{#if translatedLinks.metadata.title}
								<div class="text-lg font-semibold text-gray-800">
									{translatedLinks.metadata.title}
								</div>
							{/if}
							{#if translatedLinks.metadata.artist}
								<div class="text-gray-600">{translatedLinks.metadata.artist}</div>
							{/if}
							<div class="mt-1 text-sm text-gray-500">
								Original: {getServiceFromUrl(translatedLinks.original)}
							</div>
						</div>
					</div>
				</div>
			{/if}

			<!-- Platform Links -->
			<div class="rounded-xl bg-white p-6 shadow-lg">
				<h2 class="mb-6 text-2xl font-semibold text-gray-800">Available on These Platforms</h2>

				<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{#if translatedLinks.apple}
						<ServiceCard
							service="apple"
							url={translatedLinks.apple}
							isOriginal={translatedLinks.original === translatedLinks.apple}
						/>
					{/if}

					{#if translatedLinks.spotify}
						<ServiceCard
							service="spotify"
							url={translatedLinks.spotify}
							isOriginal={translatedLinks.original === translatedLinks.spotify}
						/>
					{/if}

					{#if translatedLinks.youtubeMusic}
						<ServiceCard
							service="youtube"
							url={translatedLinks.youtubeMusic}
							isOriginal={translatedLinks.original === translatedLinks.youtubeMusic}
						/>
					{:else if translatedLinks.youtube}
						<ServiceCard
							service="youtube"
							url={translatedLinks.youtube}
							isOriginal={translatedLinks.original === translatedLinks.youtube}
						/>
					{/if}
				</div>

				<!-- Show original if it doesn't match any of the above -->
				{#if translatedLinks.original !== translatedLinks.apple && translatedLinks.original !== translatedLinks.spotify && translatedLinks.original !== translatedLinks.youtubeMusic && translatedLinks.original !== translatedLinks.youtube}
					<div class="mt-4">
						<h3 class="mb-3 text-lg font-medium text-gray-700">Original Link</h3>
						<div class="rounded-lg border border-gray-200 p-4">
							<div class="mb-3 flex items-center gap-3">
								<span class="text-2xl">🎶</span>
								<span class="font-medium text-gray-800"
									>{getServiceFromUrl(translatedLinks.original)}</span
								>
								<span class="rounded bg-blue-200 px-2 py-1 text-xs text-blue-800">Original</span>
							</div>
							<div class="flex gap-2">
								<a
									href={translatedLinks.original}
									target="_blank"
									rel="noopener noreferrer"
									class="flex-1 rounded bg-blue-600 px-3 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700"
								>
									Open Original
								</a>
								<button
									on:click={() => navigator.clipboard.writeText(translatedLinks.original)}
									class="rounded bg-gray-100 px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-200"
									title="Copy to clipboard"
								>
									📋
								</button>
							</div>
						</div>
					</div>
				{/if}
			</div>
		{/if}

		<!-- Example URLs Section -->
		<div class="mt-8 rounded-xl bg-white p-6 shadow-lg">
			<h3 class="mb-4 text-lg font-semibold text-gray-800">Example URLs to Try</h3>
			<div class="space-y-2 text-sm">
				<div>
					<span class="font-medium">Apple Music:</span>
					<button
						on:click={() => {
							inputUrl = 'https://music.apple.com/nl/album/fwu/1822359451';
						}}
						class="ml-2 text-purple-600 underline hover:text-purple-800"
					>
						https://music.apple.com/nl/album/fwu/1822359451
					</button>
				</div>
				<div>
					<span class="font-medium">Spotify:</span>
					<button
						on:click={() => {
							inputUrl = 'https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh';
						}}
						class="ml-2 text-purple-600 underline hover:text-purple-800"
					>
						https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh
					</button>
				</div>
				<div>
					<span class="font-medium">YouTube Music:</span>
					<button
						on:click={() => {
							inputUrl = 'https://music.youtube.com/watch?v=dQw4w9WgXcQ';
						}}
						class="ml-2 text-purple-600 underline hover:text-purple-800"
					>
						https://music.youtube.com/watch?v=dQw4w9WgXcQ
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
