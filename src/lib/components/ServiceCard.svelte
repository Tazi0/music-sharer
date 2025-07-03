<script lang="ts">
	import type { MusicService } from '$lib/services';

	export let service: MusicService;
	export let url: string;
	export let isOriginal = false;

	function getServiceIcon(service: MusicService) {
		return service.icon;
	}

	function getServiceName(service: MusicService) {
		return service.serviceName;
	}

	function getServiceColor(service: MusicService) {
		switch (service.serviceName.toLowerCase()) {
			case 'apple':
			case 'apple music':
				return 'from-gray-800 to-black';
			case 'spotify':
				return 'from-green-500 to-green-600';
			case 'youtube':
			case 'youtube music':
				return 'from-red-500 to-red-600';
			case 'tidal':
				return 'from-blue-500 to-blue-600';
			case 'deezer':
				return 'from-orange-500 to-red-500';
			default:
				return 'from-purple-500 to-purple-600';
		}
	}

	function copyToClipboard(url: string) {
		navigator.clipboard.writeText(url).then(() => {
			// Could add a toast notification here
		});
	}
</script>

<div
	class="rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md {isOriginal
		? 'bg-purple-50 ring-2 ring-purple-500'
		: ''}"
>
	<div class="mb-3 flex items-center gap-3">
		<span class="text-2xl">{getServiceIcon(service)}</span>
		<div class="flex-1">
			<span class="font-medium text-gray-800">{getServiceName(service)}</span>
			{#if isOriginal}
				<span class="ml-2 rounded bg-purple-200 px-2 py-1 text-xs text-purple-800">Original</span>
			{/if}
		</div>
	</div>

	<div class="flex gap-2">
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			class="flex-1 bg-gradient-to-r px-3 py-2 {getServiceColor(
				service
			)} rounded text-center text-sm font-medium text-white transition-opacity hover:opacity-90"
		>
			{isOriginal ? 'Open' : 'Search'}
		</a>
		<button
			on:click={() => copyToClipboard(url)}
			class="rounded bg-gray-100 px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-200"
			title="Copy to clipboard"
		>
			📋
		</button>
	</div>
</div>
