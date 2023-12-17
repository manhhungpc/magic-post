<script lang="ts">
	import { TabGroup, TabAnchor } from '@skeletonlabs/skeleton';
	import GatherOrdersTable from 'src/components/table/GatherOrdersTable.svelte';
	import type { PageServerData } from './$types';
	import Loading from 'src/components/Loading.svelte';
	import { scale } from 'svelte/transition';
	//@ts-ignore
	import Toastify from 'toastify-js';
	import { invalidate } from '$app/navigation';
	import { ClipboardCheck, Clock3, Warehouse } from 'lucide-svelte';
	import { OrderStatus, OrderType } from 'src/utils/enum';
	import { page } from '$app/stores';
	import { getUserStorage } from 'src/lib/userLocalStorage';
	import type { StaffsInteface } from 'src/utils/interface';

	export let data: PageServerData;

	const user: StaffsInteface = getUserStorage();
	let tabSet = 'gather-tabs',
		checkedOrders = new Set();
	let loading = false,
		error: string;

	let isFirstTab: boolean, isSecondTab: boolean, isThirdTab: boolean;
	$: isFirstTab =
		($page.url.pathname == '/manage/gathering-order' && $page.url.search == '') ||
		$page.url.search == `?typeOrder=${OrderType.GATHERING}&deliveryStatus=${OrderStatus.PROCESSING}`;
	$: isSecondTab = $page.url.search == `?typeOrder=${OrderType.GATHERING}&deliveryStatus=${OrderStatus.CONFIRM_SEND}`;
	$: isThirdTab = $page.url.search == `?typeOrder=${OrderType.GATHERING}&deliveryStatus=${OrderStatus.CONFIRM_RECEIVE}`;

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
		invalidate((url) => url.pathname.includes('/api/orders/delivery'));
	}
</script>

<main class="h-full">
	<div class="w-full flex justify-between h-10">
		<p class="title-font uppercase font-vn">Danh sách đơn tập kết</p>

		<!-- {#if checkedOrders.size > 0}
			<button class="btn variant-filled bg-primary-600" transition:scale on:click={confirmLeave} disabled={loading}>
				<ClipboardCheck /> &nbsp; Xác nhận rời điểm
				{#if loading}
					<span class="dui-loading dui-loading-spinner dui-loading-sm" />
				{/if}
			</button>
		{/if} -->
	</div>

	<TabGroup rounded="rounded-tl rounded-tr" class="h-[calc(100%-6.5rem)] mt-2">
		<TabAnchor
			href="?typeOrder={OrderType.GATHERING}&deliveryStatus={OrderStatus.PROCESSING}"
			selected={isFirstTab}
			bind:group={tabSet}
			class="w-1/3"
		>
			<span class:text-surface-400={!isFirstTab} class="flex justify-center gap-1">
				<!-- Chờ xác nhận rời điểm -->
				Đang xử lý <Clock3 size={20} />
			</span>
		</TabAnchor>
		<TabAnchor
			href="?typeOrder={OrderType.GATHERING}&deliveryStatus={OrderStatus.CONFIRM_SEND}"
			selected={isSecondTab}
			bind:group={tabSet}
			class="w-1/3"
		>
			<span class:text-surface-400={!isSecondTab} class="flex justify-center gap-1">
				<!-- Đã rời điểm  -->
				Đơn chờ xác nhận <ClipboardCheck size={20} />
			</span>
		</TabAnchor>
		<TabAnchor
			href="?typeOrder={OrderType.GATHERING}&deliveryStatus={OrderStatus.CONFIRM_RECEIVE}"
			selected={isThirdTab}
			bind:group={tabSet}
			class="w-1/3"
		>
			<span class:text-surface-400={!isThirdTab} class="flex justify-center gap-1">
				Đến từ điểm tập kết {user.workAt.typePoint == 'TP' ? 'liên kết' : 'khác'}
				<Warehouse size={20} />
			</span>
		</TabAnchor>

		<svelte:fragment slot="panel">
			<div class="h-full card !rounded-none overflow-auto">
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
						<GatherOrdersTable tableData={orders.data.content} bind:checkedOrders />
					{/await}
				{:else if isThirdTab}
					<!-- <GatherOrdersTable tableData={[]} /> -->
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
