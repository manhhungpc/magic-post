<script lang="ts">
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import { PlusCircle } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { getUserStorage } from 'src/lib/userLocalStorage';
	import { AlertTriangle } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { Roles } from 'src/utils/enum';
	import type { StaffsInteface } from 'src/utils/interface';

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
			<div class="card !rounded-b-none h-full">
				{#if tabSet == 'all'}
					(tab panel 1 contents)
				{:else if tabSet == 'processing'}
					(tab panel 2 contents)
				{:else if tabSet == 'complete'}
					(tab panel 3 contents)
				{/if}
			</div>
		</svelte:fragment>
	</TabGroup>
</main>
