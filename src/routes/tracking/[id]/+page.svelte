<script lang="ts">
	import { page } from '$app/stores';
	import Tracking from 'src/components/Tracking.svelte';
	import type { PageServerData } from './$types';
	import Loading from 'src/components/Loading.svelte';

	export let data: PageServerData;
	console.log('🚀 ~ file: +page.svelte:8 ~ data:', data);
</script>

<div class="flex flex-col items-center w-full md:my-10">
	<main class="flex flex-col gap-5 bg-surface-200 md:w-[60vw] p-3">
		{#await data.streamed?.trackingHistory}
			<Loading message="Đang lấy thông tin mới nhất" />
		{:then tracking}
			<div class="w-full rounded-md flex gap-5">
				<input type="text" placeholder="Mã đơn" class="dui-input dui-input-bordered dui-input-lg w-full" />
				<button type="button" class="btn variant-filled-primary rounded-md md:w-1/5">Theo dõi</button>
			</div>
			<div class="flex flex-col w-full md:flex-row px-1">
				<div class="">
					<p class="text-primary-500">Mã phiếu gửi</p>
					<b>{$page.params.id}</b>
				</div>

				<div class="dui-divider dui-divider-horizontal" />

				<div class="">
					<p class="text-primary-500">Trạng thái</p>
					<b>{tracking.data.at(-1).messageStatus}</b>
				</div>
			</div>

			<div>
				<div class="dui-divider m-0" />
				<p class="uppercase font-bold mb-2">Thông tin trạng thái</p>

				<Tracking trackingData={tracking.data} />
			</div>
		{/await}
	</main>
	<div class="trail-dash" />
</div>

<style>
	.trail-dash {
		height: 0.1875rem;
		width: 60vw;
		background-position-x: -1.875rem;
		background-size: 7.25rem 0.1875rem;
		background-image: repeating-linear-gradient(
			45deg,
			#6fa6d6,
			#6fa6d6 33px,
			transparent 0,
			transparent 41px,
			#f18d9b 0,
			#f18d9b 74px,
			transparent 0,
			transparent 82px
		);
	}

	.dui-divider::before,
	.dui-divider::after {
		background-color: #d4163c;
	}
</style>
