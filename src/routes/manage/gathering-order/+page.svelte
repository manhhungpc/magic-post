<script lang="ts">
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import GatherOrdersTable from 'src/components/table/GatherOrdersTable.svelte';
	import type { PageServerData } from './$types';
	import Loading from 'src/components/Loading.svelte';
	import ListOrder from 'src/components/lists/ListOrder.svelte';
	import { getUserStorage } from 'src/lib/userLocalStorage';

	export let data: PageServerData;
	const user = getUserStorage();
	let tabSet: 'coming' | 'processing' | 'leave' = 'processing';
	let checkedOrders = new Set();

	function showLeaveBtn(e: any, id: string) {
		const cb = e.target;
		if (cb.checked) checkedOrders.add(id);
		else checkedOrders.delete(id);
		checkedOrders = checkedOrders;
	}
</script>

<main class="h-full">
	<div class="w-full flex justify-between">
		<p class="title-font uppercase font-vn">Danh sách đơn tập kêt - Điểm giao dịch XYZ</p>

		{#if checkedOrders.size > 0}
			<button class="btn variant-filled bg-primary-600"> Giao tới điểm tập kết </button>
		{/if}
	</div>

	<TabGroup rounded="rounded-tl-md rounded-tr-md" class="h-[calc(100%-6rem)]">
		<Tab bind:group={tabSet} name="tab2" value="processing" class="w-1/3">
			<span class:text-surface-400={tabSet != 'processing'}>Đơn đang xử lý</span>
		</Tab>
		<Tab bind:group={tabSet} name="tab1" value="coming" class="w-1/3">
			<span class:text-surface-400={tabSet != 'coming'}>Đơn đến từ điểm tập kết</span>
		</Tab>
		<Tab bind:group={tabSet} name="tab1" value="leave" class="w-1/3">
			<span class:text-surface-400={tabSet != 'coming'}>Đơn giao tới điểm tập kết</span>
		</Tab>
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			<div class="card !rounded-b-none h-full !bg-transparent">
				{#if tabSet == 'processing'}
					{#await data.streamed?.orders}
						<Loading message="Đang lấy dữ liệu mới nhất" />
					{:then orders}
						{#each orders.data.content as orderData}
							<ListOrder {orderData} on:change={(e) => showLeaveBtn(e, orderData.id)} />
						{/each}
					{/await}
				{:else if tabSet == 'coming'}
					<GatherOrdersTable tableData={[]} />
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
