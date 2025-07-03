<script lang="ts">
	import ServiceCard from './ServiceCard.svelte';
	import { getServiceFromUrl } from '$lib/songLinkApi.js';
	import type { TranslatedLinks } from '$lib/services/MusicServiceRegistry';

	export let translatedLinks: TranslatedLinks;

	let serviceOfLink = getServiceFromUrl(translatedLinks.original);
	let foundMatchingService = false;

	function doesServiceMatch(serviceName: string): boolean {
		let res = serviceOfLink === serviceName;
		if (res) {
			foundMatchingService = true;
		}
		return res;
	}
</script>

<div class="rounded-xl bg-white p-6 shadow-lg">
	<h2 class="mb-6 text-2xl font-semibold text-gray-800">Available on These Platforms</h2>

	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#each translatedLinks.services as serviceWithUrl}
			<ServiceCard
				service={serviceWithUrl.service}
				url={serviceWithUrl.url}
				isOriginal={doesServiceMatch(serviceWithUrl.service.serviceName)}
			/>
		{/each}
	</div>

	<!-- Show original if it doesn't match any of the services -->
	{#if foundMatchingService === false}
		<div class="mt-4">
			<h3 class="mb-3 text-lg font-medium text-gray-700">Original Link</h3>
			<div class="rounded-lg border border-gray-200 p-4">
				<div class="mb-3 flex items-center gap-3">
					<span class="text-2xl">🎶</span>
					<span class="font-medium text-gray-800">
						{serviceOfLink}
					</span>
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
