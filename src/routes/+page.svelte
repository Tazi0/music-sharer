<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import Header from '$lib/components/Header.svelte';
	import UrlInput from '$lib/components/UrlInput.svelte';
	import TrackInfo from '$lib/components/TrackInfo.svelte';
	import PlatformLinks from '$lib/components/PlatformLinks.svelte';
	import ExampleUrls from '$lib/components/ExampleUrls.svelte';
	import {
		translateMusicUrl,
		isSupportedMusicUrl,
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

	function handleExampleClick(url: string) {
		inputUrl = url;
	}
</script>

<SEO />

<div class="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
	<div class="mx-auto max-w-4xl">
		<Header />

		<UrlInput
			bind:inputUrl
			{isLoading}
			{error}
			hasResults={!!translatedLinks}
			onTranslate={handleTranslate}
			onClear={clearResults}
		/>

		{#if translatedLinks}
			{#if translatedLinks.metadata?.title || translatedLinks.metadata?.artist}
				<TrackInfo metadata={translatedLinks.metadata} originalUrl={translatedLinks.original} />
			{/if}

			<PlatformLinks {translatedLinks} />
		{/if}

		<ExampleUrls onExampleClick={handleExampleClick} />
	</div>
</div>
