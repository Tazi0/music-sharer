<script lang="ts">
	export let service: 'apple' | 'spotify' | 'youtube';
	export let url: string;
	export let isOriginal = false;

	function getServiceIcon(service: string) {
		switch (service) {
			case 'apple':
				return '🎵';
			case 'spotify':
				return '🎧';
			case 'youtube':
				return '📺';
			default:
				return '🎶';
		}
	}

	function getServiceName(service: string) {
		switch (service) {
			case 'apple':
				return 'Apple Music';
			case 'spotify':
				return 'Spotify';
			case 'youtube':
				return 'YouTube Music';
			default:
				return 'Unknown';
		}
	}

	function getServiceColor(service: string) {
		switch (service) {
			case 'apple':
				return 'from-gray-800 to-black';
			case 'spotify':
				return 'from-green-500 to-green-600';
			case 'youtube':
				return 'from-red-500 to-red-600';
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
