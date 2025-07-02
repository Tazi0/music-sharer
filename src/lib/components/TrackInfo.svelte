<script lang="ts">
	import { getServiceFromUrl } from '$lib/songLinkApi.js';

	export let metadata: {
		title?: string;
		artist?: string;
		thumbnail?: string;
	};
	export let originalUrl: string;
</script>

<div class="mb-6 rounded-xl bg-white p-6 shadow-lg">
	<h2 class="mb-4 text-2xl font-semibold text-gray-800">Track Information</h2>
	<div class="flex items-center gap-4">
		{#if metadata.thumbnail}
			<img src={metadata.thumbnail} alt="Album artwork" class="h-16 w-16 rounded-lg object-cover" />
		{/if}
		<div>
			{#if metadata.title}
				<div class="text-lg font-semibold text-gray-800">
					{metadata.title}
				</div>
			{/if}
			{#if metadata.artist}
				<div class="text-gray-600">{metadata.artist}</div>
			{/if}
			<div class="mt-1 text-sm text-gray-500">
				Original: {getServiceFromUrl(originalUrl)}
			</div>
		</div>
	</div>
</div>
