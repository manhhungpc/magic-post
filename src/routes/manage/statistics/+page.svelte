<script lang="ts">
	import Chart from 'chart.js/auto';
	import type { PageServerData } from './$types';
	import { onMount } from 'svelte';
	import { getUserStorage } from 'src/lib/userLocalStorage';
	import Loading from 'src/components/Loading.svelte';

	export let data: PageServerData;
	let canvas: any, ctx: any;
	const user = getUserStorage();
	let loading = false;

	onMount(async () => {
		loading = true;
		const stats = await data.streamed?.stats;
		const labels = stats.data.map((s: any) => s.date);
		const incomming = stats.data.map((s: any) => s.numberOrderIncoming);
		const leave = stats.data.map((s: any) => s.numberOrderLeave);
		loading = false;
		// console.log('🚀 ~ file: +page.svelte:7 ~ data:', await data.streamed?.stats);
		ctx = canvas.getContext('2d');
		let chart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: labels,
				datasets: [
					{
						label: 'Hàng gửi',
						data: incomming
					},
					{
						label: 'Hàng nhận',
						data: leave
					}
				]
			}
		});
	});
</script>

<main class="w-full">
	<span class="title-font uppercase font-vn">
		Thống kê điểm {user.workAt?.typePoint == 'TP' ? 'giao dịch' : 'tập kết'}&nbsp;
		<span class="type-point-display text-primary-500">{user.workAt?.name}</span>
	</span>
	<div class="w-full flex justify-center mt-5">
		<div class="h-[70vh] w-[70vw]">
			{#if loading}
				<Loading message="Đang tổng hợp dữ liệu" />
			{/if}
			<canvas bind:this={canvas} />
		</div>
	</div>
</main>
