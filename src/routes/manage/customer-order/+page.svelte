<script lang="ts">
	import { Boxes, Filter, PlusCircle } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { getUserStorage } from 'src/lib/userLocalStorage';
	import { AlertTriangle } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { OrderStatus, Roles } from 'src/utils/enum';
	import type { StaffsInteface } from 'src/utils/interface';
	import ListOrder from 'src/components/lists/ListOrder.svelte';
	import type { PageData } from './$types';
	import Loading from 'src/components/Loading.svelte';
	import FilterOrderModal from 'src/components/modal/FilterOrderModal.svelte';
	import { scale } from 'svelte/transition';
	import Paginator from 'src/components/Paginator.svelte';
	import EmptyData from 'src/components/EmptyData.svelte';
	import { page } from '$app/stores';
	import { mergeQueries } from 'src/utils/helper';
	import { debounce } from '$lib/debounce';

	export let data: PageData;
	const user: StaffsInteface = getUserStorage();
	let checkedOrders = new Set(),
		searchId: string,
		error: string,
		loading = false;

	onMount(() => {
		if (![Roles.TRANSACTION_LEADER, Roles.TRANSACTION_STAFF].includes(user.role?.id)) {
			goto('/manage/process-transact-order');
		}
	});

	function showFilterModal() {
		(document.getElementById('filter_customer_order') as any).showModal();
	}

	function searchOrderId() {
		const currentQuery = new URLSearchParams($page.url.searchParams.toString());
		const newQuery = mergeQueries(currentQuery, new URLSearchParams({ orderId: searchId }));
		goto(`?${newQuery}`);
	}

	function showGatherOrderBtn(e: any, id: string) {
		const cb = e.target;
		if (cb.checked) checkedOrders.add(id);
		else checkedOrders.delete(id);
		checkedOrders = checkedOrders;
	}

	async function gatherPointDelivery() {
		const body = {
			orderIds: Array.from(checkedOrders)
		};
		loading = true;
		const response = await fetch(`/api/orders/delivery`, {
			method: 'POST',
			body: JSON.stringify(body)
		}).then((res) => res.json());

		loading = false;
		if (response.status != 200) {
			error = response.message;
			return;
		}

		goto(`/manage/gathering-order`);
	}
</script>

<main class="h-full">
	<div class="flex justify-between items-start mb-2">
		<p class="title-font uppercase font-vn">Đơn đặt hàng từ khách hàng</p>

		<div class="flex items-center gap-2">
			{#if !user?.workAt}
				<div
					class="dui-tooltip dui-tooltip-left dui-tooltip-warning"
					data-tip="Bạn không thể tạo đơn mới do chưa được thêm vào điểm làm việc nào!"
				>
					<AlertTriangle color="#FFBE00" strokeWidth={3} />
				</div>
			{/if}
			{#if checkedOrders.size > 0}
				<button
					class="btn variant-filled bg-greenNew-600 py-2"
					transition:scale
					on:click={gatherPointDelivery}
					disabled={loading}
				>
					<Boxes class="mr-1" size="20" /> Tạo đơn giao đến điểm tập kết
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
			<button
				on:click={() => goto('/manage/customer-order/add')}
				disabled={!user?.workAt}
				class="btn variant-filled bg-ocean py-2 !rounded"
			>
				<PlusCircle class="mr-1" size="20" /> Thêm mới
			</button>
			<FilterOrderModal id="filter_customer_order" />
		</div>
	</div>
	<div class="dui-divider m-0" />
	{#await data.streamed?.orders}
		<Loading message="Đang lấy dữ liệu mới nhất" />
	{:then orders}
		{#if orders.data.content.length == 0}
			<EmptyData message="Không có dữ liệu" />
		{:else}
			<div class="h-[calc(100%-7rem)] card !rounded-none overflow-auto !bg-transparent">
				{#each orders.data.content as orderData}
					<ListOrder
						{orderData}
						id={orderData.id}
						on:change={(e) => showGatherOrderBtn(e, orderData.id)}
						status={orderData.orderDelivery.status}
					/>
				{/each}
			</div>
			<Paginator paginate={orders.data.paginate} />
		{/if}
	{/await}
</main>

<style>
	:global(.tab-panel) {
		height: 100%;
	}
</style>
