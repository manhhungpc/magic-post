<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';
	import { mergeQueries } from 'src/utils/helper';
	import type { Paginate } from 'src/utils/interface';

	export let paginate: Paginate;
	let paginationSettings = {
		page: paginate?.currentPage - 1,
		limit: paginate?.perPage,
		size: paginate?.totalItems,
		amounts: [5, 10]
	} satisfies PaginationSettings;

	function onPageChange(e: CustomEvent): void {
		const pageSize = String(paginate.perPage);
		const pageNumber = e.detail + 1;

		const currentQuery = new URLSearchParams($page.url.searchParams.toString());
		const newQuery = mergeQueries(currentQuery, new URLSearchParams({ pageSize, pageNumber }));

		goto(`?${newQuery}`);
	}

	function onAmountChange(e: CustomEvent) {
		const pageSize = e.detail;
		const pageNumber = '1';
		paginationSettings.limit = pageSize;

		const currentQuery = new URLSearchParams($page.url.searchParams.toString());
		const newQuery = mergeQueries(currentQuery, new URLSearchParams({ pageSize, pageNumber }));

		goto(`?${newQuery}`);
	}
</script>

<div class="px-3 flex items-center gap-3 bg-[#fff] h-14 w-full rounded-b-sm">
	<span class="whitespace-nowrap">Số hàng trên trang : </span>
	<Paginator
		bind:settings={paginationSettings}
		on:page={onPageChange}
		on:amount={onAmountChange}
		showPreviousNextButtons={true}
		class="w-full"
		amountText=""
		showNumerals
		maxNumerals={1}
		buttonClasses="!px-3 !py-1 fill-current hover:fill-primary-500 disabled:cursor-not-allowed"
		regionControl="btn-group rounded-lg bg-[#E4E7EA] text-[#000]"
	/>
</div>

<style>
	:global(.paginator-select) {
		border-radius: 6px !important;
		padding: 2px 6px !important;
		min-width: 50px !important;
	}

	:global(.paginator-controls > button:hover) {
		background-color: #b6b6b6 !important;
	}

	:global(.paginator-controls > .pointer-events-none) {
		color: #fff !important;
	}
</style>
