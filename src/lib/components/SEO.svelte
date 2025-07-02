<script lang="ts">
	export let title = 'MusicBridge - Convert Music Links Between Streaming Platforms';
	export let description =
		'Seamlessly convert music links between Apple Music, Spotify, YouTube Music, and more. Share your favorite songs across all platforms instantly.';
	export let canonical = '';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	{#if canonical}
		<link rel="canonical" href={canonical} />
	{/if}

	<!-- Open Graph -->
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	{#if canonical}
		<meta property="og:url" content={canonical} />
	{/if}

	<!-- Twitter -->
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
</svelte:head>
