<script lang="ts">
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import TransactionOrderTable from 'src/components/table/TransactionOrderTable.svelte';
	import type { TransactionOrderInteface } from 'src/utils/interface';

	let tabSet: 'coming' | 'processing' | 'forward' = 'coming';
	const tableData: TransactionOrderInteface[] = [
		{ orderId: '1', address: '23 Ngõ 58 Phố Trần Bình, Mai Dịch, Cầu Giấy, Hà Nội', transactionId: '1' },
		{ orderId: '2', address: '23 Ngõ 58 Phố Trần Bình, Mai Dịch, Cầu Giấy, Hà Nội', transactionId: '2' },
		{ orderId: '3', address: '23 Ngõ 58 Phố Trần Bình, Mai Dịch, Cầu Giấy, Hà Nội', transactionId: '3' },
		{ orderId: '4', address: '23 Ngõ 58 Phố Trần Bình, Mai Dịch, Cầu Giấy, Hà Nội', transactionId: '4' },
		{ orderId: '5', address: '23 Ngõ 58 Phố Trần Bình, Mai Dịch, Cầu Giấy, Hà Nội', transactionId: '5' },
		{ orderId: '6', address: '23 Ngõ 58 Phố Trần Bình, Mai Dịch, Cầu Giấy, Hà Nội', transactionId: '6' },
		{ orderId: '7', address: '23 Ngõ 58 Phố Trần Bình, Mai Dịch, Cầu Giấy, Hà Nội', transactionId: '7' },
		{ orderId: '8', address: '23 Ngõ 58 Phố Trần Bình, Mai Dịch, Cầu Giấy, Hà Nội', transactionId: '8' },
		{ orderId: '9', address: '23 Ngõ 58 Phố Trần Bình, Mai Dịch, Cầu Giấy, Hà Nội', transactionId: '9' },
		{ orderId: '10', address: '23 Ngõ 58 Phố Trần Bình, Mai Dịch, Cầu Giấy, Hà Nội', transactionId: '10' }
	];
</script>

<main class="h-full">
	<div class="flex justify-between items-center mb-3">
		<p class="title-font uppercase font-vn">Danh sách đơn giao dịch của điểm tập kết</p>
	</div>
	<!-- <div class="card py-3 px-4 mb-3">
		<span class="mr-2">Tìm kiếm</span>
		<input type="text" placeholder="Nhập tên, mã đơn hàng..." class="dui-input dui-input-bordered w-full max-w-xs" />
	</div> -->
	<TabGroup rounded="rounded-tl-md rounded-tr-md" class="h-[calc(100%-6rem)]">
		<Tab bind:group={tabSet} name="tab1" value="coming" class="w-1/3">
			<span class:text-surface-400={tabSet != 'coming'}>Đơn đến</span>
		</Tab>
		<Tab bind:group={tabSet} name="tab2" value="processing" class="w-1/3">
			<span class:text-surface-400={tabSet != 'processing'}>Đang xử lý</span>
		</Tab>
		<Tab bind:group={tabSet} name="tab3" value="forward" class="w-1/3">
			<span class:text-surface-400={tabSet != 'forward'}>Đơn đi</span>
		</Tab>
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			<div class="card !rounded-b-none h-full">
				{#if tabSet == 'coming'}
					<TransactionOrderTable {tableData} />
				{:else if tabSet == 'processing'}
					(tab panel 2 contents)
				{:else if tabSet == 'forward'}
					(tab panel 3 contents)
				{/if}
			</div>
		</svelte:fragment>
	</TabGroup>
</main>
