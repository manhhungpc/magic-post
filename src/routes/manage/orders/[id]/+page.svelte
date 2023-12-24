<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';
	import Loading from 'src/components/Loading.svelte';
	import OrderInfo from 'src/components/OrderInfo.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main>
	<div class="flex justify-between">
		<div class="flex gap-5 items-center">
			<a href="/manage/customer-order" class="btn-icon btn-icon-sm variant-filled">
				<ArrowLeft size="18" />
			</a>
			<p class="uppercase">Thông tin đơn đặt hàng</p>
		</div>
	</div>
	{#await data.streamed?.orders}
		<Loading message="Đang lấy dữ liệu mới nhất" />
	{:then orders}
		<OrderInfo orderData={orders.data} />
	{/await}
</main>
