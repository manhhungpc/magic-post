<script lang="ts">
	import { Tab, TabGroup, type DrawerSettings } from '@skeletonlabs/skeleton';
	import { Filter, PlusCircle } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { getUserStorage } from 'src/lib/userLocalStorage';
	import { AlertTriangle } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { Roles } from 'src/utils/enum';
	import type { StaffsInteface } from 'src/utils/interface';
	import ListOrder from 'src/components/lists/ListOrder.svelte';
	import type { PageData } from './$types';
	import Loading from 'src/components/Loading.svelte';
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();
	const filterSettings: DrawerSettings = {
		id: 'filter-customer-orders',
		bgDrawer: 'bg-[#efefef]',
		width: 'md:w-[50vw] w-[100vw]',
		padding: 'p-4',
		rounded: 'rounded-lg'
	};
	export let data: PageData;
	const user: StaffsInteface = getUserStorage();
	let tabSet: 'all' | 'processing' | 'complete' = 'all';

	onMount(() => {
		if (![Roles.TRANSACTION_LEADER, Roles.TRANSACTION_STAFF].includes(user.role?.id)) {
			goto('/manage/transaction-order');
		}
	});
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
			<button
				on:click={() => goto('/manage/customer-order/add')}
				disabled={!user?.workAt}
				class="btn variant-filled bg-ocean py-2"
			>
				<PlusCircle class="mr-1" size="20" /> Thêm mới
			</button>
			<button on:click={() => drawerStore.open(filterSettings)} class="btn variant-filled bg-greenNew-600 py-2">
				<Filter class="mr-1" size="20" /> Lọc
			</button>
		</div>
	</div>
	<TabGroup rounded="rounded-tl-md rounded-tr-md" class="h-[calc(100%-6rem)]">
		<Tab bind:group={tabSet} name="tab1" value="all" class="w-1/3">
			<span class:text-surface-400={tabSet != 'all'}>Toàn bộ đơn</span>
		</Tab>
		<Tab bind:group={tabSet} name="tab2" value="processing" class="w-1/3">
			<span class:text-surface-400={tabSet != 'processing'}>Đang xử lý</span>
		</Tab>
		<Tab bind:group={tabSet} name="tab3" value="complete" class="w-1/3">
			<span class:text-surface-400={tabSet != 'complete'}>Đã hoàn thành</span>
		</Tab>
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			<div class="card !rounded-none h-full overflow-auto !bg-transparent">
				{#if tabSet == 'all'}
					{#await data.streamed?.orders}
						<Loading message="Đang lấy dữ liệu mới nhất" />
					{:then orders}
						{#each orders.data.content as orderData}
							<ListOrder {orderData} />
						{/each}
					{/await}
				{:else if tabSet == 'processing'}
					(tab panel 2 contents)
				{:else if tabSet == 'complete'}
					(tab panel 3 contents)
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
