<script lang="ts">
	export let onExampleClick: (url: string) => void;
</script>

<div class="mt-8 rounded-xl bg-white p-6 shadow-lg">
	<h3 class="mb-4 text-lg font-semibold text-gray-800">Example URLs to Try</h3>
	<div class="space-y-2 text-sm">
		<div>
			<span class="font-medium">Apple Music:</span>
			<button
				on:click={() => onExampleClick('https://music.apple.com/nl/album/fwu/1822359451')}
				class="ml-2 text-purple-600 underline hover:text-purple-800"
			>
				https://music.apple.com/nl/album/fwu/1822359451
			</button>
		</div>
		<div>
			<span class="font-medium">Spotify:</span>
			<button
				on:click={() => onExampleClick('https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh')}
				class="ml-2 text-purple-600 underline hover:text-purple-800"
			>
				https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh
			</button>
		</div>
		<div>
			<span class="font-medium">YouTube Music:</span>
			<button
				on:click={() => onExampleClick('https://music.youtube.com/watch?v=dQw4w9WgXcQ')}
				class="ml-2 text-purple-600 underline hover:text-purple-800"
			>
				https://music.youtube.com/watch?v=dQw4w9WgXcQ
			</button>
		</div>
	</div>
</div>
