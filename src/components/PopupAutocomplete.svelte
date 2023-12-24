<script lang="ts">
	import type { Placement } from '@floating-ui/dom';
	import { Autocomplete, popup } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption, PopupSettings } from '@skeletonlabs/skeleton';
	import { X } from 'lucide-svelte';

	export let optionsData: AutocompleteOption<string>[];
	console.log('🚀 ~ file: PopupAutocomplete.svelte:7 ~ optionsData:', optionsData);
	export let target: string,
		placement: Placement = 'bottom',
		placeholder = 'Tìm kiếm...';
	export let input = '';
	export let width: 'max-w-sm' | 'max-w-md' | 'max-w-lg' = 'max-w-sm';

	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target,
		placement
	};

	function onSelection(event: CustomEvent<AutocompleteOption<string>>): void {
		input = event.detail.label;
	}
</script>

<input
	class="dui-input h-10 dui-input-bordered w-full"
	type="search"
	name="autocomplete-search"
	bind:value={input}
	{placeholder}
	use:popup={popupSettings}
/>
<div data-popup={target} class="card w-full {width} max-h-60 p-4 overflow-y-auto">
	<div class="w-full flex justify-end sticky top-0">
		<button class="dui-btn dui-btn-square dui-btn-xs">
			<X size={15} />
		</button>
	</div>
	{#if optionsData.length == 0}
		<div>Không có dữ liệu gợi ý!</div>
	{:else}
		<Autocomplete bind:input options={optionsData} on:selection={onSelection} />
	{/if}
</div>
