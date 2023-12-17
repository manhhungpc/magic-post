<script lang="ts">
	import { page } from '$app/stores';
	import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';
	import ProcessingOrdersTable from 'src/components/table/ProcessingOrdersTable.svelte';
	import { OrderType, OrderStatus } from 'src/utils/enum';
	import type { PageServerData } from './$types';
	import Loading from 'src/components/Loading.svelte';

	export let data: PageServerData;
	console.log('🚀 ~ file: +page.svelte:10 ~ data:', data.streamed?.orders);
	let tabSet = 'transaction-tabs';
	let checkedOrders = new Set();

	let isFirstTab: boolean, isSecondTab: boolean, isThirdTab: boolean;
	$: isFirstTab =
		($page.url.pathname == '/manage/processing-order' && $page.url.search == '') ||
		$page.url.search == `?typeOrder=${OrderType.TRANSACTION}&deliveryStatus=${OrderStatus.PROCESSING}`;
	$: isSecondTab =
		$page.url.search == `?typeOrder=${OrderType.TRANSACTION}&deliveryStatus=${OrderStatus.CONFIRM_RECEIVE}`;
	$: isThirdTab = $page.url.search == `?typeOrder=${OrderType.TRANSACTION}&deliveryStatus=${OrderStatus.CONFIRM_SEND}`;
</script>

<main class="h-full">
	<div class="flex justify-between items-center mb-3">
		<p class="title-font uppercase font-vn">Danh sách đơn giao dịch của điểm tập kết</p>
	</div>
	<TabGroup rounded="rounded-tl-md rounded-tr-md" class="h-[calc(100%-6rem)]">
		<TabAnchor
			href="?typeOrder={OrderType.TRANSACTION}&deliveryStatus={OrderStatus.PROCESSING}"
			selected={isFirstTab}
			bind:group={tabSet}
			class="w-1/3"
		>
			<span class:text-surface-400={!isFirstTab}>Đơn đến</span>
		</TabAnchor>
		<TabAnchor
			href="?typeOrder={OrderType.TRANSACTION}&deliveryStatus={OrderStatus.CONFIRM_RECEIVE}"
			selected={isSecondTab}
			bind:group={tabSet}
			class="w-1/3"
		>
			<span class:text-surface-400={!isSecondTab}>Đang xử lý</span>
		</TabAnchor>
		<TabAnchor
			href="?typeOrder={OrderType.TRANSACTION}&deliveryStatus={OrderStatus.CONFIRM_SEND}"
			selected={isThirdTab}
			bind:group={tabSet}
			class="w-1/3"
		>
			<span class:text-surface-400={!isThirdTab}>Đơn cần xác nhận</span>
		</TabAnchor>
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			<div class="card !rounded-b-none h-full">
				{#if isFirstTab}
					{#await data.streamed?.orders}
						<Loading message="Đang lấy dữ liệu mới nhất" />
					{:then orders}
						<!-- Thêm lọc từ điểm TK nguồn đến, điểm GD liên kết đến -->
						<ProcessingOrdersTable tableData={orders.data.content} bind:checkedOrders />
					{/await}
				{:else if isSecondTab}
					<!-- Thêm lọc từ điểm TK nguồn đến, điểm GD liên kết đến -->
					(tab panel 2 contents)
				{:else if isThirdTab}
					<!-- Thêm lọc từ điểm TK nguồn đến, điểm GD liên kết đến -->
					<!-- Thêm lọc điểm đến tiếp theo là GD/TK? -->
					<!-- Thêm lọc địa chỉ điểm đến tiếp theo -->
					(tab panel 3 contents)
				{/if}
			</div>
		</svelte:fragment>
	</TabGroup>
</main>
