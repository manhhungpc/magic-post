<script lang="ts">
	import Invoice from 'src/components/Invoice.svelte';
	import type { PageData } from './$types';
	import Loading from 'src/components/Loading.svelte';
	import { Printer } from 'lucide-svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;

	function printInvoice() {
		window.print();
	}

	$: window.onafterprint = function () {
		goto('/manage/customer-order');
	};
</script>

<div class="flex justify-center w-full my-4" id="print-btn">
	<button class="btn variant-filled bg-ocean p-5" on:click={printInvoice}>
		<Printer class="mr-1" size="20" /> In giấy biên nhận chuyển phát
	</button>
</div>
<div class="w-full flex justify-center">
	<main class="print-content" style="max-width: 297mm; max-height: 205mm;">
		{#await data.streamed?.order}
			<Loading message="Đang tải dữ liệu đơn hàng" />
		{:then order}
			<div class="">
				<Invoice invoiceData={order.data} />
			</div>
		{/await}
	</main>
</div>

<style>
	@media print {
		:global(html),
		:global(body) {
			width: 297mm;
			height: 200mm;
		}

		:global(header),
		#print-btn {
			display: none;
		}

		.print-content {
			visibility: visible !important;
			display: flex;
			align-items: center;
		}
		/* ... the rest of the rules ... */
	}
</style>
