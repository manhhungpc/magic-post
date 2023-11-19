<script lang="ts">
	import { PlusCircle } from 'lucide-svelte';
	import TableTransactionOrder from 'src/components/table/TableTransactionOrder.svelte';
	import type { TableTransactionOrderInteface } from 'src/utils/interface';

    const tableData: TableTransactionOrderInteface[] = [
		{ orderId: '1', address: '23 Ngõ 58 Phố Trần Bình, Mai Dịch, Cầu Giấy, Hà Nội', transactionId: '1' },
		{ orderId: '2', address: '23 Ngõ 58 Phố Trần Bình, Mai Dịch, Cầu Giấy, Hà Nội', transactionId: '2' },
		{ orderId: '3', address: '23 Ngõ 58 Phố Trần Bình, Mai Dịch, Cầu Giấy, Hà Nội', transactionId: '3' },
		{ orderId: '4', address: '23 Ngõ 58 Phố Trần Bình, Mai Dịch, Cầu Giấy, Hà Nội', transactionId: '4' },
		{ orderId: '5', address: '23 Ngõ 58 Phố Trần Bình, Mai Dịch, Cầu Giấy, Hà Nội', transactionId: '5' },
		{ orderId: '6', address: '23 Ngõ 58 Phố Trần Bình, Mai Dịch, Cầu Giấy, Hà Nội', transactionId: '6' },
		{ orderId: '7', address: '23 Ngõ 58 Phố Trần Bình, Mai Dịch, Cầu Giấy, Hà Nội', transactionId: '7' },
		{ orderId: '8', address: '23 Ngõ 58 Phố Trần Bình, Mai Dịch, Cầu Giấy, Hà Nội', transactionId: '8' },
		{ orderId: '9', address: '23 Ngõ 58 Phố Trần Bình, Mai Dịch, Cầu Giấy, Hà Nội', transactionId: '9' },
		{ orderId: '10', address: '23 Ngõ 58 Phố Trần Bình, Mai Dịch, Cầu Giấy, Hà Nội', transactionId: '10' },
	];
</script>

<main class="h-full">
    <div class="flex justify-between items-center mb-3">
		<h1 class="h3 uppercase">Danh sách đơn giao dịch</h1>
		<button class="btn variant-filled bg-ocean">
			<PlusCircle class="mr-1" size="20" /> Thêm mới
		</button>
	</div>
    <div class="card py-3 px-4 mb-3">
		<span class="mr-2">Tìm kiếm</span>
		<input type="text" placeholder="Nhập tên, mã đơn hàng..." class="dui-input dui-input-bordered w-full max-w-xs" />
	</div>
	<div class="card !rounded-none h-[calc(100%-7.5rem)]">
		<TableTransactionOrder tableData={tableData} />
	</div>
</main>
