<script lang="ts">
	import { TabGroup, TabAnchor } from '@skeletonlabs/skeleton';
	import GatherOrdersTable from 'src/components/table/GatherOrdersTable.svelte';
	import type { PageServerData } from './$types';
	import Loading from 'src/components/Loading.svelte';
	import { scale } from 'svelte/transition';
	//@ts-ignore
	import Toastify from 'toastify-js';
	import { goto, invalidate, invalidateAll } from '$app/navigation';
	import { ClipboardCheck, Clock3, Filter, Warehouse } from 'lucide-svelte';
	import { OrderStatus, OrderType } from 'src/utils/enum';
	import { page } from '$app/stores';
	import { getUserStorage } from 'src/lib/userLocalStorage';
	import type { StaffsInteface } from 'src/utils/interface';
	import { debounce } from 'src/lib/debounce';
	import FilterOrderModal from 'src/components/modal/FilterOrderModal.svelte';
	import { mergeQueries } from 'src/utils/helper';

	export let data: PageServerData;

	const user: StaffsInteface = getUserStorage();
	const defaultQuery = new URLSearchParams({
		typeOrder: String(OrderType.CUSTOMER),
		deliveryStatus: String(OrderStatus.PROCESSING)
	});
	let tabSet = 'gather-tabs',
		checkedOrders = new Set(),
		searchId: string;
	let loading = false,
		error: string;

	let isFirstTab: boolean, isSecondTab: boolean, isThirdTab: boolean;
	$: isFirstTab =
		(!isSecondTab && !isThirdTab) ||
		$page.url.search.includes(`?typeOrder=${OrderType.CUSTOMER}&deliveryStatus=${OrderStatus.PROCESSING}`);
	$: isThirdTab = $page.url.search.includes(
		`?typeOrder=${OrderType.GATHERING}&deliveryStatus=${OrderStatus.PROCESSING}`
	);
	$: isSecondTab = $page.url.search.includes(
		`?typeOrder=${OrderType.GATHERING}&deliveryStatus=${OrderStatus.CONFIRM_RECEIVE}`
	);

	async function confirmLeave() {
		loading = true;
		const response = await fetch(`/api/orders/delivery`, {
			method: 'POST',
			body: JSON.stringify({
				orderIds: Array.from(checkedOrders)
			})
		}).then((res) => res.json());

		loading = false;
		if (response.status != 200) {
			error = response.error ?? 'Unknow error!';
			Toastify({
				text: error,
				duration: 3000,
				close: true,
				gravity: 'top',
				position: 'right',
				stopOnFocus: true,
				style: {
					background: '#D41875'
				}
			}).showToast();
			return;
		}

		Toastify({
			text: 'Xác nhận thành công!',
			duration: 3000,
			close: true,
			gravity: 'top',
			position: 'right',
			stopOnFocus: true,
			style: {
				background: '#0FBA81'
			}
		}).showToast();
		checkedOrders = new Set();
		invalidateAll();
		//đi đên đơn in biên lai xác nhận
		// invalidate((url) => url.pathname.includes('/api/orders/delivery'));
	}

	function showFilterModal() {
		(document.getElementById('filter_gather_order') as any).showModal();
	}

	function searchOrderId() {
		const currentQuery = new URLSearchParams($page.url.searchParams.toString());
		const newQuery = mergeQueries(currentQuery, new URLSearchParams({ orderId: searchId }));
		goto(`?${newQuery}`);
	}
</script>

<main class="h-full">
	<div class="w-full flex justify-between h-10">
		<p class="title-font uppercase font-vn">Danh sách đơn tập kết</p>

		<div class="flex items-center gap-2">
			{#if checkedOrders.size > 0}
				<button class="btn variant-filled bg-primary-600" transition:scale on:click={confirmLeave} disabled={loading}>
					<ClipboardCheck /> &nbsp; Xác nhận {isFirstTab ? 'rời điểm' : 'đã tiếp nhận'}
					{#if loading}
						<span class="dui-loading dui-loading-spinner dui-loading-sm" />
					{/if}
				</button>
			{/if}
			<!-- svelte-ignore a11y-autofocus -->
			<input
				type="text"
				placeholder="Tìm mã đơn hàng"
				class="dui-input h-10 dui-input-bordered w-full"
				on:input={() => debounce(null, searchOrderId)}
				bind:value={searchId}
				autofocus={!!searchId}
			/>
			<button on:click={showFilterModal} class="btn variant-filled !rounded bg-primary-500 py-2">
				<Filter class="mr-1" size="20" /> Lọc
			</button>
			<FilterOrderModal id="filter_gather_order" filterOptions={{ customerInfo: true }} {defaultQuery} />
		</div>
	</div>

	<TabGroup rounded="rounded-tl rounded-tr" class="h-[calc(100%-9.5rem)] mt-2">
		<TabAnchor
			href="?typeOrder={OrderType.CUSTOMER}&deliveryStatus={OrderStatus.PROCESSING}"
			selected={isFirstTab}
			bind:group={tabSet}
			class="w-1/3"
		>
			<span class:text-surface-400={!isFirstTab} class="flex justify-center gap-1">
				<!-- Đã rời điểm  -->
				Đơn chờ xác nhận chuyển <ClipboardCheck size={20} />
			</span>
		</TabAnchor>
		<TabAnchor
			href="?typeOrder={OrderType.GATHERING}&deliveryStatus={OrderStatus.CONFIRM_RECEIVE}"
			selected={isSecondTab}
			bind:group={tabSet}
			class="w-1/3"
		>
			<span class:text-surface-400={!isSecondTab} class="flex justify-center gap-1">
				Đến từ điểm tập kết {user.workAt.typePoint == 'TP' ? 'liên kết' : 'khác'}
				<Warehouse size={20} />
			</span>
		</TabAnchor>
		<TabAnchor
			href="?typeOrder={OrderType.GATHERING}&deliveryStatus={OrderStatus.PROCESSING}"
			selected={isThirdTab}
			bind:group={tabSet}
			class="w-1/3"
		>
			<span class:text-surface-400={!isThirdTab} class="flex justify-center gap-1">
				<!-- Chờ xác nhận rời điểm -->
				Đang xử lý từ điểm tập kết<Clock3 size={20} />
			</span>
		</TabAnchor>

		<svelte:fragment slot="panel">
			<div class="card !rounded-none h-full">
				{#if isFirstTab}
					{#await data.streamed?.orders}
						<Loading message="Đang lấy dữ liệu mới nhất" />
					{:then orders}
						<GatherOrdersTable paginate={orders.data.paginate} tableData={orders.data.content} bind:checkedOrders />
					{/await}
				{:else if isSecondTab}
					{#await data.streamed?.orders}
						<Loading message="Đang lấy dữ liệu mới nhất" />
					{:then orders}
						<GatherOrdersTable
							paginate={orders.data.paginate}
							tableData={orders.data.content}
							bind:checkedOrders
							tooltip="Xác nhận đã nhận"
							greenBtn={true}
						/>
					{/await}
				{:else if isThirdTab}
					<!-- <GatherOrdersTable tableData={[]} /> -->
					{#await data.streamed?.orders}
						<Loading message="Đang lấy dữ liệu mới nhất" />
					{:then orders}
						<GatherOrdersTable
							paginate={orders.data.paginate}
							tableData={orders.data.content}
							bind:checkedOrders
							tooltip="Tạo đơn giao hàng"
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
