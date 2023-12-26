<script lang="ts">
	import Chart from 'chart.js/auto';
	import type { PageServerData } from './$types';
	import { onMount } from 'svelte';
	import Loading from 'src/components/Loading.svelte';
	import { afterNavigate, goto, invalidateAll } from '$app/navigation';
	import { removeNullQueries } from 'src/utils/helper';

	export let data: PageServerData;
	let canvas: any, ctx: any;
	let chart: any;
	let loading = false;
	let typePoint: string, pointId: string;

	function view() {
		const query = removeNullQueries(new URLSearchParams({ typePoint, pointId }));
		console.log('🚀 ~ file: +page.svelte:18 ~ view ~ query:', query.toString());
		// invalidateAll();
		goto(`?${query}`);
	}

	async function loadChart() {
		if (chart) {
			chart.destroy();
		}
		loading = true;
		const stats = await data.streamed?.stats;
		const labels = stats.data.map((s: any) => s.date);
		const incomming = stats.data.map((s: any) => s.numberOrderIncoming);
		const leave = stats.data.map((s: any) => s.numberOrderLeave);
		loading = false;

		ctx = canvas.getContext('2d');
		chart = new Chart(ctx, {
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
	}
	afterNavigate(async () => {
		await loadChart();
	});

	// $: loadChart();
</script>

<main class="w-full">
	<span class="title-font uppercase font-vn"> Thống kê </span>
	<div class="flex flex-row gap-3">
		<div class="w-1/3">
			<label class="dui-label pb-1" for="type">
				<span class="dui-label-text">Loại điểm chuyển phát</span>
			</label>
			<select required class="dui-select dui-select-sm dui-select-bordered w-full h-10" bind:value={typePoint}>
				<option value="TP">Điểm giao dịch</option>
				<option value="GP">Điểm tập kết</option>
			</select>
		</div>

		<div class="w-1/3">
			<label class="dui-label pb-1" for="type">
				<span class="dui-label-text">Tên điểm chuyển phát</span>
			</label>
			{#await data.streamed.points then points}
				<select required class="dui-select dui-select-sm dui-select-bordered w-full h-10" bind:value={pointId}>
					<option value="">--Tất cả--</option>
					{#each points.data.content as point}
						<option value={point.id}>{point.name}</option>
					{/each}
				</select>
			{/await}
		</div>

		<div class="flex items-end">
			<button type="button" class="btn variant-filled-primary" on:click={view}>Xem</button>
		</div>
	</div>
	<div class="w-full flex justify-center mt-5">
		<div class="h-[65vh] w-[65vw]">
			{#if loading}
				<Loading message="Đang tổng hợp dữ liệu" />
			{/if}

			<canvas bind:this={canvas} />
		</div>
	</div>
</main>
