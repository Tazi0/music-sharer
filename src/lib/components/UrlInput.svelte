<script lang="ts">
	export let inputUrl: string;
	export let isLoading: boolean;
	export let error: string;
	export let hasResults: boolean;
	export let onTranslate: () => void;
	export let onClear: () => void;
</script>

<div class="mb-6 rounded-xl bg-white p-6 shadow-lg">
	<div class="flex flex-col gap-4 sm:flex-row">
		<input
			bind:value={inputUrl}
			placeholder="Paste your music link here (Apple Music, Spotify, YouTube Music, etc.)..."
			class="flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-purple-500"
			on:keydown={(e) => e.key === 'Enter' && onTranslate()}
		/>
		<div class="flex gap-2">
			<button
				on:click={onTranslate}
				disabled={isLoading}
				class="rounded-lg bg-purple-600 px-6 py-3 text-white transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
			>
				{isLoading ? 'Translating...' : 'Translate'}
			</button>
			{#if hasResults}
				<button
					on:click={onClear}
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
