<script lang="ts">
	import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';
	import type { PageServerData } from './$types';
	import { page } from '$app/stores';
	import { getUserStorage } from 'src/lib/userLocalStorage';
	import { OrderType, OrderStatus } from 'src/utils/enum';
	import type { StaffsInteface } from 'src/utils/interface';
	import Loading from 'src/components/Loading.svelte';
	import GatherOrdersTable from 'src/components/table/GatherOrdersTable.svelte';
	import DeliveringTable from 'src/components/table/DeliveringTable.svelte';
	import Paginator from 'src/components/Paginator.svelte';
	import EmptyData from 'src/components/EmptyData.svelte';
	import ListOrder from 'src/components/lists/ListOrder.svelte';

	export let data: PageServerData;
	console.log('🚀 ~ file: +page.svelte:17 ~ data:', data);

	let tabSet = 'gather-tabs',
		checkedOrders = new Set();

	let isFirstTab: boolean, isSecondTab: boolean, isThirdTab: boolean;
	$: isFirstTab =
		($page.url.pathname == '/manage/delivery' && $page.url.search == '') ||
		$page.url.search == `?typeOrder=${OrderType.DELIVERY}&deliveryStatus=${OrderStatus.PROCESSING}`;
	$: isSecondTab = $page.url.search == `?typeOrder=${OrderType.DELIVERY}&deliveryStatus=${OrderStatus.CONFIRM_SEND}`;
	$: isThirdTab = $page.url.search == `?typeOrder=${OrderType.DELIVERY}&deliveryStatus=${OrderStatus.SUCCESS_DELIVERY}`;
</script>

<main class="h-full">
	<div class="w-full flex justify-between h-10">
		<p class="title-font uppercase font-vn">Danh sách đơn giao hàng</p>
	</div>
	<TabGroup rounded="rounded-tl-md rounded-tr-md" class="h-[calc(100%-{isThirdTab ? '6.5rem' : '9.5rem'})] mt-2">
		<TabAnchor
			href={`?typeOrder=${OrderType.DELIVERY}&deliveryStatus=${OrderStatus.PROCESSING}`}
			selected={isFirstTab}
			bind:group={tabSet}
			class="w-1/3"
		>
			<span class:text-surface-400={!isFirstTab}>Đang xử lý</span>
		</TabAnchor>
		<TabAnchor
			href={`?typeOrder=${OrderType.DELIVERY}&deliveryStatus=${OrderStatus.CONFIRM_SEND}`}
			selected={isSecondTab}
			bind:group={tabSet}
			class="w-1/3"
		>
			<span class:text-surface-400={!isSecondTab}>Đang giao</span>
		</TabAnchor>
		<TabAnchor
			href={`?typeOrder=${OrderType.DELIVERY}&deliveryStatus=${OrderStatus.SUCCESS_DELIVERY}`}
			selected={isThirdTab}
			bind:group={tabSet}
			class="w-1/3"
		>
			<span class:text-surface-400={!isThirdTab}>Đã hoàn thành</span>
		</TabAnchor>

		<svelte:fragment slot="panel">
			<div class="card !rounded-none h-full" class:!bg-transparent={isThirdTab}>
				{#if isFirstTab}
					{#await data.streamed?.orders}
						<Loading message="Đang lấy dữ liệu mới nhất" />
					{:then orders}
						<GatherOrdersTable tableData={orders.data.content} bind:checkedOrders />
					{/await}
				{:else if isSecondTab}
					{#await data.streamed?.orders}
						<Loading message="Đang lấy dữ liệu mới nhất" />
					{:then orders}
						<DeliveringTable tableData={orders.data.content} paginate={orders.data?.paginate} bind:checkedOrders />
					{/await}
				{:else if isThirdTab}
					{#await data.streamed?.orders}
						<Loading message="Đang lấy dữ liệu mới nhất" />
					{:then orders}
						{#if orders.data.content.length == 0}
							<EmptyData message="Không có dữ liệu" />
						{:else}
							<div class="h-full card !rounded-none overflow-auto !bg-transparent">
								{#each orders.data.content as orderData}
									<ListOrder
										{orderData}
										id={orderData.id}
										status={orderData.orderDelivery.status}
										showCheckbox={false}
									/>
								{/each}
							</div>
						{/if}
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
