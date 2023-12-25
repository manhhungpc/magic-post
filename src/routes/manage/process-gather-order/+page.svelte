<script lang="ts">
	import { page } from '$app/stores';
	import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';
	import ProcessGatherOrdersTable from 'src/components/table/ProcessGatherOrdersTable.svelte';
	import { OrderType, OrderStatus } from 'src/utils/enum';
	import type { PageServerData } from './$types';
	import Loading from 'src/components/Loading.svelte';
	import FilterOrderModal from 'src/components/modal/FilterOrderModal.svelte';
	import { ArrowDownCircle, ClipboardCheck, Clock3, Filter } from 'lucide-svelte';
	import { debounce } from 'src/lib/debounce';
	import { goto } from '$app/navigation';
	import { mergeQueries } from 'src/utils/helper';

	export let data: PageServerData;

	const defaultQuery = new URLSearchParams({
		typeOrder: String(OrderType.GATHERING),
		deliveryStatus: String(OrderStatus.CONFIRM_RECEIVE)
	});
	let tabSet = 'transaction-tabs';
	let checkedOrders = new Set(),
		searchId: string;
	let isFirstTab: boolean, isSecondTab: boolean, isThirdTab: boolean;

	function showFilterModal() {
		(document.getElementById('filter-process-gather') as any).showModal();
	}

	function searchOrderId() {
		const currentQuery = new URLSearchParams($page.url.searchParams.toString());
		const newQuery = mergeQueries(currentQuery, new URLSearchParams({ orderId: searchId }));
		goto(`?${newQuery}`);
	}

	$: isFirstTab =
		(!isSecondTab && !isThirdTab) ||
		$page.url.search == `?typeOrder=${OrderType.GATHERING}&deliveryStatus=${OrderStatus.CONFIRM_RECEIVE}`;
	$: isSecondTab = $page.url.search == `?typeOrder=${OrderType.GATHERING}&deliveryStatus=${OrderStatus.PROCESSING}`;
	$: isThirdTab = $page.url.search == `?typeOrder=${OrderType.GATHERING}&deliveryStatus=${OrderStatus.CREATE_SEND}`;
</script>

<main class="h-full">
	<div class="flex justify-between items-center mb-3">
		<p class="title-font uppercase font-vn">Danh sách đơn từ điểm tập kết khác</p>
		<div class="flex gap-2">
			<!-- svelte-ignore a11y-autofocus -->
			<input
				type="text"
				placeholder="Tìm mã đơn hàng"
				class="dui-input !h-9 dui-input-bordered w-full"
				on:input={() => debounce(null, searchOrderId)}
				bind:value={searchId}
				autofocus={!!searchId}
			/>
			<button class="btn variant-filled !rounded bg-primary-500 py-1" on:click={showFilterModal}>
				<Filter class="mr-1" size="20" /> Lọc
			</button>
			<FilterOrderModal id="filter-process-gather" filterOptions={{ fromGP: true }} {defaultQuery} />
		</div>
	</div>
	<TabGroup rounded="rounded-tl-md rounded-tr-md" class="h-[calc(100%-9.5rem)]">
		<TabAnchor
			href="?typeOrder={OrderType.GATHERING}&deliveryStatus={OrderStatus.CONFIRM_RECEIVE}"
			selected={isFirstTab}
			bind:group={tabSet}
			class="w-1/3"
		>
			<span class="flex items-center justify-center gap-1" class:text-surface-400={!isFirstTab}>
				Đơn đến <ArrowDownCircle size={20} />
			</span>
		</TabAnchor>
		<TabAnchor
			href="?typeOrder={OrderType.GATHERING}&deliveryStatus={OrderStatus.PROCESSING}"
			selected={isSecondTab}
			bind:group={tabSet}
			class="w-1/3"
		>
			<span class="flex items-center justify-center gap-1" class:text-surface-400={!isSecondTab}>
				Đang xử lý <Clock3 size={20} />
			</span>
		</TabAnchor>
		<TabAnchor
			href="?typeOrder={OrderType.GATHERING}&deliveryStatus={OrderStatus.CREATE_SEND}"
			selected={isThirdTab}
			bind:group={tabSet}
			class="w-1/3"
		>
			<span class="flex items-center justify-center gap-1" class:text-surface-400={!isThirdTab}>
				Xác nhận đến điểm giao dịch đích <ClipboardCheck size={20} />
			</span>
		</TabAnchor>
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			<div class="card !rounded-b-none h-full">
				{#if isFirstTab}
					{#await data.streamed?.orders}
						<Loading message="Đang lấy dữ liệu mới nhất" />
					{:then orders}
						<!-- Thêm lọc từ điểm TK nguồn đến, điểm GD liên kết đến -->
						<ProcessGatherOrdersTable
							tableData={orders.data.content}
							paginate={orders.data.paginate}
							bind:checkedOrders
						/>
					{/await}
				{:else if isSecondTab}
					{#await data.streamed?.orders}
						<Loading message="Đang lấy dữ liệu mới nhất" />
					{:then orders}
						<ProcessGatherOrdersTable
							showTPColumn={true}
							tableData={orders.data.content}
							paginate={orders.data.paginate}
							bind:checkedOrders
							tooltip="Tạo đơn chuyển đến điểm giao dịch"
						/>
					{/await}
				{:else if isThirdTab}
					{#await data.streamed?.orders}
						<Loading message="Đang lấy dữ liệu mới nhất" />
					{:then orders}
						<ProcessGatherOrdersTable
							showTPColumn={true}
							tableData={orders.data.content}
							paginate={orders.data.paginate}
							bind:checkedOrders
							tooltip="Xác nhận rời điểm"
						/>
					{/await}
				{/if}
			</div>
		</svelte:fragment>
	</TabGroup>
</main>

<style>
	:global(.tab-panel) {
		height: 100%;
	}
</style>
