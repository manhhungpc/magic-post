<script lang="ts">
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import GatherOrdersTable from 'src/components/table/GatherOrdersTable.svelte';
	import type { PageServerData } from './$types';
	import Loading from 'src/components/Loading.svelte';
	import { scale } from 'svelte/transition';
	//@ts-ignore
	import Toastify from 'toastify-js';
	import { invalidate } from '$app/navigation';
	import { ClipboardCheck } from 'lucide-svelte';

	export let data: PageServerData;
	let tabSet: 'coming' | 'processing' | 'leave' = 'processing',
		checkedOrders = new Set();
	let loading = false,
		error: string;

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
	<div class="w-full flex justify-between h-11">
		<p class="title-font uppercase font-vn">Danh sách đơn tập kết</p>

		{#if checkedOrders.size > 0}
			<button class="btn variant-filled bg-primary-600" transition:scale on:click={confirmLeave} disabled={loading}>
				<ClipboardCheck /> &nbsp; Xác nhận rời điểm
				{#if loading}
					<span class="dui-loading dui-loading-spinner dui-loading-sm" />
				{/if}
			</button>
		{/if}
	</div>

	<TabGroup rounded="rounded-tl rounded-tr" class="h-[calc(100%-6.5rem)] mt-2">
		<Tab bind:group={tabSet} name="tab2" value="processing" class="w-1/3">
			<span class:text-surface-400={tabSet != 'processing'}>Đang chờ xác nhận rời điểm</span>
		</Tab>
		<Tab bind:group={tabSet} name="tab1" value="coming" class="w-1/3">
			<span class:text-surface-400={tabSet != 'coming'}>Đến từ điểm tập kết</span>
		</Tab>
		<Tab bind:group={tabSet} name="tab1" value="leave" class="w-1/3">
			<span class:text-surface-400={tabSet != 'coming'}>Đã rời điểm</span>
		</Tab>

		<svelte:fragment slot="panel">
			<div class="h-full card !rounded-none overflow-auto">
				{#if tabSet == 'processing'}
					{#await data.streamed?.orders}
						<Loading message="Đang lấy dữ liệu mới nhất" />
					{:then orders}
						<GatherOrdersTable tableData={orders.data.content} bind:checkedOrders />
					{/await}
				{:else if tabSet == 'coming'}
					<!-- <GatherOrdersTable tableData={[]} /> -->
				{:else if tabSet == 'leave'}
					Leave
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
