<script lang="ts">
	import { goto } from '$app/navigation';
	import { Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';
	import type { Paginate } from 'src/utils/interface';

	export let paginate: Paginate;
	let paginationSettings = {
		page: paginate?.currentPage - 1,
		limit: paginate.perPage,
		size: paginate?.totalItems,
		amounts: [5, 10]
	} satisfies PaginationSettings;

	function onPageChange(e: CustomEvent): void {
		const pageSize = paginate.perPage;
		const pageNumber = e.detail + 1;
		// paginationSettings.page = e.detail + 1;

		goto(`?pageSize=${pageSize}&pageNumber=${pageNumber}`);
	}

	function onAmountChange(e: CustomEvent) {
		const pageSize = e.detail;
		const pageNumber = paginate.currentPage;
		paginationSettings.limit = pageSize;
		goto(`?pageSize=${pageSize}&pageNumber=${pageNumber}`);
	}
</script>

<div class="px-3 flex items-center gap-3 bg-[#fff] h-14 w-full rounded-b-sm">
	<span class="whitespace-nowrap">Số hàng trên trang : </span>
	<Paginator
		bind:settings={paginationSettings}
		on:page={onPageChange}
		on:amount={onAmountChange}
		showPreviousNextButtons={true}
		class="w-full bg-[#fff]"
		amountText=""
		showNumerals
		maxNumerals={1}
		buttonClasses="!px-3 !py-1 fill-current hover:fill-primary-500 disabled:cursor-not-allowed"
		regionControl="btn-group rounded-lg bg-[#E4E7EA] text-[#000] hover:bg-[#dcdcdc]"
	/>
</div>

<style>
	:global(.paginator-select) {
		border-radius: 6px !important;
		padding: 2px 6px !important;
		min-width: 50px !important;
	}
</style>
