<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';
	import Loading from 'src/components/Loading.svelte';
	import OrderInfo from 'src/components/OrderInfo.svelte';
	import type { PageData } from './$types';
	import { lastRoute } from 'src/utils/stores';

	export let data: PageData;
	console.log('🚀 ~ file: +page.svelte:7 ~ lastRoute:', $lastRoute);
</script>

<main>
	<div class="flex justify-between">
		<div class="flex gap-5 items-center">
			<a href={$lastRoute} class="btn-icon btn-icon-sm variant-filled">
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
